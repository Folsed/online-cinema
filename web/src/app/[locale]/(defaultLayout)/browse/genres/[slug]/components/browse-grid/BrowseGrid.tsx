import React from 'react'
import { IMediaPoster } from '@/types/media.types'
import MediaPoster from '@/components/ui/media-poster/MediaPoster'

const BrowseGrid = ({ media, lang }: { media: IMediaPoster[]; lang: string }) => {
    return (
        <div className='flex w-full justify-center'>
            <div className='grid max-w-7xl grid-cols-6 gap-4 sm:grid-cols-4 md:grid-cols-5'>
                {media.map(item => (
                    <React.Fragment key={item.alias}>
                        <MediaPoster poster={item} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default BrowseGrid
