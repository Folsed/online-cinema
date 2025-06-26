import React from 'react'
import { DialogTrigger } from '@/components/shadcn/dialog'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

const Trigger = () => {
    const t = useTranslations('Header')

    return (
        <DialogTrigger asChild>
            <button className='hover:bg-tertiary-active hover:text-secondary-foreground flex h-full cursor-pointer items-center px-3 duration-200'>
                <span>{t('catalog')}</span>
                <ChevronDown size={20} />
            </button>
        </DialogTrigger>
    )
}

export default Trigger
