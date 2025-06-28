import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './modules/media/media.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LanguagesModule } from './modules/languages/languages.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'storage'),
            serveRoot: '/storage',
        }),
        PrismaModule,
        AuthModule,
        MediaModule,
        LanguagesModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
