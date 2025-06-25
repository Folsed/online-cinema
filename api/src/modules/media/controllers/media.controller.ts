import { Controller, Get, Param, Query } from '@nestjs/common';
import { MediaService } from '../services/media.service';
import { Media } from '@prisma/client';
import { LanguageExistsPipe } from '../../../common/pipes/language.pipe';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Get(':alias')
    async getMediaByAlias(
        @Param('alias') alias: string,
        @Query('lang', LanguageExistsPipe) lang: string = 'uk',
    ) {
        return this.mediaService.findMediaByAlias(alias, lang);
    }
}
