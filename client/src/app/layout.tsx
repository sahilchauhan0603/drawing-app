"use client";

import { useState, useEffect } from "react";
import './globals.css';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Navbar from "@/components/navbar"; // Use absolute path with `@`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Using Kinde's browser client hook to get the authentication status
  const { isAuthenticated } = useKindeBrowserClient();
  const [authStatus, setAuthStatus] = useState(false);

  // Set the auth status once the component has mounted
  useEffect(() => {
    setAuthStatus(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <html lang="en">
      <body>
        {/* Pass the `authStatus` to Navbar */}
        <Navbar isAuthenticated={authStatus} />
        <main>{children}</main>
      </body>
    </html>
  );
}





