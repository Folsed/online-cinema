import { Action, combineSlices, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { authApiSlice } from '@/store/features/auth/authApiSlice'
import { authSlice } from '@/store/features/auth/authSlice'
import { watchlistApiSlice } from '@/store/features/user/watchlistApiSlice'
import { watchlistSlice } from '@/store/features/user/watchlistSlice'

const rootReducer = combineSlices(authApiSlice, authSlice, watchlistApiSlice, watchlistSlice)

export const makeStore = (preloadedState?: Parameters<typeof rootReducer>[0]) => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware().concat(
                authApiSlice.middleware,
                watchlistApiSlice.middleware
            )
        },
        preloadedState,
    })
}

export type TAppStore = ReturnType<typeof makeStore>
export type TRootState = ReturnType<typeof rootReducer>
export type TAppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    TRootState,
    unknown,
    Action
>
export type TAppDispatch = TAppStore['dispatch']
