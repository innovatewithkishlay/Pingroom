import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'] 
});

export const metadata: Metadata = {
  title: 'PingRoom',
  description: 'Modern chat and calling application',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: '#6366f1' },
      }}
    >
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-gradient-to-br from-gray-950 to-gray-900 text-gray-200`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
