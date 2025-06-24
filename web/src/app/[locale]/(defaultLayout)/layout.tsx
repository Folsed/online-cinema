import Header from "@/app/[locale]/(defaultLayout)/components/header/Header";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='grid grid-rows-[60px_auto]'>
            <Header />
            <main className='row-start-2'>{children}</main>
        </div>
    )
}

export default DefaultLayout
