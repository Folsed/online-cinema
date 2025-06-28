import React from 'react'
import { IMediaPoster } from '@/types/media.types'
import Image from 'next/image'
import Link from 'next/link'
import styles from './poster.module.css'

const MediaPoster = ({ poster }: { poster: IMediaPoster }) => {
    return (
        <div className='relative max-w-[250px] min-w-[250px] p-3 pt-1 pr-4'>
            <Link href={`/details/${poster.alias}`} className={`${styles.posterCard} block`}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}${poster.poster.url}`}
                    alt={poster.poster.altText}
                    className='object-cover object-[50%_50%]'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    fill
                    priority
                />
                <figcaption className='sr-only'>
                    {poster.posterTitle} — {poster.poster.type}
                </figcaption>
            </Link>
        </div>
    )
}

export default MediaPoster
