'use client'
import { TAppStore, makeStore } from '@/store/store'
import React, { useRef } from 'react'
import { Provider } from 'react-redux'

const StoreProvider = ({
    children,
    initialUser,
}: {
    children: React.ReactNode
    initialUser: IUserData | null
}) => {
    const storeRef = useRef<TAppStore | null>(null)

    if (!storeRef.current) {
        storeRef.current = makeStore(
            initialUser
                ? {
                      auth: {
                          user: initialUser,
                          isAuthenticated: true,
                      },
                  }
                : undefined
        )
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}
export default StoreProvider
