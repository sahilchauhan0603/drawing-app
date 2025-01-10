// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');

app.use(cors({ origin: 'http://localhost:3001' }));

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
});

import { Socket } from "socket.io";


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

type DrawLine = {
  currentPoint : {x : number , y : number},
  prevPoint : {x : number , y : number} | null,
  color : string,
  room : string
}

io.on('connection' , (socket: Socket) => {
  socket.on('join-room', (room) => {
    socket.join(room)
    console.log(`join to the room ${room}`)
  })
  socket.on('draw line' , ({currentPoint , prevPoint , color , room} : DrawLine) => {

    socket.to(room).emit('draw line' , {currentPoint , prevPoint , color} );
    console.log("ref send fromm server room")
  })

  socket.on('client-ready' ,(room : string) => {
    socket.to(room).emit('get-canvas-state')
    // console.log('asking state from the cient')
  })

  socket.on('canvas-state' , ({room , state} : {room : string , state : string}) => {
    socket.to(room).emit('canvas-state-from-server' , state)
  })

  socket.on('clear-all' , (room) => {
    io.to(room).emit('clear-all-from-server')
    // console.log('clear from server')
  })
})

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


