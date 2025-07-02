'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { EMediaType, IBrowseMediaParams, IMediaPoster } from '@/types/media.types'
import { useLazyGetBrowseMediaQuery } from '@/store/features/media/mediaApiSlice'
import MediaPoster from '@/components/ui/media-poster/MediaPoster'
import { Loader2 } from 'lucide-react'

interface IMediaListProps {
    initialData: IMediaPoster[]
    mediaType: EMediaType
    amountByQuery: number
}

const MediaList: React.FC<IMediaListProps> = ({ initialData, mediaType, amountByQuery }) => {
    const [items, setItems] = useState<IMediaPoster[]>(initialData)
    const [trigger, { isFetching }] = useLazyGetBrowseMediaQuery()
    const [hasMore, setHasMore] = useState<boolean>(true)
    const loaderRef = useRef<HTMLDivElement>(null)

    const loadMore = useCallback(async () => {
        if (!hasMore || isFetching) return

        const offset = items.length
        const params: IBrowseMediaParams = {
            media_type: mediaType,
            offset: offset,
            n: amountByQuery,
        }

        const result = await trigger(params).unwrap()

        if (result.length < amountByQuery) {
            setHasMore(false)
        }

        setItems(prevState => [...prevState, ...result])
    }, [items.length, trigger, mediaType])

    useEffect(() => {
        const element = loaderRef.current
        if (!element) return
        const observer = new IntersectionObserver(
            async entries => {
                if (entries[0].isIntersecting && !isFetching) await loadMore()
            },
            {
                rootMargin: '200px',
            }
        )
        observer.observe(element)
        return () => observer.disconnect()
    }, [loadMore])

    return (
        <>
            {items.map(poster => (
                <MediaPoster key={poster.alias} poster={poster} />
            ))}

            <div ref={loaderRef} className='h-1' />

            {isFetching && (
                <p className='text-muted col-span-full my-24 flex items-center justify-center'>
                    <Loader2 className='animate-spin' size={96} />
                </p>
            )}
        </>
    )
}

export default MediaList
