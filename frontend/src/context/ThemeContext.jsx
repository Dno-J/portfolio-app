import React, { createContext, useEffect, useMemo, useState } from "react";

export const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const themeName = darkMode ? "dark" : "light";

    localStorage.setItem("theme", themeName);
    document.documentElement.setAttribute("data-theme", themeName);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const value = useMemo(
    () => ({
      darkMode,
      toggleTheme,
    }),
    [darkMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};