import React from 'react'
import AuthForm from '@/app/(authLayout)/components/AuthForm'
import { EAuthFormType } from '@/types/auth.types'

const RegisterPage = () => {
    return <AuthForm type={EAuthFormType.Register} />
}

export default RegisterPage
