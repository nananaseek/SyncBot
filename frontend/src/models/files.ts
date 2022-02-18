import { storage } from "../api/firebase";
import { createEffect, createEvent, createStore } from "effector";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FileService, { IFileUpload } from "../api/files";

export const fxUploadFile = createEffect<any, any>();
export const fxUploadFileToServer = createEffect<IFileUpload, any>();
export const fxGetFileList = createEffect<void, any>();

export const setShowFileModal = createEvent<boolean>();
export const $showFileModal = createStore<boolean>(false).on(
  setShowFileModal,
  (_, payload) => payload
);
export const $currentUserFiles = createStore([]).on(
  fxGetFileList.doneData,
  (_, payload) => payload
);

fxUploadFile.use(async (params) => {
  const storageRef = ref(storage, `${params.username}/${params.fileName}`);
  uploadBytes(storageRef, params.file)
    .then((response) => {
      getDownloadURL(ref(storage, response.metadata.fullPath)).then(
        (downloadURL) => {
          fxUploadFileToServer({
            name: response.metadata.name,
            file_uri: downloadURL,
          }).then(() => {
            fxGetFileList();
            setShowFileModal(false);
          });
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

fxGetFileList.use(async () => {
  try {
    const res = await FileService.getFiles();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

fxUploadFileToServer.use(async (params) => {
  try {
    const res = await FileService.sendFile(params);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
