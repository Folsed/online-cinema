import { IHeroSlide } from '@/types/landing.types'

interface INavigationProps {
    currentIndex: number
    slides: IHeroSlide[]
    updateIndex: (newIndex: number) => void
}

const Navigation: React.FC<INavigationProps> = ({ slides, currentIndex, updateIndex }) => {
    return (
        <div className='content-padding relative z-[1] mt-4 block md:mt-6 lg:mt-12'>
            <div className='flex justify-center gap-2 md:justify-start'>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`bg-tertiary-hover relative h-2 overflow-hidden rounded-full duration-200 md:hover:bg-zinc-700 ${index === currentIndex ? 'w-12' : 'w-6'} `}
                        onClick={() => updateIndex(index)}
                    >
                        <span
                            className={`animate-progress bg-primary h-full w-full rounded-full opacity-0 ${index === currentIndex ? 'block' : 'hidden'} group-hover:[animation-play-state:paused]`}
                            onAnimationEnd={() => updateIndex(currentIndex + 1)}
                        ></span>
                    </button>
                ))}
            </div>
        </div>
    )
}
export default Navigation
