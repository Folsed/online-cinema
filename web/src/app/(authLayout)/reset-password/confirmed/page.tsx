import React from 'react'
import AuthContainer from '@/app/(authLayout)/components/AuthContainer'
import { EAuthFormType } from '@/types/auth.types'
import ResetPasswordConfirmForm from '@/app/(authLayout)/components/ResetPasswordConfirmForm'

const ConfirmPage = () => {
    return (
        <AuthContainer type={EAuthFormType.CreateNewPassword}>
            <ResetPasswordConfirmForm />
        </AuthContainer>
    )
}

export default ConfirmPage
