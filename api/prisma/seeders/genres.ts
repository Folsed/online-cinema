import { PrismaClient } from '@prisma/client';

type TGenreSeed = {
    slug: string;
    translations: Record<string, { name: string; description?: string }>;
};

const GENRES: TGenreSeed[] = [
    {
        slug: 'action',
        translations: {
            uk: { name: 'Екшн', description: 'Жанр із динамічними сценами та пригодами' },
            en: { name: 'Action', description: 'Genre with dynamic scenes and adventures' },
        },
    },
    {
        slug: 'drama',
        translations: {
            uk: { name: 'Драма', description: 'Сюжет, що заглиблюється в емоції персонажів' },
            en: { name: 'Drama', description: "Plot focusing on characters' emotions" },
        },
    },
];

export async function seedGenres(prisma: PrismaClient) {
    for (const genre of GENRES) {
        await prisma.genre.upsert({
            where: { slug: genre.slug },
            update: {},
            create: {
                slug: genre.slug,
                GenresTranslations: {
                    create: Object.entries(genre.translations).map(
                        ([langCode, { name, description }]) => ({
                            langCode,
                            name,
                            description,
                        }),
                    ),
                },
            },
        });
    }

    console.log(`✅ Seeded ${GENRES.length} genres with translations`);
}
