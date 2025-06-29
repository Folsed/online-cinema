import React from 'react'
import { getServerSession } from '@/lib/api/session'
import { redirect } from 'next/navigation'

const Page = async () => {
    const session = await getServerSession()

    if (!session) {
        redirect('/login')
    }

    return <div>Profile</div>
}

export default Page
