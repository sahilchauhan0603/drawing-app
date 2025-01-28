'use client';
import { useDraw } from "@/hooks/useDraw";
import { useShape } from "@/hooks/useShape";
import { ChromePicker } from "react-color";
import { useEffect, useState } from "react";
import { drawLine, drawCircle, drawRectangle } from "@/utils/drawShapes";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation"; 
import {  FiMenu, } from "react-icons/fi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faFileUpload, faCloudDownloadAlt, faPencilAlt, faTimes, faSquare, faCircle, faSave, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
// import { useMutation, useQuery } from "convex/react";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import { api } from "../../../convex/_generated/api";
// import { getCanvasImages } from '../../../convex/getCanvasImages'

export default function Canvas() {
  const [color, setColor] = useState<string>('#FFFFFF');
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);
  const [selectedShape, setSelectedShape] = useState<"freehand" | "rectangle" | "circle" | "line">("freehand");
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
  // const [savedImage, setSavedImage] = useState<string | null>(null);
  // const router = useRouter(); 

  // const { user } = useKindeBrowserClient();

//   // const canvasRef = useRef(null);
//   const saveCanvas = useMutation("saveCanvas");
//   const handleSaveCanvas = async () => {
//   if (!canvasRef.current) return;

//   const canvas = canvasRef.current;
//   const imageData = canvas.toDataURL("image/png");

//   // Check if user identifier is available
//   if (!user?.email) {
//     alert("User email is not available. Please log in to save the canvas.");
//     return;
//   }

//   try {
//     await saveCanvas({
//       userIdentifier: user.email, // Use dynamic identifier or fallback if needed
//       imageData,
//     });
//     alert("Canvas saved successfully!");
//   } catch (error) {
//     console.error("Failed to save canvas:", error);
//     alert("Failed to save canvas. Please try again.");
//   }
// };

//   const getImages = useQuery(api.getCanvasImages.getCanvasImages); //use this
//   // const { data: images, error, isLoading } = useQuery("api.getCanvasImages.getCanvasImages", {
//   //   userIdentifier: user?.email ?? "", // Pass a fallback or handle null user
//   // });
//   const handleFetchCanvasImages = async () => {
    
//     // Check if user identifier is available
//   if (!user?.email) {
//     alert("User email is not available. Please log in to fetch your previous work.");
//     return;
//   }
//     try {
//       const userIdentifier = user?.email;
//       if (!userIdentifier) {
//         alert("User is not logged in!");
//         return;
//       }

//       const images = await getCanvasImages({ userIdentifier });
//       console.log("Fetched Images:", images);

//       if (images && images.length > 0) {
//         setSavedImage(images[0].imageData);
//       } else {
//         alert("No images found for this user!");
//       }
//     } catch (error) {
//       console.error("Failed to fetch canvas images:", error);
//     }
//   };

//   const handleShareCanvas = () => {
//     if (!canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const imageData = canvas.toDataURL("image/png");

