"use client";

import Link from "next/link";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

// console.log(isUserAuthenticated);

export default function Navbar({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <header className="bg-gray-800 text-white w-full shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center h-16 px-6 sm:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/art.jpg"  // Replace with the actual path to your image in the public folder
            alt="Logo"
            className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-200 ease-in-out"
          />
        </Link>


        {/* Links */}
        <ul className="hidden lg:flex space-x-8 ml-24">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/aboutUs" },
            { name: "Contact", path: "/contactUs" },
            { name: "Start Drawing", path: "/canvas", title: "Want to draw alone? Don't worry, we have personalized canvas for you." },
          ].map((link, index) => (
            <li key={index}>
              <Link
                href={link.path}
                className="text-sm text-gray-300 hover:text-blue-400 transition-colors duration-300"
                title={link.title} // Set the title attribute
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Button */}
        <div className="hidden lg:flex items-center space-x-6">
          {isAuthenticated ? (
            <button className="px-6 py-3 text-gray-200 border border-gray-600 rounded-xl transition-all hover:bg-gray-600 hover:border-gray-500 hover:text-white focus:outline-none transform hover:scale-105">
              <LogoutLink>Log Out</LogoutLink>
            </button>
          ) : (
            <button className="px-6 py-3 text-gray-200 border border-gray-600 rounded-xl transition-all hover:bg-gray-600 hover:border-gray-500 hover:text-white focus:outline-none transform hover:scale-105">
              <LoginLink>Log In</LoginLink>
            </button>
          )}
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
