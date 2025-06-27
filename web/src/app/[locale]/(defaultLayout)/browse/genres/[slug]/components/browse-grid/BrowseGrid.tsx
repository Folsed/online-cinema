import React from 'react'
import { IMediaPoster } from '@/types/media.types'
import MediaPoster from '@/components/ui/media-poster/MediaPoster'

const BrowseGrid = ({
    media,
    lang,
    slug,
}: {
    media: IMediaPoster[]
    lang: string
    slug: string
}) => {
    return (
        <section className='flex w-full flex-col items-center'>
            <div>
                <h1>{slug}</h1>
            </div>
            <div className='mx-6 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
                {media.map(item => (
                    <React.Fragment key={item.alias}>
                        <MediaPoster poster={item} />
                    </React.Fragment>
                ))}
                {media.map(item => (
                    <React.Fragment key={item.alias}>
                        <MediaPoster poster={item} />
                    </React.Fragment>
                ))}
                {media.map(item => (
                    <React.Fragment key={item.alias}>
                        <MediaPoster poster={item} />
                    </React.Fragment>
                ))}
                {media.map(item => (
                    <React.Fragment key={item.alias}>
                        <MediaPoster poster={item} />
                    </React.Fragment>
                ))}
            </div>
        </section>
    )
}

export default BrowseGrid
