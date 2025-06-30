'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';

interface Friend {
  id: string;
  username: string;
  avatarUrl?: string | null;
  online?: boolean;
}

interface FriendListProps {
  friends: Friend[];
  onSelect: (friend: Friend) => void;
}

export default function FriendList({ friends, onSelect }: FriendListProps) {
  const [search, setSearch] = useState('');

  const filteredFriends = useMemo(
    () =>
      friends.filter(f =>
        f.username.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [search, friends]
  );

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl shadow-md p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-3"
      >
        <input
          className="w-full bg-gray-800 text-gray-100 text-sm rounded-lg px-3 py-2 outline-none placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 transition"
          type="text"
          placeholder="Search friends..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </motion.div>
      <div className="divide-y divide-gray-800">
        <AnimatePresence>
          {filteredFriends.length === 0 ? (
            <motion.div
              key="no-friends"
              className="text-gray-400 text-sm py-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No friends found.
            </motion.div>
          ) : (
            filteredFriends.map(friend => (
              <motion.button
                key={friend.id}
                className="w-full flex items-center gap-3 py-3 px-2 hover:bg-gray-800/70 rounded-lg transition group"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                onClick={() => onSelect(friend)}
              >
                {friend.avatarUrl ? (
                  <img
                    src={friend.avatarUrl}
                    alt={friend.username}
                    className="w-8 h-8 rounded-full object-cover border border-indigo-500"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold text-white">
                    {friend.username.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-light text-gray-100 group-hover:text-indigo-300 transition">
                  {friend.username}
                </span>
                {friend.online && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-green-400" title="Online" />
                )}
              </motion.button>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
