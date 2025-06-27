import Header from '@/app/[locale]/(defaultLayout)/components/header/Header'

const DefaultLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) => {
    const { locale } = await params
    return (
        <div className='grid grid-rows-[60px_auto]'>
            <Header locale={locale} />
            <main className='row-start-2'>{children}</main>
        </div>
    )
}

export default DefaultLayout
