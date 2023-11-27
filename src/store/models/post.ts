import { persist, action, Action, Thunk, thunk } from "easy-peasy";
import { deletePost, getAllCommentPost, getAllPost, getPostById, postImage } from "../../services/post.service";
import { IParams } from "@interfaces/IParameter";

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

    //getAllCommentPost
    isGetAllCommentPostSuccess: boolean;
    setIsGetAllCommentPostSuccess: Action<IPostModel, boolean>;
    getAllCommentPost: Thunk<IPostModel, IParams>;

    //getPostById
    isGetPostByIdSuccess: boolean;
    setIsGetPostByIdSuccess: Action<IPostModel, boolean>;
    getPostById: Thunk<IPostModel, string>;

    //PostImage
    isPostImageSuccess: boolean;
    setIsPostImageSuccess: Action<IPostModel, boolean>;
    postImage: Thunk<IPostModel, any>;
}

export const postModel: IPostModel = persist({
    //MessageError
    messageErrorPost: "",
    setMessageErrorPost: action((state, payload) => {
        state.messageErrorPost = payload;
    }),

    //GetAllPost
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

    //GetAllCommentPost
    isGetAllCommentPostSuccess: true,
    setIsGetAllCommentPostSuccess: action((state, payload) => {
        state.isGetAllCommentPostSuccess = payload;
    }),
    getAllCommentPost: thunk(async (actions, payload,) => {
        return getAllCommentPost(payload)
            .then(async (res) => {
                actions.setIsGetAllCommentPostSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetAllCommentPostSuccess(false)
                actions.setMessageErrorPost(error?.response?.data?.message)
            });
    }),

    //GetPostById
    isGetPostByIdSuccess: true,
    setIsGetPostByIdSuccess: action((state, payload) => {
        state.isGetPostByIdSuccess = payload;
    }),
    getPostById: thunk(async (actions, payload,) => {
        return getPostById(payload)
            .then(async (res) => {
                actions.setIsGetPostByIdSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetPostByIdSuccess(false)
                actions.setMessageErrorPost(error?.response?.data?.message)
            });
    }),

    //PostImage
    isPostImageSuccess: true,
    setIsPostImageSuccess: action((state, payload) => {
        state.isPostImageSuccess = payload;
    }),
    postImage: thunk(async (actions, payload) => {
        return postImage(payload)
            .then(async (res) => {
                actions.setIsPostImageSuccess(true)
                return res.data;
            })
            .catch((error) => {
                console.log(error)
                actions.setIsPostImageSuccess(false)
                actions.setMessageErrorPost(error?.response?.data?.message)
            });
    }),

})