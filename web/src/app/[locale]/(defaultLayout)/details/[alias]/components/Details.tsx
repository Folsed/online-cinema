import React from 'react'
import { IMediaDetails } from '@/types/media.types'
import Image from 'next/image'
import Link from 'next/link'
import RuntimeDisplay from '@/components/ui/RuntimeDisplay'
import { Bookmark, Dot, List, Play, Share2, Star } from 'lucide-react'
import ReviewStars from '@/components/ui/ReviewStars'
import { Separator } from '@/components/shadcn/separator'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/shadcn/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'
import Series from '@/app/[locale]/(defaultLayout)/details/[alias]/components/Series'
import Recommendations from '@/app/[locale]/(defaultLayout)/details/[alias]/components/Recommendations'

const Details = ({ details }: { details: IMediaDetails }) => {
    const releaseDate = new Date(details.releaseDate).getFullYear()
    const t = useTranslations()

    return (
        <article className='flex flex-col gap-6'>
            <header className='flex flex-col gap-4 max-sm:items-center sm:flex-row'>
                <figure className='max-w-[200px]'>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}${details.poster.url}`}
                        alt={details.poster.altText}
                        width={details.poster.width}
                        height={details.poster.height}
                        priority
                    />
                    <figcaption className='sr-only'>
                        {details.posterTitle} — {details.poster.type}
                    </figcaption>
                </figure>
                <div className='flex flex-col gap-2'>
                    <div className='w-full flex max-sm:justify-center'>
                        <figure className='max-w-[300px]'>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_STORAGE_URL}${details.logo.url}`}
                                alt={details.logo.altText}
                                width={350}
                                height={200}
                                className='h-auto w-auto object-contain'
                                priority
                            />
                            <figcaption className='sr-only'>
                                {details.posterTitle} — {details.logo.type}
                            </figcaption>
                        </figure>
                    </div>
                    <h1 className='text-xl font-semibold'>{details.posterTitle}</h1>
                    <ul className='flex gap-2' aria-label='Genres'>
                        {details.genres.map(item => (
                            <li key={item.slug}>
                                <Link
                                    href={`/browse/${item.slug}`}
                                    className='bg-secondary hover:bg-tertiary-hover px-2 py-1 text-sm transition-all duration-200'
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <dl className='flex items-center gap-1'>
                        <div className='flex items-center'>
                            <dt className='sr-only'>Тривалість | Duration</dt>
                            <dd>
                                <RuntimeDisplay runtime={details.runtime} />
                            </dd>
                        </div>
                        <dd>
                            <Dot className='text-tertiary-hover' />
                        </dd>
                        <div className='flex items-center'>
                            <dt className='sr-only'>Дата виходу | Release Date</dt>
                            <dd>
                                <time>{releaseDate}</time>
                            </dd>
                        </div>
                    </dl>
                    <div className='flex sm:items-center max-sm:flex-col sm:gap-2'>
                        <ReviewStars size={32} isUsable stars={3.56} infoEnabled />
                        <Separator orientation='vertical' />
                        <p>
                            {t('rating.avg')} <strong>4.56 (506)</strong>
                        </p>
                    </div>
                </div>
            </header>
            <Separator />
            <div role='group' aria-label='Media actions' className='flex gap-2 flex-wrap'>
                <Button className='text-primary border-primary hover:text-primary-hover hover:border-primary-hover border-2 bg-transparent uppercase hover:bg-transparent'>
                    <Play style={{ scale: 1.5 }} />
                    {t('buttons.watch')}
                </Button>
                <Button variant='ghost' className='text-muted-foreground uppercase'>
                    <Bookmark style={{ scale: 1.5 }} />
                    {t('buttons.list')}
                </Button>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant='ghost' className='text-muted-foreground uppercase'>
                            <List style={{ scale: 1.5 }} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>{t('buttons.my-list')}</span>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant='ghost' className='text-muted-foreground uppercase'>
                            <Share2 style={{ scale: 1.5 }} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>{t('buttons.share')}</span>
                    </TooltipContent>
                </Tooltip>
            </div>
            <section aria-labelledby='media-description'>
                {details.synopsis.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </section>
            <Series />
            <Recommendations />
        </article>
    )
}

export default Details
