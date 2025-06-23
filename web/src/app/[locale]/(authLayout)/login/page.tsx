import React from 'react'
import AuthContainer from '@/app/[locale]/(authLayout)/components/AuthContainer'
import { EAuthFormType } from '@/types/auth.types'
import LoginForm from '@/app/[locale]/(authLayout)/components/LoginForm'

const LoginPage = () => {
    return (
        <AuthContainer type={EAuthFormType.Login}>
            <LoginForm />
        </AuthContainer>
    )
}

export default LoginPage
