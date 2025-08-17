import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import '../Contact/ContactForm.css';
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
  const { darkMode } = useContext(ThemeContext);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Use environment variable for backend API URL
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      navigate("/submissions");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`contact-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="contact-form-wrapper">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} aria-live="polite">
          <div className="form-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" className="send-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="status error">{error}</p>}
        </form>

        {/* Quick login info section */}
        <div className="quick-login-info">
          <p>Quick Login Info:</p>
          <div className="login-details">
            <span><FaUser /> Username: <strong>admin</strong></span>
            <span><FaLock /> Password: <strong>admin123</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