//     if (navigator.share) {
//       // Use Web Share API for sharing (supported in most modern browsers)
//       navigator
//         .share({
//           title: "Check out my drawing!",
//           text: "Here's my latest canvas art. What do you think?",
//           files: [
//             new File([imageData], "drawing.png", { type: "image/png" }),
//           ],
//         })
//         .then(() => toast.success("Shared successfully!"))
//         .catch((error) => {
//           console.error("Failed to share canvas:", error);
//           toast.error("Failed to share. Please try again.");
//         });
//     } else {
//       // Fallback: allow the user to download the image
//       const link = document.createElement("a");
//       link.href = imageData;
//       link.download = "my_drawing.png";
//       link.click();
//       toast.info("Image downloaded. Share it manually!");
//     }
//   };

  const { canvasRef: shapeCanvasRef} = useShape(({ ctx, startPoint, endPoint }) => {
    if (selectedShape === "rectangle") {
      drawRectangle({ ctx, startPoint, endPoint, color });
      console.log("send to server")
    } else if (selectedShape === "circle") {
      drawCircle({ ctx, centerPoint: startPoint, endPoint, color });
    }
  });

 
  
  
  function handleClear() {
    clear()
  }

  // useEffect(() => {
  //   const ctx = canvasRef.current?.getContext('2d');

   
  // }, [canvasRef , selectedShape , shapeCanvasRef]);

  function createLine({ ctx, currentPoint, prevPoint }: Draw) {
    if(selectedShape == 'freehand'){
      drawLine({ ctx, currentPoint, prevPoint, color });
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
    <div className="w-100 h-full flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
          
          <div
  className={`fixed top-0 left-0 h-5/6 ml-1 rounded-lg overflow-y-auto w-64 z-20 bg-gray-900 text-white p-4 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
  style={{ top: '12.5%' }} // Optional, to center the sidebar vertically.
>
  <div className="flex justify-between items-center mb-6">
    <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
      <FontAwesomeIcon icon={faTimes} size="lg" />
    </button>
  </div>

  <div className="flex flex-col h-full">
    <div className="space-y-6">
      {/* Color Picker */}
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
      <div className="mt-0 space-y-2">
        <h2 className="text-lg font-semibold">Select Shape</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleShapeChange("freehand")}
            className={`${
              selectedShape === "freehand" ? "bg-blue-600" : "bg-gray-600"
            } px-4 py-2 rounded shadow hover:bg-blue-700`}
          >
            <FontAwesomeIcon icon={faPencilAlt} className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleShapeChange("rectangle")}
            className={`${
              selectedShape === "rectangle" ? "bg-blue-600" : "bg-gray-600"
            } px-4 py-2 rounded shadow hover:bg-blue-700`}
          >
            <FontAwesomeIcon icon={faSquare} className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleShapeChange("circle")}
            className={`${
              selectedShape === "circle" ? "bg-blue-600" : "bg-gray-600"
            } px-4 py-2 rounded shadow hover:bg-blue-700`}
          >
            <FontAwesomeIcon icon={faCircle} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* File Handling */}
      <div className="mt-3 space-y-2">
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white w-full rounded-lg hover:bg-gray-700">
          <FontAwesomeIcon icon={faFileUpload} />
          <span>Upload File</span>
        </button>
        
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white w-full rounded-lg hover:bg-gray-700">
          <FontAwesomeIcon icon={faCloudDownloadAlt} />
          <span>Export</span>
        </button>

        {/* <canvas ref={canvasRef} /> */}
        <button
          // onClick={handleSaveCanvas}
          className="flex items-center space-x-2 text-gray-400 hover:text-white w-full rounded-lg hover:bg-gray-700 "
        >
          <FontAwesomeIcon icon={faSave} />
          <span>Save</span>
        </button>

        {/* Fetch Saved Image Button */}
        <button
          // onClick={handleFetchCanvasImages}
          className="flex items-center space-x-2 text-gray-400 hover:text-white w-full rounded-lg hover:bg-gray-700"
        >
          <FontAwesomeIcon icon={faCloudDownloadAlt} />
          <span>Fetch Image</span>
        </button>

        {/* Fetch Saved Image Button */}
        <button
          // onClick={handleShareCanvas}
          className="flex items-center space-x-2 text-gray-400 hover:text-white w-full rounded-lg hover:bg-gray-700"
        >
          <FontAwesomeIcon icon={faShareAlt} />
          <span>Share</span>
        </button>

        <button
          onClick={handleClear}
          className="flex items-center space-x-2 text-gray-400 hover:text-white w-full rounded-lg hover:bg-gray-700"
        >
          <FontAwesomeIcon icon={faRotateRight} />
          <span>Reset Canvas</span>
        </button>
      </div>

      {/* Divider */}
      <hr className="border-gray-700" />

      {/* Social Media Links */}
      <div className="space-y-2">
        <a href="#" className="flex justify-center  text-gray-400 hover:text-white">
          <span>Drawing App</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={faFacebookF} />
          <span>Facebook</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={faTwitter} />
          <span>Twitter</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={faInstagram} />
          <span>Instagram</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={faLinkedinIn} />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  </div>
</div>

      {/* Display the fetched image
      {savedImage && (
        <div className="mt-4">
          <h3>Fetched Canvas Image:</h3>
          <Image src={savedImage} alt="Fetched Canvas" className="w-full" />
        </div>
      )} */}

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
