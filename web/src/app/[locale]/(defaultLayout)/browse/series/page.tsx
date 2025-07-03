import React from 'react'
import { fetchBrowsedMedia } from '@/lib/api/media'
import { EMediaType } from '@/types/media.types'
import MediaGrid from '@/app/[locale]/(defaultLayout)/browse/components/MediaGrid'
import MediaList from '@/components/ui/MediaList'

const SeriesPage = async () => {
    const media = await fetchBrowsedMedia({
        media_type: EMediaType.Series,
        n: 20,
    })

    return (
        <MediaGrid title='Series'>
            <MediaList initialData={media} mediaType={EMediaType.Series} amountByQuery={20} />
        </MediaGrid>
    )
}

export default SeriesPage
