'use client';

import { useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default function NotificationPopover({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  // Initial fetch
  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data.notifications || []));
  }, []);

  // Realtime subscription
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  // Mark as read
  const markAsRead = async (id: string) => {
    await fetch('/api/notifications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        className="relative"
        onClick={() => setOpen((o) => !o)}
        aria-label="Show notifications"
      >
        <span className="material-icons text-2xl text-gray-200">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
            {unreadCount}
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4">
              <h3 className="text-gray-300 font-semibold mb-2">Notifications</h3>
              {notifications.length === 0 && (
                <div className="text-gray-500 text-sm py-6 text-center">
                  No notifications.
                </div>
              )}
              <ul className="space-y-2">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className={`flex items-start gap-2 p-2 rounded-lg ${n.read ? 'bg-gray-800' : 'bg-indigo-900/30'}`}
                  >
                    <span
                      className={`mt-1 w-2 h-2 rounded-full ${
                        n.read
                          ? 'bg-gray-600'
                          : n.type === 'error'
                          ? 'bg-red-500'
                          : n.type === 'warning'
                          ? 'bg-yellow-400'
                          : 'bg-indigo-400'
                      }`}
                    />
                    <div className="flex-1 text-sm text-gray-200">{n.message}</div>
                    {!n.read && (
                      <button
                        className="ml-2 text-xs text-indigo-400 hover:underline"
                        onClick={() => markAsRead(n.id)}
                      >
                        Mark as read
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
