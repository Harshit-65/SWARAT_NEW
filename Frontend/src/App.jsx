import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/authContext";
import { auth } from "./services/authService"; // Adjust path if needed
import UploadComponent from "./components/UploadComponent";
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleShowUpload = () => {
    setShowUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
  };

  // Add other states as needed (e.g., for loading, errors)

  // Check for token on app load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token"); // Or however you are storing the token
        if (token) {
          // Verify token (you might have a separate function for this)
          const response = await auth.verifyToken(token);
          if (response.success) {
            setIsAuthenticated(true);
            setUser(response.user); // Assuming the user object is sent in the verification response
          } else {
            // Token is invalid, handle logout (clear token, etc.)
            localStorage.removeItem("token");
          }
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogin = (userData) => {
    // Update authentication state and store token
    setIsAuthenticated(true);
    setUser(userData);
    // Store the token in local storage or as needed
    localStorage.setItem("token", userData.token);
  };

  const handleLogout = () => {
    // Update authentication state and remove token
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  // ... other functions (like handling uploads) ...

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, handleLogin, handleLogout }}
    >
      <Router>
        <div className="app">
          {" "}
          {/* Add app container */}
          {isAuthenticated && <Navbar onShowUpload={handleShowUpload} />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/auth"
              element={isAuthenticated ? <Navigate to="/feed" /> : <AuthPage />}
            />
            {/* Protected Routes */}
            <Route
              path="/feed"
              element={isAuthenticated ? <FeedPage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? <ProfilePage /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/chat"
              element={isAuthenticated ? <ChatPage /> : <Navigate to="/auth" />}
            />
            <Route path="/chat/:chatId" element={<ChatPage />} />
            {/* Add other routes as needed */}
          </Routes>
          {/* Upload Modal */}
          {showUploadModal && (
            <UploadComponent onClose={handleCloseUploadModal} />
          )}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
