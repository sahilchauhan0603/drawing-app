"use client";

import { useState } from "react";
import emailjs from "emailjs-com";

export default function FeedbackButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setFormState({ name: "", email: "", message: "" }); // Reset form when modal opens
      setFeedbackMessage(""); // Clear feedback message
    }
  };

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
      setFeedbackMessage("Feedback sent successfully!");
    } catch (error) {
      console.error("Failed to send feedback:", error);
      setFeedbackMessage("Failed to send feedback. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Feedback Button */}
      <button
        onClick={toggleModal}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Feedback
      </button>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              ✕
            </button>

            {/* Feedback Form */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">We value your feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                  Feedback
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Your Feedback"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {isSending ? "Sending..." : "Submit Feedback"}
              </button>
            </form>

            {/* Feedback Message */}
            {feedbackMessage && (
              <p
                className={`text-center mt-4 ${
                  feedbackMessage.includes("successfully") ? "text-green-500" : "text-red-500"
                }`}
              >
                {feedbackMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
