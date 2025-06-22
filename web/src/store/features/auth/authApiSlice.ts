import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginPayload, IRegisterPayload } from '@/types/auth.types'

export const authApiSlice = createApi({
    reducerPath: 'authApiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
        credentials: 'include',
    }),
    tagTypes: ['auth'],
    endpoints: build => ({
        // POST auth/login
        login: build.mutation<IUserData, ILoginPayload>({
            query: body => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['auth'],
        }),

        // POST auth/register
        register: build.mutation<IUserData, IRegisterPayload>({
            query: body => ({
                url: 'auth/register',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['auth'],
        }),

        // POST auth/sign-out
        // logout: build.mutation<void, void>({
        //     query: () => ({ url: 'auth/sign-out', method: 'POST' }),
        //     invalidatesTags: ['auth'],
        // }),
    }),
})

export const { useLoginMutation, useRegisterMutation } = authApiSlice
