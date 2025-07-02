import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserSettings } from '@prisma/client';
import { UpdateSettingsDto } from '../dtos/update-settings.dto';

@Injectable()
export class SettingsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async userIsExists(userId: string) {
        return !!(await this.prismaService.user.findFirst({
            where: { id: userId },
        }));
    }

    async takeSettings(userId: string): Promise<UserSettings> {
        const settings = await this.prismaService.userSettings.findUnique({
            where: { userId },
        });

        if (!settings) {
            throw new NotFoundException(`Settings for user ${userId} not found`);
        }
        return settings;
    }

    async updateSettings(userId: string, dto: UpdateSettingsDto): Promise<UserSettings> {
        return this.prismaService.userSettings.update({
            where: { userId },
            data: dto,
        });
    }
}
