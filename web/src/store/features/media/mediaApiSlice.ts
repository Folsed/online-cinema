import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IBrowseMediaParams, IMediaPoster } from '@/types/media.types'

export const mediaApiSlice = createApi({
    reducerPath: 'mediaApiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    }),
    tagTypes: ['mediaApi'],
    endpoints: build => ({
        // GET /media/browse
        getBrowseMedia: build.query<IMediaPoster[], IBrowseMediaParams>({
            query: params => ({ url: 'media/browse', method: 'GET', params: params }),
            providesTags: ['mediaApi'],
        }),
    }),
})

export const { useGetBrowseMediaQuery, useLazyGetBrowseMediaQuery } = mediaApiSlice
