import { Controller, Get, Query } from '@nestjs/common';
import { LandingService } from '../services/landing.service';

@Controller('landing')
export class LandingController {
    constructor(private readonly landingService: LandingService) {}

    @Get('hero')
    async hero(@Query('lang') lang: string = 'uk') {
        return this.landingService.findHomepageCarouselSlides(lang);
    }
}
