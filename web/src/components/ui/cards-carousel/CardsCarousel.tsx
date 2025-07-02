import React from 'react'
import { fetchBrowsedMedia } from '@/lib/api/media'
import { EMediaType } from '@/types/media.types'
import Track from '@/components/ui/cards-carousel/components/Track'

const CardsCarousel = async () => {
    const media = await fetchBrowsedMedia({
        n: 20,
        media_type: EMediaType.Anime,
    })

    return (
        <div className='relative z-10'>
            <div className='no-scrollbar overflow-scroll'>
                <div className='content-padding mb-4 text-xl font-bold md:text-2xl'>
                    <h1>Новинки </h1>
                </div>
                <div className='grid w-full [grid-template-areas:"viewbox"]'>
                    <Track content={media} />
                </div>
            </div>
        </div>
    )
}

export default CardsCarousel
