'use client'
import Link from "next/link";
export default function Footer() {

    return (
    <>
      <footer className="bg-gray-800 text-white py-6 mt-0">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Drawing App. All rights reserved.
        </p>
        <div className="mt-4 space-x-6">
          <Link href="https://facebook.com" className="hover:text-blue-500">
            Facebook
          </Link>
          <Link href="https://twitter.com" className="hover:text-blue-400">
            Twitter
          </Link>
          <Link href="https://linkedin.com" className="hover:text-blue-600">
            LinkedIn
          </Link>
          <Link href="https://github.com" className="hover:text-gray-500">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
    </>
    );
}