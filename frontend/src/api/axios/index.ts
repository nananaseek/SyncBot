import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const API_URL = "api/";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = JSON.parse(localStorage.getItem("token"));
  config.headers["Authorization"] = `Bearer ${token?.access}`;
  config.headers["X-CSRFToken"] = getCookie("csrftoken");

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};
const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response) {
    if (error.response.status === 403) {
      const storedToken = JSON.parse(localStorage.getItem("token"));

      try {
        const rs = await axios.post(`${API_URL}token/refresh/`, {
          refresh: storedToken.refresh,
        });

        const { access } = rs.data;

        localStorage.setItem(
          "token",
          JSON.stringify({ ...storedToken, access })
        );
        return;
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
  }
  return Promise.reject(error);
};

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(onRequest, onRequestError);

api.interceptors.response.use(onResponse, onResponseError);

function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        //eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export default api;
