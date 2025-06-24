'use client'
import React, { useCallback, useState } from 'react'
import { IHeroSlide } from '@/types/landing.types'
import Container from '@/app/[locale]/(defaultLayout)/components/hero-carousel/Container'
import Slide from '@/app/[locale]/(defaultLayout)/components/hero-carousel/Slide'

interface ILogicProps {
    slides: IHeroSlide[]
}

const Logic: React.FC<ILogicProps> = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const updateIndex = useCallback(
        (newIndex: number) => {
            const slidesCount = slides.length

            if (newIndex < 0) {
                newIndex = slidesCount - 1
            } else if (newIndex >= slidesCount) {
                newIndex = 0
            }

            setCurrentIndex(newIndex)
        },
        [slides]
    )
    return (
        <Container currentIndex={currentIndex} updateIndex={updateIndex} slides={slides}>
            {slides.map((slide, index) => (
                <Slide key={slide.id} currentIndex={currentIndex} index={index} slide={slide} />
            ))}
        </Container>
    )
}

export default Logic
