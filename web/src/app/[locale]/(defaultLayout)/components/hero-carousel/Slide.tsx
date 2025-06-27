import Image from 'next/image'
import Link from 'next/link'
import { IHeroSlide } from '@/types/landing.types'
import { Button } from '@/components/shadcn/button'
import { Bookmark, Play } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ISlideProps {
    currentIndex: number
    index: number
    slide: IHeroSlide
}

const Slide: React.FC<ISlideProps> = ({ currentIndex, index, slide }) => {
    const t = useTranslations('HeroCarousel')
    return (
        <div
            className={`[grid-area:viewbox] [transition:opacity_.7s_ease] ${index === currentIndex ? 'z-[1] opacity-100' : 'z-0 opacity-0'}`}
        >
            <div className='content-padding'>
                <div className='grid aspect-[1/1.15] w-full grid-cols-[repeat(12,_1fr)] grid-rows-[1fr,_auto] content-end items-end gap-x-[0.625rem] md:aspect-[20/7] md:gap-[1.25rem] lg:gap-[1.875rem] lg:pt-[1.25rem]'>
                    <div className='pointer-events-none absolute top-0 left-0 -z-10 aspect-[2/3] w-full min-w-full md:aspect-[16/9]'>
                        <picture className='relative block h-full w-full'>
                            <source
                                media='(max-width: 768px)'
                                srcSet={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}${slide.mobile}`}
                            />
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}${slide.desktop}`}
                                fill
                                alt={slide.synopsis}
                                className='object-cover'
                                priority
                            />
                        </picture>
                        <div className='hero-carousel absolute inset-0 block aspect-[inherit] from-transparent to-black max-md:bg-gradient-to-b'></div>
                    </div>
                    <div className='hero_logo col-[4/span_6] row-start-1 grid md:col-[1/span_4] lg:col-[1/span_3]'>
                        <Link href={`/details/${slide.alias}`} className='relative max-w-[450px]'>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}${slide.logo.url}`}
                                width={450}
                                height={250}
                                alt={slide.logo.altText}
                                className='h-auto w-auto object-contain'
                                priority
                            />
                        </Link>
                    </div>
                    <div className='hero_meta col-[1/span_12] text-center md:col-[1/span_4] md:text-left'>
                        <span className='text-muted-foreground mt-2 inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                            {slide.genres.map((item, index) => {
                                return item.name + (index !== slide.genres.length - 1 ? ', ' : '')
                            })}
                        </span>
                        <p className='mt-1 hidden lg:line-clamp-4'>{slide.synopsis}</p>
                    </div>
                    <div className='hero_actions col-[1/span_12] row-start-3 flex gap-3 sm:col-[3/span_8] md:col-[1/span_3] lg:col-[1/span_2]'>
                        <Button
                            className='hover:bg-primary-hover h-10 w-fit flex-1 stroke-black px-8! font-semibold whitespace-nowrap text-black uppercase duration-200 lg:max-w-fit'
                            asChild
                        >
                            <Link href={`/details/${slide.alias}`}>
                                <Play style={{ scale: 1.6 }} />
                                {t('button')}
                            </Link>
                        </Button>
                        <Button className='text-primary border-primary hover:border-primary-hover hover:text-primary-hover h-10 w-fit max-w-fit flex-1 border-2 bg-transparent stroke-black font-semibold whitespace-nowrap uppercase duration-200 hover:bg-transparent'>
                            <Bookmark style={{ scale: 1.4 }} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Slide
