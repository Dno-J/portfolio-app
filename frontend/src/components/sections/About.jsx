import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import resume from "../../assets/resume/Dino_Jackson_Resume.pdf";
import {
  FaPython, FaDatabase, FaDocker, FaAws, FaGitAlt, FaFilePdf, FaReact, FaTasks, FaCheckCircle
} from "react-icons/fa";

const About = () => {
  const { darkMode } = useContext(ThemeContext);

  const sectionStyle = {
    padding: "1.5rem",
    margin: "1rem 0",
    borderRadius: "12px",
    boxShadow: darkMode
      ? "0 4px 12px rgba(0,0,0,0.6)"
      : "0 4px 12px rgba(0,0,0,0.1)",
    background: darkMode
      ? "linear-gradient(145deg, #1a1a1a, #2b2b2b)"
      : "linear-gradient(145deg, #ffffff, #eaeaea)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
  };

  const skillIconStyle = { marginRight: "0.5rem", verticalAlign: "middle" };
  const hoverCardStyle = {
    transform: "scale(1.03)",
    boxShadow: darkMode
      ? "0 8px 20px rgba(0,0,0,0.7)"
      : "0 8px 20px rgba(0,0,0,0.2)",
  };

  const paragraphStyle = { marginBottom: "0.5rem" };
  const projectLineStyle = {
    marginBottom: "0.5rem",
    padding: "0.4rem 0.6rem",
    borderRadius: "6px",
    transition: "background 0.3s ease, transform 0.2s ease",
    display: "block",
  };

  const projectLineHoverStyle = {
    background: darkMode
      ? "linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1))"
      : "linear-gradient(90deg, rgba(0,199,183,0.1), rgba(0,123,255,0.1))",
    transform: "scale(1.02)",
  };

  const viewButtonStyle = {
    backgroundColor: darkMode ? "#ffffff" : "#121212",
    color: darkMode ? "#121212" : "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "0.6rem 1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const handleViewButtonHover = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = darkMode
      ? "0 4px 12px rgba(255,255,255,0.4)"
      : "0 4px 12px rgba(0,0,0,0.4)";
  };

  const handleViewButtonLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#e0e0e0" : "#000",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "960px", textAlign: "center", padding: "2rem" }}>
        {/* About Me section */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>About Me</h2>
          <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
            I am a Computer Science Engineering graduate from Geetanjali Institute of Technical Studies with hands-on experience in backend and full-stack web development. I specialize in building secure, scalable, and production-ready web applications with Python, Django, and FastAPI. My focus is on writing clean, maintainable code, deploying applications with Docker, and managing databases using PostgreSQL and SQLite.
          </p>
          <button
            onMouseEnter={handleViewButtonHover}
            onMouseLeave={handleViewButtonLeave}
            style={viewButtonStyle}
            onClick={() => window.open(resume, "_blank", "noopener,noreferrer")}
          >
            <FaFilePdf style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
            View Resume
          </button>
        </div>

        {/* All other sections */}
        {[
          {
            title: "Education & Degree",
            gradient: "linear-gradient(90deg, #28a745, #00c7b7)",
            content: (
              <>
                <p style={paragraphStyle}>B.Tech in Computer Science Engineering</p>
                <p style={paragraphStyle}>Geetanjali Institute of Technical Studies</p>
                <p style={paragraphStyle}>Graduated: 2025</p>
                <p style={paragraphStyle}>Strong foundation in data structures, algorithms, databases, and software engineering principles.</p>
              </>
            ),
          },
          {
            title: "Skills & Tech Stack",
            gradient: "linear-gradient(90deg, #ff6b6b, #f5af19)",
            content: (
              <>
                <p style={paragraphStyle}><FaPython style={skillIconStyle} /> Python, Django, FastAPI, REST APIs, SQLModel</p>
                <p style={paragraphStyle}><FaDatabase style={skillIconStyle} /> PostgreSQL (prod), SQLite (dev)</p>
                <p style={paragraphStyle}><FaDocker style={skillIconStyle} /> Docker</p>
                <p style={paragraphStyle}><FaAws style={skillIconStyle} /> AWS EC2</p>
                <p style={paragraphStyle}><FaGitAlt style={skillIconStyle} /> Git, GitHub</p>
                <p style={paragraphStyle}>Frontend Basics: HTML, CSS, Bootstrap 5</p>
                <p style={paragraphStyle}>Testing: Pytest, automated test suites</p>
              </>
            ),
          },
          {
            title: "Currently Learning",
            gradient: "linear-gradient(90deg, #6f42c1, #ff6b6b)",
            content: (
              <>
                <p style={paragraphStyle}><FaPython style={skillIconStyle} /> Advanced FastAPI and REST API design</p>
                <p style={paragraphStyle}><FaAws style={skillIconStyle} /> Cloud-native development on AWS</p>
                <p style={paragraphStyle}><FaReact style={skillIconStyle} /> React.js frontend development</p>
                <p style={paragraphStyle}><FaTasks style={skillIconStyle} /> CI/CD workflows and production-level deployment practices</p>
              </>
            ),
          },
          {
            title: "Short Project Highlights",
            gradient: "linear-gradient(90deg, #00c7b7, #007bff)",
            content: (
              <div style={{ textAlign: "center" }}>
                <p style={paragraphStyle}><strong>Blood Bank Management System (Django)</strong></p>
                {[
                  { icon: FaTasks, text: "Admin & user dashboards, donor/request workflows, PDF report generation" },
                  { icon: FaCheckCircle, text: "Secure login, CAPTCHA, brute-force protection" },
                  { icon: FaDocker, text: "Deployed on Render using Docker and PostgreSQL" },
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <p
                      key={idx}
                      style={projectLineStyle}
                      onMouseEnter={e => Object.assign(e.currentTarget.style, projectLineHoverStyle)}
                      onMouseLeave={e => Object.assign(e.currentTarget.style, projectLineStyle)}
                    >
                      <IconComp style={{ marginRight: "0.5rem" }} />{item.text}
                    </p>
                  );
                })}
                <p style={paragraphStyle}><strong>Job Tracker (FastAPI)</strong></p>
                {[
                  { icon: FaTasks, text: "Track, filter, and export job/internship applications" },
                  { icon: FaCheckCircle, text: "JWT authentication, analytics dashboard, PDF/CSV export" },
                  { icon: FaDocker, text: "Dockerized deployment on Render and AWS EC2" },
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <p
                      key={idx}
                      style={projectLineStyle}
                      onMouseEnter={e => Object.assign(e.currentTarget.style, projectLineHoverStyle)}
                      onMouseLeave={e => Object.assign(e.currentTarget.style, projectLineStyle)}
                    >
                      <IconComp style={{ marginRight: "0.5rem" }} />{item.text}
                    </p>
                  );
                })}
              </div>
            ),
          },
          {
            title: "Soft Skills / Approach",
            gradient: "linear-gradient(90deg, #f5af19, #ff6b6b)",
            content: (
              <>
                <p style={paragraphStyle}>Strong problem-solving and debugging skills</p>
                <p style={paragraphStyle}>Clean, maintainable, and testable code approach</p>
                <p style={paragraphStyle}>Comfortable with collaborative workflows and version control</p>
                <p style={paragraphStyle}>Analytical mindset with a focus on data-driven decisions</p>
              </>
            ),
          },
          {
            title: "Career Focus / Goals",
            gradient: "linear-gradient(90deg, #ff6b6b, #6f42c1)",
            content: (
              <>
                <p style={paragraphStyle}>Seeking backend or full-stack developer roles where I can contribute to real-world applications</p>
                <p style={paragraphStyle}>Interested in building scalable web systems, REST APIs, and cloud-deployed projects</p>
                <p style={paragraphStyle}>Continuously learning FastAPI, React, AWS services, CI/CD workflows, and production-grade deployment practices</p>
              </>
            ),
          },
          {
            title: "Publications & Research",
            gradient: "linear-gradient(90deg, #28a745, #00c7b7)",
            content: (
              <>
                <p style={paragraphStyle}>
                  Blood Bank Management System — Co-authored and published in International Journal of Emerging Technologies and Innovative Research (IJETIR), Vol.12, Issue 6, June 2025
                </p>
                <p style={paragraphStyle}>Focus: Donor registration, blood inventory management, and real-time emergency allocation</p>
                <p style={paragraphStyle}>
                  <a href="https://www.jetir.org/papers/JETIRGW06017.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#1f8ef1" }}>
                    View Publication PDF
                  </a>
                </p>
              </>
            ),
          },
        ].map((section, idx) => (
          <div
            key={idx}
            style={sectionStyle}
            className="hover-section"
            onMouseEnter={e => Object.assign(e.currentTarget.style, hoverCardStyle)}
            onMouseLeave={e =>
              Object.assign(e.currentTarget.style, {
                transform: "scale(1)",
                boxShadow: darkMode
                  ? "0 4px 12px rgba(0,0,0,0.6)"
                  : "0 4px 12px rgba(0,0,0,0.1)"
              })
            }
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", background: section.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {section.title}
            </h3>
            {section.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
