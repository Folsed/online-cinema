import { PrismaClient } from '@prisma/client';

type TGenreSeed = {
    slug: string;
    translations: Record<string, string>;
    image: string;
};

const GENRES: TGenreSeed[] = [
    {
        slug: 'action',
        translations: { uk: 'Екшн', en: 'Action' },
        image: 'storage/images/genre/action.jpeg',
    },
    {
        slug: 'adventure',
        translations: { uk: 'Пригоди', en: 'Adventure' },
        image: 'storage/images/genre/adventure.jpeg',
    },
    {
        slug: 'comedy',
        translations: { uk: 'Комедія', en: 'Comedy' },
        image: 'storage/images/genre/comedy.jpeg',
    },
    {
        slug: 'thriller',
        translations: { uk: 'Трилер', en: 'Thriller' },
        image: 'storage/images/genre/thriller.jpeg',
    },
    {
        slug: 'drama',
        translations: { uk: 'Драма', en: 'Drama' },
        image: 'storage/images/genre/drama.jpeg',
    },
    {
        slug: 'fantasy',
        translations: { uk: 'Фентезі', en: 'Fantasy' },
        image: 'storage/images/genre/fantasy.jpeg',
    },
    {
        slug: 'sci-fi',
        translations: { uk: 'Наукова фантастика', en: 'Science Fiction' },
        image: 'storage/images/genre/sci-fi.jpeg',
    },
    {
        slug: 'horror',
        translations: { uk: 'Жахи', en: 'Horror' },
        image: 'storage/images/genre/horror.jpeg',
    },
    {
        slug: 'romance',
        translations: { uk: 'Романтика', en: 'Romance' },
        image: 'storage/images/genre/romance.jpeg',
    },
    {
        slug: 'historical',
        translations: { uk: 'Історичний', en: 'Historical' },
        image: 'storage/images/genre/historical.jpeg',
    },
    {
        slug: 'musical',
        translations: { uk: 'Мюзикл', en: 'Musical' },
        image: 'storage/images/genre/musical.jpeg',
    },
    {
        slug: 'documentary',
        translations: { uk: 'Документальний', en: 'Documentary' },
        image: 'storage/images/genre/documentary.jpeg',
    },
    {
        slug: 'sports',
        translations: { uk: 'Спорт', en: 'Sports' },
        image: 'storage/images/genre/sports.jpeg',
    },
    {
        slug: 'slice-of-life',
        translations: { uk: 'Повсякденність', en: 'Slice of Life' },
        image: 'storage/images/genre/slice-of-life.jpeg',
    },
];

export async function seedGenres(prisma: PrismaClient) {
    for (const genre of GENRES) {
        await prisma.genre.upsert({
            where: { slug: genre.slug },
            update: {},
            create: {
                slug: genre.slug,
                imageUrl: genre.image,
                genresTranslations: {
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
