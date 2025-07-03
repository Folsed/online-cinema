import React from 'react'
import { fetchBrowsedMedia } from '@/lib/api/media'
import { EMediaType } from '@/types/media.types'
import MediaList from '@/components/ui/MediaList'
import MediaGrid from '@/app/[locale]/(defaultLayout)/browse/components/MediaGrid'

const AnimePage = async () => {
    const media = await fetchBrowsedMedia({
        media_type: EMediaType.Anime,
        n: 20,
    })
    return (
        <MediaGrid title='Anime'>
            <MediaList initialData={media} mediaType={EMediaType.Anime} amountByQuery={20} />
        </MediaGrid>
    )
}

export default AnimePage
