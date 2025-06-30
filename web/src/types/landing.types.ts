import { EMediaType, IMediaGenre, IMediaImage } from '@/types/media.types'

export interface IHeroSlide {
    id: string
    position: number
    active: boolean
    desktop: string
    type: EMediaType
    mobile: string
    alias: string
    synopsis: string
    genres: IMediaGenre[]
    logo: IMediaImage
}
