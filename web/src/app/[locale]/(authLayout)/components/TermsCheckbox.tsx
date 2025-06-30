import { Checkbox } from '@/components/shadcn/checkbox'
import { Label } from '@/components/shadcn/label'
import React, { ChangeEvent } from 'react'
import { useTranslations } from 'next-intl'

interface ITermsCheckboxProps {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}

const TermsCheckbox: React.FC<ITermsCheckboxProps> = ({ checked, onCheckedChange }) => {
    const t = useTranslations('AuthContainer.TermsCheckbox')

    return (
        <div className='flex items-center space-x-2'>
            <Checkbox
                id='terms'
                className='rounded-none'
                checked={checked}
                onCheckedChange={onCheckedChange}
            />
            <Label htmlFor='terms'>{t('label')}</Label>
        </div>
    )
}

export default TermsCheckbox
