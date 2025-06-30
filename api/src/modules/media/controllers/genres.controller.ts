import { Controller, Get, Query } from '@nestjs/common';
import { GenresService } from '../services/genres.service';
import { LanguageExistsPipe } from '../../../common/pipes/language.pipe';

@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @Get()
    async getAll(@Query('lang', LanguageExistsPipe) lang: string = 'uk') {
        return this.genresService.findAll(lang);
    }
}
