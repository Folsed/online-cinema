import React, { useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bookmark, ListVideo, LogOut, Settings, UserRoundPen } from 'lucide-react'
import { Separator } from '@/components/shadcn/separator'
import { IUserData } from '@/types/user.types'
import { useLogoutMutation } from '@/store/features/auth/authApiSlice'

const UserActions = ({
    user,
    setActive,
}: {
    user: IUserData | null
    setActive: (value: boolean) => void
}) => {
    const [logout] = useLogoutMutation()

    const handleDismiss = useCallback(() => {
        setActive(false)
    }, [])

    const handleLogout = async () => {
        await logout()
        handleDismiss()
    }
    return (
        <div className='flex flex-col gap-4'>
            <Link
                href='/profile'
                className='hover:bg-tertiary-hover flex items-center gap-24 px-4 py-2'
            >
                <div className='flex items-center gap-4'>
                    <figure className='relative h-12 w-12 overflow-hidden rounded-full'>
                        <Image
                            src={'/_dev/imgs/avatar.png'}
                            fill
                            sizes='64px'
                            className='object-cover'
                            alt={`${user?.user.name}`}
                        />
                    </figure>
                    <div className=''>
                        <span className='text-xl'>{user?.user.name}</span>
                        <p className='text-primary text-xs italic'>Administrator</p>
                    </div>
                </div>
                <UserRoundPen size={24} className='text-muted-foreground' />
            </Link>
            <Separator />
            <Link
                href='/prfile'
                className='hover:bg-tertiary-hover flex items-center gap-2 px-4 py-4'
            >
                <Settings />
                Налаштування
            </Link>
            <Separator />
            <Link
                href='/prfile'
                className='hover:bg-tertiary-hover flex items-center gap-2 px-4 py-4'
            >
                <Bookmark />
                Дивитися пізніше (5)
            </Link>
            <Link
                href='/prfile'
                className='hover:bg-tertiary-hover flex items-center gap-2 px-4 py-4'
            >
                <ListVideo />
                Мої списки
            </Link>
            <Separator />
            <button
                className='hover:bg-tertiary-hover flex items-center gap-2 px-4 py-4'
                onClick={handleLogout}
            >
                <LogOut />
                Вийти
            </button>
        </div>
    )
}

export default UserActions
