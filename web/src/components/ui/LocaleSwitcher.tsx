'use client'
import { usePathname, useRouter } from '@/i18n/navigation'
import { Button } from '@/components/shadcn/button'
import { useSearchParams } from 'next/navigation'

export function LocaleSwitcher() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const query = Object.fromEntries(searchParams.entries())

    const switchLocale = (locale: string) => {
        router.replace({ pathname, query }, { locale })
    }

    return (
        <div className='absolute right-0 bottom-0'>
            <div className='flex gap-2'>
                <Button variant='ghost' onClick={() => switchLocale('en')}>
                    EN
                </Button>
                <Button variant='ghost' onClick={() => switchLocale('uk')}>
                    UK
                </Button>
            </div>
        </div>
    )
}
