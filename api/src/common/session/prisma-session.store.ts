import { SessionData, Store } from 'express-session';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { parseMaxAgeToMsUtil } from '../utils/parseMaxAgeToMs.util';

interface PrismaSessionData {
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

    get(sid: string, callback: (err: any, session?: SessionData | null) => void): void {
        this.prismaService.session
            .findUnique({ where: { sid } })
            .then((rec) => {
                if (!rec || rec.expiresAt < new Date()) {
                    return callback(null, null);
                }
                const sessionData = rec.sess as unknown as SessionData;
                callback(null, sessionData);
            })
            .catch((err) => callback(err));
    }

    set(sid: string, session: SessionData, callback?: (err?: any) => void): void {
        const expiresAt = new Date(Date.now() + this.ttl);
        const jsonData = session as unknown as Prisma.InputJsonValue;
        this.prismaService.session
            .upsert({
                where: { sid },
                create: { sid, sess: jsonData, expiresAt },
                update: { sess: jsonData, expiresAt },
            })
            .then(() => callback && callback())
            .catch((err) => callback && callback(err));
    }

    destroy(sid: string, callback?: (err?: any) => void): void {
        if (callback) callback();
        this.prismaService.session.delete({ where: { sid } }).catch((err: any) => {
            if (err.code !== 'P2025') {
                console.error('Failed to delete session from DB:', err);
            }
        });
    }
}
