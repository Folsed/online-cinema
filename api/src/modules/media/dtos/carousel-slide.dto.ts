import { Expose, Transform, Type } from 'class-transformer';
import { MediaImageDto } from './media-image.dto';

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
    alias: string | null;

    @Expose()
    @Transform(({ obj }) => obj.media.MediaTranslations[0].synopsis)
    synopsis: string;

    @Expose()
    @Transform(({ obj }) =>
        obj.media.GenresOnMedia.map((gm: any) => ({
            slug: gm.genre.slug,
            name: gm.genre.GenresTranslations[0].name,
        })),
    )
    genres: { slug: string; name: string }[];

    @Expose()
    @Transform(({ obj }) => obj.media.MediaImages?.[0] ?? null)
    @Type(() => MediaImageDto)
    logo: MediaImageDto | null;
}
