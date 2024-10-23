import React from "react";
import { useNavigate } from "react-router-dom";

const Groups = () => {
  const navigate = useNavigate();
  const groups = [
    {
      id: 1,
      name: "Beach Cleanup Squad",
      lastMessage: {
        text: "I'll bring extra bags tomorrow",
        user: "Alex",
        timestamp: "2:30 PM",
      },
    },
    {
      id: 2,
      name: "Park Volunteers",
      lastMessage: {
        text: "Great work everyone!",
        user: "Sarah",
        timestamp: "11:45 AM",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Groups</h2>
          </div>
          <div className="divide-y">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => navigate(`/chat/${group.id}`)}
                className="w-full p-4 hover:bg-gray-50 text-left"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{group.name}</h3>
                  <span className="text-sm text-gray-500">
                    {group.lastMessage.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">{group.lastMessage.user}:</span>{" "}
                  {group.lastMessage.text}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
