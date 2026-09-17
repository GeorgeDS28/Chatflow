{
// ===============================================
// PHASE 6(a): FRONTEND PACKAGE CONFIGURATION
// Purpose:
// Manage frontend dependencies & scripts
// ===============================================

"name": "frontend",

// ===============================================
// private: true
// Prevents accidental npm publishing
// ===============================================
"private": true,

"version": "0.0.0",

// ===============================================
// type: module
// Enables ES Modules import/export syntax
// ===============================================
"type": "module",

// ===============================================
// NPM SCRIPTS
// ===============================================
"scripts": {

    // ===============================================
    // Start Vite development server
    // ===============================================
    "dev": "vite",

    // ===============================================
    // Create production build
    // ===============================================
    "build": "vite build",

    // ===============================================
    // Run ESLint
    // Helps maintain clean code quality
    // ===============================================
    "lint": "eslint .",

    // ===============================================
    // Preview production build locally
    // ===============================================
    "preview": "vite preview"

},

// ===============================================
// FRONTEND DEPENDENCIES
// ===============================================
"dependencies": {

    // ===============================================
    // Axios
    // Used for API requests
    // ===============================================
    "axios": "^1.11.0",

    // ===============================================
    // Lucide Icons
    // Modern SVG icon library
    // ===============================================
    "lucide-react": "^0.542.0",

    // ===============================================
    // React Core
    // ===============================================
    "react": "^19.1.1",
    "react-dom": "^19.1.1",

    // ===============================================
    // Toast Notifications
    // ===============================================
    "react-hot-toast": "^2.6.0",

    // ===============================================
    // React Router
    // Client-side routing/navigation
    // ===============================================
    "react-router": "^7.8.2",

    // ===============================================
    // Socket.io frontend client
    // Enables real-time communication
    // ===============================================
    "socket.io-client": "^4.8.1",

    // ===============================================
    // Zustand
    // Lightweight global state management
    // ===============================================
    "zustand": "^5.0.3"

},

// ===============================================
// DEVELOPMENT DEPENDENCIES
// ===============================================
"devDependencies": {

    // ESLint core
    "@eslint/js": "^9.33.0",

    // React Type Definitions
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",

    // Vite React plugin
    "@vitejs/plugin-react": "^5.0.0",

    // CSS processing
    "autoprefixer": "^10.4.21",

    // DaisyUI component library
    "daisyui": "^4.12.24",

    // ESLint packages
    "eslint": "^9.33.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",

    // Global variables helper
    "globals": "^16.3.0",

    // PostCSS
    "postcss": "^8.5.6",

    // Tailwind CSS
    "tailwindcss": "^3.4.17",

    // Vite bundler
    "vite": "^7.1.2"

}
}
