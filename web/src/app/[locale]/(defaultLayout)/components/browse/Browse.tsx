import React from 'react'
import { Dialog, DialogOverlay, DialogPortal } from '@/components/shadcn/dialog'
import Trigger from '@/app/[locale]/(defaultLayout)/components/browse/Trigger'
import Content from '@/app/[locale]/(defaultLayout)/components/browse/Content'

const Browse = () => {
    return (
        <Dialog>
            <Trigger />
            <Content />
        </Dialog>
    )
}

export default Browse
