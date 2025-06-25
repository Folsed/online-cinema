import { Module } from '@nestjs/common';
import { MediaService } from './services/media.service';
import { MediaController } from './controllers/media.controller';
import { LandingController } from './controllers/landing.controller';
import { LandingService } from './services/landing.service';
import { LandingRepository } from './repositories/landing.repository';
import { LanguagesRepository } from '../languages/languages.repository';
import { LanguageExistsPipe } from '../../common/pipes/language.pipe';
import { MediaRepository } from './repositories/media.repository';

@Module({
    controllers: [MediaController, LandingController],
    providers: [
        MediaService,
        LandingService,
        MediaRepository,
        LandingRepository,
        LanguageExistsPipe,
        LanguagesRepository,
    ],
})
export class MediaModule {}
