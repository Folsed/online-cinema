import { IsString } from 'class-validator';

export class CreateWatchlistDto {
    @IsString()
    mediaId: string;
}
