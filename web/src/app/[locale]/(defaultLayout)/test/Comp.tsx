'use client'
import { useEffect, useRef, useState } from 'react'

const Example = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (!ref.current) return
        console.log('hello')
        setIsMouseDown(true)
        setStartX(e.pageX - ref.current.offsetLeft)
        setScrollLeft(ref.current.scrollLeft)
    }

    const handleMouseLeave = () => {
        setIsMouseDown(false)
    }

    const handleMouseUp = () => {
        setIsMouseDown(false)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (!isMouseDown || !ref.current) return
        e.preventDefault()
        const x = e.pageX - ref.current.offsetLeft
        const walk = (x - startX)
        ref.current.scrollLeft = scrollLeft - walk
    }

    return (
        <div
            className='no-scrollbar flex h-[700px] w-[1024px] items-center gap-12 overflow-x-scroll bg-neutral-800'
            ref={ref}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {cards.map(card => (
                <div
                    key={card.id}
                    className='relative h-[450px] w-[450px] shrink-0 overflow-hidden bg-neutral-200'
                ></div>
            ))}
        </div>
    )
}

export default Example

const cards = [
    {
        title: 'Title 1',
        id: 1,
    },
    {
        title: 'Title 2',
        id: 2,
    },
    {
        title: 'Title 3',
        id: 3,
    },
    {
        title: 'Title 4',
        id: 4,
    },
    {
        title: 'Title 5',
        id: 5,
    },
    {
        title: 'Title 6',
        id: 6,
    },
    {
        title: 'Title 7',
        id: 7,
    },
]
