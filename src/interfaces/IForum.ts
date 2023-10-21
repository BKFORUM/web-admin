export interface IForumTab {
    id: string
    name: string
    moderator: string
    total_members: number
    event: number
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