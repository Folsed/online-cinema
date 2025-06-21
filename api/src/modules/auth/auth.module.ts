import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './serializers/session.serializer';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Module({
    imports: [PassportModule.register({ session: true })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, SessionSerializer, LocalAuthGuard],
})
export class AuthModule {}
