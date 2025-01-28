'use client'

import Link from 'next/link';
import { FaHome } from 'react-icons/fa'; // Ensure react-icons is installed

const HomeIcon = () => {
  return (
    <Link href="/">
      <div className="fixed bottom-5 right-5 bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-600 transition duration-200">
        <FaHome className="text-white text-2xl" />
      </div>
    </Link>
  );
};

export default HomeIcon;
