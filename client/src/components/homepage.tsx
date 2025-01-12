import Image from "next/image";

export default function HomePage() {
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
          <p className="text-2xl mt-4">
            Doodle together with your friends
          </p>
        </section>

        {/* Button Section */}
        <section className="flex justify-center mt-8 space-x-4">
          <button className="rounded-lg bg-indigo-600 px-8 py-3 text-lg text-white hover:bg-indigo-700 transition-colors">
            Download
          </button>
          <button className="rounded-lg border border-white px-8 py-3 text-lg text-white hover:bg-gray-200 hover:text-black transition-colors">
            Download
          </button>
        </section>
      </div>
    </div>
  );
}
