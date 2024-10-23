import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthPage from "./pages/AuthPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <AuthPage /> */}
  </StrictMode>
);
