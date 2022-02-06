import AuthService, { ILoginParams, IRegisterParams } from "../api/auth";
import { createEffect, createEvent, createStore } from "effector";
import IUser from "types/user";
import axios from "axios";
import { API_URL } from "../api/axios";

const setAuth = createEvent<boolean>();

export const $user = createStore<IUser>({ email: "", username: "" });

export const $isAuth = createStore<boolean>(false).on(
  setAuth,
  (_, payload) => payload
);

//------------LOGIN----------------------//
export const fxLogin = createEffect<ILoginParams, any>();

$user.on(fxLogin.doneData, (_, payload) => ({
  email: payload.email,
  username: payload.username,
}));

$user.watch(console.log);

fxLogin.use(async (params) => {
  try {
    const res = await AuthService.login(params);
    localStorage.setItem("token", res.data.token);
    setAuth(true);
    return res.data;
  } catch (error) {
    console.error(error.response?.data?.message);
  }
});

//------------REGISTERATION-------------------//
export const fxRegister = createEffect<IRegisterParams, any>();

$user.on(fxRegister.doneData, (_, payload) => ({
  email: payload.email,
  username: payload.username,
}));

fxRegister.use(async (params) => {
  try {
    const res = await AuthService.registration(params);
    localStorage.setItem("token", res.data.token);
    setAuth(true);

    return res.data;
  } catch (error) {
    console.error(error.response?.data?.message);
  }
});

//-------CHECKAUTH---------------------------//
// export const fxCheckAuth = createEffect<void, any>();

// fxCheckAuth.use(async () => {
//   try {
//     const res = await axios.get(`${API_URL}/token/refresh`, {
//       withCredentials: true,
//     });
//     localStorage.setItem("token", res.data.token);
//     setAuth(true);
//     return res.data;
//   } catch (error) {
//     console.error(error.response?.data?.message);
//   }
// });
