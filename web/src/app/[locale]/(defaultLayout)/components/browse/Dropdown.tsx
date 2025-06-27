'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'
import { IGenres } from '@/types/media.types'
import Link from 'next/link'
import { _links } from '@/app/[locale]/(defaultLayout)/components/browse/_links'
import { Separator } from '@/components/shadcn/separator'

const Dropdown = ({ genres }: { genres: IGenres[] }) => {
    const t = useTranslations('Header')
    const [active, setActive] = useState(false)

    const handleDismiss = useCallback(() => {
        setActive(false)
    }, [])

    return (
        <DropdownMenu modal={false} onOpenChange={setActive} open={active}>
            <DropdownMenuTrigger asChild>
                <button
                    className={`hover:bg-tertiary-active ${active ? 'bg-tertiary-active' : ''} hover:text-secondary-foreground flex h-full cursor-pointer items-center px-3 duration-200`}
                >
                    <span>{t('catalog')}</span>
                    <ChevronDown size={20} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='bg-tertiary-active -mt-1 grid grid-cols-[175px_1px_1fr] border-0 p-4'
                align='start'
            >
                <div className='col-span-1 mt-4 flex'>
                    <ul className='text-md flex flex-col font-light'>
                        {_links.map(item => (
                            <li key={item.locale}>
                                <Link
                                    href={item.href}
                                    onClick={handleDismiss}
                                    className='hover:bg-tertiary-hover flex h-full w-full p-2'
                                >
                                    {t('BrowseLinks.' + item.locale)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Separator orientation='vertical' />
                <div className='flex flex-col gap-2 p-4'>
                    <span className='px-2'>Genres</span>
                    <Separator />
                    <ul className='grid h-full auto-cols-[200px] grid-flow-col grid-rows-5 gap-x-4'>
                        {genres.map(item => (
                            <li className='' key={item.slug}>
                                <Link
                                    href={`/browse/genres/${item.slug}`}
                                    onClick={handleDismiss}
                                    className='hover:bg-tertiary-hover flex h-full w-full items-center p-2 font-light'
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Dropdown
