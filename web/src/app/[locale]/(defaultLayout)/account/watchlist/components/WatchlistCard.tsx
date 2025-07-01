import React from 'react'
import { IWatchlist } from '@/types/user.types'
import Image from 'next/image'
import styles from '@/components/ui/media-poster/poster.module.css'
import Link from 'next/link'

const WatchlistCard = ({ media }: { media: IWatchlist }) => {
    return (
        <div className='w-fit'>
            <div className='p-2 pt-1 flex items-center justify-center'>
                <Link
                    href={`/details/${media.alias}`}
                    className='relative block aspect-[5/3] max-w-[300px] sm:max-w-[400px] '
                >
                    <figure
                        className={`${styles.posterCard} h-full w-full`}
                        style={{ paddingTop: 0 }}
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}${media.thumbnail.url}`}
                            priority
                            className='h-full w-full object-cover'
                            width={media.thumbnail.width}
                            height={media.thumbnail.height}
                            alt={media.thumbnail.altText}
                        />
                        <figcaption className='sr-only'>
                            {media.posterTitle} — {media.thumbnail.type}
                        </figcaption>
                    </figure>
                </Link>
            </div>
        </div>
    )
}

export default WatchlistCard
