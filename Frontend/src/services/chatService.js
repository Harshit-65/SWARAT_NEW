import axiosInstance from "./axiosInstance";

const API_URL = "http://localhost:5000/api/chats";

const getChats = async (postId) => {
  try {
    const response = await axiosInstance.get(API_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      params: { postId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createChat = async ({ postId, groupName }) => {
  // Changed to accept an object
  try {
    const response = await axiosInstance.post(
      API_URL,
      { postId, groupName }, // Include postId in request body
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addUserToChat = async (chatId, userId) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/${chatId}/addUser`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Get token from localStorage
        },
      }
    );
    return response.data; // Return the updated chat object
  } catch (error) {
    console.error("Error adding user to chat:", error);
    throw error; // Re-throw the error to be handled in the component
  }
};

const getChatByPostId = async (postId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting chat by post ID:", error);
    throw error; // Rethrow for error handling in the component
  }
};

const getChatById = async (chatId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${chatId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const sendMessage = async (messageData) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/${messageData.chatId}/messages`,
      { content: messageData.content },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const closeChat = async (chatId) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/${chatId}`,
      { isClosed: true }, // Update the chat to be closed
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ... other functions (deleteChat, etc.) ...

export const chatService = {
  getChats,
  createChat,
  getChatById,
  getChatByPostId, // Add this to the exported object
  sendMessage,
  closeChat,
  addUserToChat,
  // ... other chat service functions
};
