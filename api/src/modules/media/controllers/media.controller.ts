import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { MediaService } from '../services/media.service';
import { LanguageExistsPipe } from '../../../common/pipes/language.pipe';
import { BrowseMediaDto } from '../dtos/browse-media.dto';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Get('browse')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async getBrowsedMedia(@Query() dto: BrowseMediaDto) {
        return this.mediaService.findBrowsedMedia(dto);
    }

    @Get(':alias')
    async getMediaByAlias(
        @Param('alias') alias: string,
        @Query('lang', LanguageExistsPipe) lang: string = 'uk',
    ) {
        return this.mediaService.findMediaByAlias(alias, lang);
    }
}
