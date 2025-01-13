import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Navbar() {
  return (
    <header className="bg-gray-800 text-white w-full shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center h-16 px-6 sm:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 32 32"
            className="w-8 h-8 text-blue-500 hover:scale-110 transition-transform duration-200 ease-in-out"
          >
            <path d="..."></path>
          </svg>
          <span className="ml-3 font-semibold text-xl">Logo</span>
        </a>

        {/* Links */}
        <ul className="hidden lg:flex space-x-8 ml-24">
          {["Home", "About", "Services", "Contact"].map((link, index) => (
            <li key={index}>
              <a
                href="#"
                className="text-sm text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          <button className="px-6 py-3 text-gray-200 border border-gray-600 rounded-xl transition-all hover:bg-gray-600 hover:border-gray-500 hover:text-white focus:outline-none transform hover:scale-105">
            <LoginLink>Log In</LoginLink>
          </button>
          {/* <button className="px-6 py-3 bg-blue-600 text-white rounded-xl transition-all hover:bg-blue-500 hover:scale-105 focus:outline-none">
            <LoginLink>Log In</LoginLink>
          </button> */}
          {/* <button className="px-6 py-3 bg-blue-600 text-white rounded-xl transition-all hover:bg-blue-500 hover:scale-105 focus:outline-none">
            <RegisterLink>Sign Up</RegisterLink>
          </button> */}
        </div>

        {/* Mobile Menu */}
        <button className="lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8 text-gray-200"
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
