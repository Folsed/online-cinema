import Content from '@/app/[locale]/(defaultLayout)/components/browse/Content'
import { fetchGenres } from '@/lib/api/media'

const Browse = async ({ locale }: { locale: string }) => {
    const genres = await fetchGenres(locale)

    return <Content genres={genres} />
}

export default Browse
