import { IEvent } from "./IEvent"
import { IPostForum } from "./IPost"
import { ITopic } from "./ITopics"
import { IModerator, IUserForum } from "./IUser"

export interface IForumTab {
    id: string
    name: string
    moderator: IModerator
    topicIds: string[]
    type: string
    _count: {
        users: number
        posts: number
        events: number
    }
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
    moderator: IModerator
    topics: ITopic[]
    createAt: string
}

export interface IListUserRequest {
    id: string
    userIds: string[]
}

export interface IRequestForumData {
    id?: string
    status?: string
}

export interface IViewUserAddList {
    id: string
    fullName: string
    checked: boolean
    avatarUrl: string
    email: string
}

export interface IForumDetail {
    name: string
    moderator: IUserForum
    topics?: [{
        topic: ITopic
    }]
    posts: IPostForum[]
    users: [{
        user: IUserForum
    }]
    events: IEvent[]
}