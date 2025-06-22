import React, { ChangeEventHandler } from 'react'
import { Label } from '@/components/shadcn/label'
import { Input } from '@/components/shadcn/input'

interface IFormInputProps {
    id: string
    label: string
    type?: React.HTMLInputTypeAttribute
    required?: boolean
    value?: string
    onChange: ChangeEventHandler<HTMLInputElement>
    optionalNote?: string
    className?: string
}

const FormInput: React.FC<IFormInputProps> = ({
    id,
    label,
    type = 'text',
    required = false,
    value,
    onChange,
    optionalNote,
    className,
}) => {
    return (
        <div className={`relative grid gap-2 ${className}`}>
            <Input
                id={id}
                type={type}
                placeholder=''
                required={required}
                value={value}
                onChange={onChange}
                className='peer focus:border-primary block w-full appearance-none rounded-md border bg-white'
            />
            <Label
                htmlFor={id}
                className={`peer-focus:text-primary pointer-events-none absolute -top-4 left-0 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-3 peer-focus:-top-4 peer-focus:left-0`}
            >
                {label}
                {optionalNote && <span className='text-muted-foreground'> {optionalNote}</span>}
            </Label>
        </div>
    )
}

export default FormInput
