import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { RequestWithUser } from '../../../types/http.types';
import { SettingsService } from '../services/settings.service';
import { AuthenticatedGuard } from '../../../common/guards/authenticated.guard';
import { UserSettings } from '@prisma/client';
import { UpdateSettingsDto } from '../dtos/update-settings.dto';

@UseGuards(AuthenticatedGuard)
@Controller('user/settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Get()
    async getUserSettings(@Req() req: RequestWithUser): Promise<UserSettings> {
        return await this.settingsService.findUserSettings(req.user.id);
    }

    @Patch()
    async updateSettings(@Req() req: RequestWithUser, @Body() dto: UpdateSettingsDto) {
        return await this.settingsService.updateSettings(req.user.id, dto);
    }
}
