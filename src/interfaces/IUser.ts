
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
    id: number
    fullName: string
    email: string
    phone_number: string
    dateOfBirth: string
}

export interface IUser {
    id?: number
    fullName: string
    email: string
    gender: string
    address?: string
    type: string
    facultyId: string
    phoneNumber: string
    dateOfBirth: string
}






