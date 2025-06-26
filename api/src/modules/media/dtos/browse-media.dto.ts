import {
    IsString,
    IsOptional,
    IsArray,
    ArrayNotEmpty,
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

    /** Multi-genres via commas or array */
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsString({ each: true })
    @Transform(({ value }) =>
        Array.isArray(value) ? value : value.split(',').filter((v: string) => v),
    )
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
