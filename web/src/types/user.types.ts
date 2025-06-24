export interface IUserData {
    redirect?: boolean
    token: string
    user: {
        id: string
        email: string
        name: string
        emailVerified: boolean
        createdAt: Date
        updatedAt: Date
    }
}
