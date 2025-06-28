import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function authMiddleware(req: NextRequest) {
    const sessionData = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/session`, {
        method: 'GET',
        headers: {
            cookie: req.headers.get('cookie') || '',
        },
    })
    const { session } = await sessionData.json()

    console.log(session)

    if (!session) {
        const res = NextResponse.redirect(new URL('/login', req.url))
        res.headers.set('cache-control', 'no-store')
        return res
    }

    const res = NextResponse.next()
    res.headers.set('cache-control', 'no-store')
    return res
}
