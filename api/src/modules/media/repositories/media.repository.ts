import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BrowseMediaDto } from '../dtos/browse-media.dto';
import { EAllowedMediaSort } from '../../../types/media.types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MediaRepository {
    constructor(private prismaService: PrismaService) {}

    async takeMediaByAlias(alias: string, langCode: string = 'uk') {
        return this.prismaService.media.findUnique({
            where: { alias },
            include: this.mediaResponseConfiguration(langCode),
        });
    }

    async browseMedia(dto: BrowseMediaDto) {
        const {
            n = 20,
            offset = 0,
            sort_by = EAllowedMediaSort.NewlyAdded,
            categories,
            ratings,
            lang,
        } = dto;

        const where: Prisma.MediaWhereInput = {};

        if (categories?.length) {
            where.GenresOnMedia = {
                some: {
                    genre: {
                        slug: { in: categories },
                    },
                },
            };
        }

        if (lang) {
            where.MediaTranslations = {
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

    private mediaResponseConfiguration(lang: string = 'uk'): Prisma.MediaInclude {
        return {
            MediaTranslations: {
                where: { langCode: lang },
            },
            GenresOnMedia: {
                include: {
                    genre: {
                        include: {
                            GenresTranslations: {
                                where: { langCode: lang },
                                select: { name: true },
                            },
                        },
                    },
                },
            },
            MediaImages: {
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
