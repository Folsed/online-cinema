import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './modules/media/media.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, MediaModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
