import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import Providers from '@todo/components/providers';
import {ThemeSwitcher} from '@todo/components/theme-switcher';
import BackButton from '@todo/components/ui/back-button';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Todo App',
    description: 'Made by Michal B',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return <html lang="en">
    <body className={inter.className}>
    <Providers>
        <div className="flex flex-col items-center gap-2 max-w-[82rem] w-full mx-auto p-4 sm:p-24">
            <div className='flex w-full justify-between'>
                <BackButton/>
                <ThemeSwitcher/>
            </div>
            {children}
        </div>
    </Providers>
    </body>
    </html>;
}
