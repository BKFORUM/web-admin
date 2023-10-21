import BaseURL from "@utils/api/baseURL";

const getAllUser = (params: any) => {
    return BaseURL({
        url: `/users`,
        method: "GET",
        params,
    });
}

export { getAllUser }