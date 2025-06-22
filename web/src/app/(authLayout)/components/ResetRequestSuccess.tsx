import React from 'react'
import { CloudCheck } from 'lucide-react'

const ResetRequestSuccess = ({ email }: { email: string }) => {
    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            <CloudCheck size={128} className='text-primary' />
            <h3 className='text-xl'>Reset link has been sent</h3>
            <span className='text-muted-foreground text-center'>
                Please check your {email} inbox.
            </span>
        </div>
    )
}

export default ResetRequestSuccess
