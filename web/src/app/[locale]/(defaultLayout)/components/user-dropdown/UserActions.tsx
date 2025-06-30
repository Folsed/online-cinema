import React, { useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bookmark, ListVideo, LogOut, Settings, UserRoundPen } from 'lucide-react'
import { Separator } from '@/components/shadcn/separator'
import { IUserData } from '@/types/user.types'
import { useLogoutMutation } from '@/store/features/auth/authApiSlice'
import { useRouter } from 'next/navigation'

const UserActions = ({
    user,
    setActive,
}: {
    user: IUserData | null
    setActive: (value: boolean) => void
}) => {
    const [logout] = useLogoutMutation()
    const router = useRouter()

    const handleDismiss = useCallback(() => {
        setActive(false)
    }, [])

    const handleLogout = async () => {
        handleDismiss()
        try {
            await logout().unwrap()
            router.push('/login')
            router.refresh()
        } catch (error) {
            console.error('Logout failed', error)
        }
    }

    return (
        <div className='flex flex-col gap-3'>
            <Link
                href={'/account/profile'}
                onClick={handleDismiss}
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
                href={'/account/profile'}
                onClick={handleDismiss}
                className='hover:bg-tertiary-hover flex items-center gap-2 px-4 py-4'
            >
                <Settings />
                Налаштування
            </Link>
            <Separator />
            <div className=''>
                <Link
                    href={'/account/profile'}
                    onClick={handleDismiss}
                    className='hover:bg-tertiary-hover flex items-center gap-2 px-4 py-4'
                >
                    <Bookmark />
                    Дивитися пізніше (5)
                </Link>
                <Link
                    href={'/account/profile'}
                    onClick={handleDismiss}
                    className='hover:bg-tertiary-hover flex items-center gap-2 px-4 py-4'
                >
                    <ListVideo />
                    Мої списки
                </Link>
            </div>
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
