import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/Homepage";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import ProfileComponent from "./components/ProfileComponent";
import UploadComponent from "./components/UploadComponent";
import Navigation from "./components/Navigation";
import ChatPage from "./pages/ChatPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/auth" />;
  };

  const MainLayout = ({ children }) => {
    const navigate = useNavigate();
    return (
      <>
        <Navigation
          onUploadClick={() => setShowUpload(true)}
          onLogoClick={() => navigate("/feed")}
        />
        {children}
      </>
    );
  };

  return (
    <BrowserRouter>
      <div className={showUpload ? "opacity-50" : ""}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/auth"
            element={
              <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
            }
          />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <FeedPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProfileComponent />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ChatPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      {showUpload && <UploadComponent onClose={() => setShowUpload(false)} />}
    </BrowserRouter>
  );
}

export default App;
