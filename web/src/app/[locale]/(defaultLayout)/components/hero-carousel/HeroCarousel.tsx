import React from 'react'
import Logic from '@/app/[locale]/(defaultLayout)/components/hero-carousel/Logic'

export async function getCarouselSlides(lang: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}landing/hero?lang=${lang}`
        )
        return res.json()
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch slides: ${error.message}`)
        }
        throw new Error('Failed to fetch slides: Unknown error')
    }
}

const HeroCarousel = async ({ locale }: { locale: string }) => {
    const slides = await getCarouselSlides(locale)
    return <Logic slides={slides} />
}

export default HeroCarousel
