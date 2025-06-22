import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    ILoginPayload,
    IRegisterPayload,
    IResetPasswordConfirm,
    IResetPasswordConfirmResponse,
    IResetPasswordRequest,
    IResetPasswordRequestResponse,
} from '@/types/auth.types'

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

        // POST auth/logout
        logout: build.mutation<void, void>({
            query: () => ({ url: 'auth/logout', method: 'POST' }),
            invalidatesTags: ['auth'],
        }),

        // POST auth/password-reset/request
        resetPasswordRequest: build.mutation<IResetPasswordRequestResponse, IResetPasswordRequest>({
            query: body => ({ url: 'auth/password-reset/request', method: 'POST', body }),
            invalidatesTags: ['auth'],
        }),

        // POST auth/password-reset/confirm
        resetPasswordConfirm: build.mutation<IResetPasswordConfirmResponse, IResetPasswordConfirm>({
            query: body => ({
                url: `auth/password-reset/confirm`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['auth'],
        }),
    }),
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useResetPasswordRequestMutation,
    useResetPasswordConfirmMutation,
} = authApiSlice
