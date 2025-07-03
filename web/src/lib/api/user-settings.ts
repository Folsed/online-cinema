import { cookies } from 'next/headers'
import { IUserSettings } from '@/types/settings.types'

export async function fetchUserSettings(): Promise<IUserSettings | null> {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}user/settings`, {
            credentials: 'include',
            headers: { cookie: cookieHeader },
            cache: 'no-store',
        })
        if (!res.ok) return null
        return await res.json()
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch user's settings: ${error.message}`)
        }
        return null
    }
}
