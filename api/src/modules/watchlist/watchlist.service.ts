import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MediaRepository } from '../media/repositories/media.repository';
import { plainToInstance } from 'class-transformer';
import { WatchlistDto } from './dto/watchlist.dto';
import { TWatchlist } from '../../types/watchlist.types';

@Injectable()
export class WatchlistService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly mediaRepository: MediaRepository,
    ) {}

    async addToWatchlist(userId: string, dto: CreateWatchlistDto) {
        const mediaIsExists = await this.prismaService.media.findUnique({
            where: { id: dto.mediaId },
        });

        if (!mediaIsExists) {
            throw new NotFoundException(`Media with id=${dto.mediaId} not found`);
        }

        const isExists = await this.prismaService.watchlist.findFirst({
            where: {
                userId: userId,
                mediaId: dto.mediaId,
            },
        });
        if (isExists) {
            throw new ConflictException('This media is already in your watchlist');
        }

        try {
            return await this.prismaService.watchlist.create({
                data: {
                    userId: userId,
                    mediaId: dto.mediaId,
                },
                include: {
                    media: true,
                },
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findWatchlist(userId: string, lang: string) {
        const records: TWatchlist[] = await this.prismaService.watchlist.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                media: {
                    include: this.mediaRepository.mediaResponseConfiguration(lang),
                },
            },
        });

        const media = records.map((record) => ({
            ...record.media,
            addedAt: record.createdAt,
        }));

        return plainToInstance(WatchlistDto, media, {
            excludeExtraneousValues: true,
        });
    }

    async deleteFromWatchlist(userId: string, mediaId: string) {
        const isExists = await this.prismaService.watchlist.findFirst({
            where: { userId, mediaId },
        });
        if (!isExists) {
            throw new NotFoundException('Media not found in your watchlist');
        }
        await this.prismaService.watchlist.delete({ where: { id: isExists.id } });
        return { success: true };
    }
}
