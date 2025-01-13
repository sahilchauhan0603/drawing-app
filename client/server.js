import { createServer } from 'node:http';
import { parse } from 'node:url';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000/', // Update with your frontend URL
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected with ID:', socket.id);

    // Handle joining rooms
    socket.on('join-room', (room) => {
      socket.join(room);
      console.log(`User with (ID: ${socket.id}) joined room: ${room}`);
    });

    // Handle drawing lines
    socket.on('draw line', ({ currentPoint, prevPoint, color, room }) => {
      socket.to(room).emit('draw line', { currentPoint, prevPoint, color });
      console.log('Line drawn in room:', room);
    });

    // Handle client ready state
    socket.on('client-ready', (room) => {
      if (room) { //change
        socket.to(room).emit('get-canvas-state');
        console.log('Requesting canvas state from client in room:', room);
      }
    });

    // Handle canvas state updates
    socket.on('canvas-state', ({ room, state }) => {
      if (room) {
        socket.to(room).emit('canvas-state-from-server', state);
      }
    });

    // Handle canvas clear
    socket.on('clear-all', (room) => {
      if (!room) {
        console.error('Invalid room');
        return;
      }
      console.log(`Clear canvas request received for room: ${room}`);
  
      io.in(room)
        .allSockets()
        .then((sockets) => {
          if (sockets.size === 0) {
            console.log(`No clients in room ${room} to clear canvas.`);
            return;
          }
          console.log(`Clients in room ${room}:`, Array.from(sockets));
          io.to(room).emit('clear-all-from-server');
          console.log(`Clear canvas event emitted to room: ${room}`);
        })
        .catch((error) => {
          console.error(`Error handling clear canvas for room ${room}:`, error);
        });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected with ID:', socket.id);
    });
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});
