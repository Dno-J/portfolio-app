import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { ThemeProvider } from "./context/ThemeContext";

// Layout
import Navbar from "./components/layout/Navbar";

// Pages
import Landing from "./pages/Landing/Landing";
import About from "./components/sections/About";
import Projects from "./pages/Projects/Projects";
import ContactForm from "./pages/Contact/ContactForm";
import LoginForm from "./pages/Login/LoginForm";

// Protected pages
import SubmissionsDashboard from "./components/sections/SubmissionsDashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem("token")));

  useEffect(() => {
    const syncLoginState = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("storage", syncLoginState);
    window.addEventListener("auth-change", syncLoginState);

    return () => {
      window.removeEventListener("storage", syncLoginState);
      window.removeEventListener("auth-change", syncLoginState);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    window.dispatchEvent(new Event("auth-change"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("auth-change"));
  };

  return (
    <ThemeProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<ContactForm />} />

            <Route
              path="/submissions"
              element={
                <ProtectedRoute>
                  <SubmissionsDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/submissions" replace />
                ) : (
                  <LoginForm onLoginSuccess={handleLoginSuccess} />
                )
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;