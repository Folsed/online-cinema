import { Injectable } from '@nestjs/common';
import { MediaRepository } from '../repositories/media.repository';
import { Media } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { MediaDto } from '../dtos/media-image.dto';

@Injectable()
export class MediaService {
    constructor(private readonly mediaRepository: MediaRepository) {}

    async findMediaByAlias(alias: string, langCode: string) {
        const media = this.mediaRepository.takeMediaByAlias(alias, langCode);

        return plainToInstance(MediaDto, media, {
            excludeExtraneousValues: true,
        });
    }
}
