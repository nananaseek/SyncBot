import { createEvent, forward } from "effector";
import { fxLogin, fxRegister } from "../../models/auth";
import { ILoginParams, IRegisterParams } from "../../api/auth";

export const submitLoginFrom = createEvent<ILoginParams>();
export const submitRegisterFrom = createEvent<IRegisterParams>();

forward({ from: submitLoginFrom, to: fxLogin });
forward({ from: submitRegisterFrom, to: fxRegister });
