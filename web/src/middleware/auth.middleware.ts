import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from '@/lib/api/session'

export async function authMiddleware(req: NextRequest) {
    const session = await getServerSession()

    if (!session) {
        const res = NextResponse.redirect(new URL('/login', req.url))
        res.headers.set('cache-control', 'no-store')
        return res
    }

    const res = NextResponse.next()
    res.headers.set('cache-control', 'no-store')
    return res
}
