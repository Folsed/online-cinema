import { IsOptional, IsObject, IsNotEmptyObject } from 'class-validator';

export class UpdateSettingsDto {
    @IsOptional()
    @IsNotEmptyObject()
    @IsObject()
    ui?: Record<string, any>;

    @IsOptional()
    @IsNotEmptyObject()
    @IsObject()
    watchlist?: Record<string, any>;

    @IsOptional()
    @IsNotEmptyObject()
    @IsObject()
    videoPlayer?: Record<string, any>;

    @IsOptional()
    @IsNotEmptyObject()
    @IsObject()
    notifications?: Record<string, any>;

    @IsOptional()
    @IsNotEmptyObject()
    @IsObject()
    parentalControl?: Record<string, any>;

    @IsOptional()
    @IsNotEmptyObject()
    @IsObject()
    privacy?: Record<string, any>;

    @IsOptional()
    @IsNotEmptyObject()
    @IsObject()
    locale?: Record<string, any>;

    @IsOptional()
    @IsNotEmptyObject()
    @IsObject()
    accessibility?: Record<string, any>;
}
