import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Post from "../components/Post";
import UploadComponent from "../components/UploadComponent";
import ProfileComponent from "../components/ProfileComponent";

const FeedPage = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const dummyPosts = [
    {
      id: 1,
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      location: "Central Park, New York",
      description:
        "Large amount of trash accumulated near the lake. Need volunteers for weekend cleanup.",
    },
    {
      id: 2,
      images: ["/api/placeholder/600/400"],
      location: "Beach Drive, Miami",
      description:
        "Plastic waste on the beach shore. Marine life at risk. Urgent cleanup needed.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {showProfile ? (
        <ProfileComponent onClose={() => setShowProfile(false)} />
      ) : (
        <div className="max-w-2xl mx-auto px-4 py-6">
          {dummyPosts.map((post) => (
            <Post
              key={post.id}
              {...post}
              onChatClick={() => console.log("Chat clicked:", post.id)}
            />
          ))}
        </div>
      )}

      {showUpload && <UploadComponent onClose={() => setShowUpload(false)} />}
    </div>
  );
};

export default FeedPage;
