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
  color : string
}

io.on('connection' , (socket: Socket) => {
  socket.on('draw line' , ({currentPoint , prevPoint , color} : DrawLine) => {

    socket.broadcast.emit('draw line' , {currentPoint , prevPoint , color} );
    console.log("ref send fromm server")
  })

  socket.on('client-ready' ,() => {
    socket.broadcast.emit('get-canvas-state')
    console.log('asking state from the cient')
  })

  socket.on('canvas-state' , (data) => {
    socket.broadcast.emit('canvas-state-from-server' , data)
  })

  socket.on('clear-all' , () => {
    io.emit('clear-all-from-server')
    console.log('clear from server')
  })
})

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


