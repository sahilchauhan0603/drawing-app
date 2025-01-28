import React, { useState, useEffect } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';

const ProfileIcons = () => {
  const { getUser, isAuthenticated } = useKindeBrowserClient();
  const [authenticatedUser, setAuthenticatedUser] = useState<KindeUser<Record<string, string>> | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const currentUser = getUser();
        if(!currentUser)return;
      setAuthenticatedUser(currentUser);
    }
  }, [isAuthenticated, getUser]);

  return (
    <div className="fixed top-3 right-20 flex items-center">
      {authenticatedUser && (
        <div className="relative w-10 h-10 rounded-full ring-2 ring-white shadow-lg overflow-hidden cursor-pointer group">
          <img
            src={authenticatedUser.picture || '/default-avatar.png'} 
            alt={authenticatedUser.given_name || 'User'}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
          />
          <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            {authenticatedUser.given_name || 'Anonymous'}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileIcons;
