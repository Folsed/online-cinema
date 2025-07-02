import {
    IsString,
    IsOptional,
    IsArray,
    ArrayUnique,
    IsInt,
    Min,
    Max,
    IsIn,
    IsBoolean,
    IsEnum,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { EAllowedMediaSort, TSortBy } from '../../../types/media.types';
import { MediaType } from '@prisma/client';

export class BrowseMediaDto {
    /** n media */
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    n?: number;

    /** Number of items */
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    offset?: number;

    /** Sort */
    @IsOptional()
    @IsEnum(EAllowedMediaSort)
    sort_by?: TSortBy;

    /** Media type */
    @IsOptional()
    @IsEnum(MediaType)
    @IsString()
    media_type: MediaType;

    /** Multi-genres via commas or array */
    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsString({ each: true })
    @Transform(({ value }) => {
        if (value === null || value === undefined || value === '') {
            return [];
        }
        if (Array.isArray(value)) {
            return value;
        }
        return value
            .split(',')
            .map((v: string) => v.trim())
            .filter((v: string) => v.length > 0);
    })
    categories?: string[];

    /** Flag: only with rating */
    @IsOptional()
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    ratings?: boolean;

    /** langCode */
    @IsOptional()
    @IsString()
    @IsIn(['en', 'uk'])
    lang?: string;
}
