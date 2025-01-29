import { io } from "socket.io-client";

const socket = io('https://drawing-app-53cc.onrender.com', {
  transports: ['websocket', 'polling'],
});

export default socket