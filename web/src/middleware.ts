import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'
import { authMiddleware } from '@/middleware/auth.middleware'

const intlMiddleware = createIntlMiddleware(routing)

const protectedRoutes = ['/account']

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const locale = pathname.split('/')[1]

    const pathWithoutLocale = locale ? pathname.replace(`/${locale}`, '') : pathname

    if (protectedRoutes.some(route => pathWithoutLocale.startsWith(route))) {
        const authResponse = await authMiddleware(req)

        if (authResponse.headers.get('location')) {
            return authResponse
        }
    }

    const intlResponse = intlMiddleware(req)
    if (intlResponse) {
        return intlResponse
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/:locale((?!api|trpc|_next|.*\\..*).*)',
        '/account/:path*',
        '/:locale/account/:path*',
        '/dashboard/:path*',
        '/:locale/dashboard/:path*',
    ],
}
