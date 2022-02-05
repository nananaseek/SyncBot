import AuthService from "../api/auth";
import { createEffect, createEvent, createStore } from "effector";
import IUser from "types/user";

const setAuth = createEvent<boolean>();

export const $user = createStore<IUser>({ email: "", username: "" });

export const $isAuth = createStore<boolean>(false).on(
  setAuth,
  (_, payload) => payload
);

export const fxLogin = createEffect<void, any>();

$user.on(fxLogin.doneData, (_, payload) => ({
  email: payload.email,
  username: payload.username,
}));

$user.watch(console.log);

fxLogin.use(async (params) => {
  try {
    const res = await AuthService.login(params);
    localStorage.setItem("token", res.data.token.replaceAll("'", '"'));
    setAuth(true);
    return res.data;
  } catch (error) {
    console.error(error.response?.data?.message);
  }
});
