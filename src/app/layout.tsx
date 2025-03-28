import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs';
import StarLoader from './components/Loader';
import { ThemeProvider } from 'next-themes';
import ThemeCom from './components/ThemeCom';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Simoldes',
  description: 'Project developed by Josn group to Simoldes during a college work'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ClerkLoading>
             <StarLoader />
          </ClerkLoading>
          <ClerkLoaded>
          <ThemeProvider>
            <ThemeCom>
              {children}
            </ThemeCom>
          </ThemeProvider>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
