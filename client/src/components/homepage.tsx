'use client'; // Add this at the very top of the file
import Link from "next/link";
import { useState } from "react";
import { redirect } from 'next/navigation'


export default function HomePage() {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [ room , setRoom] = useState('')
  function handleJoinRoom () {
    if(room.trim()){
       redirect(`/canvas/${room}`) 
    }
  }

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/homePicture.jpg')", // Path to the image in the public folder
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        
        {/* Hero Section */}
        <section>
          <h1 className="max-w-xl mx-auto text-6xl font-bold">
            Beautiful Doodles to Tell Your Story
          </h1>
          <p className="text-2xl mt-8 text-black font-bold">Want to Doodle together with your friends?</p>
          <p className="text-2xl mt-4 text-black font-extrabold">Join the room and start creating together...</p>
          
          {/* Downward Arrow */}
          <div className="mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-10 h-10 mx-auto text-white animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7 7 7-7"
              />
            </svg>
          </div>
        </section>


        {/* Button Section */}
        <section className="flex justify-center mt-8 space-x-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Enter room name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="p-2 border text-black border-gray-300 rounded w-full focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleJoinRoom}
              className="bg-blue-600 hover:bg-blue-700 text-white ml-2 px-4 py-2 rounded shadow-lg transform transition-transform duration-200 hover:scale-105"
            >
              Join Room
            </button>
          </div>

          {/* <div
            className="relative"
            onMouseEnter={() => setTooltip("Try the real-time chat feature!")}
            onMouseLeave={() => setTooltip(null)}
          >
            <Link href="/chat">
              <button className="rounded-lg border border-white px-8 py-3 text-lg text-white hover:bg-gray-200 hover:text-black transition-colors">
                Chat
              </button>
            </Link>
            {tooltip === "Try the real-time chat feature!" && (
              <div
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 
                          text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium w-64 text-center border border-white"
            >
              {tooltip}
            </div>
            )}
          </div> */}
        </section>
      </div>
    </div>
  );
}

{/* <button className="px-6 py-3 bg-blue-600 text-white rounded-xl transition-all hover:bg-blue-500 hover:scale-105 focus:outline-none">
            <LoginLink>Log In</LoginLink>
    </button> */}
{/* <button className="px-6 py-3 bg-blue-600 text-white rounded-xl transition-all hover:bg-blue-500 hover:scale-105 focus:outline-none">
            <RegisterLink>Sign Up</RegisterLink>
    </button> */}
