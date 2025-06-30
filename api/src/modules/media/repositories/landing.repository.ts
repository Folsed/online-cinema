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
                        GenresOnMedia: {
                            select: {
                                genre: {
                                    select: {
                                        slug: true,
                                        GenresTranslations: {
                                            where: { langCode },
                                            select: { name: true },
                                        },
                                    },
                                },
                            },
                        },
                        MediaTranslations: {
                            where: { langCode },
                            select: { synopsis: true },
                        },
                        MediaImages: {
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
