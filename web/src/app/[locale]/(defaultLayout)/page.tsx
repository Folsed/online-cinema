import React from 'react'
import HeroCarousel from '@/app/[locale]/(defaultLayout)/components/hero-carousel/HeroCarousel'
import CardsCarousel from '@/components/ui/cards-carousel/CardsCarousel'

const HomePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params
    return (
        <>
            <section aria-label='Головна карусель'>
                <h2 className='sr-only'>Hero carousel</h2>
                <HeroCarousel locale={locale} />
            </section>

            <section aria-labelledby='section-trending' className='mt-24'>
                <CardsCarousel />
            </section>
        </>
    )
}

export default HomePage
