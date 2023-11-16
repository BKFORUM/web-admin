export interface IEvent {
    id?: string
    name: string
    location: string
    startTime: string
    endTime: string
    interested?: number
    status?: string
    description: string
    documents?: string[]
}