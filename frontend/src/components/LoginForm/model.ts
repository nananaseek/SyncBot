import { createEvent, forward } from "effector";
import { fxLogin } from "../../models/auth";
import IUser from "types/user";

export const submitFrom = createEvent<IUser>();

forward({ from: submitFrom, to: fxLogin });
