import React from 'react'
import { IMediaPoster } from '@/types/media.types'
import Image from 'next/image'
import Link from 'next/link'
import styles from './poster.module.css'

const MediaPoster = ({ poster }: { poster: IMediaPoster }) => {
    console.log(poster)
    return (
        <div className='relative max-w-[250px] min-w-[250px] p-3 pt-1 pr-4'>
            <Link href={`/details/${poster.alias}`} className={`${styles.posterCard} block`}>
                <figure>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}${poster.poster.url}`}
                        alt={poster.poster.altText}
                        className='object-cover object-[50%_50%]'
                        fill
                        priority
                    />
                    <figcaption className='sr-only'>
                        {poster.posterTitle} — {poster.poster.type}
                    </figcaption>
                </figure>
            </Link>
        </div>
    )
}

export default MediaPoster
