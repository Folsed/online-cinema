import React from 'react'
import { fetchBrowsedMedia } from '@/lib/api/media'
import { EMediaType } from '@/types/media.types'
import MediaList from '@/app/[locale]/(defaultLayout)/browse/anime/MediaList'

const AnimePage = async () => {
    const media = await fetchBrowsedMedia({
        media_type: EMediaType.Anime,
        n: 20,
    })
    return (
        <section className='flex w-full flex-col items-center gap-6'>
            <div>
                <h1 className='mt-6 text-2xl capitalize'>Anime</h1>
            </div>
            <div className='mx-6 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
                <MediaList initialData={media} mediaType={EMediaType.Anime} amountByQuery={20} />
            </div>
        </section>
    )
}

export default AnimePage
