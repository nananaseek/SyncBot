import api from "../axios";
import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "types/authResponse";

export interface ILoginParams {
  username: string;
  password: string;
}

export interface IRegisterParams {
  email: string;
  username: string;
  password: string;
}

const AuthService = {
  login: async (params: ILoginParams): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>("/token/", params);
  },

  registration: async (
    params: IRegisterParams
  ): Promise<AxiosResponse<AuthResponse>> => {
    return axios.post<AuthResponse>("/api/registration/", params);
  },
  logout: async (refresh): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>("/logout/", {
      refresh,
    });
  },
};

export default AuthService;
