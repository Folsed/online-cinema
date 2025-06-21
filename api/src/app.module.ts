import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import { isProd } from './common/utils/env.util';
import { parseMaxAgeToMsUtil } from './common/utils/parseMaxAgeToMs.util';
import * as passport from 'passport';
import { PrismaSessionStore } from './common/session/prisma-session.store';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule],
    controllers: [],
    providers: [PrismaSessionStore],
})
export class AppModule implements NestModule {
    constructor(
        private readonly configService: ConfigService,
        private readonly prismaSessionStore: PrismaSessionStore,
    ) {}

    configure(consumer: MiddlewareConsumer) {
        const ttl = parseMaxAgeToMsUtil(this.configService.getOrThrow<string>('SESSION_MAX_AGE'));

        consumer
            .apply(
                session({
                    name: '_sess.connected',
                    store: this.prismaSessionStore,
                    secret: this.configService.getOrThrow<string>('SESSION_SECRET'),
                    resave: false,
                    saveUninitialized: false,
                    cookie: {
                        httpOnly: true,
                        maxAge: ttl,
                        sameSite: 'lax',
                        secure: isProd(this.configService),
                    },
                }),
                passport.initialize(),
                passport.session(),
            )
            .forRoutes({ path: '/*path', method: RequestMethod.ALL });
    }
}
