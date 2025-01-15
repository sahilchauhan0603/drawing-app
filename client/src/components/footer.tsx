'use client'
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaHome, FaEnvelope,FaPaintBrush } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-16 md:flex md:justify-between">
          
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-blue-400">
              <Link href="/">
                Drawing App
              </Link>
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Unleash your creativity with our advanced canvas tools.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="flex items-center hover:text-blue-400">
                  <FaHome className="mr-2" size={18} /> Home
                </Link>
              </li>
              <li>
                <Link href="/canvas" className="flex items-center hover:text-blue-400">
                  <FaPaintBrush className="mr-2" size={18} /> Canvas
                </Link>
              </li>
              <li>
                <Link href="/contactUs" className="flex items-center hover:text-blue-400">
                  <FaEnvelope className="mr-2" size={18} /> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links with Icons */}
          <div>
            <h3 className="font-bold text-lg">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="https://facebook.com" aria-label="Facebook">
                <FaFacebook className="text-blue-500 hover:scale-110 transition-transform" size={24} />
              </Link>
              <Link href="https://twitter.com" aria-label="Twitter">
                <FaTwitter className="text-blue-400 hover:scale-110 transition-transform" size={24} />
              </Link>
              <Link href="https://linkedin.com" aria-label="LinkedIn">
                <FaLinkedin className="text-blue-600 hover:scale-110 transition-transform" size={24} />
              </Link>
              <Link href="https://github.com" aria-label="GitHub">
                <FaGithub className="text-gray-500 hover:scale-110 transition-transform" size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} Drawing App. All rights reserved.
        </div>
      </footer>
    </>
  );
}
