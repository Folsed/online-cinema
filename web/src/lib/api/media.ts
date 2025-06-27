import { IGenres, IMediaDetails } from '@/types/media.types'

export async function fetchMediaByAlias(alias: string, lang: string): Promise<IMediaDetails> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}media/${alias}?lang=${lang}`
        )
        return res.json()
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch media: ${error.message}`)
        }
        throw new Error('Failed to fetch media: Unknown error')
    }
}

export async function fetchGenres(lang: string): Promise<IGenres[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}genres?lang=${lang}`)
        return res.json()
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch genres: ${error.message}`)
        }
        throw new Error('Failed to fetch genres: Unknown error')
    }
}
