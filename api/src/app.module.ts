import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as connectPgSimple from 'connect-pg-simple';
import { Pool } from 'pg';
import { isProd } from './common/utils/env.util';
import { parseMaxAgeToMsUtil } from './common/utils/parseMaxAgeToMs.util';
import * as passport from 'passport';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    constructor(private readonly configService: ConfigService) {}

    configure(consumer: MiddlewareConsumer) {
        const PgSession = connectPgSimple(session);

        const pgPool = new Pool({
            connectionString: this.configService.getOrThrow<string>('DATABASE_URL'),
            ssl:
                this.configService.getOrThrow<string>('NODE_ENV') === 'production'
                    ? { rejectUnauthorized: false }
                    : false,
        });

        consumer
            .apply(
                session({
                    name: '_sess.connected',
                    store: new PgSession({
                        pool: pgPool,
                        tableName: 'sessions',
                        createTableIfMissing: true,
                    }),
                    secret: this.configService.getOrThrow<string>('SESSION_SECRET'),
                    resave: false,
                    saveUninitialized: false,
                    cookie: {
                        httpOnly: true,
                        maxAge: parseMaxAgeToMsUtil(
                            this.configService.getOrThrow<string>('SESSION_MAX_AGE'),
                        ),
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
