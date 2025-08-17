import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

// Sections / Protected routes
import SubmissionsDashboard from "./components/sections/SubmissionsDashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <ThemeProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
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
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
