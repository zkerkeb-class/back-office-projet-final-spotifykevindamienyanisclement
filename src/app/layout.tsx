import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/UI/Header';
import Navbar from '@/components/UI/Navbar';
import './globals.css';

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className="container">
          <Navbar />
          <div className="page">{children}</div>
        </div>
      </body>
    </html>
  );
}
