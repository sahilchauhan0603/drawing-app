"use client";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">Log In</h2>
        <p className="text-center text-lg text-gray-600 mb-4">
          You need to be logged in to access this page.
        </p>
        <div className="text-center">
          <LoginLink className="w-full bg-blue-600 text-white py-3 px-9 rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Log In
          </LoginLink>
        </div>
      </div>
    </div>
  );
}
