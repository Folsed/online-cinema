import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MediaRepository {
    constructor(private prismaService: PrismaService) {}

    async takeMediaByAlias(alias: string, langCode: string = 'uk') {
        return this.prismaService.media.findUnique({
            where: { alias },
            include: {
                MediaTranslations: {
                    where: {
                        langCode: langCode,
                    },
                },
                GenresOnMedia: {
                    select: {
                        genre: {
                            select: {
                                slug: true,
                                GenresTranslations: {
                                    where: { langCode },
                                    select: {
                                        name: true,
                                    },
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
            },
        });
    }
}
