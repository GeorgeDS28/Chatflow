// React's StrictMode helps detect potential problems
// during development. It does not affect production.
import { StrictMode } from "react";

// React 18 rendering API
import { createRoot } from "react-dom/client";

// Global CSS file
import "./index.css";

// Main App component
import App from "./App.jsx";

// BrowserRouter enables routing
// (/, /login, /signup, etc.)
import { BrowserRouter } from "react-router";

// Find the div with id="root" inside index.html
createRoot(document.getElementById("root")).render(
  // StrictMode runs extra checks in development
  <StrictMode>
    {/* Enables routing throughout the application */}
    <BrowserRouter>
      {/* Main application component */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
