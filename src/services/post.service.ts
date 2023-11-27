import { IParams } from "@interfaces/IParameter";
import BaseURL from "@utils/api/baseURL";
import BaseURLUpLoadFile from "@utils/api/baseURLUpLoadFile";

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

const getAllCommentPost = ({ id, params }: IParams) => {
    return BaseURL({
        url: `/posts/${id}/comments`,
        method: "GET",
        params,
    });
}

const getPostById = (id: string) => {
    return BaseURL({
        url: `/posts/${id}`,
        method: "GET",
    });
}

const postImage = (data: any) => {
    return BaseURLUpLoadFile({
        url: `/images`,
        method: "POST",
        data,
    });
}



export { getAllPost, deletePost, getAllCommentPost, getPostById, postImage }