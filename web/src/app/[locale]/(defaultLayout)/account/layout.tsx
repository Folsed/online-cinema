import React, { ReactNode } from 'react'
import AccountNav from '@/app/[locale]/(defaultLayout)/account/components/AccountNav'
import UserOverview from '@/app/[locale]/(defaultLayout)/account/components/UserOverview'
import { getServerSession } from '@/lib/api/session'
import { redirect } from 'next/navigation'

const AccountLayout = async ({ children }: { children: ReactNode }) => {
    const session = await getServerSession()

    if (!session) {
        redirect('/login')
    }
    return (
        <div className='content-padding'>
            <div className='mx-auto grid max-w-[calc(var(--content-inline-padding)*2+65rem)] gap-4 md:gap-8 lg:gap-16'>
                <AccountNav />
                <UserOverview />
                {children}
            </div>
        </div>
    )
}

export default AccountLayout
