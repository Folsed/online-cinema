import type { PrismaClient } from '@prisma/client';
import SLIDES from './data/hero-carousel.json';

interface IHomepageCarouselSeed {
    mediaId: string;
    slidePosition: number;
    active: boolean;
    desktopImageUrl: string;
    mobileImageUrl: string;
}

export async function seedHomepageCarousel(prisma: PrismaClient) {
    const heroData = SLIDES as unknown as IHomepageCarouselSeed[];

    const allMedia = await prisma.media.findMany({ select: { id: true } });
    const mediaIds = allMedia.map((m) => m.id);

    if (mediaIds.length < heroData.length) {
        throw new Error(
            `Not enough media for ${heroData.length} slides; only ${mediaIds.length} available.`,
        );
    }

    const shuffled = mediaIds.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, heroData.length);

    for (const [index, slide] of heroData.entries()) {
        await prisma.homepageCarousel.create({
            data: {
                mediaId: selected[index],
                slidePosition: slide.slidePosition,
                active: slide.active,
                desktopImageUrl: slide.desktopImageUrl,
                mobileImageUrl: slide.mobileImageUrl,
            },
        });
    }

    console.log(`✅ Seeded ${heroData.length} slides for hero carousel`);
}
