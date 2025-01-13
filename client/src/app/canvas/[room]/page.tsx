'use client';
import { useDraw } from "@/hooks/useDraw";
import { ChromePicker } from "react-color";
import { useEffect, useState } from "react";
import { drawLine } from "@/utils/drawLine";
import socket from "@/services/socket";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Canvas({params} : PostPageProps) {
  const [color, setColor] = useState<string>('#FFFFFF');
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);
 
  const [room, setRoom] = useState<string>('');

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
      console.log("Resolved Params:", resolvedParams);
      const currRoom = resolvedParams?.room;
      if (currRoom) {
        setRoom(currRoom);
        console.log("Current Room:", currRoom);
      } else {
        console.warn("No room found in resolved params.");
      }
    };

    resolveParams();
  }, [params]);
  // Step 2: Handle joining the room once the room state is set
  useEffect(() => {
    if (room.trim()) {
      handleJoinRoom();  // Join room when room is available
    }
  }, [room]);  

  function handleJoinRoom() {
    if (room.trim()) {
      socket.emit('join-room', room);
      console.log(`Request to join room ${room}`);
      socket.emit('client-ready', room);

      // Show success toast
      toast.success(`successfully joined room - ${room}`, {
        position: "top-right",
      });
    }
  }

   
  function handleClear() {
    
    if (room.trim()) {
      socket.emit('clear-all', room);
      console.log('Clear canvas request sent from client');
      toast.success("Canvas successfully cleared for room: " + room, {
        position: "top-right",
      });
    } else {
      clear(); // For single-user mode
      console.log('Clearing canvas locally (single-user mode)');
      toast.success("Canvas successfully cleared", {
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    
    const ctx = canvasRef.current?.getContext('2d');

    socket.on('get-canvas-state', () => {
      if (!canvasRef.current?.toDataURL()) return;
      socket.emit('canvas-state', { room, state: canvasRef.current?.toDataURL() });
    });

    socket.on('canvas-state-from-server', (state) => {
      const img = new Image();
      img.src = state;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    });

    socket.on('draw line', ({ currentPoint, prevPoint, color }: DrawLineProp) => {
      if (!ctx) return console.log("Context does not exist");
      drawLine({ ctx, currentPoint, prevPoint, color });
    });

    socket.on('clear-all-from-server', () => {
      clear();
      console.log('Canvas cleared from server');
    });

    return () => {
      socket.off('draw line');
      socket.off('clear-all-from-server');
      socket.off('get-canvas-state');
      socket.off('canvas-state-from-server');
      socket.off('clear-all-from-server'); // Clean up the listener
    };
  }, [canvasRef, room , params]);

  function createLine({ ctx, currentPoint, prevPoint }: Draw) {
    drawLine({ ctx, currentPoint, prevPoint, color });
    socket.emit('draw line', { currentPoint, prevPoint, color, room });
  }

  return (
    <div className="w-100 h-screen flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      
      {/* Left Panel */}
      <div className="flex flex-col justify-center items-start w-1/3 p-6 space-y-4 text-white">
        
        <h1 className="text-2xl font-bold mb-4">Collaborative Drawing Board</h1>
        <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        
        <button
          onClick={handleClear}
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-lg transform transition-transform duration-200 hover:scale-105"
        >
          Clear Canvas
        </button>
        
      </div>

      {/* Right Panel */}
      <div className="flex justify-center items-center w-2/3">
        <canvas
          width={800}
          height={550}
          ref={canvasRef}
          onMouseDown={onMouseDown}
          className="border border-white rounded-md shadow-lg bg-gray-100"
        />
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
