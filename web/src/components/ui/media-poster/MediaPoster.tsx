'use client'
import React, { RefObject, useEffect, useRef } from 'react'
import { IMediaPoster } from '@/types/media.types'
import Image from 'next/image'
import Link from 'next/link'
import styles from './poster.module.css'

interface IMediaPosterProps {
    poster: IMediaPoster
    trackRef?: RefObject<HTMLDivElement>
}

const MediaPoster: React.FC<IMediaPosterProps> = ({ poster, trackRef }) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const cardRefCurrent = cardRef.current
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    cardRefCurrent?.removeAttribute('inert')
                    cardRefCurrent?.setAttribute('aria-hidden', 'false')
                } else {
                    cardRefCurrent?.setAttribute('inert', '')
                    cardRefCurrent?.setAttribute('aria-hidden', 'true')
                }
            },
            {
                root: trackRef?.current,
                threshold: 0.5,
            }
        )

        if (cardRefCurrent && trackRef) {
            observer.observe(cardRefCurrent)
        }

        return () => {
            if (cardRefCurrent) {
                observer.unobserve(cardRefCurrent)
            }
        }
    }, [trackRef])

    return (
        <div className={`relative h-full w-full aria-hidden:opacity-50`} ref={cardRef}>
            <Link href={`/details/${poster.alias}`} className={`${styles.posterCard} block`}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}${poster.poster.url}`}
                    alt={poster.poster.altText}
                    className='object-cover'
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
