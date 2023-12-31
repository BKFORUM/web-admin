import { IUserDetail, IUserForum } from "./IUser";

export interface IPost {
    id: string;
    status: string;
    updateAt: string;
    createdAt: string;
    likedAt: Date | null
    user: {
        id: string;
        fullName: string;
        avatarUrl: string;
    }
    forum: {
        name: string
        fileUrl: string
        modId: string
        avatarUrl: string
    }
    content: string;
    documents: IDocuments[]
    _count: {
        likes: number,
        comments: number
    },
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

export interface IComment {
    id: string
    content: string
    postId: string
    createdAt: string
    updateAt: string
    userId: string
    user: IUserDetail
    _count?: {
        replyComments: number
    }
}

export interface IDocuments {
    id: string;
    createAt: string;
    fileName: string;
    fileUrl: string;
    postId: string;
    updateAt: string;
    userId: string;
}

export interface pageMode {
    page: number,
    pageSize: number
}

export interface IEditChild {
    id: string
    item: IComment
}

export interface IDataChild {
    id: string
    data: IComment[]
}

export interface IChildLoading {
    id: string
    isLoading: boolean
}

export interface ICountReply {
    id: string
    _count: number
}