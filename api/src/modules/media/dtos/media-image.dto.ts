import { Expose, Transform } from 'class-transformer';
import { MediaImageType } from '@prisma/client';

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
    type: string;
}

export class MediaDto {
    @Expose()
    id!: string;

    @Expose()
    type!: string;

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
        const logo = obj.MediaImages.find((img: any) => img.type === MediaImageType.logo);
        return logo
            ? { url: logo.url, width: logo.width, height: logo.height, altText: logo.altText }
            : null;
    })
    logo?: { url: string; width: number; height: number; altText: string };

    @Expose()
    @Transform(({ obj }) =>
        obj.MediaImages.filter((img: any) => img.type === MediaImageType.poster).map(
            (img: any) => ({
                url: img.url,
                width: img.width,
                height: img.height,
                altText: img.altText,
            }),
        ),
    )
    poster!: { url: string; width: number; height: number; altText: string }[];
}
