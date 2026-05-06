import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaSignInAlt,
  FaUserShield,
  FaExclamationCircle,
} from "react-icons/fa";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8001";

  const handleLogin = async (event) => {
    event.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: trimmedUsername,
          password,
        }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.detail || "Invalid username or password.");
      }

      if (!data.access_token) {
        throw new Error("Login succeeded but no access token was returned.");
      }

      localStorage.setItem("token", data.access_token);
      onLoginSuccess?.();
      navigate("/submissions");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-shell auth-shell">
        <div className="auth-card">
          <div className="auth-icon">
            <FaUserShield />
          </div>

          <span className="section-kicker">Admin Access</span>

          <h1>Submissions Dashboard Login</h1>

          <p>
            This page is for accessing portfolio contact submissions. Public
            visitors do not need to log in.
          </p>

          <form onSubmit={handleLogin} className="auth-form" noValidate>
            <div className="admin-form-row">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError("");
                }}
                placeholder="Admin username"
                autoComplete="username"
                required
              />
            </div>

            <div className="admin-form-row">
              <label htmlFor="password">Password</label>

              <div className="password-field">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  placeholder="Admin password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="admin-primary-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
              {loading ? <FaLock /> : <FaSignInAlt />}
            </button>

            {error && (
              <div className="admin-alert error" role="alert">
                <FaExclamationCircle />
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;