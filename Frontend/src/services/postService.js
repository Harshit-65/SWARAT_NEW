import axiosInstance from "./axiosInstance"; // Import the instance

// ... (other imports if any) ...

// Create a new post
const createPost = async (postData) => {
  try {
    // console.log("Create Post Payload:", postData);
    const response = await axiosInstance.post("/posts", postData);
    return response.data;
  } catch (error) {
    console.error("Create Post Error:", error.response?.data);
    throw error;
  }
};

// Get all posts
const getAllPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get posts by user ID
const getUserPosts = async (userId) => {
  try {
    const response = await axiosInstance.get(`/posts/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Upload an image
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    // console.log("Upload Image Payload:", file);
    const response = await axiosInstance.post("/posts/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Upload Image Error:", error.response?.data);
    throw error;
  }
};

export const postService = {
  createPost,
  getAllPosts,
  getUserPosts,
  uploadImage,
};
