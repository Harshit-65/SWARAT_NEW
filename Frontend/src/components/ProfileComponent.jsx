import React, { useState } from "react";
import { Pencil, Camera } from "lucide-react";

const ProfileComponent = ({ onClose }) => {
  const [email, setEmail] = useState("user@example.com");
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const userData = {
    username: "Kyamalumm",
    posts: [
      {
        id: 1,
        image: "/api/placeholder/300/300",
        description: "Environmental cleanup initiative",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-6">
          {/* Left column - Posts (65%) */}
          <div className="w-[65%] bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
            {userData.posts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {userData.posts.map((post) => (
                  <div
                    key={post.id}
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={post.image}
                      alt={post.description}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No posts yet</p>
            )}
          </div>

          {/* Right column - User Details (35%) */}
          <div className="w-[35%] bg-white rounded-lg p-6 shadow-sm h-fit">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <Camera size={32} className="text-gray-400" />
                </div>
                <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
                  <Camera size={16} />
                </button>
              </div>

              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{userData.username}</h2>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Pencil size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {isEditingEmail ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border rounded px-2 py-1"
                      onBlur={() => setIsEditingEmail(false)}
                      autoFocus
                    />
                  ) : (
                    <>
                      <span className="text-gray-600">{email}</span>
                      <button
                        onClick={() => setIsEditingEmail(true)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Pencil size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
