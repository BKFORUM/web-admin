import { IParams } from './../interfaces/IParameter';
import { IFormDataForum, IListUserRequest, IRequestForumData } from "@interfaces/IForum";
import BaseURL from "@utils/api/baseURL";

const getAllForum = (params: any) => {
    return BaseURL({
        url: `/forums`,
        method: "GET",
        params,
    });
}

const getForumById = (id: string) => {
    return BaseURL({
        url: `/forums/` + id,
        method: "GET",
    });
}

const updateStatusForum = (data: IRequestForumData) => {
    return BaseURL({
        url: `/forums/` + data.id,
        method: "PUT",
        data,
    });
}

const getAllTopic = () => {
    return BaseURL({
        url: `/topics`,
        method: "GET",
    });
}

const addForum = (data: Omit<IFormDataForum, 'id'>) => {
    return BaseURL({
        url: `/forums`,
        method: "POST",
        data,
    });
}

const editForum = (data: IFormDataForum) => {
    return BaseURL({
        url: `/forums/` + data.id,
        method: "PUT",
        data,
    });
}

const deleteForum = (id: string) => {
    return BaseURL({
        url: `/forums/` + id,
        method: "DELETE",
    });
}

const addUserToForum = (data: IListUserRequest) => {
    return BaseURL({
        url: `/forums/${data.id}/users`,
        method: "POST",
        data: data.userIds,
    });
}

const deleteUserFromForum = (data: any) => {
    return BaseURL({
        url: `/forums/${data.id}/requests`,
        method: "PATCH",
        data,
    });
}

const getAllEventForum = (params: any) => {
    return BaseURL({
        url: `/events/`,
        method: "GET",
        params,
    });
}

export { getAllForum, addForum, addUserToForum, getAllTopic, editForum, deleteForum, getForumById, updateStatusForum, deleteUserFromForum, getAllEventForum }