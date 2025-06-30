'use client'
import React, { useMemo, useState } from 'react'
import { StarOutlineIcon } from '@/components/ui/StarOutlineIcon'
import { StarFullIcon } from '@/components/ui/StarFullIcon'
import { StarHalfIcon } from '@/components/ui/StarHalfIcon'
import { useTranslations } from 'next-intl'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'

interface ReviewStarsProps {
    stars: number
    size?: number
    isUsable?: boolean
    infoEnabled?: boolean
    // rate?: number
    // setRate?: (rate: number) => void
}

const ReviewStars: React.FC<ReviewStarsProps> = ({
    stars,
    size = 24,
    isUsable = false,
    infoEnabled = false,
    // rate = 0,
    // setRate,
}) => {
    const t = useTranslations('rating')
    const [hover, setHover] = useState(0)
    const [rate, setRate] = useState(0) // remove when user has feedback
    const [interacting, setInteracting] = useState(false)

    const rounded = useMemo(() => Math.floor(stars), [stars])
    const hasHalf = useMemo(() => stars - rounded >= 0.5, [stars, rounded])
    const active = hover || rate

    const starsArray = useMemo(
        () =>
            Array.from({ length: 5 }, (_, i) => {
                if (!isUsable || (!rate && !interacting)) {
                    if (i < rounded) return <StarFullIcon key={i} size={size} />
                    if (i === rounded && hasHalf) return <StarHalfIcon key={i} size={size} />
                    return <StarOutlineIcon key={i} size={size} />
                }

                const filled = active > i
                const Icon = filled ? (
                    <StarFullIcon size={size} className={`${rate && 'text-primary'}`} />
                ) : (
                    <StarOutlineIcon
                        size={size}
                        className={`${interacting ? 'text-primary' : ''}`}
                    />
                )
                return (
                    <span
                        key={i}
                        className={filled && interacting ? 'text-primary' : ''}
                        onMouseOver={() => setHover(i + 1)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRate(i + 1)}
                    >
                        {Icon}
                    </span>
                )
            }),
        [rounded, hasHalf, isUsable, rate, interacting, hover, active, size]
    )

    return (
        <div className='flex flex-col'>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={`flex h-fit w-fit ${isUsable ? 'cursor-pointer' : 'pointer-events-none'}`}
                        onMouseOver={() => setInteracting(true)}
                        onMouseLeave={() => {
                            setInteracting(false)
                            setHover(0)
                        }}
                    >
                        {starsArray}
                    </div>
                </TooltipTrigger>

                {isUsable && infoEnabled && rate > 0 && (
                    <TooltipContent>
                        <span className='ml-2'>{t('stars', { count: rate })}</span>
                    </TooltipContent>
                )}
            </Tooltip>
        </div>
    )
}

export default ReviewStars
