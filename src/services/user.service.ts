import { IUser } from "@interfaces/IUser";
import BaseURL from "@utils/api/baseURL";

const getAllUser = (params: any) => {
    return BaseURL({
        url: `/users`,
        method: "GET",
        params,
    });
}

const getUserById = (id: string) => {
    return BaseURL({
        url: `/users/` + id,
        method: "GET",
    });
}

const addUser = (data: Omit<IUser, 'id'>) => {
    return BaseURL({
        url: `/users`,
        method: "POST",
        data,
    });
}

const editUser = (data: IUser) => {
    return BaseURL({
        url: `/users/` + data.id,
        method: "PUT",
        data,
    });
}

const getAllForumByUser = (id: string) => {
    return BaseURL({
        url: `/users/${id}/forums`,
        method: "GET",
    });
}

export { getAllUser, addUser, getUserById, editUser, getAllForumByUser }