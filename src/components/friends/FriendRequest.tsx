'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface FriendRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: string;
  created_at: string;
  senderName: string;
  senderAvatar?: string | null;
}

interface FriendRequestListProps {
  requests: FriendRequest[];
  userId: string; 
}

export default function FriendRequestList({ requests, userId }: FriendRequestListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [localRequests, setLocalRequests] = useState(requests);

  const handleAccept = async (id: string) => {
    setLoadingId(id);
    try {
      const response = await fetch('/api/friends', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: id, status: 'accepted' }),
      });
      if (response.ok) {
        setLocalRequests(prev => prev.filter(req => req.id !== id));
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
    setLoadingId(null);
  };

  const handleReject = async (id: string) => {
    setLoadingId(id);
    try {
      const response = await fetch('/api/friends', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: id, status: 'rejected' }),
      });
      if (response.ok) {
        setLocalRequests(prev => prev.filter(req => req.id !== id));
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
    setLoadingId(null);
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl shadow-md p-4 mt-2">
      <AnimatePresence>
        {localRequests.length === 0 ? (
          <motion.div
            key="no-requests"
            className="text-gray-400 text-sm py-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No pending requests.
          </motion.div>
        ) : (
          localRequests.map((req) => (
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
              <span className="text-sm font-light text-gray-100">
                {req.senderName}
              </span>
              <div className="ml-auto flex gap-2">
                {req.receiver_id === userId && req.status === 'pending' && (
                  <>
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
                  </>
                )}
                {req.sender_id === userId && req.status === 'pending' && (
                  <span className="text-xs text-gray-400">Pending</span>
                )}
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
