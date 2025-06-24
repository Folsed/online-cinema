import { EMediaType, IMediaImage } from '@/types/media.types'

export interface IHeroSlide {
    id: string
    position: number
    active: boolean
    desktop: string
    type: EMediaType
    mobile: string
    alias: string
    synopsis: string
    genres: {
        name: string
        slug: string
    }[]
    logo: IMediaImage
}
