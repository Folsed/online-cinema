import React from 'react'

interface IMediaGridProps {
    children: React.ReactNode
    title: string
}

const MediaGrid: React.FC<IMediaGridProps> = ({ children, title }) => {
    return (
        <section className='flex w-full flex-col items-center gap-6'>
            <div>
                <h1 className='mt-6 text-2xl capitalize'>{title}</h1>
            </div>
            <div className='mx-6 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
                {children}
            </div>
        </section>
    )
}

export default MediaGrid
