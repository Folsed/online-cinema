import { createSlice } from '@reduxjs/toolkit'
import { authApiSlice } from '@/store/features/auth/authApiSlice'
import { IUserSettings } from '@/types/settings.types'
import { settingsApiSlice } from '@/store/features/user/settingsApiSlice'

const initialState: IUserSettings = {} as IUserSettings

export const settingsSlice = createSlice({
    name: 'userSettings',
    initialState: initialState,
    reducers: {
        clearSettings: () => initialState,
    },
    extraReducers: build => {
        build
            .addMatcher(
                settingsApiSlice.endpoints.getUserSettings.matchFulfilled,
                (_, { payload }) => payload
            )
            .addMatcher(
                settingsApiSlice.endpoints.updateUserSettings.matchFulfilled,
                (_, { payload }) => payload
            )
            .addMatcher(authApiSlice.endpoints.logout.matchFulfilled, () => initialState)
    },
})

export const { clearSettings } = settingsSlice.actions
