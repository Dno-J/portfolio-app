import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun, FaExternalLinkAlt } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./Navbar.module.css";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const getNavClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.activeLink : ""}`;

  const logoutAndRedirect = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <header className={styles.navbar}>
      <nav className={styles.navContainer} aria-label="Main navigation">
        <Link to="/" className={styles.logo} aria-label="Go to homepage">
          <span className={styles.logoMark}>DJ</span>
          <span className={styles.logoText}>Dino Jackson</span>
        </Link>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          {navItems.map(({ label, path }) => (
            <NavLink key={path} to={path} className={getNavClass} end={path === "/"}>
              {label}
            </NavLink>
          ))}

          <a
            href="/resume/Dino_Jackson_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeLink}
          >
            Resume <FaExternalLinkAlt className={styles.smallIcon} />
          </a>

          {isLoggedIn && (
            <>
              <NavLink to="/submissions" className={getNavClass}>
                Submissions
              </NavLink>

              <button type="button" onClick={logoutAndRedirect} className={styles.logoutButton}>
                Logout
              </button>
            </>
          )}

          <button type="button" onClick={toggleTheme} className={styles.themeButton}>
            {darkMode ? <FaSun /> : <FaMoon />}
            <span>{darkMode ? "Light" : "Dark"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;