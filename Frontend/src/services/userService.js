import axios from "axios";

const API_URL = "/api/users"; // Adjust base URL if needed

// Get current user profile
const getUserProfile = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/${userId}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user profile (username or profile picture)
const updateUserProfile = async (userId, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(`${API_URL}/${userId}`, userData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userService = {
  getUserProfile,
  updateUserProfile,
};
