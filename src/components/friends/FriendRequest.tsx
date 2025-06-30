'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';

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
  const [localRequests, setLocalRequests] = useState<FriendRequest[]>(requests);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Real-time subscription for new/updated friend requests
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const channel = supabase
      .channel('friend_requests')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'friend_requests',
          filter: `or=(sender_id.eq.${userId},receiver_id.eq.${userId})`,
        },
        (payload) => {
          const req = payload.new as FriendRequest;
          setLocalRequests((prev) => {
            // Remove if rejected or accepted
            if (req.status === 'rejected' || req.status === 'accepted') {
              return prev.filter((r) => r.id !== req.id);
            }
            // Add or update the request
            const exists = prev.find((r) => r.id === req.id);
            if (exists) {
              return prev.map((r) => (r.id === req.id ? req : r));
            }
            return [...prev, req];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const handleAccept = async (id: string) => {
    setLoadingId(id);
    await fetch('/api/friends', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId: id, status: 'accepted' }),
    });
    setLoadingId(null);
  };

  const handleReject = async (id: string) => {
    setLoadingId(id);
    await fetch('/api/friends', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId: id, status: 'rejected' }),
    });
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
