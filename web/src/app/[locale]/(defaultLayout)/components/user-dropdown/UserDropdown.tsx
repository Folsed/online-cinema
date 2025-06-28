'use client'
import { useAppSelector } from '@/store/hooks'
import { ChevronDown, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu'
import Image from 'next/image'
import UserActions from '@/app/[locale]/(defaultLayout)/components/user-dropdown/UserActions'

const UserDropdown = () => {
    const user = useAppSelector(state => state.auth)
    const [active, setActive] = useState(false)

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
                    <UserActions user={user.user} setActive={setActive} />
                ) : (
                    <div className=''>
                        <Link
                            href='/login'
                            className='hover:bg-tertiary-hover flex flex-col items-start px-4 py-1'
                        >
                            Увійти
                            <span className='text-muted-foreground text-sm italic'>
                                Увійдіть, щоб побачити рекомендації
                            </span>
                        </Link>
                        <Link
                            href='/register'
                            className='hover:bg-tertiary-hover flex flex-col items-start px-4 py-1'
                        >
                            Зареєструватися
                            <span className='text-muted-foreground text-sm italic'>
                                Приєднуйтесь до нашої спільноти
                            </span>
                        </Link>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown
