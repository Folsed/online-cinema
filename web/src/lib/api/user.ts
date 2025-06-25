import { cookies } from 'next/headers'
import { IUserData } from '@/types/user.types'

export async function fetchCurrentUser(): Promise<IUserData | null> {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/me`, {
            credentials: 'include',
            headers: { cookie: cookieHeader },
            cache: 'no-store',
        })

        if (!res.ok) {
            return null
        }
        const contentType = res.headers.get('content-type') ?? ''
        if (!contentType.includes('application/json')) {
            return null
        }

        const data = await res.json()
        if (!data) {
            return null
        }

        return {
            token: data.token,
            user: { ...data.user },
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch user: ${error.message}`)
        }
        return null
    }
}
