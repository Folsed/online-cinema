import LogoInscription from '@/components/svgs/LogoInscription'
import Link from 'next/link'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex h-screen w-full flex-col'>
            <div
                className={`absolute top-0 right-0 bottom-0 left-0 z-0 bg-[url('/auth-background.png')] bg-cover bg-right bg-no-repeat bg-origin-content opacity-10 2xl:bg-contain`}
            />
            <header className='flex h-[80px] w-full items-center justify-center bg-gradient-to-b from-pink-950'>
                <Link
                    href='/'
                    className='fill-primary z-10 inline-flex h-fit items-center justify-center duration-200 hover:fill-[#ffe9ac]'
                >
                    <LogoInscription className='h-[30px]' />
                </Link>
            </header>
            <main className='z-20'>{children}</main>
        </div>
    )
}

export default AuthLayout
