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

export interface IMediaImage {
    url: string
    width: number
    height: number
    altText: string
    type: EMediaImageType
}
