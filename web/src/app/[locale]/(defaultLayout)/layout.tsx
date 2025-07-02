import Header from '@/app/[locale]/(defaultLayout)/components/header/Header'
import Footer from '@/app/[locale]/(defaultLayout)/components/footer/Footer'

const DefaultLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) => {
    const { locale } = await params
    return (
        <div className='flex min-h-screen flex-col'>
            <Header locale={locale} />
            <main className='flex-1 mt-[60px]'>{children}</main>
            <Footer />
        </div>
    )
}

export default DefaultLayout
