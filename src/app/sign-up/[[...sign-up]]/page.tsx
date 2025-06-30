'use client';

import { SignUp } from '@clerk/nextjs';
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
            Join the <span className="text-indigo-400">PingRoom</span> community
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Start your journey with secure, modern communication.<br />
            Connect with friends, make video calls, and collaborate effortlessly.
          </motion.p>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <div>
              <div className="text-2xl font-bold text-indigo-400">10K+</div>
              <div className="text-gray-400 text-xs">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-400">99.9%</div>
              <div className="text-gray-400 text-xs">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-400">50M+</div>
              <div className="text-gray-400 text-xs">Messages Sent</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-400">24/7</div>
              <div className="text-gray-400 text-xs">Support</div>
            </div>
          </motion.div>

          {/* Benefits list */}
          <motion.ul
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            {[
              "Free to use with premium features",
              "No spam, ever. Your privacy matters",
              "Join thousands of satisfied users"
            ].map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="inline-block w-4 h-4 rounded-full bg-indigo-400/80 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {benefit}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      {/* Right Side - Sign Up Form */}
      <motion.div
        className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="w-full max-w-md">
          <SignUp 
            path="/sign-up"
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
