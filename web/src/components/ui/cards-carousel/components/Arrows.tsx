import { RefObject, useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface IArrowsProps {
    trackRef: RefObject<HTMLDivElement>
}

const Arrows: React.FC<IArrowsProps> = ({ trackRef }) => {
    const [isActiveBack, setIsActiveBack] = useState<boolean>(false)
    const [isActiveForward, setIsActiveForward] = useState<boolean>(false)

    const handleScroll = useCallback(() => {
        const track = trackRef.current
        if (!track) return

        setIsActiveBack(track.scrollLeft > 0)
        setIsActiveForward(track.scrollLeft < track.scrollWidth - track.clientWidth)
    }, [trackRef])

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        track.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => {
            track.removeEventListener('scroll', handleScroll)
        }
    }, [trackRef, handleScroll])

    const handleClick = (way: string) => {
        const track = trackRef.current
        if (!track) return

        const { clientWidth } = track
        const scrollIncrement = way === 'forward' ? clientWidth : -clientWidth

        track.scrollTo({
            left: track.scrollLeft + scrollIncrement,
            behavior: 'smooth',
        })
    }

    return (
        <div className='hidden md:block'>
            <div
                className={`absolute top-1 bottom-2 left-0 z-[1] flex items-center ${isActiveBack ? 'block' : 'hidden'}`}
            >
                <button
                    className='group fill-span hover:fill-font h-full px-[calc((var(--content-inline-padding)-1.7rem)/2)] duration-200'
                    onClick={() => handleClick('')}
                >
                    <ChevronLeft size={24} className='z-[1]' />
                    <span className='absolute inset-0 -z-10 bg-gradient-to-l from-transparent to-[#000000] opacity-50 duration-200 group-hover:opacity-80'></span>
                </button>
            </div>
            <div
                className={`absolute top-1 right-0 bottom-2 z-[1] flex items-center ${isActiveForward ? 'block' : 'hidden'}`}
            >
                <button
                    className='group fill-span hover:fill-font h-full px-[calc((var(--content-inline-padding)-1.7rem)/2)] duration-200'
                    onClick={() => handleClick('forward')}
                >
                    <ChevronRight size={24} className='z-[1]' />
                    <span className='absolute inset-0 -z-10 bg-gradient-to-r from-transparent to-[#000000] opacity-50 duration-200 group-hover:opacity-80'></span>
                </button>
            </div>
        </div>
    )
}
export default Arrows
