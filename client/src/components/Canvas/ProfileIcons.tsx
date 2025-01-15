import React, { useState, useEffect } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const ProfileIcons = () => {
  const { getUser } = useKindeBrowserClient();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the logged-in user once on component mount
    const loggedInUser = getUser();
    const mockUsers = [
      { id: '1', name: 'John Doe', picture: 'https://via.placeholder.com/40' },
      { id: '2', name: 'Jane Smith', picture: 'https://via.placeholder.com/40' },
      { id: '3', name: 'Alice Brown', picture: 'https://via.placeholder.com/40' },
    ];

    if (loggedInUser) {
      setUsers([{ id: loggedInUser.id, name: loggedInUser.given_name, picture: loggedInUser.picture }, ...mockUsers]);
    } else {
      setUsers(mockUsers);
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="fixed top-3 right-20 flex items-center">
      <div className="relative">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="absolute w-8 h-8 rounded-full ring-2 ring-white shadow-lg overflow-hidden cursor-pointer group transition-transform duration-200"
            style={{
              left: `${index * 16}px`,
              zIndex: users.length - index, // Higher index for later avatars
            }}
          >
            <img
              src={user.picture}
              alt={user.name}
              className="w-full h-full object-cover group-hover:scale-110"
            />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black text-black text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              {user.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileIcons;
