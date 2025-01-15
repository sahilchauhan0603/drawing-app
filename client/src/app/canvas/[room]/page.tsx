'use client';
import { useDraw } from "@/hooks/useDraw";
import { useShape } from "@/hooks/useShape";
import { ChromePicker } from "react-color";
import { useEffect, useState } from "react";
import { drawLine, drawCircle, drawRectangle } from "@/utils/drawShapes";
import socket from "@/services/socket";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; 

export default function Canvas({params} : PostPageProps) {
  const [color, setColor] = useState<string>('#FFFFFF');
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);
  const [room, setRoom] = useState<string>('');
  const [selectedShape, setSelectedShape] = useState<"freehand" | "rectangle" | "circle" | "line">("freehand");
  const [colorPickerOpen, setColorPickerOpen] = useState(false);


  const router = useRouter(); 

  const { canvasRef: shapeCanvasRef} = useShape(({ ctx, startPoint, endPoint }) => {
    if (selectedShape === "rectangle") {
      drawRectangle({ ctx, startPoint, endPoint, color });
      socket.emit('draw-rectangle', { startPoint, endPoint, color, room });
      console.log(room)
      console.log("send to server")
    } else if (selectedShape === "circle") {
      drawCircle({ ctx, centerPoint: startPoint, endPoint, color });
      socket.emit('draw circle', { startPoint, endPoint, color, room });
    }
  });

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

  useEffect(() => {
    if (room.trim()) {
      handleJoinRoom(); 
    }
  }, [room]);  

  function handleJoinRoom() {
    if (room.trim()) {
      socket.emit('join-room', room);
      console.log(`Request to join room ${room}`);
      socket.emit('client-ready', room);

      toast.success(`successfully joined room - ${room}`, {
        position: "top-right",
      });
    }
  }

  function handleClear() {
 
    socket.emit('clear-all', room);
    console.log('Clear canvas request sent from client');
    toast.success("Canvas successfully cleared", {
      position: "top-right",
    });
  }

  function handleExit() {
    router.push('/'); // Navigate to the home page
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

    socket.on('draw circle', ({ startPoint, endPoint, color }: { startPoint: Point, endPoint: Point, color: string }) => {
      if (!ctx) return console.log("Context does not exist");
      drawCircle({ ctx, centerPoint: startPoint, endPoint, color });
    });

    socket.on('draw-rectangle', ({ startPoint, endPoint, color }: { startPoint: Point, endPoint: Point, color: string }) => {
      if (!ctx) return console.log("Context does not exist");
      console.log("recienved from server")
      drawRectangle({ ctx, startPoint, endPoint, color });
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
      socket.off('draw-rectangle');
    };
  }, [canvasRef, room , params , selectedShape , shapeCanvasRef]);

  function createLine({ ctx, currentPoint, prevPoint }: Draw) {
    if(selectedShape == 'freehand'){
      drawLine({ ctx, currentPoint, prevPoint, color });
      socket.emit('draw line', { currentPoint, prevPoint, color, room });
    }
    
  }

  function handleShapeChange(shape: "freehand" | "rectangle" | "circle" | "line") {
    setSelectedShape(shape);
  }

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
    }
  }, [color]);

  return (
    <div className="w-100 h-screen flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      {/* Left Panel */}
      <div className="fixed top-0 left-0 h-screen w-64 p-6 bg-gray-900 text-white flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">Collaborative Drawing Board</h1>
          
          {/* Color Picker */}
          <div className="relative">
            <button
              onClick={() => setColorPickerOpen(!colorPickerOpen)}
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-lg transform transition-transform duration-200 hover:scale-105"
            >
              {colorPickerOpen ? 'Hide Color Picker' : 'Show Color Picker'}
            </button>
            {colorPickerOpen && (
          <div className="absolute top-12 left-0">
            <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        </div>
            )}
    </div>
    
    {/* Shape Selection */}
    <div className="mt-4 space-y-2">
      <h2 className="text-lg font-semibold">Select Shape</h2>
      <button
        onClick={() => handleShapeChange("freehand")}
        className={`${
          selectedShape === "freehand" ? "bg-blue-600" : "bg-gray-600"
        } px-4 py-2 rounded shadow hover:bg-blue-700`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
      <button
        onClick={() => handleShapeChange("rectangle")}
        className={`${
          selectedShape === "rectangle" ? "bg-blue-600" : "bg-gray-600"
        } px-4 py-2 rounded shadow hover:bg-blue-700`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" fill="#fff" stroke="currentColor" stroke-width="2" /></svg>
      </button>
      <button
        onClick={() => handleShapeChange("circle")}
        className={`${
          selectedShape === "circle" ? "bg-blue-600" : "bg-gray-600"
        } px-4 py-2 rounded shadow hover:bg-blue-700`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#fff" stroke="currentColor" stroke-width="2" /></svg>
      </button>
    </div>
    
    {/* Clear Button */}
    <button
      onClick={handleClear}
      type="button"
      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
    </button>
  </div>
  
  {/* Exit Button */}
  <button
    onClick={handleExit}
    type="button"
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-lg transform transition-transform duration-200 hover:scale-105"
  >
    Exit
  </button>

 </div>


      {/* Right Panel */}
      <div className="flex justify-center items-center h-screen w-screen">
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={selectedShape === "freehand" ? canvasRef : shapeCanvasRef}
        onMouseDown={selectedShape === "freehand" ? onMouseDown : undefined}
        className="border border-white rounded-md shadow-lg bg-gray-100"
      />
    </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
