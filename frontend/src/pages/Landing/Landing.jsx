import React from "react";
import Hero from "../../components/sections/Hero";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.wrapper}>
      <Hero />
    </div>
  );
};

export default Landing;