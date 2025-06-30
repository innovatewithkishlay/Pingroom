'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const subVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const featureVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const features = [
  {
    heading: "Real-time chat & DMs",
    desc: "Message instantly and privately, with no delays or distractions.",
  },
  {
    heading: "HD video calls & screen sharing",
    desc: "Connect face-to-face or share your screen in a single click.",
  },
  {
    heading: "Private, secure, no ads",
    desc: "Your conversations are encrypted and never sold.",
  },
  {
    heading: "Instant friend requests",
    desc: "Add, accept, or remove connections with a single tap.",
  },
  {
    heading: "Works on all your devices",
    desc: "Seamless experience on desktop, tablet, and mobile.",
  },
  {
    heading: "Always in sync, always fast",
    desc: "Stay updated everywhere, with lightning-fast performance.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Header: navigation only */}
      <header className="flex items-center justify-end px-8 py-6 z-10 backdrop-blur-sm">
        <nav className="flex gap-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/sign-in"
              className="group relative px-4 py-2 text-gray-400 hover:text-indigo-300 text-sm font-medium transition-all duration-300"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 rounded-lg bg-gray-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/sign-up"
              className="group relative px-4 py-2 text-gray-400 hover:text-indigo-300 text-sm font-medium transition-all duration-300"
            >
              <span className="relative z-10">Sign Up</span>
              <div className="absolute inset-0 rounded-lg bg-gray-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col md:flex-row items-stretch justify-stretch relative z-10">
        {/* Left: PingRoom hero, subheadline, CTA */}
        <section className="flex-1 flex flex-col justify-center px-8 md:pl-20 py-12">
          <AnimatePresence>
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold text-indigo-400 mb-3 tracking-tight"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              PingRoom
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl font-light text-gray-100 mb-4"
              variants={subVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ delay: 0.2 }}
            >
              Where connections flow.
            </motion.h2>
            <motion.p
              className="text-gray-400 text-base md:text-lg mb-8 max-w-md font-light leading-relaxed"
              variants={subVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ delay: 0.35 }}
            >
              Effortless chat, video calls, and collaboration.<br />
              <span className="text-indigo-300 font-medium">Minimal. Secure. Real-time.</span>
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ delay: 0.5 }}
            >
              <Link href="/sign-in" className="group relative overflow-hidden">
                <div className="relative px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-medium text-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/25">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
              <Link href="/sign-up" className="group relative overflow-hidden">
                <div className="relative px-8 py-3 bg-gray-800/50 backdrop-blur-sm text-gray-200 rounded-xl font-medium text-sm border border-gray-700/50 transition-all duration-300 group-hover:border-gray-600 group-hover:bg-gray-700/50">
                  <span className="relative z-10">Create Account</span>
                  <div className="absolute inset-0 bg-gray-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Right: 2-column features grid, animated by priority */}
        <section className="flex-1 flex flex-col justify-center px-8 md:pr-20 py-12">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mt-8 md:mt-0">
            {features.map((feature, idx) => (
              <motion.li
                key={feature.heading}
                className="group relative"
                variants={featureVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: 0.2 + idx * 0.13 }}
              >
                <div className="text-base md:text-lg font-semibold text-gray-100 mb-1 tracking-tight">
                  {feature.heading}
                </div>
                <div className="text-sm text-gray-400 font-light leading-snug max-w-xs">
                  {feature.desc}
                </div>
              </motion.li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer */}
      <motion.footer
        className="px-8 py-4 text-xs text-gray-500 flex justify-between items-center border-t border-gray-800/50 backdrop-blur-sm z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span>Made in India • Hindi & English friendly</span>
        <span>© {new Date().getFullYear()} PingRoom</span>
      </motion.footer>
    </div>
  );
}
