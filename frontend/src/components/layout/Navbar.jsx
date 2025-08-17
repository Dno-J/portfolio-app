import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./Navbar.module.css";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const location = useLocation();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>Dino Jackson</div>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* FIX: use the CSS-module-scoped `styles.open` instead of plain "open" */}
        <div
          className={`${styles.navLinks} ${
            menuOpen ? `${styles.navMobile} ${styles.open}` : ""
          }`}
        >
          {navItems.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`${styles.navLink} ${isActive(path)}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          {isLoggedIn ? (
            <>
              <Link
                to="/submissions"
                className={`${styles.navLink} ${isActive("/submissions")}`}
                onClick={() => setMenuOpen(false)}
              >
                Submissions
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className={styles.themeButton}
                style={{ backgroundColor: "#dc3545", color: "#fff" }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`${styles.navLink} ${isActive("/login")}`}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}

          <button onClick={toggleTheme} className={styles.themeButton}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
