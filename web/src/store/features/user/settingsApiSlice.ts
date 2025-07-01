import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserSettings } from '@/types/settings.types'

export const settingsApiSlice = createApi({
    reducerPath: 'userSettingsSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
        credentials: 'include',
    }),
    tagTypes: ['user-settings'],
    endpoints: build => ({
        // GET user/settings
        getUserSettings: build.query<IUserSettings, void>({
            query: () => ({ url: 'user/settings', method: 'GET' }),
            providesTags: ['user-settings'],
        }),

        // PATCH user/settings
        updateUserSettings: build.mutation<IUserSettings, IUserSettings>({
            query: body => ({ url: 'user/settings', method: 'PATCH', body }),
            invalidatesTags: ['user-settings'],
        }),
    }),
})

export const { useGetUserSettingsQuery, useUpdateUserSettingsMutation } = settingsApiSlice
