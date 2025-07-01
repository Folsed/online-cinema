import { IsDate, IsObject, IsOptional, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class SettingsDto {
    @Expose()
    @IsString()
    userId!: string;

    @Expose()
    @IsObject()
    ui!: Record<string, any>;

    @Expose()
    @IsObject()
    watchlist!: Record<string, any>;

    @Expose()
    @IsObject()
    videoPlayer!: Record<string, any>;

    @Expose()
    @IsObject()
    notifications!: Record<string, any>;

    @Expose()
    @IsObject()
    parentalControl!: Record<string, any>;

    @Expose()
    @IsObject()
    privacy!: Record<string, any>;

    @Expose()
    @IsObject()
    locale!: Record<string, any>;

    @Expose()
    @IsObject()
    accessibility!: Record<string, any>;

    @Expose()
    @Type(() => Date)
    @IsDate()
    updatedAt!: Date;
}