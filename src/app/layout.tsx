import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Order GoHype',
  description: 'Order GoHype',
  icons: {
    icon: '/gohype.svg', // /public path
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' overflow-x-hidden bg-[#F8F8F8]'}>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
