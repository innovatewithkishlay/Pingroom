import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import './globals.css';
import Sidebar from '@/components/sidebar/Sidebar';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400'] 
});

export const metadata: Metadata = {
  title: 'PingRoom',
  description: 'Modern chat and calling application',
};

export default function RootLayout({
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
        <body className={`${inter.className} bg-gradient-to-br from-gray-900 to-gray-950 text-gray-200 flex h-screen`}>
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
