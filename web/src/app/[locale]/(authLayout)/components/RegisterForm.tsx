'use client'
import React, { FormEvent, useEffect } from 'react'
import FormInput from '@/app/[locale]/(authLayout)/components/FormInput'
import { Button } from '@/components/shadcn/button'
import TermsCheckbox from '@/app/[locale]/(authLayout)/components/TermsCheckbox'
import { usePayload } from '@/hooks/usePayload'
import { IRegisterPayload } from '@/types/auth.types'
import { useRegisterMutation } from '@/store/features/auth/authApiSlice'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const RegisterForm = () => {
    const t = useTranslations('AuthContainer')
    const [register, { isLoading, isSuccess, isError }] = useRegisterMutation()
    const router = useRouter()
    const { payload, handleChange, isValid } = usePayload<IRegisterPayload>({
        username: '',
        email: '',
        password: '',
        acceptTerms: false,
    })

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await register(payload)
    }

    useEffect(() => {
        if (isSuccess) {
            router.push('/')
        }
    }, [isSuccess, router])

    return (
        <form className='flex flex-col gap-6' onSubmit={onSubmit} noValidate>
            <FormInput
                id='username'
                label='Username'
                type='text'
                error={isError}
                required
                value={payload.username}
                onChange={handleChange('username')}
            />
            <FormInput
                id='email'
                label='Email Address'
                type='email'
                error={isError}
                required
                value={payload.email}
                onChange={handleChange('email')}
            />

            <FormInput
                id='password'
                label='Password'
                error={isError}
                type='password'
                value={payload.password}
                onChange={handleChange('password')}
            />
            <TermsCheckbox
                checked={payload.acceptTerms}
                onCheckedChange={handleChange('acceptTerms')}
            />
            <Button
                type='submit'
                disabled={!isValid}
                className='disabled:text-muted-foreground disabled:border-muted mt-6 w-full text-black uppercase disabled:border-2 disabled:bg-transparent'
            >
                {isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
                {t('create-account')}
            </Button>
        </form>
    )
}

export default RegisterForm
