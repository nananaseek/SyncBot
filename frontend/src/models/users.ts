import UserService from "../api/user";
import { createEffect, forward, sample } from "effector";
import { fxLogin, fxRegister, setUser } from "./auth";

export const fxInit = createEffect<void, any>();

fxInit.use(async () => {
  try {
    const res = await UserService.init();
    return res.data;
  } catch (err) {
    console.log(err.response?.data?.message);
  }
});

forward({ from: fxInit.doneData, to: setUser });

sample({
  clock: fxLogin.doneData,
  source: fxInit.doneData,
  fn: (user) => {
    return { username: user.username, email: user.email };
  },
  target: setUser,
});

sample({
  clock: fxRegister.doneData,
  source: fxInit.doneData,
  fn: (user) => {
    return { username: user.username, email: user.email };
  },
  target: setUser,
});
