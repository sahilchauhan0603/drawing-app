'use client'
import { useDraw } from "./hooks/useDraw";
import{ ChromePicker} from "react-color";
import { useEffect, useState } from "react";
import { drawLine } from "../../utils/drawLine";
import { io } from "socket.io-client";

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'], // Ensure proper transport
});

export default function Home() {
  const [color , setColor] = useState<string>('#FFFFFF')
  const {canvasRef , onMouseDown , clear} = useDraw(createLine);

 function handleClear(){
  socket.emit('clear-all')
  console.log('clear from cliet')

 }

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')

    socket.emit('client-ready')

    socket.on('get-canvas-state' , () => {
      console.log('sending state to the server')
      if(!canvasRef.current?.toDataURL()) return 
      socket.emit('canvas-state' , canvasRef.current?.toDataURL())
      
    })

    socket.on('canvas-state-from-server', (state) => {
      console.log('recieving state from the server')
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
    socket.emit('draw line' , {currentPoint , prevPoint ,color})
    console.log("ref is send to server")
  }


  
  return (
    <div className=" w-screen h-screen flex justify-center items-center bg-black">
      <ChromePicker color={color}onChange={(e) => setColor(e.hex)} />
        <button onClick={handleClear} type="button" className="bg-white"> clear canvas</button>
      <canvas
      width={750}
      height={750}
      ref = {canvasRef}
      onMouseDown={onMouseDown}
      className="border border-back rounded-md "
    />
    </div>
    
  );
}
