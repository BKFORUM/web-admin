import { persist, action, Action, Thunk, thunk } from "easy-peasy";
import { addForum, addUserToForum, deleteForum, deleteUserFromForum, editForum, getAllForum, getAllTopic, getForumById, updateStatusForum } from "../../services/forum.service";
import { IFormDataForum, IForumDetail, IListUserRequest, IRequestForumData } from "@interfaces/IForum";

export interface IForumModel {
    //MessageError
    messageErrorForum: string;
    setMessageErrorForum: Action<IForumModel, string>;

    //GetALLForum
    isGetAllForumSuccess: boolean;
    setIsGetAllForumSuccess: Action<IForumModel, boolean>
    getAllForum: Thunk<IForumModel, any>;

    //GetForumById
    forumDetail: null | IForumDetail;
    setForumDetail: Action<IForumModel, null | IForumDetail>
    isGetForumByIdSuccess: boolean;
    setIsGetForumByIdSuccess: Action<IForumModel, boolean>
    getForumById: Thunk<IForumModel, any>;

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

    //DeleteUserFromForum
    isDeleteUserFromForumSuccess: boolean;
    setIsDeleteUserFromForumSuccess: Action<IForumModel, boolean>
    deleteUserFromForum: Thunk<IForumModel, any>;

    //DeleteUser
    isAddUserToForumSuccess: boolean;
    setIsAddUserToForumSuccess: Action<IForumModel, boolean>
    addUserToForum: Thunk<IForumModel, IListUserRequest>;

    //updateStatusForum
    isUpdateStatusForumSuccess: boolean;
    setIsUpdateStatusForum: Action<IForumModel, boolean>
    updateStatusForum: Thunk<IForumModel, IRequestForumData>;

    //GetALLTopic
    isGetAllTopicSuccess: boolean
    setIsGetAllTopicSuccess: Action<IForumModel, boolean>
    getAllTopic: Thunk<IForumModel, undefined>;

    // getAllEventForum: Thunk<IForumModel, any>

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

    //GetForumById
    forumDetail: null,
    setForumDetail: action((state, payload) => {
        state.forumDetail = payload;
    }),
    isGetForumByIdSuccess: true,
    setIsGetForumByIdSuccess: action((state, payload) => {
        state.isGetForumByIdSuccess = payload;
    }),
    getForumById: thunk(async (actions, payload) => {
        return getForumById(payload)
            .then(async (res) => {
                actions.setIsGetForumByIdSuccess(true)
                actions.setForumDetail(res.data)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetForumByIdSuccess(false)
                actions.setForumDetail(null)
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

    isUpdateStatusForumSuccess: true,
    setIsUpdateStatusForum: action((state, payload) => {
        state.isUpdateStatusForumSuccess = payload;
    }),

    updateStatusForum: thunk(async (actions, payload) => {
        return updateStatusForum(payload)
            .then(async (res) => {
                actions.setIsUpdateStatusForum(true)
                return res;
            })
            .catch((error) => {
                actions.setIsUpdateStatusForum(false)
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

    //DeleteUserFromForum
    isDeleteUserFromForumSuccess: true,
    setIsDeleteUserFromForumSuccess: action((state, payload) => {
        state.isDeleteUserFromForumSuccess = payload;
    }),

    deleteUserFromForum: thunk(async (actions, payload) => {
        return deleteUserFromForum(payload)
            .then(async (res) => {
                actions.setIsDeleteUserFromForumSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsDeleteUserFromForumSuccess(false)
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

    //getAllEventForum
    // getAllEventForum: thunk(async (actions, payload) => {
    //     return getAllEventForum(payload).then(async (res) => {
    //         return res.data;
    //     }).catch((error) => {
    //         actions.setMessageErrorForum(error?.response?.data?.message)
    //     });
    // })
})