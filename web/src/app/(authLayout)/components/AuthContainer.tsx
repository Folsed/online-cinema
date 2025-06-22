'use client'
import React, { useState } from 'react'
import FormInput from '@/app/(authLayout)/components/FormInput'
import { Button } from '@/components/shadcn/button'
import { EAuthFormType, ILoginPayload, IRegisterPayload } from '@/types/auth.types'
import TermsCheckbox from '@/app/(authLayout)/components/TermsCheckbox'
import Link from 'next/link'
import { Separator } from '@/components/shadcn/separator'

const AuthForm = ({ type }: { type: EAuthFormType }) => {
    const FORM_TITLE: string = type.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
    const [payload, setPayload] = useState<IRegisterPayload | ILoginPayload>({
        username: '',
        email: '',
        password: '',
        acceptTerms: false,
    })

    const onChange = (field: keyof IRegisterPayload) => (val: string | boolean) =>
        setPayload(p => ({ ...p, [field]: val }))

    return (
        <div className='mb-56 flex flex-col items-center justify-center p-6'>
            <div className='w-full max-w-sm'>
                <div className='flex flex-col gap-6'>
                    <form noValidate>
                        <div className='flex flex-col gap-16'>
                            <h1 className='text-center text-3xl font-medium'>{FORM_TITLE}</h1>
                            <div className='flex flex-col gap-6'>
                                {type === EAuthFormType.Register && (
                                    <FormInput
                                        id='username'
                                        label='Username'
                                        type='text'
                                        required
                                        value={payload.username}
                                        // onChange={e =>
                                        //     setAuthPayload(prev => ({
                                        //         ...prev,
                                        //         email: e.target.value,
                                        //     }))
                                        // }
                                    />
                                )}
                                <FormInput
                                    id='email'
                                    label='Email Address'
                                    type='email'
                                    required
                                    // value={authPayload.email}
                                    // onChange={e =>
                                    //     setAuthPayload(prev => ({
                                    //         ...prev,
                                    //         email: e.target.value,
                                    //     }))
                                    // }
                                />

                                <FormInput
                                    id='password'
                                    label='Password'
                                    type='password'
                                    // value={authPayload.password}
                                    // onChange={e =>
                                    //     setAuthPayload(prev => ({
                                    //         ...prev,
                                    //         password: e.target.value,
                                    //     }))
                                    // }
                                />
                                {type === EAuthFormType.Register && <TermsCheckbox />}

                                <Button type='submit' className='mt-6 w-full text-black uppercase'>
                                    {/*{(registerIsLoading || loginIsLoading) && (*/}
                                    {/*    <Loader2 className='h-4 w-4 animate-spin' />*/}
                                    {/*)}*/}
                                    {/*{type === 'register' ? 'Sign up' : 'Log in'}*/}
                                    Log In
                                </Button>
                                <div className='text-primary flex h-6 items-center justify-center gap-4 font-semibold uppercase max-sm:text-xs'>
                                    {type === EAuthFormType.Login ? (
                                        <Link
                                            href='/reset-password/request'
                                            className='duration-200 hover:text-white'
                                        >
                                            Forgot Password?
                                        </Link>
                                    ) : (
                                        <span className='text-muted-foreground text-sm normal-case'>
                                            Already have an account?
                                        </span>
                                    )}
                                    <Separator orientation='vertical' className='bg-white' />
                                    <Link
                                        href={type === EAuthFormType.Login ? '/register' : '/login'}
                                        className='duration-200 hover:text-white'
                                    >
                                        {type === EAuthFormType.Login ? 'Create Account' : 'Log In'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthForm
