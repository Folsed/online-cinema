import type { PrismaClient } from '@prisma/client';

export async function seedMediaGenres(prisma: PrismaClient) {
    const genres = await prisma.genre.findMany({ select: { id: true } });
    const mediaItems = await prisma.media.findMany({ select: { id: true } });

    for (const { id: mediaId } of mediaItems) {
        const shuffled = genres.map((g) => g.id).sort(() => Math.random() - 0.5);
        const count = Math.floor(Math.random() * 3) + 1;
        const selectedGenreIds = shuffled.slice(0, count);

        for (const genreId of selectedGenreIds) {
            await prisma.genresOnMedia.upsert({
                where: { genreId_mediaId: { genreId, mediaId } },
                update: {},
                create: { mediaId, genreId },
            });
        }
    }

    console.log(`✅ Automatically seeded genres for ${mediaItems.length} media items`);
}
