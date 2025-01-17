"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import emailjs from "emailjs-com";
import Navbar from "@/components/navbar";
import FeedbackButton from "@/components/FeedBackButton";
import Footer from "@/components/footer";

export default function ContactUs() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const router = useRouter();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const { name, email, message } = formState;
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT!,
        { name, email, message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setFeedbackMessage("Message sent successfully!");
    } catch (error) {
      console.error("Failed to send message:", error);
      setFeedbackMessage("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  // Show a loading state while checking authentication
  if (isLoading) return <div>Loading...</div>;

  // Redirect user if not authenticated
  if (!isAuthenticated) {
    router.push("/login"); // Redirect to the login page
    return null; // Prevent rendering of protected content
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-8 text-center animate-fadeIn">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center mb-12">
            Got questions or feedback? We’d love to hear from you! Drop us a
            message, and we’ll get back to you as soon as possible.
          </p>
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formState.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
          {feedbackMessage && (
            <p className={`text-center mt-4 ${feedbackMessage.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
              {feedbackMessage}
            </p>
          )}
        </div>
      </div>
      <FeedbackButton/>
      <Footer/>
    </>
  );
}
