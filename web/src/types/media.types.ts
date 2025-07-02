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

export enum EAllowedMediaSort {
    Popularity = 'popularity',
    NewlyAdded = 'newly_added',
    Rating = 'rating',
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
    thumbnail: IMediaImage
}

export interface IGenres extends IMediaGenre {
    imageUrl: string
}

export interface IBrowseMediaParams {
    n?: number
    offset?: number
    sort_by?: EAllowedMediaSort
    media_type?: EMediaType
    categories?: string
    ratings?: boolean
    lang?: string
}

export interface IMediaPoster
    extends Pick<
        IMediaDetails,
        | 'id'
        | 'type'
        | 'alias'
        | 'status'
        | 'metadata'
        | 'posterTitle'
        | 'synopsis'
        | 'genres'
        | 'poster'
    > {}
