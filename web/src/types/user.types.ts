import { IMediaImage, IMediaPoster } from '@/types/media.types'

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

export interface IWatchlist extends Omit<IMediaPoster, 'poster'> {
    addedAt: string
    thumbnail: IMediaImage
}
