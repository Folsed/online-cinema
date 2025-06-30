import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { authApiSlice } from '@/store/features/auth/authApiSlice'
import { watchlistApiSlice } from '@/store/features/user/watchlistApiSlice'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    matcher: isAnyOf(authApiSlice.endpoints.login.matchFulfilled),
    effect: async (action, listenerApi) => {
        listenerApi.dispatch(watchlistApiSlice.endpoints.getWatchlist.initiate())
    },
})
