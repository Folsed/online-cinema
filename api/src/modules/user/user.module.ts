import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { SettingsController } from './controllers/settings.controller';
import { SettingsService } from './services/settings.service';
import { SettingsRepository } from './repositories/settings.repository';

@Module({
    controllers: [UserController, SettingsController],
    providers: [UserService, SettingsService, SettingsRepository],
})
export class UserModule {}
