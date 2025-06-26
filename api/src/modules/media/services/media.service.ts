import { Injectable } from '@nestjs/common';
import { MediaRepository } from '../repositories/media.repository';
import { plainToInstance } from 'class-transformer';
import { MediaDto, MediaPosterDto } from '../dtos/media.dto';
import { BrowseMediaDto } from '../dtos/browse-media.dto';

@Injectable()
export class MediaService {
    constructor(private readonly mediaRepository: MediaRepository) {}

    async findMediaByAlias(alias: string, langCode: string) {
        const media = this.mediaRepository.takeMediaByAlias(alias, langCode);

        return plainToInstance(MediaDto, media, {
            excludeExtraneousValues: true,
        });
    }

    async findBrowsedMedia(dto: BrowseMediaDto) {
        const media = this.mediaRepository.browseMedia(dto);

        return plainToInstance(MediaPosterDto, media, {
            excludeExtraneousValues: true,
        });
    }
}
