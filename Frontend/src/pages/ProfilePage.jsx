import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { userService } from "../services/userService";
import { postService } from "../services/postService";

import { Link, useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import Post from "../components/Post";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(
    user.profilePicture || ""
  );
  const [username, setUsername] = useState(user.username);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const posts = await postService.getUserPosts(user._id);
        setUserPosts(posts);
      } catch (error) {
        console.error("Error fetching user's posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user._id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("profilePicture", file);
        const response = await userService.updateUserProfile(
          user._id,
          formData
        );

        if (response.success) {
          setProfilePicture(response.user.profilePicture); // Assuming the updated URL is sent back
        } else {
          console.error("Profile picture upload failed:", response.message);
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await userService.updateUserProfile(user._id, {
        username,
      });

      if (response.success) {
        // Optionally update the user in the AuthContext
      } else {
        console.error("Profile update failed:", response.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="relative">
            <img
              src={profilePicture || "/default-profile-picture.png"} // Default image if no profile picture
              alt={`${username}'s profile`}
              className="w-40 h-40 rounded-full object-cover"
            />
            <label
              htmlFor="profile-picture-upload"
              className="absolute bottom-0 right-0 cursor-pointer"
            >
              <Camera className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              <input
                type="file"
                id="profile-picture-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={handleProfileUpdate}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            Update Profile
          </button>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4">Your Posts</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <div>
            {userPosts.length === 0 ? (
              <p>You haven't created any posts yet.</p>
            ) : (
              userPosts.map((post) => <Post key={post._id} {...post} />)
            )}
          </div>
        )}

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-8"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
