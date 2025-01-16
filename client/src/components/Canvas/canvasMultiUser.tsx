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
import { FiX, FiMenu, } from "react-icons/fi";

export default function Canvas({params} : PostPageProps) {
  const [color, setColor] = useState<string>('#FFFFFF');
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);
  const [room, setRoom] = useState<string>('');
  const [selectedShape, setSelectedShape] = useState<"freehand" | "rectangle" | "circle" | "line">("freehand");
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
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
    if (room) {
      router.push(`/canvas/roomExit?room=${room}`);
    } else {
      router.push('/canvas/roomExit');
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
    <div className="w-100 flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen z-20 bg-gray-900 text-white p-4 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          {/* <h1 className="text-xl font-bold">Draw App</h1> */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        <button
          onClick={() => setColorPickerOpen(!colorPickerOpen)}
          className="w-full text-left py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 mb-4 transition-all"
        >
          {colorPickerOpen ? "Close Color Picker" : "Choose Color"}
        </button>
        {colorPickerOpen && (
          <div className="relative">
            <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
          </div>
        )}

        {/* Shape Selection */}
        <div className="mt-4 space-y-2">
          <h2 className="text-lg font-semibold">Select Shape</h2>
    
            <div className="flex space-x-2"> {/* Use flex to arrange buttons side by side */}
            {/* Freehand Button */}
            <div className="relative group">
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
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Freehand</span>
            </div>
        
            {/* Rectangle Button */}
            <div className="relative group">
              <button
                onClick={() => handleShapeChange("rectangle")}
                className={`${
                  selectedShape === "rectangle" ? "bg-blue-600" : "bg-gray-600"
                } px-4 py-2 rounded shadow hover:bg-blue-700`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" fill="#fff" stroke="currentColor" stroke-width="2" />
                </svg>
              </button>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Rectangle</span>
            </div>
        
            {/* Circle Button */}
            <div className="relative group">
              <button
                onClick={() => handleShapeChange("circle")}
                className={`${
                  selectedShape === "circle" ? "bg-blue-600" : "bg-gray-600"
                } px-4 py-2 rounded shadow hover:bg-blue-700`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" fill="#fff" stroke="currentColor" stroke-width="2" />
                </svg>
              </button>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Circle</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleClear}
          className="w-full py-2 px-4 bg-red-600 rounded-lg mt-2 hover:bg-red-700 transition-all"
        >
          Clear
        </button>

        {/* Exit Button */}
         <button
           onClick={handleExit}
           type="button"
           className="bg-blue-600 hover:bg-blue-700 text-white px-4 mt-2 py-2 rounded shadow-lg transform transition-transform duration-200 hover:scale-105"
         >
           Exit
         </button>

      </div>

      {/* Sidebar Toggle */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all"
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Right Panel */}
      <div className="flex justify-center items-center h-screen w-screen">
      <canvas
        width={document.documentElement.clientWidth}
        height={window.innerHeight}
        ref={selectedShape === "freehand" ? canvasRef : shapeCanvasRef}
        onMouseDown={selectedShape === "freehand" ? onMouseDown : undefined}
        className="border border-white rounded-md shadow-lg bg-gray-100"
      />
    </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}
