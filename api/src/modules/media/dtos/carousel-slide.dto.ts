import { Expose, Transform, Type } from 'class-transformer';
import { MediaDto } from './media.dto';
import { MediaType } from '@prisma/client';

export class CarouselSlideDto {
    @Expose()
    id: string;

    @Expose({ name: 'slidePosition' })
    position: number;

    @Expose()
    active: boolean;

    @Expose({ name: 'desktopImageUrl' })
    desktop: string;

    @Expose({ name: 'mobileImageUrl' })
    mobile: string;

    @Expose()
    @Transform(({ obj }) => obj.media.alias)
    alias: string;

    @Expose()
    @Transform(({ obj }) => obj.media.type)
    type: MediaType;

    @Expose()
    @Transform(({ obj }) => obj.media.mediaTranslations[0].synopsis)
    synopsis: string;

    @Expose()
    @Transform(({ obj }) =>
        obj.media.genresOnMedia.map((gm: any) => ({
            slug: gm.genre.slug,
            name: gm.genre.genresTranslations[0].name,
        })),
    )
    genres: { slug: string; name: string }[];

    @Expose()
    @Transform(({ obj }) => obj.media.mediaImages?.[0] ?? null)
    @Type(() => MediaDto)
    logo: MediaDto | null;
}
