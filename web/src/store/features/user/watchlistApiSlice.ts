import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IWatchlist } from '@/types/user.types'

export const watchlistApiSlice = createApi({
    reducerPath: 'watchlistApiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
        credentials: 'include',
    }),
    tagTypes: ['watchlist'],
    endpoints: build => ({
        // POST watchlist
        addToWatchlist: build.mutation<IWatchlist[], { mediaId: string }>({
            query: body => ({
                url: 'watchlist',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['watchlist'],
        }),

        // GET /watchlist
        getWatchlist: build.query<IWatchlist[], void>({
            query: () => ({ url: 'watchlist', method: 'GET' }),
            providesTags: ['watchlist'],
        }),

        // DELETE /watchlist/:mediaId
        deleteFromWatchlist: build.mutation<IWatchlist[], { mediaId: string }>({
            query: ({ mediaId }) => ({ url: `watchlist/${mediaId}`, method: 'DELETE' }),
            invalidatesTags: ['watchlist'],
        }),
    }),
})

export const { useAddToWatchlistMutation, useGetWatchlistQuery, useDeleteFromWatchlistMutation } =
    watchlistApiSlice
