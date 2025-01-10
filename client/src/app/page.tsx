'use client'
import { useDraw } from "./hooks/useDraw";
import{ ChromePicker} from "react-color";
import { useEffect, useState } from "react";
import { drawLine } from "../../utils/drawLine";
import { io } from "socket.io-client";

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'], 
});

export default function Home() {
  const [color , setColor] = useState<string>('#FFFFFF')
  const {canvasRef , onMouseDown , clear} = useDraw(createLine);
  const [room , setRoom] = useState<string>('')

  function handleJoinRoom(){
    if(room.trim()){
      socket.emit('join-room' , room);
      console.log(`req to join room ${room}`)
    }
  }

 function handleClear(){
  socket.emit('clear-all',room)
  console.log('clear from cliet')

 }

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')

    socket.emit('client-ready' , room)

    socket.on('get-canvas-state' , () => {
      // console.log('sending state to the server')
      if(!canvasRef.current?.toDataURL()) return 
      socket.emit('canvas-state' ,{room , state :canvasRef.current?.toDataURL()} )
      
    })

    socket.on('canvas-state-from-server', (state) => {
      // console.log('recieving state from the server')
      const img = new Image()
      img.src = state;
      img.onload =() => {
        ctx?.drawImage(img , 0 , 0)
      }

    })

    socket.on('draw line' , ({currentPoint , prevPoint , color } : DrawLineProp) => {
      if(!ctx) return console.log("ctx does not exist ")
      console.log("ref recieved to client")
      drawLine({ctx , currentPoint , prevPoint ,color});
    })

    socket.on('clear-all-from-server' , clear)

    
  } , [canvasRef])


  function createLine({ctx , currentPoint , prevPoint } : Draw){
    drawLine({ctx , currentPoint , prevPoint ,color});
    socket.emit('draw line' , {currentPoint , prevPoint ,color , room})
    console.log("ref is send to server")
  }


  
  return (
  <div className="w-screen h-screen flex bg-black">
    {/* Left Panel */}
    <div className="flex flex-col justify-center items-start w-1/3 p-6 space-y-4 text-white">
      <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
      <button onClick={handleClear} type="button" className="bg-white text-black px-4 py-2 rounded">
        Clear Canvas
      </button>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Enter room name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="p-2 border text-black border-gray-300 rounded w-full"
        />
        <button
          onClick={handleJoinRoom}
          className="bg-white text-black ml-2 px-4 py-2 rounded"
        >
          Join Room
        </button>
      </div>
    </div>

    {/* Right Panel */}
    <div className="flex justify-center items-center w-2/3">
      <canvas
        width={750}
        height={750}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        className="border border-white rounded-md"
      />
    </div>
  </div>
);

}
