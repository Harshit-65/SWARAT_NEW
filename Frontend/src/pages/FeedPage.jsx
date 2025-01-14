import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import UploadComponent from "../components/UploadComponent";
import { userService } from "../services/userService";
import { postService } from "../services/postService";
import { AuthContext } from "../context/authContext";
// import { Alert } from "@/components/ui/alert";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const fetchedPosts = await postService.getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleJoinChat = async (chatId) => {
    try {
      if (!user) {
        // Redirect to login if user is not authenticated
        navigate("/login");
        return;
      }

      // Navigate to the chat page with the chat ID
      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.error("Error joining chat:", error);
      setError("Failed to join chat room");
    }
  };

  if (error) {
    return alert(error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {showUpload && <UploadComponent onClose={() => setShowUpload(false)} />}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <Post key={post._id} {...post} onJoinChat={handleJoinChat} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No posts available.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
