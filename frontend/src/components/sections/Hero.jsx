import React from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaDownload,
  FaExternalLinkAlt,
  FaServer,
  FaDocker,
  FaDatabase,
} from "react-icons/fa";

import styles from "../../pages/Landing/Landing.module.css";
import profilePic from "../../assets/profile.jpg";
import resume from "../../assets/resume/Dino_Jackson_Resume.pdf";

const techStack = [
  "Python",
  "FastAPI",
  "Django",
  "React",
  "PostgreSQL",
  "Docker",
  "Render",
  "AWS EC2",
];

const highlights = [
  {
    icon: <FaServer />,
    label: "Backend APIs",
    value: "FastAPI & Django",
  },
  {
    icon: <FaDatabase />,
    label: "Databases",
    value: "PostgreSQL & SQLite",
  },
  {
    icon: <FaDocker />,
    label: "Deployment",
    value: "Docker, Render, AWS",
  },
];

const stats = [
  { value: "5+", label: "Full-stack projects" },
  { value: "100+", label: "Automated deliverables" },
  { value: "2025", label: "CSE graduate" },
];

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.backgroundGlowOne} />
      <div className={styles.backgroundGlowTwo} />

      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            Open to backend / full-stack developer roles
          </div>

          <h1 className={styles.heroTitle}>
            Hi, I’m <span>Dino Jackson</span>
          </h1>

          <h2 className={styles.heroSubtitle}>
            Backend-focused full-stack developer building production-style apps
            with FastAPI, Django, React, PostgreSQL, Docker, and cloud deployment.
          </h2>

          <p className={styles.heroDescription}>
            I build secure APIs, dashboards, automation workflows, and deployed
            web applications. My current focus is creating recruiter-ready
            projects that show real backend engineering, testing, deployment,
            and clean frontend presentation.
          </p>

          <div className={styles.ctaGroup}>
            <Link to="/projects" className={styles.primaryButton}>
              View Projects
              <FaExternalLinkAlt />
            </Link>

            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryButton}
            >
              Resume
              <FaDownload />
            </a>

            <Link to="/contact" className={styles.ghostButton}>
              Contact Me
              <FaEnvelope />
            </Link>
          </div>

          <div className={styles.socialLinks} aria-label="Social links">
            <a
              href="https://github.com/Dno-J"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <FaGithub />
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/dino-jackson-486840368/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <FaLinkedin />
              LinkedIn
            </a>

            <a href="mailto:jacksondino00@gmail.com" aria-label="Send email">
              <FaEnvelope />
              Email
            </a>
          </div>

          <div className={styles.techStack}>
            {techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>

        <aside className={styles.heroCard} aria-label="Developer profile summary">
          <div className={styles.avatarRing}>
            <img src={profilePic} alt="Dino Jackson" className={styles.avatar} />
          </div>

          <div className={styles.profileCardContent}>
            <h3>Dino Jackson</h3>
            <p>Python Automation Developer · Backend / Full-Stack Developer</p>

            <div className={styles.highlightList}>
              {highlights.map((item) => (
                <div className={styles.highlightItem} key={item.label}>
                  <div className={styles.highlightIcon}>{item.icon}</div>
                  <div>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((item) => (
          <div className={styles.statCard} key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;