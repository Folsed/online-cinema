import React from 'react'
import { getServerSession } from '@/lib/api/session'
import { redirect } from 'next/navigation'
import UserOverview from '@/app/[locale]/(defaultLayout)/account/profile/components/UserOverview'
import AccountNav from '@/app/[locale]/(defaultLayout)/account/profile/components/AccountNav'

const ProfilePage = async () => {
    const session = await getServerSession()

    if (!session) {
        redirect('/login')
    }

    return (
        <div className='content-padding'>
            <div className='mx-auto grid max-w-[calc(var(--content-inline-padding)*2+65rem)] gap-8'>
                <AccountNav />
                <div className='mt-4 sm:mt-0'>
                    <UserOverview />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
