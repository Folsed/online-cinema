import { EAuthFormType, ILoginPayload, IRegisterPayload } from '@/types/auth.types'
import Link from 'next/link'
import { Separator } from '@/components/shadcn/separator'

const AuthContainer = ({ type, children }: { type: EAuthFormType; children: React.ReactNode }) => {
    const FORM_TITLE: string = type.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())

    return (
        <div className='mb-56 flex flex-col items-center justify-center p-6'>
            <div className='w-full max-w-sm'>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-16'>
                        <h1 className='text-center text-3xl font-medium'>{FORM_TITLE}</h1>
                        <div className='flex flex-col gap-6'>
                            {children}
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
                </div>
            </div>
        </div>
    )
}

export default AuthContainer
