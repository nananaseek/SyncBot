import { AxiosResponse } from "axios";
import api from "../axios";

export interface IFile {
  id: number;
  name: string;
  date_create: string;
  file_uri: string;
}

export interface IFileUpload {
  name: string;
  file_uri: string;
}

const FileService = {
  getFiles: async (): Promise<AxiosResponse> => {
    return api.get("/file/");
  },
  sendFile: async (params: IFileUpload): Promise<AxiosResponse> => {
    return api.post("/file/uploadf/", params);
  },
};

export default FileService;
