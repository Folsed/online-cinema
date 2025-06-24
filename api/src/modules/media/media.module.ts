import { Module } from '@nestjs/common';
import { MediaService } from './services/media.service';
import { MediaController } from './controllers/media.controller';
import { LandingController } from './controllers/landing.controller';
import { LandingService } from './services/landing.service';
import { LandingRepository } from './repositories/landing.repository';

@Module({
    controllers: [MediaController, LandingController],
    providers: [MediaService, LandingService, LandingRepository],
})
export class MediaModule {}
