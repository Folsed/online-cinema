import { Module } from '@nestjs/common';
import { MediaService } from './services/media.service';
import { MediaController } from './controllers/media.controller';
import { LandingController } from './controllers/landing.controller';
import { LandingService } from './services/landing.service';
import { LandingRepository } from './repositories/landing.repository';
import { LanguagesRepository } from '../languages/languages.repository';
import { LanguageExistsPipe } from '../../common/pipes/language.pipe';

@Module({
    controllers: [MediaController, LandingController],
    providers: [
        MediaService,
        LandingService,
        LandingRepository,
        LanguagesRepository,
        LanguageExistsPipe,
    ],
})
export class MediaModule {}
