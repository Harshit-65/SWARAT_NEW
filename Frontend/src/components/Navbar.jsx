import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, User, MessageSquare, LogOut } from "lucide-react";
import { AuthContext } from "../context/authContext";

const Navbar = ({ onShowUpload }) => {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    onShowUpload();
  };

  return (
    <nav className="navbar shadow-lg sticky top-0 z-50">
      {" "}
      {/* Add z-index for layering */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/feed"
            className="text-2xl font-bold text-green-600 hover:opacity-80"
          >
            Swarat
          </Link>
          <div className="flex space-x-4">
            <button
              className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100"
              onClick={handleUploadClick}
            >
              <Upload size={20} />
              <span>Upload</span>
            </button>

            <Link
              to="/chat"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <MessageSquare size={20} />
              <span>Chat</span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <User size={20} />
              <span>Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
