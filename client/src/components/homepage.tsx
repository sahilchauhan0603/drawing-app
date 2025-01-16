'use client'; // Add this at the very top of the file
import { useState } from "react";
import { redirect } from 'next/navigation'

export default function HomePage() {
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');

  function handleJoinRoom() {
    if (room.trim() && name.trim()) {
      redirect(`/canvas/${room}?name=${encodeURIComponent(name)}`);
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
          <p className="text-2xl mt-8 text-white font-bold">Want to Doodle together with your friends?</p>
          <p className="text-2xl mt-4 text-white font-extrabold">Join the room and start creating together...</p>

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

        {/* Input Section */}
<section className="flex flex-col items-center mt-2 space-y-4 w-2/4 max-w-md mx-auto">
  <div className="flex items-center w-full relative">
    {/* Name Input */}
    <input
      type="text"
      placeholder="Enter your name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="p-3 border text-black border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 shadow-sm"
    />

    {/* Join Room Button */}
    <button
      onClick={handleJoinRoom}
      className="absolute mt-[300px] left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 -translate-y-1/2"
    >
      Join Room
    </button>
  </div>

  {/* Room Input */}
  <div className="w-full">
    <input
      type="text"
      placeholder="Enter room name"
      value={room}
      onChange={(e) => setRoom(e.target.value)}
      className="p-3 border text-black border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 shadow-sm"
    />
  </div>
</section>


      </div>
    </div>
  );
}
