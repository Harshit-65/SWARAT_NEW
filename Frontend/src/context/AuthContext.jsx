import { createContext, useState, useEffect } from "react";
import { auth } from "../services/authService"; // Adjust path as needed

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await auth.verifyToken(token);
          if (response.success) {
            setIsAuthenticated(true);
            setUser(response.user);
          } else {
            localStorage.removeItem("token");
          }
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setLoading(false); // Set loading to false after check
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (credentials) => {
    // Renamed to login
    try {
      const response = await auth.login(credentials);
      if (response.success) {
        localStorage.setItem("token", response.token);
        setIsAuthenticated(true);
        setUser(response.user);
        return { success: true };
      } else {
        return { success: false, message: response.message }; // Error message
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "An error occurred during login." };
    }
  };

  const register = async (userData) => {
    // Renamed to register
    try {
      const response = await auth.register(userData);
      if (response.success) {
        // Optionally, log the user in automatically
        // localStorage.setItem('token', response.token);
        // setIsAuthenticated(true);
        // setUser(response.user);
        return {
          success: true,
          message: response.message || "Registration successful!",
        };
      } else {
        return { success: false, message: response.message }; // Error message
      }
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: "An error occurred during registration.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, register, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
