import { createSlice } from '@reduxjs/toolkit'
import { authApiSlice } from '@/store/features/auth/authApiSlice'
import { IUserData } from '@/types/user.types'

interface AuthState {
    user: IUserData | null
    isAuthenticated: boolean
}

const initialState: AuthState = { user: null, isAuthenticated: false }

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        clearAuth: state => {
            state.user = null
            state.isAuthenticated = false
        },
    },
    extraReducers: build => {
        build
            .addMatcher(authApiSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
                state.user = payload
                state.isAuthenticated = true
            })
            .addMatcher(authApiSlice.endpoints.register.matchFulfilled, (state, { payload }) => {
                state.user = payload
                state.isAuthenticated = true
            })
            .addMatcher(authApiSlice.endpoints.logout.matchFulfilled, state => {
                state.user = null
                state.isAuthenticated = false
            })
    },
})

export const { clearAuth } = authSlice.actions
