import api from "../axios";
import { AxiosResponse } from "axios";
import { AuthResponse } from "types/authResponse";

const AuthService = {
  login: async (params): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>("/login/", params);
  },

  registration: async (
    email: string,
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>("/registration", {
      email,
      username,
      password,
    });
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
