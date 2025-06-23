import { PrismaClient } from '@prisma/client';
import { seedLanguages } from './seeders/languages';
import { seedGenres } from './seeders/genres';

const prisma = new PrismaClient();

async function main() {
    await prisma.genreTranslations.deleteMany();
    await prisma.genre.deleteMany();
    await prisma.language.deleteMany();

    await seedLanguages(prisma);
    await seedGenres(prisma);

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
