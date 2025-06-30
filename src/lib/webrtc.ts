import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

type SignalEvent =
  | { type: 'offer'; offer: RTCSessionDescriptionInit }
  | { type: 'answer'; answer: RTCSessionDescriptionInit }
  | { type: 'ice-candidate'; candidate: RTCIceCandidateInit }
  | { type: 'ready' }
  | { type: 'leave' };

interface UseWebRTCReturn {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isCalling: boolean;
  startCall: () => Promise<void>;
  answerCall: () => Promise<void>;
  leaveCall: () => void;
  shareScreen: () => Promise<void>;
}

export function useWebRTC(roomId: string): UseWebRTCReturn {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isCalling, setIsCalling] = useState(false);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // Setup signaling connection
  useEffect(() => {
    const socket = io({
      path: '/api/call',
      transports: ['websocket'],
      upgrade: false,
    });
    socketRef.current = socket;

    socket.emit('join', roomId);

    socket.on('created', () => setIsCalling(false));
    socket.on('joined', () => setIsCalling(true));
    socket.on('full', () => alert('Room is full'));
    socket.on('ready', handleReady);
    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    socket.on('ice-candidate', handleICECandidate);
    socket.on('leave', handleLeave);

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [roomId]);

  // Handle signaling events
  const handleReady = useCallback(async () => {
    if (!pcRef.current) await createPeerConnection();
    if (localStream) {
      localStream.getTracks().forEach(track => {
        pcRef.current?.addTrack(track, localStream);
      });
    }
    const offer = await pcRef.current!.createOffer();
    await pcRef.current!.setLocalDescription(offer);
    socketRef.current?.emit('offer', offer, roomId);
  }, [localStream, roomId]);

  const handleOffer = useCallback(async (offer: RTCSessionDescriptionInit) => {
    if (!pcRef.current) await createPeerConnection();
    await pcRef.current!.setRemoteDescription(new RTCSessionDescription(offer));
    if (localStream) {
      localStream.getTracks().forEach(track => {
        pcRef.current?.addTrack(track, localStream);
      });
    }
    const answer = await pcRef.current!.createAnswer();
    await pcRef.current!.setLocalDescription(answer);
    socketRef.current?.emit('answer', answer, roomId);
  }, [localStream, roomId]);

  const handleAnswer = useCallback(async (answer: RTCSessionDescriptionInit) => {
    await pcRef.current?.setRemoteDescription(new RTCSessionDescription(answer));
  }, []);

  const handleICECandidate = useCallback(async (candidate: RTCIceCandidateInit) => {
    if (candidate) {
      await pcRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }, []);

  const handleLeave = useCallback(() => {
    pcRef.current?.close();
    pcRef.current = null;
    setRemoteStream(null);
    setIsCalling(false);
  }, []);

  // Create peer connection
  const createPeerConnection = useCallback(async () => {
    pcRef.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    pcRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.emit('ice-candidate', event.candidate, roomId);
      }
    };

    pcRef.current.ontrack = (event) => {
      setRemoteStream(prev => {
        if (prev) {
          prev.addTrack(event.track);
          return prev;
        }
        const newStream = new MediaStream([event.track]);
        return newStream;
      });
    };
  }, [roomId]);

  // Start call (get user media and notify peer)
  const startCall = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);
    socketRef.current?.emit('ready', roomId);
  }, [roomId]);

  // Answer call (get user media if not already)
  const answerCall = useCallback(async () => {
    if (!localStream) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
    }
    socketRef.current?.emit('ready', roomId);
  }, [localStream, roomId]);

  // Leave call
  const leaveCall = useCallback(() => {
    socketRef.current?.emit('leave', roomId);
    pcRef.current?.close();
    pcRef.current = null;
    setRemoteStream(null);
    setIsCalling(false);
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
  }, [localStream, roomId]);

  // Share screen
  const shareScreen = useCallback(async () => {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const videoTrack = screenStream.getVideoTracks()[0];
    if (localStream && pcRef.current) {
      const sender = pcRef.current.getSenders().find(s => s.track?.kind === 'video');
      if (sender) {
        sender.replaceTrack(videoTrack);
      }
      videoTrack.onended = () => {
        if (localStream.getVideoTracks().length > 0) {
          sender?.replaceTrack(localStream.getVideoTracks()[0]);
        }
      };
    }
  }, [localStream]);

  return {
    localStream,
    remoteStream,
    isCalling,
    startCall,
    answerCall,
    leaveCall,
    shareScreen,
  };
}
