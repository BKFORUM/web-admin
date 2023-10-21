import { IListUserRequest } from "@interfaces/IForum";
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

const addForum = (data: any) => {
    return BaseURL({
        url: `/forums`,
        method: "POST",
        data,
    });
}

const addUserToForum = (data: IListUserRequest) => {
    return BaseURL({
        url: `/forums/${data.id}/users`,
        method: "POST",
        data: data.userIds,
    });
}

export { getAllForum, addForum, addUserToForum, getAllTopic }