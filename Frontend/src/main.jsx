import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// frontend/
// ├── public/
// │   └── index.html
// ├── src/
// │   ├── App.jsx
// │   ├── index.jsx
// │   ├── styles/
// │   │   └── global.css
// │   ├── components/
// │   │   ├── Navbar.jsx
// │   │   ├── Post.jsx
// │   │   ├── ImageCarousel.jsx
// │   │   └── ...  // Other UI components
// │   ├── pages/
// │   │   ├── HomePage.jsx
// │   │   ├── AuthPage.jsx
// │   │   ├── FeedPage.jsx
// │   │   ├── ProfilePage.jsx
// │   │   └── ChatPage.jsx
// │   ├── services/
// │   │   ├── authService.js
// │   │   ├── postService.js
// │   │   ├── chatService.js
// │   │   └── userService.js
// │   └── context/
// │       └── AuthContext.js
// └── package.json
