import AuthService, { ILoginParams, IRegisterParams } from "../api/auth";
import { createEffect, createEvent, createStore } from "effector";
import IUser from "types/user";
import axios from "axios";

const setAuth = createEvent<boolean>();
export const setUser = createEvent<any>();

export const $user = createStore<IUser>({ id: 0, email: "", username: "" });

$user.on(setUser, (_, payload) => ({
  id: payload.id,
  email: payload.email,
  username: payload.username,
}));

export const $isAuth = createStore<boolean>(false).on(
  setAuth,
  (_, payload) => payload
);

//------------LOGIN----------------------//
export const fxLogin = createEffect<ILoginParams, any>();

fxLogin.use(async (params) => {
  try {
    const res = await AuthService.login(params);
    localStorage.setItem("token", JSON.stringify(res.data));
    setAuth(true);

    return res.data;
  } catch (error) {
    console.error(error);
  }
});

//------------REGISTERATION-------------------//
export const fxRegister = createEffect<IRegisterParams, any>();

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

//------------LOGOUT-----------------------------
export const fxLogout = createEffect<void, any>();

$user.reset(fxLogout.doneData);

fxLogout.use(async () => {
  try {
    const { refresh } = JSON.parse(localStorage.getItem("token"));
    const res = await AuthService.logout(refresh);
    localStorage.removeItem("token");
    setAuth(false);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
