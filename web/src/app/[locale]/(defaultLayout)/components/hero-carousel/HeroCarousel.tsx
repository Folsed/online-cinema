import React from 'react'
import Logic from '@/app/[locale]/(defaultLayout)/components/hero-carousel/Logic'
import { fetchCarouselSlides } from '@/lib/api/landing'

const HeroCarousel = async ({ locale }: { locale: string }) => {
    const slides = await fetchCarouselSlides(locale)
    return <Logic slides={slides} />
}

export default HeroCarousel
