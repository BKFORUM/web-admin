export interface IEvent {
    id?: string
    displayName: string
    location: string
    startAt: string
    endAt: string
    interested?: number
    status?: string
    description: string
    documents?: string[]
}