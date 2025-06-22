'use client'
import React, { FormEvent } from 'react'
import FormInput from '@/app/(authLayout)/components/FormInput'
import { usePayload } from '@/hooks/usePayload'
import { IResetPasswordRequest } from '@/types/auth.types'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import { useResetPasswordRequestMutation } from '@/store/features/auth/authApiSlice'
import Link from 'next/link'
import ResetRequestSuccess from '@/app/(authLayout)/components/ResetRequestSuccess'

const ResetPasswordRequestForm = () => {
    const { payload, handleChange, isValid } = usePayload<IResetPasswordRequest>({ email: '' })
    const [passwordResetRequest, { isLoading, isSuccess }] = useResetPasswordRequestMutation()

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await passwordResetRequest(payload)
    }

    if (isSuccess) return <ResetRequestSuccess email={payload.email} />

    return (
        <form noValidate onSubmit={onSubmit} className='text-center'>
            <h2 className='text-muted-foreground -mt-10 text-center'>
                A link will be sent to your email address to reset your password. Your IP address
                may be logged for security purposes.
            </h2>
            <FormInput
                id='email'
                className='mt-12'
                label='Email Address'
                type='email'
                required
                value={payload.email}
                onChange={handleChange('email')}
            />
            <Button
                type='submit'
                disabled={!isValid}
                className='disabled:text-muted-foreground disabled:border-muted mt-12 w-full text-black uppercase disabled:border-2 disabled:bg-transparent'
            >
                {isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
                Send email
            </Button>
            <Button type='button' variant='ghost' className='mt-5 uppercase' asChild>
                <Link href='/login'>Cancel</Link>
            </Button>
        </form>
    )
}

export default ResetPasswordRequestForm
