import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
  const { userId } =await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Welcome to <span className="text-indigo-400">PingRoom</span>
        </h1>
        <p className="text-gray-300 max-w-lg mx-auto mb-8">
          Connect with your friends through chat and video calls in a modern, intuitive interface.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/sign-in"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition text-sm font-medium"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-6 py-3 bg-gray-800 text-gray-100 rounded-lg shadow hover:bg-gray-700 transition text-sm font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
