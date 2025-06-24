import { PrismaClient } from '@prisma/client';

type TGenreSeed = {
    slug: string;
    translations: Record<string, string>;
};

const GENRES: TGenreSeed[] = [
    { slug: 'action', translations: { uk: 'Екшн', en: 'Action' } },
    { slug: 'drama', translations: { uk: 'Драма', en: 'Drama' } },
    { slug: 'thriller', translations: { uk: 'Трилер', en: 'Thriller' } },
    { slug: 'horror', translations: { uk: 'Жахи', en: 'Horror' } },
    { slug: 'sci-fi', translations: { uk: 'Наукова фантастика', en: 'Sci-Fi' } },
];

export async function seedGenres(prisma: PrismaClient) {
    for (const genre of GENRES) {
        await prisma.genre.upsert({
            where: { slug: genre.slug },
            update: {},
            create: {
                slug: genre.slug,
                GenresTranslations: {
                    create: Object.entries(genre.translations).map(([langCode, name]) => ({
                        langCode,
                        name,
                    })),
                },
            },
        });
    }

    console.log(`✅ Seeded ${GENRES.length} genres with translations`);
}
