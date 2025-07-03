'use client'
import React, { useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Grid2X2, StretchHorizontal } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import { IUserSettings } from '@/types/settings.types'
import { useUpdateUserSettingsMutation } from '@/store/features/user/settingsApiSlice'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'

const WatchlistViewButton = ({ settings }: { settings: IUserSettings['watchlist'] }) => {
    const t = useTranslations('buttons')
    const [updateSettings, { isLoading: isUpdating }] = useUpdateUserSettingsMutation()

    const handleChangeView = useCallback(async () => {
        const nextView = !settings?.view || settings?.view === 'grid' ? 'flex' : 'grid'

        const newWatchlist = {
            view: nextView,
        }

        await updateSettings({ watchlist: newWatchlist }).unwrap()
    }, [settings, settings?.view, updateSettings])

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant='ghost'
                    className='text-muted-foreground text-lg uppercase'
                    onClick={handleChangeView}
                    disabled={isUpdating}
                >
                    {!settings?.view || settings?.view === 'grid' ? (
                        <Grid2X2 style={{ scale: 1.2 }} />
                    ) : (
                        <StretchHorizontal style={{ scale: 1.2 }} />
                    )}
                    {t('view')}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Change list view</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default WatchlistViewButton
