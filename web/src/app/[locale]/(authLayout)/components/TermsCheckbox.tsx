import { Checkbox } from '@/components/shadcn/checkbox'
import { Label } from '@/components/shadcn/label'
import React, { ChangeEvent } from 'react'

interface ITermsCheckboxProps {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}

const TermsCheckbox: React.FC<ITermsCheckboxProps> = ({ checked, onCheckedChange }) => (
    <div className='flex items-center space-x-2'>
        <Checkbox
            id='terms'
            className='rounded-none'
            checked={checked}
            onCheckedChange={onCheckedChange}
        />
        <Label htmlFor='terms'>Accept terms and conditions</Label>
    </div>
)

export default TermsCheckbox
