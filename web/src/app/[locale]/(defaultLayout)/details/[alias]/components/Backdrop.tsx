import React from 'react'
import { IMediaImage } from '@/types/media.types'
import Image from 'next/image'

const Backdrop = ({ backdrop }: { backdrop: IMediaImage }) => {
    return (
        <div className='pointer-events-none absolute top-0 left-0 -z-10 aspect-[2/3] h-[80vh] w-full mask-b-from-60% md:aspect-[21/9]'>
            <div className='relative h-full w-full'>
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}${backdrop.url}`}
                    fill
                    alt={backdrop.altText}
                    className='object-cover object-top'
                    priority
                />
            </div>
        </div>
    )
}

export default Backdrop
