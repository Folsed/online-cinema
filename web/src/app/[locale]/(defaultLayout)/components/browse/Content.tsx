'use client'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/shadcn/dialog'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Trigger from '@/app/[locale]/(defaultLayout)/components/browse/Trigger'
import { IGenres } from '@/types/media.types'

import GenresCarousel from '@/app/[locale]/(defaultLayout)/components/browse/GenresCarousel'

const Content = ({ genres }: { genres: IGenres[] }) => {
    const router = useRouter()

    return (
        <Dialog>
            <Trigger />
            <DialogContent className='h-screen border-0 bg-[#101010] p-0 sm:max-w-full'>
                <DialogHeader className='sr-only'>
                    <DialogTitle>Browse media | Каталог медіа</DialogTitle>
                    <DialogDescription>
                        Вибір серіалу, аніме, фільму за різними критеріями | Choosing a TV series,
                        anime, or movie based on various criteria
                    </DialogDescription>
                </DialogHeader>

                <article className='divide text grid h-full w-full grid-cols-[15%_1fr_1fr_15%] divide-x divide-gray-600/10'>
                    <aside className='col-span-1 flex items-center justify-center'>
                        <ul className='flex flex-col gap-4 text-xl uppercase'>
                            <li className='group'>
                                <DialogClose
                                    className='underline-hover uppercase'
                                    onClick={() => router.push('/')}
                                >
                                    Home
                                </DialogClose>
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

                    <div className='col-span-3 flex items-center overflow-hidden'>
                        <GenresCarousel genres={genres} />
                    </div>
                </article>
            </DialogContent>
        </Dialog>
    )
}

export default Content
