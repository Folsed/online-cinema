import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { authApiSlice } from '@/store/features/auth/authApiSlice'
import { watchlistApiSlice } from '@/store/features/user/watchlistApiSlice'
import { settingsApiSlice } from '@/store/features/user/settingsApiSlice'
import { watchlistSlice } from '@/store/features/user/watchlistSlice'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    matcher: isAnyOf(
        authApiSlice.endpoints.login.matchFulfilled,
        authApiSlice.endpoints.register.matchFulfilled
    ),
    effect: async (action, listenerApi) => {
        listenerApi.dispatch(settingsApiSlice.endpoints.getUserSettings.initiate())
        listenerApi.dispatch(watchlistApiSlice.endpoints.getWatchlist.initiate())
    },
})

listenerMiddleware.startListening({
    matcher: isAnyOf(authApiSlice.endpoints.logout.matchFulfilled),
    effect: async (action, listenerApi) => {
        listenerApi.dispatch(settingsApiSlice.util.resetApiState())
        listenerApi.dispatch(watchlistApiSlice.util.resetApiState())
    },
})
