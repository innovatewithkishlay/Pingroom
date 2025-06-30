'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 to-gray-900 flex flex-col justify-between">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-8 py-4">
        <div className="text-xl font-semibold tracking-tight text-indigo-400">PingRoom</div>
        <nav className="flex gap-4">
          <Link href="/sign-in" className="text-gray-300 hover:text-indigo-400 transition text-sm font-medium">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-gray-300 hover:text-indigo-400 transition text-sm font-medium">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero and Features, spread out */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-12 gap-8">
        {/* Left: Tagline and Call to Action */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex-1 flex flex-col items-start"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4 leading-tight">
            Connect. Chat. Collaborate.<br />
            <span className="text-indigo-400 font-extrabold">PingRoom</span> is your modern workspace for real-time communication.
          </h1>
          <p className="text-gray-400 text-base md:text-lg mb-6 max-w-lg">
            Effortless messaging, instant video calls, and seamless friend management—built for teams, friends, and creators who value privacy and speed.
          </p>
          <div className="flex gap-4">
            <Link href="/sign-in" className="px-6 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition">
              Get Started
            </Link>
            <Link href="/sign-up" className="px-6 py-2 bg-gray-800 text-gray-200 rounded-md text-sm font-medium hover:bg-gray-700 transition">
              Create Account
            </Link>
          </div>
        </motion.div>

        {/* Right: Features, spread out in a grid */}
        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
          className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300"
        >
          <li className="flex items-center gap-3">
            <span className="text-indigo-400 text-lg">💬</span>
            Real-time 1:1 & group chat
          </li>
          <li className="flex items-center gap-3">
            <span className="text-yellow-300 text-lg">🎥</span>
            HD video calls & screen sharing
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-400 text-lg">🔒</span>
            Private, secure, no ads
          </li>
          <li className="flex items-center gap-3">
            <span className="text-pink-400 text-lg">⚡</span>
            Instant friend requests
          </li>
          <li className="flex items-center gap-3">
            <span className="text-blue-400 text-lg">🌐</span>
            Works on all your devices
          </li>
          <li className="flex items-center gap-3">
            <span className="text-gray-400 text-lg">🕒</span>
            Always in sync, always fast
          </li>
        </motion.ul>
      </main>

      {/* Footer */}
      <footer className="px-8 py-4 text-xs text-gray-500 flex justify-between items-center border-t border-gray-800">
        <span>Made in India • Hindi & English friendly</span>
        <span>© {new Date().getFullYear()} PingRoom</span>
      </footer>
    </div>
  );
}
