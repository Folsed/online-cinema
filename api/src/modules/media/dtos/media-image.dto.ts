import { Expose } from 'class-transformer';

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
