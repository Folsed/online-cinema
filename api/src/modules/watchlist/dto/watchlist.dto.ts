import { PickType } from '@nestjs/mapped-types';
import { MediaDto } from '../../media/dtos/media.dto';
import { Expose } from 'class-transformer';

export class WatchlistDto extends PickType(MediaDto, [
    'id',
    'type',
    'alias',
    'status',
    'metadata',
    'posterTitle',
    'synopsis',
    'genres',
    'thumbnail',
] as const) {
    @Expose() addedAt: Date;
}
