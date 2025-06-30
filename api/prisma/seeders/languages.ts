import type { PrismaClient } from '@prisma/client';

const LANGUAGES = [
    { code: 'uk', name: 'Українська' },
    { code: 'en', name: 'English' },
];

export async function seedLanguages(prisma: PrismaClient) {
    for (const lang of LANGUAGES) {
        await prisma.language.upsert({
            where: { code: lang.code, name: lang.name },
            update: {},
            create: lang,
        });
    }

    console.log(`✅ Seeded ${LANGUAGES.length} languages`);
}
