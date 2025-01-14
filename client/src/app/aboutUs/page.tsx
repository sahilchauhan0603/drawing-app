export default function AboutUs() {
    return (
      <div className="bg-gray-50 min-h-screen py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 animate-fadeIn">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
            Welcome to our collaborative drawing app, where creativity meets
            innovation. Our mission is to empower artists and teams to express
            their ideas together, effortlessly and beautifully.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="p-6 rounded-lg shadow-lg bg-white transform hover:-translate-y-2 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600">
              We envision a world where creativity thrives through collaboration,
              breaking barriers, and redefining the art of drawing.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-white transform hover:-translate-y-2 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600">
              Inclusivity, innovation, and user-centric design form the core of
              everything we do.
            </p>
          </div>
        </div>
      </div>
    );
  }
  