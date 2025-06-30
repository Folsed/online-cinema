'use client'
import React from 'react'
import Image from 'next/image'
import { _tabs } from '@/app/[locale]/(defaultLayout)/account/profile/components/_tabs'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useAppSelector } from '@/store/hooks'

const AccountNav = () => {
    const t = useTranslations('Account')
    const user = useAppSelector(state => state.auth.user?.user)

    return (
        <nav className='mt-4 hidden sm:flex lg:ml-32'>
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
                    {_tabs.map((item, index) => (
                        <div
                            className={`after:text-muted-foreground text-muted-foreground after:px-2 after:content-["/"] last:after:px-0 last:after:content-[""] md:after:px-3`}
                            key={index}
                        >
                            <Link
                                href={item.link}
                                className='hover:text-foreground [transition:color_.2s_ease]'
                            >
                                {t('profile.nav.' + item.locale)}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default AccountNav
