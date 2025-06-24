import MEDIA_DATA from './data/media.json';
import type { MediaType, MediaStatus, PrismaClient, MediaImageType } from '@prisma/client';

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
    images: Record<MediaImageType, { url: string; width: number; height: number; altText: string }>;
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
                MediaImages: {
                    create: Object.entries(m.images || {}).map(
                        ([type, { url, width, height, altText }]) => ({
                            type: type as MediaImageType,
                            url,
                            width,
                            height,
                            altText,
                        }),
                    ),
                },
            },
        });
    }

    console.log(`✅ Seeded ${mediaData.length} media items with translations and images`);
}
