import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BrowseMediaDto } from '../dtos/browse-media.dto';
import { EAllowedMediaSort } from '../../../types/media.types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MediaRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async takeMediaByAlias(alias: string, langCode: string = 'uk') {
        return this.prismaService.media.findUnique({
            where: { alias },
            include: this.mediaResponseConfiguration(langCode),
        });
    }

    async browseMedia(dto: BrowseMediaDto) {
        const {
            n,
            offset,
            sort_by = EAllowedMediaSort.NewlyAdded,
            media_type,
            categories,
            ratings,
            lang,
        } = dto;

        const where: Prisma.MediaWhereInput = {};

        if (categories?.length) {
            where.genresOnMedia = {
                some: {
                    genre: {
                        slug: { in: categories },
                    },
                },
            };
        }

        if (media_type) {
            where.type = media_type;
        }

        if (lang) {
            where.mediaTranslations = {
                some: {
                    langCode: lang,
                },
            };
        }

        return this.prismaService.media.findMany({
            where,
            skip: offset,
            take: n,
            include: this.mediaResponseConfiguration(dto.lang),
        });
    }

    mediaResponseConfiguration(lang: string = 'uk'): Prisma.MediaInclude {
        return {
            mediaTranslations: {
                where: { langCode: lang },
            },
            genresOnMedia: {
                include: {
                    genre: {
                        include: {
                            genresTranslations: {
                                where: { langCode: lang },
                                select: { name: true },
                            },
                        },
                    },
                },
            },
            mediaImages: {
                select: {
                    type: true,
                    url: true,
                    width: true,
                    height: true,
                    altText: true,
                    metadata: true,
                },
            },
        };
    }
}
