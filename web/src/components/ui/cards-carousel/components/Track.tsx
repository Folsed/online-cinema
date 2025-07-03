'use client'
import React, { RefObject, useRef } from 'react'
import { IMediaPoster } from '@/types/media.types'
import MediaPoster from '@/components/ui/media-poster/MediaPoster'
import Arrows from '@/components/ui/cards-carousel/components/Arrows'

const Track = ({ content }: { content: IMediaPoster[] }) => {
    const trackRef = useRef<HTMLDivElement>(null)

    return (
        <div className='content-padding relative max-w-screen [grid-area:viewbox]'>
            <div
                className='cards-carousel_margin no-scrollbar cards-carousel_scroll-padding content-padding grid snap-x auto-cols-[calc(100%/var(--cards-inline))] grid-flow-col items-center overflow-x-auto overflow-y-visible pb-8'
                ref={trackRef}
            >
                {content.map(item => (
                    <React.Fragment key={item.alias}>
                        <div className='max-w-full snap-start px-2'>
                            <MediaPoster
                                poster={item}
                                trackRef={trackRef as RefObject<HTMLDivElement>}
                            />
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <Arrows trackRef={trackRef as RefObject<HTMLDivElement>} />
        </div>
    )
}

export default Track
