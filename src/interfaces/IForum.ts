import { IModerator } from "./IUser"

export interface IForumTab {
    id: string
    name: string
    moderator: IModerator
    total_members: number
    event: number
}

export interface IFormDataForum {
    id?: string
    name: string
    moderatorId: string
    type: string
    topicIds: string[]
}

export interface IRequestForum {
    id: string
    name: string
    moderator: string
    topics: string[]
    createAt: string
}

export interface IListUserRequest {
    id: string
    userIds: string[]
}

export interface IViewUserAddList {
    id: string
    fullName: string
    checked: boolean
    avatarUrl: string
    email: string
}