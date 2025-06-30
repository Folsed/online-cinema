import React from 'react'
import { fetchGenres } from '@/lib/api/media'
import Dropdown from '@/app/[locale]/(defaultLayout)/components/browse/Dropdown'

const Browse = async ({ locale }: { locale: string }) => {
    const genres = await fetchGenres(locale)

    return <Dropdown genres={genres} />
}

export default Browse
