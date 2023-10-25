import { IUser } from "@interfaces/IUser";
import BaseURL from "@utils/api/baseURL";

const getAllUser = (params: any) => {
    return BaseURL({
        url: `/users`,
        method: "GET",
        params,
    });
}

const addUser = (data: Omit<IUser, 'id'>) => {
    return BaseURL({
        url: `/users`,
        method: "POST",
        data,
    });
}

export { getAllUser, addUser }