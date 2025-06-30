'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface FriendRequest {
  id: string;
  sender_id: string;
  senderName: string;
  senderAvatar?: string | null;
}

interface FriendRequestListProps {
  requests: FriendRequest[];
  onAccept: (requestId: string) => Promise<void> | void;
  onReject: (requestId: string) => Promise<void> | void;
}

export default function FriendRequestList({
  requests,
  onAccept,
  onReject,
}: FriendRequestListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAccept = async (id: string) => {
    setLoadingId(id);
    await onAccept(id);
    setLoadingId(null);
  };

  const handleReject = async (id: string) => {
    setLoadingId(id);
    await onReject(id);
    setLoadingId(null);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl shadow-md p-4 mt-4">
      <h3 className="text-sm font-medium text-gray-300 mb-3">Friend Requests</h3>
      <AnimatePresence>
        {requests.length === 0 ? (
          <motion.div
            key="no-requests"
            className="text-gray-400 text-sm py-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No pending requests.
          </motion.div>
        ) : (
          requests.map((req) => (
            <motion.div
              key={req.id}
              className="flex items-center gap-3 py-3 px-2 border-b border-gray-800 last:border-b-0"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            >
              {req.senderAvatar ? (
                <img
                  src={req.senderAvatar}
                  alt={req.senderName}
                  className="w-8 h-8 rounded-full object-cover border border-indigo-500"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold text-white">
                  {req.senderName.slice(0, 2).toUpperCase()}
                </div>
              )}
              <span className="text-sm font-light text-gray-100">{req.senderName}</span>
              <div className="ml-auto flex gap-2">
                <Button
                  size="sm"
                  variant="default"
                  disabled={loadingId === req.id}
                  onClick={() => handleAccept(req.id)}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={loadingId === req.id}
                  onClick={() => handleReject(req.id)}
                >
                  Reject
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
