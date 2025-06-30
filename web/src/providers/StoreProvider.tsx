'use client'
import { TAppStore, makeStore } from '@/store/store'
import React, { useRef } from 'react'
import { Provider } from 'react-redux'
import { IUserData, IWatchlist } from '@/types/user.types'

const StoreProvider = ({
    children,
    initialUser,
    userWatchlist,
}: {
    children: React.ReactNode
    initialUser: IUserData | null
    userWatchlist: IWatchlist[] | null
}) => {
    const storeRef = useRef<TAppStore | null>(null)

    if (!storeRef.current) {
        const preloadedState: any = {}

        if (initialUser) {
            preloadedState.auth = {
                user: initialUser,
                isAuthenticated: true,
            }
        }
        // підсовуємо список
        preloadedState.watchlist = {
            list: userWatchlist,
        }

        storeRef.current = makeStore(preloadedState)
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}
export default StoreProvider
