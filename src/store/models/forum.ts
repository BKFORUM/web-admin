import { persist, action, Action, Thunk, thunk } from "easy-peasy";
import { addForum, addUserToForum, deleteForum, editForum, getAllForum, getAllTopic } from "../../services/forum.service";
import { IFormDataForum, IListUserRequest } from "@interfaces/IForum";

export interface IForumModel {
    //MessageError
    messageErrorForum: string;
    setMessageErrorForum: Action<IForumModel, string>;

    //GetALLForum
    isGetAllForumSuccess: boolean;
    setIsGetAllForumSuccess: Action<IForumModel, boolean>
    getAllForum: Thunk<IForumModel, any>;

    //AddForum
    isAddForumSuccess: boolean;
    setIsAddForumSuccess: Action<IForumModel, boolean>
    addForum: Thunk<IForumModel, IFormDataForum>;

    //EditForum
    isEditForumSuccess: boolean;
    setIsEditForumSuccess: Action<IForumModel, boolean>
    editForum: Thunk<IForumModel, IFormDataForum>;

    //DeleteForum
    isDeleteForumSuccess: boolean;
    setIsDeleteForumSuccess: Action<IForumModel, boolean>
    deleteForum: Thunk<IForumModel, string>;

    //AddUserToForum
    isAddUserToForumSuccess: boolean;
    setIsAddUserToForumSuccess: Action<IForumModel, boolean>
    addUserToForum: Thunk<IForumModel, IListUserRequest>;

    //GetALLTopic
    isGetAllTopicSuccess: boolean
    setIsGetAllTopicSuccess: Action<IForumModel, boolean>
    getAllTopic: Thunk<IForumModel, undefined>;

}

export const forumModel: IForumModel = persist({
    //MessageError
    messageErrorForum: "",
    setMessageErrorForum: action((state, payload) => {
        state.messageErrorForum = payload;
    }),

    //GetALLForum
    isGetAllForumSuccess: true,
    setIsGetAllForumSuccess: action((state, payload) => {
        state.isGetAllForumSuccess = payload;
    }),
    getAllForum: thunk(async (actions, payload) => {
        return getAllForum(payload)
            .then(async (res) => {
                actions.setIsGetAllForumSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetAllForumSuccess(false)
                actions.setMessageErrorForum(error?.response?.data?.message)
            });
    }),

    //AddForum
    isAddForumSuccess: true,
    setIsAddForumSuccess: action((state, payload) => {
        state.isAddForumSuccess = payload;
    }),
    addForum: thunk(async (actions, payload) => {
        return addForum(payload)
            .then(async (res) => {
                actions.setIsAddForumSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsAddForumSuccess(false)
                actions.setMessageErrorForum(error?.response?.data?.message)
            });
    }),

    //EditForum
    isEditForumSuccess: true,
    setIsEditForumSuccess: action((state, payload) => {
        state.isEditForumSuccess = payload;
    }),

    editForum: thunk(async (actions, payload) => {
        return editForum(payload)
            .then(async (res) => {
                actions.setIsEditForumSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsEditForumSuccess(false)
                actions.setMessageErrorForum(error?.response?.data?.message)
            });
    }),

    //DeleteForum
    isDeleteForumSuccess: true,
    setIsDeleteForumSuccess: action((state, payload) => {
        state.isDeleteForumSuccess = payload;
    }),

    deleteForum: thunk(async (actions, payload) => {
        return deleteForum(payload)
            .then(async (res) => {
                actions.setIsEditForumSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsEditForumSuccess(false)
                actions.setMessageErrorForum(error?.response?.data?.message)
            });
    }),

    //AddUserToForum
    isAddUserToForumSuccess: true,
    setIsAddUserToForumSuccess: action((state, payload) => {
        state.isAddUserToForumSuccess = payload;
    }),
    addUserToForum: thunk(async (actions, payload) => {
        return addUserToForum(payload)
            .then(async (res) => {
                actions.setIsAddUserToForumSuccess(true)
                return res
            })
            .catch((error) => {
                actions.setIsAddUserToForumSuccess(false)
                actions.setMessageErrorForum(error?.response?.data?.message)
            });
    }),

    //GetALLTopic
    isGetAllTopicSuccess: true,
    setIsGetAllTopicSuccess: action((state, payload) => {
        state.isGetAllTopicSuccess = payload;
    }),
    getAllTopic: thunk(async (actions) => {
        return getAllTopic()
            .then(async (res) => {
                actions.setIsGetAllTopicSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetAllTopicSuccess(false)
                actions.setMessageErrorForum(error?.response?.data?.message)
            });
    }),
})