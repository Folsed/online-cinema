import React from 'react'
import { fetchMediaByAlias } from '@/lib/api/media'
import Backdrop from '@/app/[locale]/(defaultLayout)/details/[alias]/components/Backdrop'
import Details from '@/app/[locale]/(defaultLayout)/details/[alias]/components/Details'

const MediaDetailsPage = async ({
    params,
}: {
    params: Promise<{ alias: string; locale: string }>
}) => {
    const { alias, locale } = await params
    const details = await fetchMediaByAlias(alias, locale)
    return (
        <>
            <Backdrop backdrop={details.backdrop} />
            <section className='details_glass-container container mx-auto mt-[55vh] p-8 pb-96'>
                <Details details={details} />
            </section>
        </>
    )
}

export default MediaDetailsPage
