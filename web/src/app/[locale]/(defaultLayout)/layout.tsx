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
        <div className='grid min-h-screen grid-rows-[60px_1fr_auto]'>
            <header className='row-start-1'>
                <Header locale={locale} />
            </header>
            <main className='row-start-2'>{children}</main>
            <footer className='row-start-3'>
                <Footer />
            </footer>
        </div>
    )
}

export default DefaultLayout
