import React from 'react'
import { IMediaPoster } from '@/types/media.types'
import Image from 'next/image'
import Link from 'next/link'
import styles from './poster.module.css'

const MediaPoster = ({ poster }: { poster: IMediaPoster }) => {
    return (
        <div className='relative m-0 max-w-[250px] min-w-[250px] flex-[0_1_16.66%] p-4'>
            <Link href='/' className={`${styles.posterCard} block`}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}${poster.poster.url}`}
                    alt={poster.poster.altText}
                    className='object-cover object-[50%_50%]'
                    fill
                    priority
                />
            </Link>
        </div>
    )
}

export default MediaPoster
