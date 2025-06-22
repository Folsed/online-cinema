'use client'
import { Action, combineSlices, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { authApiSlice } from '@/store/features/auth/authApiSlice'

const rootReducer = combineSlices(authApiSlice)

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware().concat(authApiSlice.middleware)
        },
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
