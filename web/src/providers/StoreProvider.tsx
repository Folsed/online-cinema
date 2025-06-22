'use client'
import { TAppStore, makeStore } from '@/store/store'
import React, { useRef } from 'react'
import { Provider } from 'react-redux'

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const storeRef = useRef<TAppStore | null>(null)

    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}
export default StoreProvider
