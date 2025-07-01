'use client'
import React from 'react'
import { useAppSelector } from '@/store/hooks'
import WatchlistCard from '@/app/[locale]/(defaultLayout)/account/watchlist/components/WatchlistCard'
import EmptyState from '@/components/ui/EmptyState'
import { Button } from '@/components/shadcn/button'
import { SlidersHorizontal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import ViewButton from '@/components/ui/ViewButton'

const WatchlistPage = () => {
    const watchlist = useAppSelector(state => state.watchlist.list)
    const settings = useAppSelector(state => state.userSettings.watchlist)
    const t = useTranslations('buttons')

    return (
        <section className='-mt-4 md:-mt-8 lg:-mt-16'>
            {watchlist.length === 0 && <EmptyState localeLabel={'empty-wl'} />}
            {watchlist.length > 0 && (
                <div className='flex justify-end'>
                    <ViewButton settings={settings} />
                    <Button variant='ghost' className='text-muted-foreground text-lg uppercase'>
                        <SlidersHorizontal style={{ scale: 1.2 }} />
                        {t('filter')}
                    </Button>
                </div>
            )}
            <div
                className={`grid gap-y-2 place-items-center ${
                    !settings?.view || settings?.view === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                        : ''
                }`}
            >
                {watchlist.map(item => (
                    <React.Fragment key={item.id}>
                        <WatchlistCard media={item} />
                    </React.Fragment>
                ))}
            </div>
        </section>
    )
}

export default WatchlistPage
