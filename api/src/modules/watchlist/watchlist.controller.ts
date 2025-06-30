import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
    Query,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { RequestWithUser } from '../../types/http.types';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { LanguageExistsPipe } from '../../common/pipes/language.pipe';

@UseGuards(AuthenticatedGuard)
@Controller('watchlist')
export class WatchlistController {
    constructor(private readonly watchlistService: WatchlistService) {}

    @Post()
    create(@Req() req: RequestWithUser, @Body() dto: CreateWatchlistDto) {
        return this.watchlistService.addToWatchlist(req.user.id, dto);
    }

    @Get()
    getWatchlist(
        @Req() req: RequestWithUser,
        @Query('lang', LanguageExistsPipe) lang: string = 'uk',
    ) {
        return this.watchlistService.findWatchlist(req.user.id, lang);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.watchlistService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateWatchlistDto: UpdateWatchlistDto) {
        return this.watchlistService.update(+id, updateWatchlistDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.watchlistService.remove(+id);
    }
}
