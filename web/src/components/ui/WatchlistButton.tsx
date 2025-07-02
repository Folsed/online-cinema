'use client'
import { Bookmark } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import { useTranslations } from 'next-intl'
import {
    useAddToWatchlistMutation,
    useDeleteFromWatchlistMutation,
} from '@/store/features/user/watchlistApiSlice'
import { useAppSelector } from '@/store/hooks'
import { IWatchlist } from '@/types/user.types'

const WatchlistButton = ({ mediaId }: { mediaId: string }) => {
    const t = useTranslations()
    const [addToWatchlist] = useAddToWatchlistMutation()
    const [deleteFromWatchlist] = useDeleteFromWatchlistMutation()
    const watchlist: IWatchlist[] = useAppSelector(state => state.watchlist.list)

    const exists = watchlist.some(item => item.id === mediaId)

    const handleClick = async () => {
        if (exists) {
            await deleteFromWatchlist({ mediaId }).unwrap()
        } else {
            await addToWatchlist({ mediaId }).unwrap()
        }
    }

    return (
        <Button
            variant='ghost'
            className={`text-muted-foreground uppercase ${exists && 'fill-muted-foreground hover:fill-white'} duration-200`}
            onClick={handleClick}
        >
            <Bookmark style={{ scale: 1.5 }} className='fill-inherit' />
            {exists ? t('buttons.listed') : t('buttons.list')}
        </Button>
    )
}

export default WatchlistButton
