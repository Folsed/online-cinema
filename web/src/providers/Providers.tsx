import React from 'react'
import StoreProvider from '@/providers/StoreProvider'
import { NextIntlClientProvider } from 'next-intl'
import { fetchCurrentUser } from '@/lib/api/user'
import { fetchUserWatchlist } from '@/lib/api/watchlist'

const Providers = async ({ children }: { children: React.ReactNode }) => {
    const initialUser = await fetchCurrentUser()
    const userWatchlist = await fetchUserWatchlist()

    return (
        <NextIntlClientProvider>
            <StoreProvider initialUser={initialUser} userWatchlist={userWatchlist}>
                {children}
            </StoreProvider>
        </NextIntlClientProvider>
    )
}

export default Providers
