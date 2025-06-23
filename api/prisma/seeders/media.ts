import MEDIA_DATA from './data/media.json';
import type { MediaType, MediaStatus, PrismaClient } from '@prisma/client';

interface IMediaSeed {
    type: MediaType;
    originalTitle: string;
    alias: string;
    releaseDate: Date;
    runtime: number;
    status: MediaStatus;
    metadata?: object;
    active: boolean;
    translations: Record<string, { posterTitle: string; synopsis: string }>;
}

export async function seedMedia(prisma: PrismaClient) {
    const mediaData = MEDIA_DATA as unknown as IMediaSeed[];

    for (const m of mediaData) {
        await prisma.media.create({
            data: {
                type: m.type,
                originalTitle: m.originalTitle,
                alias: m.alias,
                releaseDate: m.releaseDate,
                runtime: m.runtime,
                status: m.status,
                metadata: m.metadata,
                active: m.active,
                MediaTranslations: {
                    create: Object.entries(m.translations).map(
                        ([langCode, { posterTitle, synopsis }]) => ({
                            langCode,
                            posterTitle,
                            synopsis,
                        }),
                    ),
                },
            },
        });
    }

    console.log(`✅ Seeded ${mediaData.length} media items with translations`);
}
