import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LanguagesRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async exists(code: string): Promise<boolean> {
        const count = await this.prismaService.language.count({
            where: { code },
        });
        return count > 0;
    }
}
