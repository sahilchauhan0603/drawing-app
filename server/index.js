// index.js
import express from 'express';
import { config } from "dotenv";    
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { connection } from "./database/connection.js";

// Load environment variables
config({ path: "./config/config.env" });

const app = express();
// Set up CORS
app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// socket
const server = http.createServer(app);
const io = new Server(server, {  // Initialize socket.io
    cors: {
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST"],
    },
});

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('user connected with ID:', socket.id);

  // Handle room joining
  socket.on('join-room', (room) => {
    socket.join(room);               //join the room
    console.log(`User with (ID: ${socket.id}) joined room: ${room}`); // Log the user and their room
  });


  // Handle drawing lines
  socket.on('draw line', ({ currentPoint, prevPoint, color, room }) => {
    socket.to(room).emit('draw line', { currentPoint, prevPoint, color });
    console.log("Line drawn in room:", room);
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


  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected from server with ID:', socket.id);
  });

});

//Database connection
connection();

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
