import { ITopic } from "./ITopics";

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IModerator {
    id: string
    fullName: string,
    gender: string,
    dateOfBirth: string
    avatarUrl: string,
    faculty: {
        id: string,
        name: string
    }
}
export interface IUserForum {
    id: string
    fullName: string
    email: string
    phoneNumber: string
    address: string
    dateOfBirth: string
    gender: string
    avatarUrl: string
}

export interface IUserForumResponse {
    id: string
    name: string
    createdAt: string
    status: string
    avatarUrl?: string
    type: string
    moderator: IUser
    topics: [
        topic: ITopic
    ]
    _count: {
        users: number
    }
}

export interface IUser {
    id?: string
    fullName: string
    email: string
    gender: string
    address?: string
    type: string
    facultyId: string
    phoneNumber: string
    dateOfBirth: string
}

export interface IUserDetail extends IUser {
    faculty?: {
        name: string
    }
    avatarUrl?: string
}






