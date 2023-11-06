import { IUserForum } from "./IUser";

export interface IPost {
    id: string;
    status: string;
    user: {
        id: string;
        fullName: string;
        avatarUrl: string;
    }
    forum: {
        name: string;
    }
    content: string;
    documents: {
        id: string
        fileName: string
        fileUrl: string
    }
}

export interface IPostForum {
    id: string,
    createAt: string,
    user: IUserForum,
    _count: {
        comments: number
        likes: number
    }
}