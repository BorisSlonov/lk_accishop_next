import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/header/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import Provider from '@/components/Provider';

const nunito = Nunito({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'accishop лк',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);


  return (
    <html lang='en'>
      <body className={`${nunito.className}  px-2 bg-zinc-200`}>
        <Provider session={session}>
          <div className='max-w-6xl mx-auto'>
            <NavBar />
            <div className='flex gap-4 w-full'>
            </div>
            <main className='my-4'>{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
