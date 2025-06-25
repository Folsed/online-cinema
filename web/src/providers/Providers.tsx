import React from 'react'
import StoreProvider from '@/providers/StoreProvider'
import { NextIntlClientProvider } from 'next-intl'
import { fetchCurrentUser } from '@/lib/api/user'

const Providers = async ({ children }: { children: React.ReactNode }) => {
    const initialUser = await fetchCurrentUser()

    return (
        <NextIntlClientProvider>
            <StoreProvider initialUser={initialUser}>{children}</StoreProvider>
        </NextIntlClientProvider>
    )
}

export default Providers
