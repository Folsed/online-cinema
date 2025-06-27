import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import Image from 'next/image'
import { IGenres } from '@/types/media.types'
import Link from 'next/link'

const GenresCarousel = ({ genres }: { genres: IGenres[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    const debouncedScroll = useMemo(
        () =>
            debounce(
                (deltaY: number) => {
                    if (!scrollRef.current) return
                    console.log('hello')
                    scrollRef.current.scrollBy({
                        left: deltaY * 1.5,
                        behavior: 'smooth',
                    })
                },
                100,
                { leading: true, trailing: false }
            ),
        []
    )

    const handleWheel = useCallback(
        (e: React.WheelEvent) => {
            debouncedScroll(e.deltaY)
        },
        [debouncedScroll]
    )

    useEffect(() => {
        return () => {
            debouncedScroll.cancel()
        }
    }, [debouncedScroll])

    return (
        <div className='flex h-full w-full items-center'>
            <div
                ref={scrollRef}
                onWheel={handleWheel}
                className='no-scrollbar flex w-full gap-6 overflow-x-scroll p-6 py-24 transition-transform [&>*:nth-child(7n)]:translate-y-[-40px] [&>*:nth-child(7n+1)]:translate-y-[-70px] [&>*:nth-child(7n+2)]:translate-y-[-20px] [&>*:nth-child(7n+3)]:translate-y-[30px] [&>*:nth-child(7n+4)]:translate-y-[-10px] [&>*:nth-child(7n+5)]:translate-y-[-40px] [&>*:nth-child(7n+6)]:translate-y-[20px]'
            >
                {genres.map(genre => (
                    <Link
                        key={genre.slug}
                        href={'/browse/' + genre.slug}
                        className='relative h-[550px] w-48 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg transition duration-200 hover:scale-110'
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}${genre.imageUrl}`}
                            width={350}
                            height={550}
                            alt={genre.name}
                            className='object-cover'
                        />
                        <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
                            <span className='text-center font-semibold text-white'>
                                {genre.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default GenresCarousel
