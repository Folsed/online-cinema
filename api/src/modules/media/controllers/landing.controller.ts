import { Controller, Get, Query } from '@nestjs/common';
import { LandingService } from '../services/landing.service';
import { LanguageExistsPipe } from '../../../common/pipes/language.pipe';

@Controller('landing')
export class LandingController {
    constructor(private readonly landingService: LandingService) {}

    @Get('hero')
    async hero(@Query('lang', LanguageExistsPipe) lang: string = 'uk') {
        return this.landingService.findHomepageCarouselSlides(lang);
    }
}
