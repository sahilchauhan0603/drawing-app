// 'use client';

// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

// export default function Profile() {
//   const { user, isAuthenticated } = useKindeBrowserClient();

//   if (!isAuthenticated) {
//     return <p className="text-center text-xl mt-10 font-semibold text-gray-600">Please log in to view your profile.</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
//       <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">User Profile</h1>

//       {/* Profile Section */}
//       <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
        
//         {/* Left Section - User Image */}
//         <div className="flex justify-center lg:w-1/3">
//           <img
//             src={user.picture || "/default-avatar.jpg"} // Default avatar if no profile picture
//             alt="Profile"
//             className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 shadow-md"
//           />
//         </div>

//         {/* Right Section - User Details */}
//         <div className="lg:w-2/3 flex flex-col space-y-4">
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-700">
//               {user.given_name} {user.family_name}
//             </h2>
//             <p className="text-lg text-gray-600">{user.email}</p>
//           </div>
          
//           {/* Bio Section */}
//           <div>
//             <h3 className="text-xl font-medium text-gray-700">About Me</h3>
//             <p className="text-gray-600">{user.bio || "No bio available."}</p>
//             <p className="text-gray-600">User Id - {user.id || "No bio available."}</p>
//           </div>

//           {/* Edit Profile Button */}
//           <div>
//             <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
//               Edit Profile
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* User Activities Section (Add More Components) */}
//       <div className="mt-12">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h3>
//         <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//           <h4 className="text-lg text-gray-700">Drawing Activities</h4>
//           <ul className="list-disc pl-5 text-gray-600">
//             <li>Started a new drawing project</li>
//             <li>Completed 3 new drawings</li>
//             <li>Shared a drawing on social media</li>
//           </ul>
//         </div>
//       </div>

//       {/* Settings or Security Section (optional) */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Your friends</h3>
//         <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//           <button className="text-blue-600 hover:text-blue-700">Change Password</button>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import emailjs from 'emailjs-com';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Profile() {
  const [friendEmail, setFriendEmail] = useState('');
  const [friends, setFriends] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useKindeBrowserClient();

  if (!isAuthenticated) {
    return <p className="text-center text-xl mt-10 font-semibold text-gray-600">Please log in to view your profile.</p>;
  }

  const handleSendInvite = async () => {
    if (!friendEmail) return alert('Please enter a valid email address.');

    setLoading(true);

    try {
      // Replace with your EmailJS credentials
      const SERVICE_ID = 'service_wq70qjl';
      const TEMPLATE_ID = 'template_9rv31yl';
      const PUBLIC_KEY = '5WDqrHRPEFPOqnTNb';

      const templateParams = {
        to_email: friendEmail,
        message: 'Join me on this amazing drawing platform!',
        from_name: user.given_name,
        to_name: friendEmail,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      alert(`Invite sent to ${friendEmail}!`);
      setFriends((prev) => [...prev, friendEmail]); // Add friend to the list
      setFriendEmail(''); // Clear input field
    } catch (error) {
      console.error('Error sending invite:', error);
      alert('Failed to send invite. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        User Profile
      </h1>

      {/* Profile Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-start space-y-6 lg:space-y-0 lg:space-x-8">
        
        {/* Left Section - User Image */}
        <div className="lg:w-1/3 flex justify-center lg:justify-end">
          <img
            src={user.picture || "/default-avatar.jpg"} // Default avatar if no profile picture
            alt="Profile"
            className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-full border-4 border-gray-300 shadow-md"
          />
        </div>
        
        {/* Right Section - User Details */}
        <div className="lg:w-2/3 flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Name: {user.given_name} {user.family_name}
          </h2>
          <p className="text-lg text-gray-600">Email: {user.email}</p>
        </div>
      
      </div>

       {/* User Activities Section (Add More Components) */}
       <div className="mt-12">
         <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h3>
         <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
           <h4 className="text-lg text-gray-700">Drawing Activities</h4>
           <ul className="list-disc pl-5 text-gray-600">
             <li>Started a new drawing project</li>
             <li>Completed 3 new drawings</li>
             <li>Shared a drawing on social media</li>
           </ul>
         </div>
       </div>

      {/* Invite Friends */}
      <div className="mt-6">
        <h3 className="text-xl font-medium text-gray-700">Invite a Friend</h3>
        <div className="flex mt-4">
          <input
            type="email"
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
            placeholder="Enter friend's email"
            className="flex-grow p-3 border border-gray-300 rounded-l-lg"
          />
          <button
            onClick={handleSendInvite}
            className="bg-blue-600 text-white py-3 px-6 rounded-r-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Invite'}
          </button>
        </div>
      </div>

      {/* Friends Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Friends</h3>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          {friends.length > 0 ? (
            <ul className="list-disc pl-5 text-gray-600">
              {friends.map((friend, index) => (
                <li key={index}>{friend}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No friends added yet. Send an invite!</p>
          )}
        </div>
      </div>
    </div>
  );
}
