import { storage } from "../api/firebase";
import { createEffect, createEvent, createStore } from "effector";
import { list, listAll, ref, uploadBytes } from "firebase/storage";

export const fxUploadFile = createEffect<any, any>();
export const fxGetFileList = createEffect<any, any>();

const updateCurrentUserFiles = createEvent<any[]>();

export const $currentUserFiles = createStore([]).on(
  updateCurrentUserFiles,
  (_, payload) => {
    payload;
  }
);

fxUploadFile.use(async (params) => {
  const storageRef = ref(storage, `${params.userId}/${params.fileName}`);
  uploadBytes(storageRef, params.file);
});

fxGetFileList.use(async (params) => {
  console.log(params);

  const listRef = ref(storage, `${params.userId}/`);
  list(listRef)
    .then((list) => {
      console.log(list);

      updateCurrentUserFiles(list.items);
    })
    .catch((error) => console.log(error));
});
