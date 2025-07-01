'use client'
import React from 'react'
import { useAppSelector } from '@/store/hooks'
import WatchlistCard from '@/app/[locale]/(defaultLayout)/account/watchlist/components/WatchlistCard'

const WatchlistPage = () => {
    const watchlist = useAppSelector(state => state.watchlist.list)

    return (
        <div className='grid grid-cols-1 place-items-center md:grid-cols-3 gap-y-2'>
            {watchlist.map(item => (
                <React.Fragment key={item.id}>
                    <WatchlistCard media={item} />
                </React.Fragment>
            ))}
        </div>
    )
}

export default WatchlistPage
