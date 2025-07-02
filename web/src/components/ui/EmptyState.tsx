import React from 'react'
import { useTranslations } from 'next-intl'
import { HeartCrack } from 'lucide-react'

const EmptyState = ({ localeLabel }: { localeLabel: string }) => {
    const t = useTranslations('states.empty')

    return (
        <div className='text-muted col-span-full row-span-full mt-24 flex flex-col items-center justify-center'>
            <HeartCrack className='size-[64px]' />
            <span className='max-w-[400px] text-center whitespace-pre-line'>{t(localeLabel)}</span>
        </div>
    )
}

export default EmptyState
