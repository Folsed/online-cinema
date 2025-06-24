import React from 'react'
import HeroCarousel from '@/app/[locale]/(defaultLayout)/components/hero-carousel/HeroCarousel'

const HomePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params
    return (
        <>
            <HeroCarousel locale={locale} />
        </>
    )
}

export default HomePage
