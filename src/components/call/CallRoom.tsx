'use client';

import { useEffect, useRef } from 'react';
import { useWebRTC } from '@/lib/webrtc';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface CallRoomProps {
  roomId: string;
  username: string;
  friendName: string;
}

export default function CallRoom({ roomId, username, friendName }: CallRoomProps) {
  const {
    localStream,
    remoteStream,
    isCalling,
    startCall,
    answerCall,
    leaveCall,
    shareScreen,
  } = useWebRTC(roomId);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl shadow-xl"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl items-center justify-center">
        <motion.div
          className="relative w-64 h-40 bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-2 left-2 text-xs text-gray-300 bg-gray-900/60 px-2 py-0.5 rounded">
            {username} (You)
          </span>
        </motion.div>
        <motion.div
          className="relative w-64 h-40 bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-2 left-2 text-xs text-gray-300 bg-gray-900/60 px-2 py-0.5 rounded">
            {friendName}
          </span>
        </motion.div>
      </div>
      <AnimatePresence>
        <motion.div
          className="flex gap-4 mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {!isCalling ? (
            <>
              <Button variant="default" size="lg" onClick={startCall}>
                Start Call
              </Button>
              <Button variant="secondary" size="lg" onClick={answerCall}>
                Answer
              </Button>
            </>
          ) : (
            <>
              <Button variant="destructive" size="lg" onClick={leaveCall}>
                Leave
              </Button>
              <Button variant="outline" size="lg" onClick={shareScreen}>
                Share Screen
              </Button>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
