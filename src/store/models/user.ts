import { persist, action, Action, Thunk, thunk } from "easy-peasy";
import { addUser, editUser, getAllForumByUser, getAllUser, getUserById, importFileUser, resetPassword } from "../../services/user.service";
import { IUser } from "@interfaces/IUser";

export interface IUserModel {
    //MessageError
    messageErrorUser: string;
    setMessageErrorUser: Action<IUserModel, string>;

    //GetALLUser
    isGetAllUserSuccess: boolean;
    setIsGetAllUserSuccess: Action<IUserModel, boolean>;
    getAllUser: Thunk<IUserModel, any>;

    //GetUserById
    isGetUserByIdSuccess: boolean;
    setIsGetUserByIdSuccess: Action<IUserModel, boolean>;
    getUserById: Thunk<IUserModel, string>;

    //addUser
    isAddUserSuccess: boolean;
    setIsAddUserSuccess: Action<IUserModel, boolean>;
    addUser: Thunk<IUserModel, Omit<IUser, any>>;

    //editUser
    isEditUserSuccess: boolean;
    setIsEditUserSuccess: Action<IUserModel, boolean>;
    editEdit: Thunk<IUserModel, IUser>;

    //GetAllForumByUser
    isGetAllForumByUserSuccess: boolean;
    setIsGetAllForumByUserSuccess: Action<IUserModel, boolean>;
    getAllForumByUser: Thunk<IUserModel, string>;

    //resetPassword
    resetPassword: Thunk<IUserModel, string>;

    //importFileUser
    isImportFileUserSuccess: boolean;
    setIsImportFileUserSuccess: Action<IUserModel, boolean>;
    importFileUser: Thunk<IUserModel, any>;

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

    //getUserById
    isGetUserByIdSuccess: true,
    setIsGetUserByIdSuccess: action((state, payload) => {
        state.isGetUserByIdSuccess = payload;
    }),
    getUserById: thunk(async (actions, payload) => {
        return getUserById(payload)
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

    //editUser
    isEditUserSuccess: true,
    setIsEditUserSuccess: action((state, payload) => {
        state.isEditUserSuccess = payload;
    }),
    editEdit: thunk(async (actions, payload) => {
        return editUser(payload)
            .then(async (res) => {
                actions.setIsEditUserSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsEditUserSuccess(false)
                actions.setMessageErrorUser(error?.response?.data?.message)
            });
    }),

    //GetALLForumByUser
    isGetAllForumByUserSuccess: true,
    setIsGetAllForumByUserSuccess: action((state, payload) => {
        state.isGetAllForumByUserSuccess = payload;
    }),
    getAllForumByUser: thunk(async (actions, payload) => {
        return getAllForumByUser(payload)
            .then(async (res) => {
                actions.setIsGetAllUserSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetAllUserSuccess(false)
                actions.setMessageErrorUser(error?.response?.data?.message)
            });
    }),

    resetPassword: thunk(async (actions, payload) => {
        return resetPassword(payload)
            .then(async (res) => {
                return res;
            })
            .catch((error) => {
                actions.setMessageErrorUser(error?.response?.data?.message)
            });
    }),

    //
    isImportFileUserSuccess: true,
    setIsImportFileUserSuccess: action((state, payload) => {
        state.isImportFileUserSuccess = payload;
    }),

    importFileUser: thunk(async (actions, payload) => {
        return importFileUser(payload)
            .then(async (res) => {
                actions.setIsImportFileUserSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsImportFileUserSuccess(false)
                actions.setMessageErrorUser(error?.response?.data?.message)
            });
    }),

})