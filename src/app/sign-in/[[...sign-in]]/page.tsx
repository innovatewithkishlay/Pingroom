'use client';

import { SignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 to-gray-900">
      {/* Left Side - Content */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center px-12 xl:px-20"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-lg">
          <motion.h1
            className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Welcome back to{' '}
            <span className="text-indigo-400">PingRoom</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Connect with your friends through secure messaging, crystal-clear video calls, and seamless collaboration.
          </motion.p>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Real-time Messaging</h3>
                <p className="text-gray-400 text-sm">Instant, secure conversations with friends</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">HD Video Calls</h3>
                <p className="text-gray-400 text-sm">Crystal clear video with screen sharing</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Privacy First</h3>
                <p className="text-gray-400 text-sm">End-to-end encryption for all conversations</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-12 p-6 bg-gray-800/30 rounded-xl border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                AK
              </div>
              <div>
                <p className="text-white font-medium">Arjun Kumar</p>
                <p className="text-gray-400 text-sm">Product Designer</p>
              </div>
            </div>
          <p className="text-gray-300 text-sm italic">
  &quot;PingRoom has transformed how our team collaborates. The interface is so clean and the video quality is amazing!&quot;
</p>

          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Sign In Form */}
      <motion.div
        className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="w-full max-w-md">
          <SignIn 
            path="/sign-in" 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-gray-900/70 backdrop-blur-sm border border-gray-800 shadow-xl rounded-2xl overflow-hidden",
                headerTitle: "text-gray-200 text-2xl font-light",
                headerSubtitle: "text-gray-400 text-sm font-light",
                socialButtonsBlockButton: "bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors font-light",
                dividerLine: "bg-gray-800",
                dividerText: "text-gray-400 text-sm font-light",
                formFieldLabel: "text-gray-300 text-sm font-light",
                formFieldInput: "bg-gray-800/50 border-gray-700 text-gray-200 focus:ring-1 focus:ring-indigo-500 font-light",
                formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 transition-colors font-light",
                footerActionText: "text-gray-400 text-sm font-light",
                footerActionLink: "text-indigo-400 hover:text-indigo-300 transition-colors font-light"
              },
              variables: {
                colorPrimary: '#6366f1',
                colorText: '#e5e7eb',
                colorTextSecondary: '#9ca3af',
                colorBackground: '#1f2937',
                colorInputBackground: '#111827',
                colorInputText: '#f9fafb'
              }
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
