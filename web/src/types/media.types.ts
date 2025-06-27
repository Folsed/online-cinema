export enum EMediaType {
    Anime = 'anime',
    Series = 'series',
    Movie = 'movie',
}

export enum EMediaImageType {
    Logo = 'logo',
    Poster = 'poster',
    Backdrop = 'backdrop',
    Thumbnail = 'thumbnail',
}

export enum EMediaStatus {
    Upcoming = 'upcoming',
    Release = 'release',
    Cancelled = 'cancelled',
}

export interface IMediaImage {
    type: EMediaImageType
    url: string
    width: number
    height: number
    altText: string
}

export interface IMediaGenre {
    slug: string
    name: string
}

export interface IMediaDetails {
    id: string
    type: EMediaType
    originalTitle: string
    alias: string
    releaseDate: Date
    runtime: number
    status: EMediaStatus
    metadata: Record<string, any>
    active: boolean
    posterTitle: string
    synopsis: string
    genres: IMediaGenre[]
    logo: IMediaImage
    poster: IMediaImage
    backdrop: IMediaImage
}

export interface IGenres extends IMediaGenre {
    imageUrl: string
}
