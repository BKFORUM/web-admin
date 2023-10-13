import {
    createStore,
    createTypedHooks,
    StateMapper,
    ActionMapper,
} from "easy-peasy";

import { authModel as auth, IAuthModel } from "./models/auth";
import { notifyModel as notify, INotifyModel } from "./models/notify";

export interface IStoreModel {
    auth: IAuthModel;
    notify: INotifyModel
}

const storeModel: IStoreModel = {
    auth,
    notify
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

const store = createStore(storeModel, {
    name: "store",
    // middleware,
});

export default store;