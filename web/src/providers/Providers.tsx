import React from 'react'
import StoreProvider from '@/providers/StoreProvider'
import { NextIntlClientProvider } from 'next-intl'
import { fetchCurrentUser } from '@/lib/api/user'
import { fetchUserWatchlist } from '@/lib/api/watchlist'
import { fetchUserSettings } from '@/lib/api/user-settings'

const Providers = async ({ children, locale }: { children: React.ReactNode; locale: string }) => {
    const initialUser = await fetchCurrentUser()
    const userSettings = await fetchUserSettings()
    const userWatchlist = await fetchUserWatchlist(locale)

    return (
        <NextIntlClientProvider>
            <StoreProvider
                initialUser={initialUser}
                userSettings={userSettings}
                userWatchlist={userWatchlist}
            >
                {children}
            </StoreProvider>
        </NextIntlClientProvider>
    )
}

export default Providers
