'use client'; // Add this at the very top of the file
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [tooltip, setTooltip] = useState<string | null>(null);

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
          <p className="text-2xl mt-4">Doodle together with your friends</p>
        </section>

        {/* Button Section */}
        <section className="flex justify-center mt-8 space-x-4">
          <div
            className="relative"
            onMouseEnter={() => setTooltip("Try the live canvas draw!")}
            onMouseLeave={() => setTooltip(null)}
          >
            <Link href="/canvas">
              <button className="rounded-lg bg-indigo-600 px-8 py-3 text-lg text-white hover:bg-indigo-700 transition-colors">
                Canvas
              </button>
            </Link>
            {tooltip === "Try the live canvas draw!" && (
              <div
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 
                            text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium w-64 text-center border border-white"
              >
                {tooltip}
              </div>
            )}

          </div>

          <div
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
          </div>
        </section>
      </div>
    </div>
  );
}
