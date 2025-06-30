import { Injectable, NotFoundException } from '@nestjs/common';
import { MediaImageType } from '@prisma/client';
import { MediaRepository } from '../media/repositories/media.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WatchlistRepository {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly mediaRepo: MediaRepository,
    ) {}

    async ensureMediaExists(mediaId: string) {
        const media = await this.prismaService.media.findUnique({ where: { id: mediaId } });
        if (!media) throw new NotFoundException(`Media with id=${mediaId} not found`);
        return media;
    }

    async matchIsExists(userId: string, mediaId: string) {
        return !!(await this.prismaService.watchlist.findFirst({
            where: { userId, mediaId },
        }));
    }

    async createAndFetchAll(userId: string, mediaId: string, lang: string) {
        const [, records] = await this.prismaService.$transaction([
            this.prismaService.watchlist.create({ data: { userId, mediaId } }),
            this.prismaService.watchlist.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                include: {
                    media: { include: this.mediaRepo.mediaResponseConfiguration(lang) },
                },
            }),
        ]);
        return records;
    }

    async deleteAndFetchAll(userId: string, mediaId: string, lang: string) {
        const match = await this.prismaService.watchlist.findFirst({
            where: { userId, mediaId },
        });
        if (!match) throw new NotFoundException('Media is not in watchlist');

        const [, records] = await this.prismaService.$transaction([
            this.prismaService.watchlist.delete({ where: { id: match.id } }),
            this.prismaService.watchlist.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                include: {
                    media: { include: this.mediaRepo.mediaResponseConfiguration(lang) },
                },
            }),
        ]);
        return records;
    }

    async fetchAll(userId: string, lang: string) {
        return this.prismaService.watchlist.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                media: { include: this.mediaRepo.mediaResponseConfiguration(lang) },
            },
        });
    }
}
