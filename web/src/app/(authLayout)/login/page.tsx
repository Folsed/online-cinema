import React from 'react'
import AuthForm from '@/app/(authLayout)/components/AuthForm'
import { EAuthFormType } from '@/types/auth.types'

const LoginPage = () => {
    return <AuthForm type={EAuthFormType.Login} />
}

export default LoginPage
