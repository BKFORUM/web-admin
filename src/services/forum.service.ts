import { IFormDataForum, IListUserRequest } from "@interfaces/IForum";
import BaseURL from "@utils/api/baseURL";

const getAllForum = (params: any) => {
    return BaseURL({
        url: `/forums`,
        method: "GET",
        params,
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
        // data: { ...data, status: "PENDING" },
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

export { getAllForum, addForum, addUserToForum, getAllTopic, editForum, deleteForum }