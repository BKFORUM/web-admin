import BaseURL from "@utils/api/baseURL";

const getAllPost = (params: any) => {
    return BaseURL({
        url: `/posts`,
        method: "GET",
        params,
    });
};

const deletePost = (id: string) => {
    return BaseURL({
        url: `/posts/${id}`,
        method: "DELETE",
    });
};



export { getAllPost, deletePost }