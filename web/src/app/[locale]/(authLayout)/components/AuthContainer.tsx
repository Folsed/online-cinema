import { EAuthFormType } from '@/types/auth.types'
import Link from 'next/link'
import { Separator } from '@/components/shadcn/separator'
import { useTranslations } from 'next-intl'

const AuthContainer = ({ type, children }: { type: EAuthFormType; children: React.ReactNode }) => {
    const t = useTranslations('AuthContainer')

    return (
        <div className='mt-10 flex flex-col items-center justify-center p-6 sm:mt-30'>
            <div className='w-full max-w-sm'>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-16'>
                        <h1 className='text-center text-3xl font-medium'>{t(type)}</h1>
                        <div className='flex flex-col gap-6'>
                            {children}
                            {(type === EAuthFormType.Login || type === EAuthFormType.Register) && (
                                <div className='text-primary flex h-6 items-center justify-center gap-2 text-sm font-semibold uppercase max-sm:text-xs'>
                                    {type === EAuthFormType.Login ? (
                                        <>
                                            <Link
                                                href='/reset-password/request'
                                                className='duration-200 hover:text-white'
                                            >
                                                {t('forgot')}
                                            </Link>
                                            <Separator
                                                orientation='vertical'
                                                className='bg-white'
                                            />
                                        </>
                                    ) : (
                                        <span className='text-muted-foreground normal-case'>
                                            {t('exists')}
                                        </span>
                                    )}
                                    <Link
                                        href={type === EAuthFormType.Login ? '/register' : '/login'}
                                        className='duration-200 hover:text-white'
                                    >
                                        {type === EAuthFormType.Login
                                            ? t('create-account')
                                            : t('log-in')}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthContainer
