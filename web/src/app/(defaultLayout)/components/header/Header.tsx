import React from 'react'
import Link from 'next/link'
import LogoInscription from '@/components/svgs/LogoInscription'
import Logo from '@/components/svgs/Logo'
import { ChevronDown, Menu, Search, UserRound } from 'lucide-react'

const Header = () => {
    return (
        <div className='bg-tertiary fixed z-50 flex h-[60px] w-full justify-center'>
            <div className='content-padding flex w-full justify-between max-md:p-0'>
                <div className='flex h-full'>
                    <button className='hover:bg-tertiary-active hover:text-secondary-foreground flex h-full cursor-pointer items-center rounded-none px-3 duration-200 md:hidden'>
                        <Menu size={28} />
                    </button>
                    <Link
                        href={'/'}
                        className='fill-primary flex items-center px-[10px] duration-200 hover:fill-white'
                    >
                        <LogoInscription className='hidden w-[150px] sm:block' />
                        <Logo className='block w-[35px] sm:hidden' />
                    </Link>

                    <div className='hidden md:flex'>
                        <button className='hover:bg-tertiary-active hover:text-secondary-foreground flex h-full cursor-pointer items-center px-3 duration-200'>
                            <span>Каталог</span>
                            <ChevronDown size={20} />
                        </button>

                        <Link
                            href={''}
                            className='hover:bg-tertiary-active hover:text-secondary-foreground flex h-full cursor-pointer items-center px-3 duration-200'
                        >
                            Новини
                        </Link>

                        <Link
                            href={''}
                            className='hover:hover:bg-tertiary-active hover:text-secondary-foreground flex h-full cursor-pointer items-center px-3 duration-200'
                        >
                            Манга
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
                    <Link
                        className='hover:hover:bg-tertiary-active hover:text-secondary-foreground flex h-full cursor-pointer items-center px-4 duration-200'
                        href={'/login'}
                        title='Вхід в акаунт'
                    >
                        <UserRound size={24} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
