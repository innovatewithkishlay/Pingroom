import { ReactNode } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import { auth } from '@clerk/nextjs/server';
interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
