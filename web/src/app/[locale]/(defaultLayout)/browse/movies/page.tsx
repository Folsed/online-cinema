import React from 'react'
import { fetchBrowsedMedia } from '@/lib/api/media'
import { EMediaType } from '@/types/media.types'
import MediaGrid from '@/app/[locale]/(defaultLayout)/browse/components/MediaGrid'
import MediaList from '@/components/ui/MediaList'

const MoviesPage = async () => {
    const media = await fetchBrowsedMedia({
        media_type: EMediaType.Movie,
        n: 20,
    })

    return (
        <MediaGrid title='Movie'>
            <MediaList initialData={media} mediaType={EMediaType.Movie} amountByQuery={20} />
        </MediaGrid>
    )
}

export default MoviesPage
