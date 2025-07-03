'use client'
import React from 'react'
import Image from 'next/image'
import { _tabs } from '@/app/[locale]/(defaultLayout)/account/components/_tabs'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useAppSelector } from '@/store/hooks'
import { usePathname } from '@/i18n/navigation'

const AccountNav = () => {
    const pathname = usePathname()
    const t = useTranslations('Account')
    const user = useAppSelector(state => state.auth.user?.user)

    return (
        <nav className='no-scrollbar mt-4 -mr-4 flex overflow-auto text-nowrap lg:ml-32'>
            <div className='text-span flex items-center text-sm uppercase md:text-base'>
                <figure className='relative mr-1 h-6 w-6 overflow-hidden rounded-[2px]'>
                    <Image
                        src={'/_dev/imgs/avatar.png'}
                        fill
                        sizes='64px'
                        className='object-cover'
                        alt={`${user?.name}`}
                    />
                </figure>
                <div className='flex'>
                    {_tabs.map((item, index) => {
                        const isActive =
                            item.link === pathname || pathname.startsWith(`${item.link}`)
                        return (
                            <div
                                className={`after:text-muted-foreground ${isActive ? 'text-foreground' : 'text-muted-foreground'} after:px-2 after:content-["/"] last:after:px-0 last:after:content-[""] md:after:px-3`}
                                key={index}
                            >
                                <Link
                                    href={item.link}
                                    className={`hover:text-foreground relative px-2 py-1 transition-colors duration-200 ${
                                        isActive ? 'text-foreground' : 'text-muted-foreground'
                                    } `}
                                >
                                    {t('profile.nav.' + item.locale)}
                                    <span
                                        className={`bg-foreground absolute bottom-0 left-1/2 h-0.5 w-0 transition-[width,left] duration-200 ease-out ${
                                            isActive
                                                ? 'left-1/8 w-3/4'
                                                : 'left-1/2 w-0 hover:left-1/8 hover:w-3/4'
                                        } `}
                                    />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}

export default AccountNav
