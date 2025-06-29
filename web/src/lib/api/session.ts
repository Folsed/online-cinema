import { cookies } from 'next/headers'
import { IUserSession } from '@/types/session.types'

export const getServerSession = async (): Promise<IUserSession | null> => {
    try {
        const _cookies = await cookies()
        const cookieHeader = _cookies
            .getAll()
            .map(cookie => `${cookie.name}=${cookie.value}`)
            .join('; ')

        const sessionData = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/session`, {
            method: 'GET',
            headers: {
                cookie: cookieHeader,
            },
            cache: 'no-store',
        })

        if (!sessionData.ok) {
            return null
        }
        const { session } = await sessionData.json()

        return session ?? null
    } catch (error) {
        console.error('Get server session error:', error)
        return null
    }
}
