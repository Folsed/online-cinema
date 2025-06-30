import { PrismaClient } from '@prisma/client';
import { seedLanguages } from './seeders/languages';
import { seedGenres } from './seeders/genres';
import { seedMedia } from './seeders/media';
import { seedMediaGenres } from './seeders/media-genres';
import { seedHomepageCarousel } from './seeders/homepage-carousel';

const prisma = new PrismaClient();

async function main() {
    // Pivot
    await prisma.genresOnMedia.deleteMany();
    await prisma.watchlist.deleteMany();

    // Clearing child tables in the correct order
    await prisma.mediaImages.deleteMany();
    await prisma.genreTranslations.deleteMany();
    await prisma.mediaTranslations.deleteMany();
    await prisma.homepageCarousel.deleteMany();

    // Clear the main tables
    await prisma.media.deleteMany();
    await prisma.genre.deleteMany();
    await prisma.language.deleteMany();

    // Run seeds
    await seedLanguages(prisma);
    await seedGenres(prisma);
    await seedMedia(prisma);
    await seedMediaGenres(prisma);
    await seedHomepageCarousel(prisma);

    console.log('🌱 Database seeding completed');
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
