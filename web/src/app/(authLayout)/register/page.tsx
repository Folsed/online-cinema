import React from 'react'
import { EAuthFormType } from '@/types/auth.types'
import AuthContainer from '@/app/(authLayout)/components/AuthContainer'
import RegisterForm from '@/app/(authLayout)/components/RegisterForm'

const RegisterPage = () => {
    return (
        <AuthContainer type={EAuthFormType.Register}>
            <RegisterForm />
        </AuthContainer>
    )
}

export default RegisterPage
