import axios from "axios";
const API_URL = "http://localhost:5000/api/auth";

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Register new user
const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/register", userData);
    return {
      success: true,
      user: response.data,
      token: response.data.token,
    };
  } catch (error) {
    console.error("Registration error details:", error.response?.data);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Registration failed. Please try again.",
    };
  }
};

// Login user
const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login", {
      email: email,
      password: password,
    });

    if (response.data) {
      // Store token if needed
      localStorage.setItem("token", response.data.token);

      return {
        success: true,
        user: response.data,
        token: response.data.token,
      };
    }
  } catch (error) {
    console.error("Login error details:", error.response?.data);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Login failed. Please check your credentials.",
    };
  }
};

// Verify JWT token
const verifyToken = async (token) => {
  try {
    const response = await axiosInstance.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      user: response.data,
    };
  } catch (error) {
    console.error("Token verification error:", error.response?.data);

    // Clear token if it's invalid
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return {
      success: false,
      message:
        error.response?.data?.message || "Session expired. Please login again.",
    };
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem("token");
  return {
    success: true,
    message: "Logged out successfully",
  };
};

// Intercept all requests to handle tokens
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept responses to handle common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // You might want to redirect to login page here
    }
    return Promise.reject(error);
  }
);

export const auth = {
  register,
  login,
  verifyToken,
  logout,
};
