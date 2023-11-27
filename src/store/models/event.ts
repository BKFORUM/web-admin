import { IEvent } from "@interfaces/IEvent";
import { persist, action, Action, Thunk, thunk } from "easy-peasy";
import { addEvent, deleteEvent, editEvent, getAllEvent } from "../../services/event.service";

export interface IEventModel {
    //MessageError
    messageError: string;
    setMessageError: Action<IEventModel, string>;

    //GetAllEvent
    isGetAllEventSuccess: boolean;
    setIsGetAllEventSuccess: Action<IEventModel, boolean>;
    getAllEvent: Thunk<IEventModel, any>;

    //AddEvent
    isAddEventSuccess: boolean;
    setIsAddEventSuccess: Action<IEventModel, boolean>;
    addEvent: Thunk<IEventModel, Omit<IEvent, 'id'>>;

    //EditEvent
    isEditEventSuccess: boolean;
    setIsEditEventSuccess: Action<IEventModel, boolean>;
    editEvent: Thunk<IEventModel, IEvent>;

    //DeleteEvent
    isDeleteEventSuccess: boolean;
    setIsDeleteEventSuccess: Action<IEventModel, boolean>;
    deleteEvent: Thunk<IEventModel, string>;


}

export const eventModel: IEventModel = persist({
    //MessageError
    messageError: "",
    setMessageError: action((state, payload) => {
        state.messageError = payload;
    }),

    //GetAllEvent
    isGetAllEventSuccess: true,
    setIsGetAllEventSuccess: action((state, payload) => {
        state.isGetAllEventSuccess = payload;
    }),
    getAllEvent: thunk(async (actions, payload) => {
        return getAllEvent(payload)
            .then(async (res) => {
                actions.setIsGetAllEventSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetAllEventSuccess(false)
                actions.setMessageError(error?.response?.data?.message)
            });
    }),

    //AddEvent
    isAddEventSuccess: true,
    setIsAddEventSuccess: action((state, payload) => {
        state.isAddEventSuccess = payload;
    }),
    addEvent: thunk(async (actions, payload) => {
        return addEvent(payload)
            .then(async (res) => {
                actions.setIsAddEventSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsAddEventSuccess(false)
                actions.setMessageError(error?.response?.data?.message)
            });
    }),

    //EditEvent
    isEditEventSuccess: true,
    setIsEditEventSuccess: action((state, payload) => {
        state.isEditEventSuccess = payload;
    }),
    editEvent: thunk(async (actions, payload) => {
        return editEvent(payload)
            .then(async (res) => {
                actions.setIsEditEventSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsEditEventSuccess(false)
                actions.setMessageError(error?.response?.data?.message)
            });
    }),

    //DeleteEvent
    isDeleteEventSuccess: true,
    setIsDeleteEventSuccess: action((state, payload) => {
        state.isDeleteEventSuccess = payload;
    }),
    deleteEvent: thunk(async (actions, payload) => {
        return deleteEvent(payload)
            .then(async (res) => {
                actions.setIsDeleteEventSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsDeleteEventSuccess(false)
                actions.setMessageError(error?.response?.data?.message)
            });
    }),
})
