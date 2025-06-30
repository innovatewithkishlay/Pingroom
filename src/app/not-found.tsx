'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[70vh] px-4"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="text-7xl font-bold text-indigo-500 mb-4 tracking-tight">404</div>
      <div className="text-xl md:text-2xl text-gray-200 mb-2 font-light">Page Not Found</div>
      <div className="text-gray-400 mb-8 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </div>
      <Link
        href="/dashboard"
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition text-sm font-medium"
      >
        Go to Dashboard
      </Link>
    </motion.div>
  );
}
