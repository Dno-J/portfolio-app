import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  const themeStyles = {
    backgroundColor: darkMode ? "#121212" : "#fff",
    color: darkMode ? "#e0e0e0" : "#333",
    minHeight: "100vh",
    transition: "background-color 0.3s ease, color 0.3s ease"
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div style={themeStyles}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
