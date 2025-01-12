export default function Navbar() {
  return (
    <header className="bg-gray-200 text-gray-800 w-full shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center h-14 px-4">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 32 32"
            className="w-6 h-6 text-blue-600"
          >
            <path d="..."></path>
          </svg>
          <span className="ml-2 font-medium text-lg">Logo</span>
        </a>

        {/* Links */}
        <ul className="hidden lg:flex space-x-6 ml-20">
          {["Home", "About", "Services", "Contact"].map((link, index) => (
            <li key={index}>
              <a
                href="#"
                className="text-sm text-gray-700 hover:text-blue-600 transition"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-200">
            Sign In
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu */}
        <button className="lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
