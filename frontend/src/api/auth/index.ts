import api from "../axios";
import { AxiosResponse } from "axios";
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
    return api.post<AuthResponse>("/login/", params);
  },

  registration: async (
    params: IRegisterParams
  ): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>("/registration", params);
  },
  logout: async (
    email: string,
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>("/logout", {
      email,
      username,
      password,
    });
  },
};

export default AuthService;
