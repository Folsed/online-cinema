import { Media } from '@prisma/client';

export type TWatchlist = {
    id: string;
    userId: string;
    mediaId: string;
    createdAt: Date;
    media: Media;
};
