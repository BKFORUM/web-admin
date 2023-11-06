import {
    createStore,
    createTypedHooks,
    StateMapper,
    ActionMapper,
} from "easy-peasy";

import { authModel as auth, IAuthModel } from "./models/auth";
import { notifyModel as notify, INotifyModel } from "./models/notify";
import { forumModel as forum, IForumModel } from "./models/forum";
import { userModel as user, IUserModel } from "./models/user";
import { facultyModel as faculty, IFacultyModel } from "./models/faculty";
import { postModel as post, IPostModel } from "./models/post";


export interface IStoreModel {
    auth: IAuthModel;
    notify: INotifyModel
    forum: IForumModel;
    user: IUserModel
    faculty: IFacultyModel
    post: IPostModel
}

const storeModel: IStoreModel = {
    auth,
    notify,
    forum,
    user,
    faculty,
    post
}

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
    createTypedHooks<IStoreModel>();

interface IStateMapper extends StateMapper<IStoreModel> { }
interface IActionMapper extends ActionMapper<IStoreModel, keyof IStoreModel> { }

// Auth
export const authStateSelector = (state: IStateMapper) => state.auth;
export const authActionSelector = (state: IActionMapper) => state.auth;

// Notify
export const notifyStateSelector = (state: IStateMapper) => state.notify;
export const notifyActionSelector = (state: IActionMapper) => state.notify;

// Forum
export const forumStateSelector = (state: IStateMapper) => state.forum;
export const forumActionSelector = (state: IActionMapper) => state.forum;

//User
export const userStateSelector = (state: IStateMapper) => state.user;
export const userActionSelector = (state: IActionMapper) => state.user;

//Faculty
export const facultyStateSelector = (state: IStateMapper) => state.faculty;
export const facultyActionSelector = (state: IActionMapper) => state.faculty;

//Post
export const postStateSelector = (state: IStateMapper) => state.post;
export const postActionSelector = (state: IActionMapper) => state.post;

const store = createStore(storeModel, {
    name: "store",
    // middleware,
});

export default store;