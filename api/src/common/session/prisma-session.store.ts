import { SessionData, Store } from 'express-session';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { parseMaxAgeToMsUtil } from '../utils/parseMaxAgeToMs.util';

interface ISessionData {
    cookie: Record<string, any>;

    [key: string]: any;
}

@Injectable()
export class PrismaSessionStore extends Store implements OnModuleInit {
    private readonly ttl: number;

    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
    ) {
        super();
        this.ttl = parseMaxAgeToMsUtil(this.configService.getOrThrow<string>('SESSION_MAX_AGE'));
    }

    async onModuleInit() {}

    async get(sid: string, callback: (error: any, session?: SessionData | null) => void) {
        try {
            const rec = await this.prismaService.session.findUnique({ where: { sid } });
            if (!rec || rec.expiresAt < new Date()) {
                return callback(null, null);
            }
            const sessionData = rec.sess as unknown as SessionData;
            return callback(null, sessionData);
        } catch (error) {
            return callback(error);
        }
    }

    async set(sid: string, session: SessionData, callback?: (err?: any) => void) {
        const expiresAt = new Date(Date.now() + this.ttl);
        try {
            const jsonData = session as unknown as Prisma.InputJsonValue;

            await this.prismaService.session.upsert({
                where: { sid },
                create: { sid, sess: jsonData, expiresAt },
                update: { sess: jsonData, expiresAt },
            });
            callback && callback();
        } catch (err) {
            callback && callback(err);
        }
    }

    async destroy(sid: string, callback?: (err?: any) => void) {
        try {
            await this.prismaService.session.delete({ where: { sid } });
            callback && callback();
        } catch (err) {
            callback && callback(err);
        }
    }
}
