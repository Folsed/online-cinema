import Header from '@/app/(defaultLayout)/components/header/Header'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=''>
            <Header />
            <main className=''>{children}</main>
        </div>
    )
}

export default DefaultLayout