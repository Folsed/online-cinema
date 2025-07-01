import React, { useCallback } from 'react'
import { IWatchlist } from '@/types/user.types'
import Image from 'next/image'
import styles from '@/components/ui/media-poster/poster.module.css'
import Link from 'next/link'
import { useAppSelector } from '@/store/hooks'
import { Trash2 } from 'lucide-react'
import { useDeleteFromWatchlistMutation } from '@/store/features/user/watchlistApiSlice'

const WatchlistCard = ({ media }: { media: IWatchlist }) => {
    const settings = useAppSelector(state => state.userSettings.watchlist)
    const added = new Date(media.addedAt).toLocaleDateString()
    const [deleteFromWatchlist] = useDeleteFromWatchlistMutation()

    const handleDeleteFromWatchlist = useCallback(async () => {
        await deleteFromWatchlist({ mediaId: media.id })
    }, [deleteFromWatchlist])

    return (
        <div className={`${settings?.view === 'flex' ? 'w-fit sm:w-full' : 'w-fit'}`}>
            <div
                className={`relative ${settings?.view === 'flex' ? 'hover:bg-tertiary-hover/50 duration-200' : 'p-2 pt-1'}`}
            >
                <Link
                    href={`/details/${media.alias}`}
                    className={`relative block ${settings?.view === 'flex' ? 'flex gap-4 p-3' : 'aspect-[5/3] max-w-[300px] sm:max-w-[400px]'}`}
                >
                    <figure
                        className={`flex-none ${settings?.view === 'flex' ? 'max-w-[300px]' : `${styles.posterCard} ` + 'h-full w-full'}`}
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
                    {settings?.view === 'flex' && (
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
                {settings?.view === 'flex' && (
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
