import React, { useState } from 'react';
import Chat from './Chat'; // Ensure the Chat component is in the same directory
import { FaComments } from 'react-icons/fa'; // Ensure react-icons is installed

interface ChatIconProps {
  name: string; // Define the correct type for the 'name' prop
}

const ChatIcon = ({ name } : ChatIconProps) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {/* Chat Icon */}
      <div
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-20 right-5 bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-600 transition duration-200"
      >
        <FaComments className="text-white text-2xl" />
      </div>

      {/* Chat Box */}
      {showChat && <Chat name={name} />} {/* Corrected prop passing syntax */}
    </>
  );
};

export default ChatIcon;
