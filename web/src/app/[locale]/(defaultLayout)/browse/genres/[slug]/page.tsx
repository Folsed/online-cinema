import React from 'react'
import { fetchBrowsedMedia } from '@/lib/api/media'
import BrowseGrid from '@/app/[locale]/(defaultLayout)/browse/genres/[slug]/components/browse-grid/BrowseGrid'

const GenrePage = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
    const { locale, slug } = await params
    const media = await fetchBrowsedMedia({
        lang: locale,
        categories: slug,
    })

    return <BrowseGrid media={media} lang={locale} />
}

export default GenrePage
