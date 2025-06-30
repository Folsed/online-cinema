import { Expose, Transform, Type } from 'class-transformer';
import { MediaImageType, MediaType } from '@prisma/client';
import { PickType } from '@nestjs/mapped-types';

export class MediaImageDto {
    @Expose()
    url: string;

    @Expose()
    width: number;

    @Expose()
    height: number;

    @Expose()
    altText: string;

    @Expose()
    metadata?: object;

    @Expose()
    type: MediaImageType;
}

export class MediaDto {
    @Expose()
    id!: string;

    @Expose()
    type!: MediaType;

    @Expose()
    originalTitle!: string;

    @Expose()
    alias!: string;

    @Expose()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    releaseDate!: Date;

    @Expose()
    runtime!: number;

    @Expose()
    status!: string;

    @Expose()
    metadata?: Record<string, any>;

    @Expose()
    active!: boolean;

    @Expose()
    @Transform(({ obj }) => obj.MediaTranslations[0]?.posterTitle ?? obj.originalTitle)
    posterTitle!: string;

    @Expose()
    @Transform(({ obj }) => obj.MediaTranslations[0]?.synopsis ?? null)
    synopsis!: string;

    @Expose()
    @Transform(({ obj }) =>
        obj.GenresOnMedia.map((gm: any) => ({
            slug: gm.genre.slug,
            name: gm.genre.GenresTranslations[0]?.name ?? gm.genre.slug,
        })),
    )
    genres!: { slug: string; name: string }[];

    @Expose()
    @Transform(({ obj }) => {
        return obj.MediaImages.find((img: MediaImageDto) => img.type === MediaImageType.logo);
    })
    logo!: MediaImageDto;

    @Expose()
    @Transform(({ obj }) => {
        return obj.MediaImages.find((img: MediaImageDto) => img.type === MediaImageType.poster);
    })
    poster!: MediaImageDto;

    @Expose()
    @Transform(({ obj }) => {
        return obj.MediaImages.find((img: MediaImageDto) => img.type === MediaImageType.backdrop);
    })
    backdrop!: MediaImageDto;

    @Expose()
    @Transform(({ obj }) => {
        return obj.MediaImages.find((img: MediaImageDto) => img.type === MediaImageType.thumbnail);
    })
    thumbnail!: MediaImageDto;
}

export class MediaPosterDto extends PickType(MediaDto, [
    'type',
    'alias',
    'status',
    'metadata',
    'posterTitle',
    'synopsis',
    'genres',
    'poster',
] as const) {}
