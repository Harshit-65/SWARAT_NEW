import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
// import { Alert } from "@/components/ui/alert";
import { chatService } from "../services/chatService";
import { AuthContext } from "../context/authContext";

const ChatPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const socket = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize socket connection
    socket.current = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Socket event handlers
    socket.current.on("connect", () => {
      // console.log("inside socket connect");
      if (chatId) {
        socket.current.emit("joinChat", chatId);
      }
    });

    socket.current.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setError("Unable to connect to chat server");
    });

    socket.current.on("newMessage", (newMessage) => {
      setActiveChat((prevChat) => {
        if (!prevChat) return null;
        return {
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        };
      });
      scrollToBottom();
    });

    // Cleanup on unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [chatId]);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        if (chatId) {
          const chatData = await chatService.getChatById(chatId);
          setActiveChat(chatData);
          scrollToBottom();
        }
      } catch (err) {
        console.error("Error fetching chat:", err);
        setError("Failed to load chat");
      }
    };

    fetchChat();
  }, [chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const messageData = {
        chatId: chatId,
        sender: user._id,
        content: message,
      };

      socket.current.emit("sendMessage", messageData);
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message");
    }
  };

  if (error) {
    return alert(error);
    // <Alert variant="destructive" className="m-4">
    //   {error}
    // </Alert>
  }

  if (!activeChat) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="bg-white shadow p-4">
        <h2 className="text-xl font-semibold">{activeChat.groupName}</h2>
        <p className="text-sm text-gray-500">
          {activeChat.members?.length || 0} members
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeChat.messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender._id === user._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender._id === user._id
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              <p className="text-sm font-semibold">
                {msg.sender.username || "Unknown User"}
              </p>
              <p>{msg.content}</p>
              <p className="text-xs text-gray-300 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="bg-white p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
