import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { RequestWithUser } from '../../types/http.types';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { LanguageExistsPipe } from '../../common/pipes/language.pipe';

@UseGuards(AuthenticatedGuard)
@Controller('watchlist')
export class WatchlistController {
    constructor(private readonly watchlistService: WatchlistService) {}

    @Post()
    createWatchlistRecord(
        @Req() req: RequestWithUser,
        @Body() dto: CreateWatchlistDto,
        @Query('lang', LanguageExistsPipe) lang: string = 'uk',
    ) {
        return this.watchlistService.addToWatchlist(req.user.id, dto.mediaId, lang);
    }

    @Get()
    getWatchlist(
        @Req() req: RequestWithUser,
        @Query('lang', LanguageExistsPipe) lang: string = 'uk',
    ) {
        return this.watchlistService.findWatchlist(req.user.id, lang);
    }

    @Delete(':mediaId')
    deleteWatchlistRecord(
        @Req() req: RequestWithUser,
        @Param('mediaId') mediaId: string,
        @Query('lang', LanguageExistsPipe) lang: string = 'uk',
    ) {
        return this.watchlistService.deleteFromWatchlist(req.user.id, mediaId, lang);
    }
}
