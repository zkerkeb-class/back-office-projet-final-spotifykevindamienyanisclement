import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/UI/Header';
import Navbar from '@/components/UI/Navbar';
import './globals.css';
import UserProvider from '@/components/context/UserContext';

const geistSans = localFont({
  src: '../../public/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Spotify | Backoffice',
  description: 'Spotify Backoffice',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <div className="container">
            <Navbar />
            <div>{children}</div>
          </div>
        </body>
      </html>
    </UserProvider>
  );
}
