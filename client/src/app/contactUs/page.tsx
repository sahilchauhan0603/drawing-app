"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

export default function ContactUs() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const router = useRouter();

  // Show a loading state while checking authentication
  if (isLoading) return <div>Loading...</div>;

  // Redirect user if not authenticated
  if (!isAuthenticated) {
    router.push("/login"); // Redirect to the login page
    return null; // Prevent rendering of protected content
  }

  return (
    <>
  <Navbar/>
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-8 text-center animate-fadeIn">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center mb-12">
          Got questions or feedback? We’d love to hear from you! Drop us a
          message, and we’ll get back to you as soon as possible.
        </p>
        <form className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  <Navbar/>
  </>
  );
}
