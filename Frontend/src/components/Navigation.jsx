import React from "react";
import { Upload, User, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navigation = ({ onUploadClick }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg sticky top-0">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => navigate("/feed")}
            className="text-2xl font-bold text-green-600 hover:opacity-80"
          >
            Swarat
          </button>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/chat")}
              className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <MessageSquare size={20} />
              <span>Chat</span>
            </button>
            <button
              onClick={onUploadClick}
              className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <Upload size={20} />
              <span>Upload</span>
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <User size={20} />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
