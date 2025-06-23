'use client'
import React, { FormEvent, useEffect } from 'react'
import FormInput from '@/app/(authLayout)/components/FormInput'
import { usePayload } from '@/hooks/usePayload'
import { IResetPasswordConfirm, IResetPasswordRequest } from '@/types/auth.types'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import { useResetPasswordConfirmMutation } from '@/store/features/auth/authApiSlice'
import { useRouter, useSearchParams } from 'next/navigation'

const ResetPasswordConfirmForm = () => {
    const router = useRouter()
    const params = useSearchParams()
    const TOKEN = params.get('token') || ''

    const [passwordResetConfirm, { isLoading, isSuccess }] = useResetPasswordConfirmMutation()
    const { payload, handleChange } = usePayload<IResetPasswordConfirm>({
        token: TOKEN,
        newPassword: '',
        confirmPassword: '',
    })

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await passwordResetConfirm(payload)
    }

    const isValid =
        payload.newPassword.length > 6 &&
        payload.confirmPassword.length > 6 &&
        payload.newPassword === payload.confirmPassword

    useEffect(() => {
        if (isSuccess) {
            router.push('/login')
        }
    }, [isSuccess, router])

    return (
        <form className='flex flex-col gap-6' onSubmit={onSubmit}>
            <FormInput
                id='password'
                label='New Password'
                type='password'
                value={payload.newPassword}
                onChange={handleChange('newPassword')}
            />
            <FormInput
                id='password'
                label='Confirm Password'
                type='password'
                value={payload.confirmPassword}
                onChange={handleChange('confirmPassword')}
            />
            <Button
                type='submit'
                disabled={!isValid}
                className='disabled:text-muted-foreground disabled:border-muted mt-6 w-full text-black uppercase disabled:border-2 disabled:bg-transparent'
            >
                {isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
                Reset Password
            </Button>
        </form>
    )
}

export default ResetPasswordConfirmForm
