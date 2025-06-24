import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL('http://localhost:4000/storage/**')],
    },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
