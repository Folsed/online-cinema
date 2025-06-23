import React from 'react'
import AuthContainer from '@/app/(authLayout)/components/AuthContainer'
import { EAuthFormType } from '@/types/auth.types'
import ResetPasswordRequestForm from '@/app/(authLayout)/components/ResetPasswordRequestForm'

const RequestPage = () => {
    return (
        <AuthContainer type={EAuthFormType.ResetPassword}>
            <ResetPasswordRequestForm />
        </AuthContainer>
    )
}

export default RequestPage
