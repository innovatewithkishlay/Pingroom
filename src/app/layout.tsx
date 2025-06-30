import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider} from '@clerk/nextjs';
import { auth } from "@clerk/nextjs/server";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } =await auth();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: '#6366f1' },
      }}
    >
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-gradient-to-br from-gray-900 to-gray-950 text-gray-200 ${userId ? 'flex h-screen' : ''}`}>
          {userId && <Sidebar />}
          <main className={`${userId ? 'flex-1 overflow-y-auto p-4 md:p-6' : ''}`}>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
