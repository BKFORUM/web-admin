import { persist, action, Action, Thunk, thunk } from "easy-peasy";
import { login } from "../../services/auth.service";
import { IUserLogin } from "@interfaces/IUser";

export interface IAuthModel {
  //MessageError
  messageError: string;
  setMessageError: Action<IAuthModel, string>;
  //Login
  login: Thunk<IAuthModel, IUserLogin>;
}

export const authModel: IAuthModel = persist({
  //MessageError
  messageError: "",
  setMessageError: action((state, payload) => {
    state.messageError = payload;
  }),

  //Login
  login: thunk(async (actions, payload) => {
    return login(payload)
      .then(async (res) => {
        return res.data;
      })
      .catch((error) => {
        actions.setMessageError(error?.response?.data?.message)
      });
  }),
})
