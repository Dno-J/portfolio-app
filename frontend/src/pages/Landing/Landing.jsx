import React, { useContext } from "react";
import Hero from "../../components/sections/Hero";
import styles from "./Landing.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../theme";

const Landing = () => {
  const { darkMode } = useContext(ThemeContext);
  const theme = darkMode ? colors.dark : colors.light;

  return (
    <div
      className={styles.wrapper}
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <Hero />
    </div>
  );
};

export default Landing;
