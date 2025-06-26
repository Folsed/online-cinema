import React from 'react'
import { IMediaDetails } from '@/types/media.types'
import Image from 'next/image'
import Link from 'next/link'
import RuntimeDisplay from '@/components/ui/RuntimeDisplay'
import { Dot, Star } from 'lucide-react'
import ReviewStars from '@/components/ui/ReviewStars'
import { Separator } from '@/components/shadcn/separator'

const Details = ({ details }: { details: IMediaDetails }) => {
    const releaseDate = new Date(details.releaseDate).getFullYear()

    return (
        <div>
            <div className='flex gap-4'>
                <div className='max-w-[200px]'>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}${details.poster.url}`}
                        alt={details.poster.altText}
                        width={details.poster.width}
                        height={details.poster.height}
                        priority
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='max-w-[300px]'>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}${details.logo.url}`}
                            alt={details.logo.altText}
                            width={350}
                            height={200}
                            className='h-auto w-auto object-contain'
                            priority
                        />
                    </div>
                    <h1 className='text-xl font-semibold'>{details.posterTitle}</h1>
                    <ul className='flex gap-2'>
                        {details.genres.map(item => (
                            <li
                                className='bg-secondary hover:bg-tertiary-hover transition-all duration-200'
                                key={item.slug}
                            >
                                <Link href={`/browse/${item.slug}`} className='px-2 py-2 text-sm'>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className='flex items-center gap-1'>
                        <RuntimeDisplay runtime={details.runtime} />
                        <Dot className='text-tertiary-hover' />
                        <span>{releaseDate}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <ReviewStars size={32} isUsable stars={3.56} infoEnabled />
                        <Separator orientation='vertical' />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details


// <div className={styles.synopsis}>
//     <p className={styles.synBlockText}>
//     {data.synopsis.split('\n').map((paragraph, index) => (
//             <React.Fragment key={index}>
//                 {paragraph}
//                 <br />
//             </React.Fragment>
//         ))}
// </p>
// </div>