import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { colors, spacing, fontSizes, buttonStyle } from "../../theme";
import styles from '../../pages/Landing/Landing.module.css';
import profilePic from "../../assets/profile.jpg";

const techStack = ["Django", "FastAPI", "Docker", "PostgreSQL", "AWS"];

const Hero = () => {
  const { darkMode } = useContext(ThemeContext);
  const theme = darkMode ? colors.dark : colors.light;

  const heroGradient = darkMode
    ? `linear-gradient(135deg, ${theme.primaryHover}, ${theme.successHover})`
    : `linear-gradient(135deg, ${theme.primary}, ${theme.success})`;

  const socials = [
    { name: "GitHub", url: "https://github.com/Dno-J", iconColor: darkMode ? "#fff" : "#000" },
    { name: "LinkedIn", url: "https://linkedin.com/in/dino-jackson-486840368/", iconColor: darkMode ? "#fff" : "#0077B5" }
  ];

  return (
    <section className={styles.heroSection} style={{ background: heroGradient, color: theme.text }}>
      <div className={styles.gradientCircle} style={{ background: darkMode ? "rgba(61,220,132,0.15)" : "rgba(255,255,255,0.15)" }} />

      <div className={`${styles.avatar} ${styles['fade-up']}`} style={{ borderColor: darkMode ? theme.successHover : "#fff" }}>
        <img src={profilePic} alt="Dino Jackson" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <h1 className={`${styles['fade-up']} ${styles['fade-up-delay-1']}`} style={{ fontSize: fontSizes.heading, fontWeight: "bold", color: "#fff" }}>
        Hi, I'm Dino Jackson
      </h1>

      <h2 className={`${styles['fade-up']} ${styles['fade-up-delay-2']} ${styles.subheading}`} style={{ fontSize: fontSizes.subheading, fontWeight: 500, color: "#f0f0f0" }}>
        Aspiring Full-Stack Developer · Deployment-Ready Engineer
      </h2>

      <p className={`${styles['fade-up']} ${styles['fade-up-delay-3']} ${styles.heroParagraph}`} style={{ fontSize: fontSizes.body, maxWidth: "600px", color: "#e0e0e0" }}>
        Focused on security, reproducibility, and recruiter polish.
      </p>

      <div className={`${styles['fade-up']} ${styles['fade-up-delay-4']}`} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        {techStack.map(tech => (
          <span
            key={tech}
            className={styles.techTag}
            style={{
              backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              color: darkMode ? "#fff" : "#000",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className={`${styles['fade-up']} ${styles['fade-up-delay-5']}`} style={{ display: "flex", gap: spacing.gap, flexWrap: "wrap", justifyContent: "center", marginTop: "1rem" }}>
        <Link to="/projects">
          <button className={styles.heroButton} style={buttonStyle(theme.primary, theme.primaryHover)}>
            View Projects
          </button>
        </Link>
        <Link to="/contact">
          <button className={styles.heroButton} style={buttonStyle(theme.success, theme.successHover)}>
            Contact Me
          </button>
        </Link>
      </div>

      <div className={`${styles['fade-up']} ${styles['fade-up-delay-6']} ${styles.socialIcons}`}>
        {socials.map(s => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            style={{
              backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            }}
          >
            {s.name === "GitHub" && (
              <svg width="24" height="24" fill={s.iconColor} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.3 9.4 7.87 10.94.58.1.79-.25.79-.56v-2.2c-3.2.7-3.88-1.55-3.88-1.55-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.3 1.19-3.12-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.12 3.02.74.82 1.18 1.86 1.18 3.12 0 4.44-2.71 5.42-5.29 5.7.41.36.78 1.08.78 2.18v3.23c0 .31.21.67.8.56C20.7 21.4 24 17.1 24 12c0-6.27-5.23-11.5-12-11.5z"/>
              </svg>
            )}
            {s.name === "LinkedIn" && (
              <svg width="24" height="24" fill={s.iconColor} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.78v2.17h.07c.66-1.25 2.27-2.57 4.68-2.57 5 0 5.93 3.28 5.93 7.55V24H18v-7.92c0-1.89-.03-4.33-2.64-4.33-2.65 0-3.05 2.06-3.05 4.2V24H7.5V8z"/>
              </svg>
            )}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;
