'use client'
import React from 'react'
import Link from 'next/link'
import LogoInscription from '@/components/svgs/LogoInscription'
import Logo from '@/components/svgs/Logo'
import { ChevronDown, Menu, Search, UserRound } from 'lucide-react'
import { useLogoutMutation } from '@/store/features/auth/authApiSlice'
import { useAppSelector } from '@/store/hooks'
import { useTranslations } from 'next-intl'
import Browse from '@/app/[locale]/(defaultLayout)/components/browse/Browse'

const Header = () => {
    const t = useTranslations('Header')
    const [logout] = useLogoutMutation()
    const user = useAppSelector(state => state.auth.user?.user)

    const handleLogout = async () => {
        await logout()
    }

    return (
        <header className='bg-tertiary fixed z-50 flex h-[60px] w-full justify-center'>
            <div className='content-padding flex w-full justify-between max-md:p-0'>
                <div className='flex h-full'>
                    <button className='hover:bg-tertiary-active hover:text-secondary-foreground flex h-full cursor-pointer items-center rounded-none px-3 duration-200 md:hidden'>
                        <Menu size={28} />
                    </button>
                    <Link
                        href={'/'}
                        className='fill-primary flex items-center px-[10px] duration-200 hover:fill-[#ffe9ac]'
                    >
                        <LogoInscription className='hidden w-[150px] sm:block' />
                        <Logo className='block w-[35px] sm:hidden' />
                    </Link>

                    <div className='hidden md:flex'>
                        <Browse/>

                        <Link
                            href={''}
                            className='hover:bg-tertiary-active hover:text-secondary-foreground flex h-full cursor-pointer items-center px-3 duration-200'
                        >
                            {t('news')}
                        </Link>

                        <Link
                            href={''}
                            className='hover:hover:bg-tertiary-active hover:text-secondary-foreground flex h-full cursor-pointer items-center px-3 duration-200'
                        >
                            {t('manga')}
                        </Link>
                    </div>
                </div>
                <div className='flex h-full'>
                    <button
                        className='hover:hover:bg-tertiary-active hover:text-secondary-foreground flex h-full cursor-pointer items-center px-4 duration-200'
                        title='Пошук'
                    >
                        <Search size={22} />
                    </button>
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className='hover:hover:bg-tertiary-active hover:text-secondary-foreground flex h-full cursor-pointer items-center px-4 capitalize duration-200'
                        >
                            {user && user.name}
                        </button>
                    ) : (
                        <Link
                            className='hover:hover:bg-tertiary-active hover:text-secondary-foreground flex h-full cursor-pointer items-center px-4 duration-200'
                            href={'/login'}
                            title='Вхід в акаунт'
                        >
                            <UserRound size={24} />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
