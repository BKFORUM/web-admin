import { persist, action, Action, Thunk, thunk } from "easy-peasy";
import { addForum, addUserToForum, getAllForum, getAllTopic } from "../../services/forum.service";
import { IListUserRequest } from "@interfaces/IForum";

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
    addForum: Thunk<IForumModel, any>;

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