import React, { useCallback } from 'react'
import { IWatchlist } from '@/types/user.types'
import Image from 'next/image'
import styles from '@/components/ui/media-poster/poster.module.css'
import Link from 'next/link'
import { useAppSelector } from '@/store/hooks'
import { Trash2 } from 'lucide-react'
import { useDeleteFromWatchlistMutation } from '@/store/features/user/watchlistApiSlice'
import { toast } from 'sonner'
import { clsx } from 'clsx'

const WatchlistCard = ({ media }: { media: IWatchlist }) => {
    const settings = useAppSelector(state => state.userSettings.watchlist)
    const added = new Date(media.addedAt).toLocaleDateString()
    const isFlexView = settings?.view === 'flex'
    const [deleteFromWatchlist] = useDeleteFromWatchlistMutation()

    const handleDeleteFromWatchlist = useCallback(async () => {
        await deleteFromWatchlist({ mediaId: media.id })

        toast('A custom toast with default styling')
    }, [deleteFromWatchlist])

    const containerClass = clsx({
        'w-fit sm:w-full': isFlexView,
        'w-fit': !isFlexView,
    })

    const wrapperClass = clsx('relative', {
        'hover:bg-tertiary-hover/50 duration-200': isFlexView,
        'p-2 pt-1': !isFlexView,
    })

    const linkClass = clsx('relative block', {
        'flex gap-4 p-3': isFlexView,
        'aspect-[5/3] max-w-[300px] sm:max-w-[400px]': !isFlexView,
    })

    const figureClass = clsx('flex-none', {
        'max-w-[300px]': isFlexView,
        [styles.posterCard]: !isFlexView,
        'h-full w-full': !isFlexView,
    })

    return (
        <div className={containerClass}>
            <div className={wrapperClass}>
                <Link href={`/details/${media.alias}`} className={linkClass}>
                    <figure className={figureClass} style={{ paddingTop: 0 }}>
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
                    {isFlexView && (
                        <div className='hidden flex-col justify-around sm:flex'>
                            <span className='text-lg font-semibold'>{media.posterTitle}</span>
                            <p className='text-muted-foreground line-clamp-4 overflow-hidden text-sm break-words'>
                                {media.synopsis}
                            </p>
                            <span className='text-foreground text-end text-xs uppercase'>
                                Додано: {added}
                            </span>
                        </div>
                    )}
                </Link>
                {isFlexView && (
                    <button
                        className='text-muted-foreground absolute top-4 right-4 hidden duration-200 hover:text-white sm:block'
                        onClick={handleDeleteFromWatchlist}
                    >
                        <Trash2 size={20} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default WatchlistCard
