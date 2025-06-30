import { cookies } from 'next/headers'

export async function fetchUserWatchlist() {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}watchlist`, {
            credentials: 'include',
            headers: { cookie: cookieHeader },
        })

        return await res.json()
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch user's watchlist: ${error.message}`)
        }
    }
}
