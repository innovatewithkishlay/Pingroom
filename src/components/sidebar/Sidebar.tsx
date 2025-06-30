"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Users, MessageSquare, User, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
  { name: "Friends", path: "/friends", icon: <Users size={18} /> },
  { name: "Messages", path: "/messages", icon: <MessageSquare size={18} /> },
  { name: "Profile", path: "/profile", icon: <User size={18} /> },
];

export default function Sidebar() {
  const currentPath = usePathname();

  return (
    <motion.div 
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 200, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-52 bg-gray-800/20 backdrop-blur-sm border-r border-gray-700/50 h-full flex flex-col"
    >
      {/* Logo */}
      <motion.div 
        whileHover={{ scale: 1.03 }}
        className="p-4 border-b border-gray-700/30"
      >
        <h1 className="text-xl font-light tracking-tighter">
          <motion.span 
            className="text-indigo-400 font-normal"
            animate={{ opacity: [0.8, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Ping
          </motion.span>
          Room
        </h1>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          <AnimatePresence>
          {navItems.map((item) => (
            <motion.li 
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  currentPath.startsWith(item.path)
                    ? "bg-indigo-900/20 text-indigo-300"
                    : "text-gray-300 hover:bg-gray-700/30"
                }`}
              >
                <span className="text-indigo-400">{item.icon}</span>
                <span className="text-sm font-light">
                  {item.name}
                </span>
              </Link>
            </motion.li>
          ))}
          </AnimatePresence>
        </ul>
      </nav>

      {/* User Area */}
      <motion.div 
        whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.3)" }}
        className="p-3 border-t border-gray-700/30 flex items-center gap-3"
      >
        <UserButton afterSignOutUrl="/" />
        <div className="overflow-hidden">
          <motion.button
            whileHover={{ x: 2 }}
            className="flex items-center gap-1.5 text-xs text-gray-400 group"
          >
            <LogOut size={14} />
            <span className="group-hover:text-gray-200 transition-colors">
              Sign out
            </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
