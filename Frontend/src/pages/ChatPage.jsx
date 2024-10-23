import React, { useState } from "react";
import { Send } from "lucide-react";

const ChatPage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [message, setMessage] = useState("");

  const groups = [
    {
      id: 1,
      name: "Beach Cleanup Squad",
      messages: [
        {
          id: 1,
          user: "Alex",
          text: "I'll bring extra bags tomorrow",
          timestamp: "2:30 PM",
        },
        {
          id: 2,
          user: "Sarah",
          text: "Perfect, thanks!",
          timestamp: "2:31 PM",
        },
      ],
    },
    {
      id: 2,
      name: "Park Volunteers",
      messages: [
        {
          id: 1,
          user: "Sarah",
          text: "Great work everyone!",
          timestamp: "11:45 AM",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-[calc(100vh-64px)]">
        {/* Groups List - 30% width */}
        <div className="w-[30%] bg-white border-r">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-xl">Groups</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100%-60px)]">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className={`w-full p-4 text-left hover:bg-gray-50 border-b ${
                  selectedGroup?.id === group.id ? "bg-gray-100" : ""
                }`}
              >
                <h3 className="font-medium">{group.name}</h3>
                <p className="text-sm text-gray-600 truncate mt-1">
                  <span className="font-medium">
                    {group.messages[group.messages.length - 1].user}:
                  </span>{" "}
                  {group.messages[group.messages.length - 1].text}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area - 70% width */}
        <div className="w-[70%] flex flex-col bg-white">
          {selectedGroup ? (
            <>
              <div className="p-4 border-b">
                <h2 className="font-semibold text-xl">{selectedGroup.name}</h2>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedGroup.messages.map((msg) => (
                  <div key={msg.id} className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium">{msg.user}</span>
                      <span className="text-sm text-gray-500">
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="mt-1 bg-gray-50 p-3 rounded-lg inline-block max-w-[80%]">
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-3 border rounded-lg"
                  />
                  <button className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a group to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
