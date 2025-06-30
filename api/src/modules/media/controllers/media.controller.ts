import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { MediaService } from '../services/media.service';
import { LanguageExistsPipe } from '../../../common/pipes/language.pipe';
import { BrowseMediaDto } from '../dtos/browse-media.dto';
import { MediaDto, MediaPosterDto } from '../dtos/media.dto';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Get('browse')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async getBrowsedMedia(@Query() dto: BrowseMediaDto): Promise<MediaPosterDto> {
        return this.mediaService.findBrowsedMedia(dto);
    }

    @Get(':alias')
    async getMediaByAlias(
        @Param('alias') alias: string,
        @Query('lang', LanguageExistsPipe) lang: string = 'uk',
    ): Promise<MediaDto> {
        return this.mediaService.findMediaByAlias(alias, lang);
    }
}
