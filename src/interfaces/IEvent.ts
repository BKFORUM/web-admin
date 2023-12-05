import { IDocuments } from "./IPost"

export interface IEvent {
    id?: string
    displayName: string
    location: string
    startAt: string
    endAt: string
    _count?: {
        comment: number,
        users: number,
    }
    status?: string
    content: string
    documents?: IDocuments[]
}