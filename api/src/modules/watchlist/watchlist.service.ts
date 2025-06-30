import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { WatchlistDto } from './dto/watchlist.dto';
import { WatchlistRepository } from './watchlist.repository';

@Injectable()
export class WatchlistService {
    constructor(private readonly watchlistRepository: WatchlistRepository) {}

    async addToWatchlist(userId: string, mediaId: string, lang: string) {
        if (!(await this.watchlistRepository.ensureMediaExists(mediaId))) {
            throw new NotFoundException(`Media with id=${mediaId} not found`);
        }

        if (await this.watchlistRepository.matchIsExists(userId, mediaId)) {
            throw new ConflictException('This media is already in your watchlist');
        }

        try {
            const rawRecords = await this.watchlistRepository.createAndFetchAll(
                userId,
                mediaId,
                lang,
            );

            const records = rawRecords.map((record) => ({
                ...record.media,
                addedAt: record.createdAt,
            }));

            return plainToInstance(WatchlistDto, records, {
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findWatchlist(userId: string, lang: string) {
        const rawRecords = await this.watchlistRepository.fetchAll(userId, lang);

        const records = rawRecords.map((record) => ({
            ...record.media,
            addedAt: record.createdAt,
        }));

        return plainToInstance(WatchlistDto, records, {
            excludeExtraneousValues: true,
        });
    }

    async deleteFromWatchlist(userId: string, mediaId: string, lang: string) {
        try {
            const rawRecords = await this.watchlistRepository.deleteAndFetchAll(
                userId,
                mediaId,
                lang,
            );

            const records = rawRecords.map((record) => ({
                ...record.media,
                addedAt: record.createdAt,
            }));

            return plainToInstance(WatchlistDto, records, {
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
