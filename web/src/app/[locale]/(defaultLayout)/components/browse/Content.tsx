import React from 'react'
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/shadcn/dialog'
import Link from 'next/link'

const Content = () => {
    return (
        <DialogContent className='h-screen border-0 bg-[#101010] p-0 sm:max-w-full'>
            <DialogHeader className='sr-only'>
                <DialogTitle>Browse media | Каталог медіа</DialogTitle>
                <DialogDescription>
                    Вибір серіалу, аніме, фільму за різними критеріями | Choosing a TV series,
                    anime, or movie based on various criteria
                </DialogDescription>
            </DialogHeader>

            <article className='divide text grid h-full w-full grid-cols-[20%_1fr_1fr_20%] divide-x divide-gray-600/10'>
                <aside className='col-span-1 flex items-center justify-center'>
                    <ul className='flex flex-col gap-4 text-xl uppercase'>
                        <li className='group'>
                            <Link href='/' className='underline-hover'>
                                Home
                            </Link>
                        </li>
                        <li className='group'>
                            <Link href='/' className='underline-hover'>
                                Tv shows
                            </Link>
                        </li>
                        <li className='group'>
                            <Link href='/' className='underline-hover'>
                                Movies
                            </Link>
                        </li>
                        <li className='group'>
                            <Link href='/' className='underline-hover'>
                                Anime
                            </Link>
                        </li>
                        <li className='group'>
                            <Link href='/' className='underline-hover'>
                                Latest
                            </Link>
                        </li>
                        <li className='group'>
                            <Link href='/' className='underline-hover'>
                                My list
                            </Link>
                        </li>
                    </ul>
                </aside>

                {/* решта трьох колонок */}
                <main className='col-span-3 pl-4'>world</main>
            </article>
        </DialogContent>
    )
}

export default Content
