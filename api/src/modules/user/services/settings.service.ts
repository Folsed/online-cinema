import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SettingsRepository } from '../repositories/settings.repository';
import { UserSettings } from '@prisma/client';
import { UpdateSettingsDto } from '../dtos/update-settings.dto';
import { reallyAnObject } from '../../../common/utils/reallyAnObject';

@Injectable()
export class SettingsService {
    constructor(private readonly settingsRepository: SettingsRepository) {}

    async findUserSettings(userId: string): Promise<UserSettings> {
        if (!(await this.settingsRepository.userIsExists(userId))) {
            throw new UnauthorizedException();
        }

        return await this.settingsRepository.takeSettings(userId);
    }

    async updateSettings(userId: string, dto: UpdateSettingsDto) {
        const currentSettings = await this.findUserSettings(userId);

        const merged = {
            ui: reallyAnObject(currentSettings.ui, dto.ui),
            watchlist: reallyAnObject(currentSettings.watchlist, dto.watchlist),
            videoPlayer: reallyAnObject(currentSettings.videoPlayer, dto.videoPlayer),
            notifications: reallyAnObject(currentSettings.notifications, dto.notifications),
            parentalControl: reallyAnObject(currentSettings.parentalControl, dto.parentalControl),
            privacy: reallyAnObject(currentSettings.privacy, dto.privacy),
            locale: reallyAnObject(currentSettings.locale, dto.locale),
            accessibility: reallyAnObject(currentSettings.accessibility, dto.accessibility),
        };

        return await this.settingsRepository.updateSettings(userId, merged);
    }
}
