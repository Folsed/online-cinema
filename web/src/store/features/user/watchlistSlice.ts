import { createSlice } from '@reduxjs/toolkit'
import { authApiSlice } from '@/store/features/auth/authApiSlice'
import { IWatchlist } from '@/types/user.types'
import { watchlistApiSlice } from '@/store/features/user/watchlistApiSlice'

interface IWatchlistState {
    list: IWatchlist[]
}

const initialState: IWatchlistState = { list: [] }

export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: initialState,
    reducers: {
        clearWatchlist: state => {
            state.list = []
        },
    },
    extraReducers: build => {
        build
            .addMatcher(
                watchlistApiSlice.endpoints.getWatchlist.matchFulfilled,
                (state, { payload }) => {
                    state.list = payload
                }
            )
            .addMatcher(authApiSlice.endpoints.logout.matchFulfilled, state => {
                state.list = []
            })
    },
})

export const { clearWatchlist } = watchlistSlice.actions
