import { Checkbox } from '@/components/shadcn/checkbox'
import { Label } from '@/components/shadcn/label'
import React from 'react'

interface ITermsCheckboxProps {
    checked: boolean
    onChange: (value: boolean) => void
}

const TermsCheckbox: React.FC<ITermsCheckboxProps> = ({ checked, onChange }) => (
    <div className='flex items-center space-x-2'>
        <Checkbox
            id='terms'
            className='rounded-none'
            // checked={checked}
            // onCheckedChange={onChange}
        />
        <Label htmlFor='terms'>Accept terms and conditions</Label>
    </div>
)

export default TermsCheckbox
