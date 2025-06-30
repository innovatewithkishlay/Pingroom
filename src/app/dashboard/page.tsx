import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-light text-gray-200 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-medium text-indigo-400 mb-2">Friends</h2>
            <p className="text-gray-400">Connect with your friends</p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-medium text-indigo-400 mb-2">Messages</h2>
            <p className="text-gray-400">Chat with your connections</p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-medium text-indigo-400 mb-2">Calls</h2>
            <p className="text-gray-400">Start voice or video calls</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
