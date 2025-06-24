import { IHeroSlide } from '@/types/landing.types'
import Navigation from '@/app/[locale]/(defaultLayout)/components/hero-carousel/Navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface IContainerProps {
    children: React.ReactNode
    currentIndex: number
    updateIndex: (newIndex: number) => void
    slides: IHeroSlide[]
}

const Container: React.FC<IContainerProps> = ({ children, currentIndex, updateIndex, slides }) => {
    return (
        <div className='relative'>
            <div className='group relative grid [grid-template-areas:"viewbox"]'>
                {children}
                <Navigation slides={slides} currentIndex={currentIndex} updateIndex={updateIndex} />
            </div>
            <div className='hidden md:block'>
                <div className='absolute top-0 left-0 z-[1] flex h-full items-center'>
                    <button
                        className='fill-font hover:fill-span px-2 py-12 duration-200'
                        onClick={() => updateIndex(currentIndex - 1)}
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>
            </div>
            <div className='hidden md:block'>
                <div className='absolute top-0 right-0 z-[1] flex h-full items-center'>
                    <button
                        className='text-muted-foreground px-2 py-12 duration-200 hover:text-white'
                        onClick={() => updateIndex(currentIndex + 1)}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Container
