import { persist, action, Action, Thunk, thunk } from "easy-peasy";
import { addUser, getAllUser } from "../../services/user.service";

export interface IUserModel {
    //MessageError
    messageErrorUser: string;
    setMessageErrorUser: Action<IUserModel, string>;

    //GetALLUser
    isGetAllUserSuccess: boolean;
    setIsGetAllUserSuccess: Action<IUserModel, boolean>;
    getAllUser: Thunk<IUserModel, any>;

    //addUser
    isAddUserSuccess: boolean;
    setIsAddUserSuccess: Action<IUserModel, boolean>;
    addUser: Thunk<IUserModel, any>;
}

export const userModel: IUserModel = persist({
    //MessageError
    messageErrorUser: "",
    setMessageErrorUser: action((state, payload) => {
        state.messageErrorUser = payload;
    }),

    //GetALLUser
    isGetAllUserSuccess: true,
    setIsGetAllUserSuccess: action((state, payload) => {
        state.isGetAllUserSuccess = payload;
    }),
    getAllUser: thunk(async (actions, payload) => {
        return getAllUser(payload)
            .then(async (res) => {
                actions.setIsGetAllUserSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetAllUserSuccess(false)
                actions.setMessageErrorUser(error?.response?.data?.message)
            });
    }),

    //addUser
    isAddUserSuccess: true,
    setIsAddUserSuccess: action((state, payload) => {
        state.isAddUserSuccess = payload;
    }),
    addUser: thunk(async (actions, payload) => {
        return addUser(payload)
            .then(async (res) => {
                actions.setIsGetAllUserSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsGetAllUserSuccess(false)
                actions.setMessageErrorUser(error?.response?.data?.message)
            });
    }),
})