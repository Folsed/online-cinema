import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GenresService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(langCode = 'uk') {
        const genres = await this.prismaService.genre.findMany({
            select: {
                slug: true,
                imageUrl: true,
                genresTranslations: {
                    where: { langCode },
                    select: { name: true },
                },
            },
            orderBy: { slug: 'asc' },
        });

        return genres.map(({ slug, imageUrl, genresTranslations }) => ({
            slug,
            imageUrl,
            name: genresTranslations[0]?.name ?? slug,
        }));
    }
}
