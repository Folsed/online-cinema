'use client'
import { useAppSelector } from '@/store/hooks'
import {
    Bookmark,
    ChevronDown,
    ListVideo,
    LogOut,
    Settings,
    UserRound,
    UserRoundPen,
} from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { useLogoutMutation } from '@/store/features/auth/authApiSlice'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu'
import Image from 'next/image'
import { Separator } from '@/components/shadcn/separator'

const UserDropdown = () => {
    const user = useAppSelector(state => state.auth)
    const [logout] = useLogoutMutation()
    const [active, setActive] = useState(false)

    const handleDismiss = useCallback(() => {
        setActive(false)
    }, [])

    const handleLogout = async () => {
        await logout()
        handleDismiss()
    }
    return (
        <DropdownMenu modal={false} onOpenChange={setActive} open={active}>
            <DropdownMenuTrigger asChild>
                <button
                    className={`${active ? 'bg-tertiary-active' : ''} hover:hover:bg-tertiary-active hover:text-secondary-foreground flex h-full cursor-pointer items-center px-4 duration-200`}
                >
                    {user.isAuthenticated ? (
                        <div className='flex items-center gap-1'>
                            <figure className='relative h-8 w-8 overflow-hidden rounded-full'>
                                <Image
                                    src={'/_dev/imgs/avatar.png'}
                                    fill
                                    sizes='64px'
                                    className='object-cover'
                                    alt={`${user.user?.user.name}`}
                                />
                            </figure>
                            <ChevronDown size={20} />
                        </div>
                    ) : (
                        <UserRound size={24} />
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='bg-tertiary-active -mt-1 border-0 p-0 py-2'
                align='start'
            >
                {user.isAuthenticated ? (
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
                                        alt={`${user.user?.user.name}`}
                                    />
                                </figure>
                                <div className=''>
                                    <span className='text-xl'>{user.user?.user.name}</span>
                                    <p className='text-primary text-xs italic'>Administrator</p>
                                </div>
                            </div>
                            <UserRoundPen size={24} className='text-muted-foreground' />
                        </Link>
                        <Separator />
                        <Link
                            href='/prfile'
                            className='hover:bg-tertiary-hover flex items-center px-4 py-4 gap-2'
                        >
                            <Settings />
                            Налаштування
                        </Link>
                        <Separator />
                        <Link
                            href='/prfile'
                            className='hover:bg-tertiary-hover flex items-center px-4 py-4 gap-2'
                        >
                            <Bookmark />
                            Дивитися пізніше (5)
                        </Link>
                        <Link
                            href='/prfile'
                            className='hover:bg-tertiary-hover flex items-center px-4 py-4 gap-2'
                        >
                            <ListVideo />
                            Мої списки
                        </Link>
                        <Separator />
                        <button
                            className='hover:bg-tertiary-hover flex items-center px-4 py-4 gap-2'
                            onClick={handleLogout}
                        >
                            <LogOut />
                            Вийти
                        </button>
                    </div>
                ) : (
                    <div className=''>
                        <Link
                            href='/login'
                            className='hover:bg-tertiary-hover flex flex-col items-start px-4 py-1'
                        >
                            Увійти
                            <span className='italic text-muted-foreground text-sm'>Увійдіть, щоб побачити рекомендації</span>
                        </Link>
                        <Link
                            href='/register'
                            className='hover:bg-tertiary-hover flex flex-col items-start px-4 py-1'
                        >
                            Зареєструватися
                            <span className='italic text-muted-foreground text-sm'>Приєднуйтесь до нашої спільноти</span>
                        </Link>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown
