import { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer, Socket as ServerSocket } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';

interface SocketWithIO extends NetSocket {
  server: HTTPServer & {
    io?: IOServer;
  };
}

interface ServerToClientEvents {
  created: () => void;
  joined: () => void;
  full: () => void;
  ready: () => void;
  offer: (offer: RTCSessionDescriptionInit) => void;
  answer: (answer: RTCSessionDescriptionInit) => void;
  'ice-candidate': (candidate: RTCIceCandidateInit) => void;
  leave: () => void;
}

interface ClientToServerEvents {
  join: (roomId: string) => void;
  ready: (roomId: string) => void;
  offer: (offer: RTCSessionDescriptionInit, roomId: string) => void;
  answer: (answer: RTCSessionDescriptionInit, roomId: string) => void;
  'ice-candidate': (candidate: RTCIceCandidateInit, roomId: string) => void;
  leave: (roomId: string) => void;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const socket = res.socket as SocketWithIO;

  if (socket.server.io) {
    res.end();
    return;
  }

  const io = new IOServer<ClientToServerEvents, ServerToClientEvents>(
    socket.server,
    {
      path: '/api/call',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    }
  );

  socket.server.io = io;

  io.on('connection', (socket: ServerSocket<ClientToServerEvents, ServerToClientEvents>) => {
    // Join a room for 1:1 calls
    socket.on('join', (roomId: string) => {
      const rooms = io.sockets.adapter.rooms;
      const room = rooms.get(roomId);

      if (!room) {
        socket.join(roomId);
        socket.emit('created');
      } else if (room.size === 1) {
        socket.join(roomId);
        socket.emit('joined');
      } else {
        socket.emit('full');
      }
    });

    // Notify others ready to start call
    socket.on('ready', (roomId: string) => {
      socket.broadcast.to(roomId).emit('ready');
    });

    // Forward offer SDP
    socket.on('offer', (offer: RTCSessionDescriptionInit, roomId: string) => {
      socket.broadcast.to(roomId).emit('offer', offer);
    });

    // Forward answer SDP
    socket.on('answer', (answer: RTCSessionDescriptionInit, roomId: string) => {
      socket.broadcast.to(roomId).emit('answer', answer);
    });

    // Forward ICE candidates
    socket.on('ice-candidate', (candidate: RTCIceCandidateInit, roomId: string) => {
      socket.broadcast.to(roomId).emit('ice-candidate', candidate);
    });

    // Handle leaving the room
    socket.on('leave', (roomId: string) => {
      socket.leave(roomId);
      socket.broadcast.to(roomId).emit('leave');
    });
  });

  res.end();
}
