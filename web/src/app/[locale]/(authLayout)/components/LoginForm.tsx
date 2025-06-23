'use client'
import React, { FormEvent, useEffect } from 'react'
import FormInput from '@/app/[locale]/(authLayout)/components/FormInput'
import { Button } from '@/components/shadcn/button'
import { useLoginMutation } from '@/store/features/auth/authApiSlice'
import { useRouter } from 'next/navigation'
import { usePayload } from '@/hooks/usePayload'
import { ILoginPayload } from '@/types/auth.types'
import { Loader2 } from 'lucide-react'

const LoginForm = () => {
    const [login, { isLoading, isSuccess, isError }] = useLoginMutation()
    const router = useRouter()
    const { payload, handleChange, isValid } = usePayload<ILoginPayload>({
        email: '',
        password: '',
    })

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await login(payload)
    }

    useEffect(() => {
        if (isSuccess) {
            router.push('/')
        }
    }, [isSuccess, router])

    return (
        <form className='flex flex-col gap-6' noValidate onSubmit={onSubmit}>
            <FormInput
                id='email'
                label='Email Address'
                type='email'
                required
                error={isError}
                value={payload.email}
                onChange={handleChange('email')}
            />

            <FormInput
                id='password'
                label='Password'
                type='password'
                error={isError}
                value={payload.password}
                onChange={handleChange('password')}
            />
            <Button
                type='submit'
                disabled={!isValid}
                className='disabled:text-muted-foreground disabled:border-muted mt-6 w-full text-black uppercase disabled:border-2 disabled:bg-transparent'
            >
                {isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
                Log In
            </Button>
        </form>
    )
}

export default LoginForm
