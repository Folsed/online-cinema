import { Module } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistController } from './watchlist.controller';
import { MediaRepository } from '../media/repositories/media.repository';
import { LanguageExistsPipe } from '../../common/pipes/language.pipe';
import { LanguagesRepository } from '../languages/languages.repository';

@Module({
    controllers: [WatchlistController],
    providers: [WatchlistService, MediaRepository, LanguageExistsPipe, LanguagesRepository],
})
export class WatchlistModule {}
