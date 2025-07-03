import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MediaImageType } from '@prisma/client';

@Injectable()
export class LandingRepository {
    constructor(private prismaService: PrismaService) {}

    async takeAllSlides(langCode: string = 'uk') {
        return this.prismaService.homepageCarousel.findMany({
            orderBy: { slidePosition: 'asc' },
            include: {
                media: {
                    select: {
                        type: true,
                        alias: true,
                        genresOnMedia: {
                            select: {
                                genre: {
                                    select: {
                                        slug: true,
                                        genresTranslations: {
                                            where: { langCode },
                                            select: { name: true },
                                        },
                                    },
                                },
                            },
                        },
                        mediaTranslations: {
                            where: { langCode },
                            select: { synopsis: true },
                        },
                        mediaImages: {
                            where: { type: MediaImageType.logo },
                            select: {
                                url: true,
                                width: true,
                                height: true,
                                altText: true,
                                type: true,
                            },
                            take: 1,
                        },
                    },
                },
            },
        });
    }
}
