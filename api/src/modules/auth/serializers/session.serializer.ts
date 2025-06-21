import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly prismaService: PrismaService) {
        super();
    }

    serializeUser(user: any, done: CallableFunction) {
        done(null, user.id);
    }

    async deserializeUser(id: string, done: CallableFunction) {
        const user = await this.prismaService.user.findUnique({
            where: { id },
            select: { id: true, email: true },
        });
        done(null, user);
    }
}
