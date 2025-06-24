import { PrismaClient } from '@prisma/client';
import { seedLanguages } from './seeders/languages';
import { seedGenres } from './seeders/genres';
import { seedMedia } from './seeders/media';
import { seedMediaGenres } from './seeders/media-genres';

const prisma = new PrismaClient();

async function main() {
    // Pivot
    await prisma.genresOnMedia.deleteMany();

    // Clearing child tables in the correct order
    await prisma.mediaImages.deleteMany();
    await prisma.genreTranslations.deleteMany();
    await prisma.mediaTranslations.deleteMany();

    // Clear the main tables
    await prisma.media.deleteMany();
    await prisma.genre.deleteMany();
    await prisma.language.deleteMany();

    // Run seeds
    await seedLanguages(prisma);
    await seedGenres(prisma);
    await seedMedia(prisma);
    await seedMediaGenres(prisma);

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
