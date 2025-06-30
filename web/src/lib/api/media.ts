import { IBrowseMediaParams, IGenres, IMediaDetails, IMediaPoster } from '@/types/media.types'

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

export async function fetchBrowsedMedia(params: IBrowseMediaParams): Promise<IMediaPoster[]> {
    const query = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
        if (value == null) return
        if (Array.isArray(value)) {
            query.set(key, value.join(','))
            return
        }
        query.set(key, String(value))
    })

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}media/browse?${query}`)
        return res.json()
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch genres: ${error.message}`)
        }
        throw new Error('Failed to fetch genres: Unknown error')
    }
}
