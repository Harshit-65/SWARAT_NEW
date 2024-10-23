import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState("email");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthSuccess();
    navigate("/feed");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username field for signup */}
          {!isLogin && (
            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                required
              />
            </div>
          )}

          {/* Login method toggle */}
          {isLogin && (
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setLoginMethod("email")}
                className={`px-4 py-2 rounded ${
                  loginMethod === "email"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("username")}
                className={`px-4 py-2 rounded ${
                  loginMethod === "username"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Username
              </button>
            </div>
          )}

          {/* Login input field based on method */}
          {isLogin && (
            <div className="relative">
              {loginMethod === "email" ? (
                <Mail
                  className="absolute top-3 left-3 text-gray-400"
                  size={20}
                />
              ) : (
                <User
                  className="absolute top-3 left-3 text-gray-400"
                  size={20}
                />
              )}
              <input
                type={loginMethod === "email" ? "email" : "text"}
                placeholder={loginMethod === "email" ? "Email" : "Username"}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                required
              />
            </div>
          )}

          {/* Email field for signup */}
          {!isLogin && (
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                required
              />
            </div>
          )}

          {/* Password fields */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              required
            />
          </div>
          {!isLogin && (
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
