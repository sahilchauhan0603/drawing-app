'use client'

import React, { useState } from 'react';
import Chat from './Chat'; // Ensure the Chat component is in the same directory
import { FaComments } from 'react-icons/fa'; // Ensure react-icons is installed


const ChatIcon = ({ room , name } : ChatIconProps) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-60 right-1 bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-600 transition duration-200"
      >
        <FaComments className ="text-white text-2xl" />
      </div>

      {showChat && <Chat  name ={name} room= {room} />} 
    </>
  );
};

export default ChatIcon;
