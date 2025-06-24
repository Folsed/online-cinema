import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './modules/media/media.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        AuthModule,
        MediaModule,
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'storage'),
            serveRoot: '/storage',
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
