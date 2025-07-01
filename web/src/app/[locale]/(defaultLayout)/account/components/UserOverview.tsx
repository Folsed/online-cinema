'use client'
import React from 'react'
import { useAppSelector } from '@/store/hooks'
import Image from 'next/image'

const UserOverview = () => {
    const user = useAppSelector(state => state.auth.user?.user)
    const joined = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : undefined

    return (
        <div className='flex gap-2'>
            <figure className='relative aspect-square h-24 w-24 overflow-hidden rounded-[3px] md:h-32 md:w-32'>
                <Image
                    src={'/_dev/imgs/avatar.png'}
                    fill
                    sizes='256px'
                    className='object-cover'
                    alt={`${user?.name}`}
                />
            </figure>
            <div className='flex-1'>
                <div className='flex items-end justify-between'>
                    <div className='ml-1'>
                        <div className='flex gap-[3px]'>
                            <h1 className='text-2xl font-semibold sm:text-3xl'>{user?.name}</h1>
                            <div className='text-muted-foreground text-xs select-none'>
                                <span>he/him</span>
                            </div>
                        </div>

                        <div className='flex flex-col gap-1 sm:flex-row sm:gap-24 text-xs sm:text-sm'>
                            <div className='text-primary capitalize italic'>
                                <span>administrator</span>
                            </div>
                            <div className='uppercase'>
                                <span>приєднався </span>
                                <span>{joined}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <span className='mt-[.8rem] block h-[2px] w-full bg-gradient-to-r from-[#ffffff4d] to-black' />
            </div>
        </div>
    )
}

export default UserOverview
