import { persist, action, Action, Thunk, thunk } from "easy-peasy";
import { deletePost, getAllPost } from "../../services/post.service";

export interface IPostModel {
    //MessageError
    messageErrorPost: string;
    setMessageErrorPost: Action<IPostModel, string>;

    //GetAllPost
    isGetAllPostSuccess: boolean;
    setIsGetAllPostSuccess: Action<IPostModel, boolean>;
    getAllPost: Thunk<IPostModel, any>;

    //DeletePost
    isDeletePostSuccess: boolean;
    setIsDeletePostSuccess: Action<IPostModel, boolean>;
    deletePost: Thunk<IPostModel, string>;
}

export const postModel: IPostModel = persist({
    //MessageError
    messageErrorPost: "",
    setMessageErrorPost: action((state, payload) => {
        state.messageErrorPost = payload;
    }),

    //GetAllFaculty
    isGetAllPostSuccess: true,
    setIsGetAllPostSuccess: action((state, payload) => {
        state.isGetAllPostSuccess = payload;
    }),
    getAllPost: thunk(async (actions, payload,) => {
        return getAllPost(payload)
            .then(async (res) => {
                actions.setIsGetAllPostSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetAllPostSuccess(false)
                actions.setMessageErrorPost(error?.response?.data?.message)
            });
    }),

    //DeletePost
    isDeletePostSuccess: true,
    setIsDeletePostSuccess: action((state, payload) => {
        state.isDeletePostSuccess = payload;
    }),
    deletePost: thunk(async (actions, payload,) => {
        return deletePost(payload)
            .then(async (res) => {
                actions.setIsDeletePostSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsDeletePostSuccess(false)
                actions.setMessageErrorPost(error?.response?.data?.message)
            });
    }),
})