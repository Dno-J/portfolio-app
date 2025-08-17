import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ProjectCard from "../../components/ui/ProjectCard";
import { FaGithub, FaExternalLinkAlt, FaAws } from "react-icons/fa";

const Projects = () => {
  const { darkMode } = useContext(ThemeContext);

  const projects = [
    {
      title: "Blood Bank Management System",
      description:
        "Django-based web app for managing blood donors, requests, and inventory. Features custom signup/login, admin/user dashboards, PDF reports, and Docker deployment.",
      tech: ["Django", "PostgreSQL", "Docker", "Bootstrap"],
      links: [
        { icon: FaGithub, url: "https://github.com/Dno-J/Django-BloodBank-Management-System" },
        { icon: FaExternalLinkAlt, url: "https://bloodbank-backend-zvbu.onrender.com" }
      ],
      screenshots: [
        { src: require("../../assets/screenshots/bbms/Signup.png"), caption: "Custom signup page with CAPTCHA" },
        { src: require("../../assets/screenshots/bbms/login.png"), caption: "Login page for users and staff" },
        { src: require("../../assets/screenshots/bbms/admin_dash.png"), caption: "Admin dashboard with real-time stats & glowing containers" },
        { src: require("../../assets/screenshots/bbms/User_dash.png"), caption: "User dashboard showing donation & request history" },
        { src: require("../../assets/screenshots/bbms/donate.png"), caption: "Blood donation form submission" },
        { src: require("../../assets/screenshots/bbms/request.png"), caption: "Blood request form submission" },
        { src: require("../../assets/screenshots/bbms/pdf_report.png"), caption: "Downloadable PDF summary report" }
      ]
    },
    {
      title: "Job Tracker",
      description:
        "FastAPI & React full-stack app to track, filter, and export job/internship applications. Includes JWT authentication, analytics dashboard, PDF/CSV export, and cloud deployment.",
      tech: ["FastAPI", "React", "PostgreSQL", "Docker", "AWS EC2"],
      links: [
        { icon: FaGithub, url: "https://github.com/Dno-J/job-tracker" },
        { icon: FaExternalLinkAlt, url: "https://job-tracker-59j1.onrender.com/" },
        { icon: FaAws, url: "http://16.171.148.202:8000/" }
      ],
      screenshots: [
        { src: require("../../assets/screenshots/job-tracker/dashboard.png"), caption: "Dashboard with stats & filters" },
        { src: require("../../assets/screenshots/job-tracker/add_job_form.png"), caption: "Add Job form" },
        { src: require("../../assets/screenshots/job-tracker/edit_job_form.png"), caption: "Edit Job form" },
        { src: require("../../assets/screenshots/job-tracker/filtered_jobs.png"), caption: "Filtered job results" },
        { src: require("../../assets/screenshots/job-tracker/export_pdf.png"), caption: "Export jobs to PDF" }
      ]
    }
  ];

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#e0e0e0" : "#000",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem"
      }}
    >
      <div style={{ width: "100%", maxWidth: "1200px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "2rem", fontSize: "2.5rem" }}>Projects</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
          {projects.map((proj, i) => (
            <ProjectCard key={i} darkMode={darkMode} {...proj} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
