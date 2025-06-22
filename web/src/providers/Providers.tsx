import React from 'react'
import StoreProvider from '@/providers/StoreProvider'
import { cookies } from 'next/headers'
import { IUserData } from '@/types/auth.types'

const Providers = async ({ children }: { children: React.ReactNode }) => {
    // const getCookies = await cookies()
    // let initialUser: IUserData | null = null
    //
    // try {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/get-session`, {
    //         credentials: 'include',
    //         headers: { cookie: getCookies.toString() },
    //         cache: 'no-store',
    //     })
    //
    //     if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
    //         const data = await res.json()
    //         if (data) {
    //             initialUser = {
    //                 token: data.session.token,
    //                 user: { ...data.user },
    //             }
    //         }
    //     }
    // } catch (error) {
    //     console.error(error)
    // }

    return <StoreProvider>{children}</StoreProvider>
}

export default Providers
