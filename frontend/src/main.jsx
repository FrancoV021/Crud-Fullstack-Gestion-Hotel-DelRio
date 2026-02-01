import React from "react";
import ReactDOM from "react-dom/client";
import "./app/globals.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";
import { Toaster } from "sonner";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)


/*
        -- | Run STACK | --

         react
         router dom
         lucide react
         jwt-decode
         tailwindcss @tailwindcss/vite 
         sonner 
         shadcn
         axios 
     ||
     9. DEPLOY RENDER V0
     |
     poner mas habitas a la carpeta de imagenes
     




*/