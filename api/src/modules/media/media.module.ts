import { Module } from '@nestjs/common';
import { MediaService } from './services/media.service';
import { MediaController } from './controllers/media.controller';
import { LandingController } from './controllers/landing.controller';
import { LandingService } from './services/landing.service';
import { LandingRepository } from './repositories/landing.repository';
import { LanguagesRepository } from '../languages/languages.repository';
import { LanguageExistsPipe } from '../../common/pipes/language.pipe';
import { MediaRepository } from './repositories/media.repository';
import { GenresController } from './controllers/genres.controller';
import { GenresService } from './services/genres.service';

@Module({
    controllers: [MediaController, LandingController, GenresController],
    providers: [
        MediaService,
        LandingService,
        GenresService,
        MediaRepository,
        LandingRepository,
        LanguageExistsPipe,
        LanguagesRepository,
    ],
})
export class MediaModule {}
