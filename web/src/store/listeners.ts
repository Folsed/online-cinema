import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { authApiSlice } from '@/store/features/auth/authApiSlice'
import { watchlistApiSlice } from '@/store/features/user/watchlistApiSlice'
import { settingsApiSlice } from '@/store/features/user/settingsApiSlice'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    matcher: isAnyOf(
        authApiSlice.endpoints.login.matchFulfilled,
        authApiSlice.endpoints.register.matchFulfilled
    ),
    effect: async (action, listenerApi) => {
        listenerApi.dispatch(settingsApiSlice.endpoints.getUserSettings.initiate(undefined))
        listenerApi.dispatch(watchlistApiSlice.endpoints.getWatchlist.initiate(undefined))
    },
})
