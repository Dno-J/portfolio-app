import React from "react";
import ProjectCard from "../../components/ui/ProjectCard";
import { FaGithub, FaExternalLinkAlt, FaBookOpen } from "react-icons/fa";

const Projects = () => {
  const projects = [
    {
      title: "Job Intelligence Platform",
      badge: "Flagship Project",
      description:
        "A full-stack career intelligence platform that scrapes jobs, extracts skills, analyzes market demand, recommends relevant roles, and tracks job applications.",
      impact:
        "Built to demonstrate real-world backend architecture, async processing, analytics APIs, authentication, profile-based recommendations, resume analysis, skill gap analysis, testing, and deployed full-stack delivery.",
      tech: [
        "FastAPI",
        "React",
        "PostgreSQL",
        "Neon",
        "Redis",
        "Celery",
        "Docker",
        "Render",
        "Pytest",
      ],
      features: [
        "Job scraping",
        "Skill extraction",
        "Market analytics",
        "Recommendations",
        "Resume analyzer",
        "Application tracker",
      ],
      links: [
        {
          label: "GitHub",
          icon: FaGithub,
          url: "https://github.com/Dno-J/job-intelligence-platform",
          type: "github",
        },
        {
          label: "Live Frontend",
          icon: FaExternalLinkAlt,
          url: "https://jobintel-frontend.onrender.com",
          type: "live",
        },
        {
          label: "Swagger Docs",
          icon: FaBookOpen,
          url: "https://job-intelligence-platform-cnbf.onrender.com/docs",
          type: "docs",
        },
      ],
      screenshots: [
        {
          src: require("../../assets/screenshots/job-intelligence-platform/home.png"),
          caption: "Home page explaining the JobIntel workflow and platform purpose",
        },
        {
          src: require("../../assets/screenshots/job-intelligence-platform/dashboard.png"),
          caption: "Market analytics dashboard with job trends and demand insights",
        },
        {
          src: require("../../assets/screenshots/job-intelligence-platform/jobs.png"),
          caption: "Searchable and filterable job listings page",
        },
        {
          src: require("../../assets/screenshots/job-intelligence-platform/recommended-jobs.png"),
          caption: "Personalized job recommendations based on career profile signals",
        },
        {
          src: require("../../assets/screenshots/job-intelligence-platform/application-tracker.png"),
          caption: "Application tracker for saved jobs, statuses, and notes",
        },
        {
          src: require("../../assets/screenshots/job-intelligence-platform/profile.png"),
          caption: "Career profile page used for recommendation matching",
        },
        {
          src: require("../../assets/screenshots/job-intelligence-platform/tools.png"),
          caption: "Career tools including resume analyzer and skill gap analysis",
        },
        {
          src: require("../../assets/screenshots/job-intelligence-platform/api-docs.png"),
          caption: "FastAPI Swagger documentation for backend APIs",
        },
      ],
    },
    {
      title: "Blood Bank RAG AI",
      badge: "AI Search Project",
      description:
        "A full-stack Django + Next.js app demonstrating explainable RAG-style semantic search across donors, hospitals, and blood requests.",
      impact:
        "Built to show safe AI retrieval behavior using local embeddings, MongoDB vector storage, structured metadata, deterministic summaries, and clear no-result handling.",
      tech: [
        "Django",
        "Django REST Framework",
        "Next.js",
        "MongoDB",
        "Sentence Transformers",
        "Tailwind CSS",
      ],
      features: [
        "Semantic search",
        "Vector ingestion",
        "Metadata grounding",
        "Donor dashboard",
        "Hospital dashboard",
        "Deterministic summaries",
      ],
      links: [
        {
          label: "GitHub",
          icon: FaGithub,
          url: "https://github.com/Dno-J/bloodbank-rag-ai",
          type: "github",
        },
      ],
      screenshots: [
        {
          src: require("../../assets/screenshots/bloodbank-rag-ai/home-dashboard.png"),
          caption: "Landing dashboard with system overview",
        },
        {
          src: require("../../assets/screenshots/bloodbank-rag-ai/donors-table.png"),
          caption: "Donors CRUD dashboard",
        },
        {
          src: require("../../assets/screenshots/bloodbank-rag-ai/hospitals-table.png"),
          caption: "Hospitals management dashboard",
        },
        {
          src: require("../../assets/screenshots/bloodbank-rag-ai/requests-table.png"),
          caption: "Blood requests dashboard",
        },
        {
          src: require("../../assets/screenshots/bloodbank-rag-ai/ai-search-empty.png"),
          caption: "AI search empty state before query submission",
        },
        {
          src: require("../../assets/screenshots/bloodbank-rag-ai/ai-search-donors.png"),
          caption: "Semantic donor search using natural language",
        },
        {
          src: require("../../assets/screenshots/bloodbank-rag-ai/ai-search-hospitals.png"),
          caption: "Semantic hospital search using capacity-based reasoning",
        },
      ],
    },
    {
      title: "Job Tracker",
      badge: "FastAPI App",
      description:
        "A FastAPI-powered job application tracker for managing applications, tracking statuses, exporting reports, and reviewing progress through a dashboard.",
      impact:
        "Built to demonstrate FastAPI fundamentals, SQLModel data modeling, JWT authentication, server-rendered dashboard workflows, CSV/PDF exports, Docker deployment, and automated backend tests.",
      tech: ["FastAPI", "SQLModel", "PostgreSQL", "SQLite", "Jinja2", "Docker", "Pytest"],
      features: [
        "JWT auth",
        "Job CRUD",
        "Dashboard filtering",
        "CSV export",
        "PDF reports",
        "Backend tests",
      ],
      links: [
        {
          label: "GitHub",
          icon: FaGithub,
          url: "https://github.com/Dno-J/job-tracker",
          type: "github",
        },
        {
          label: "Live Demo",
          icon: FaExternalLinkAlt,
          url: "https://job-tracker-59j1.onrender.com/",
          type: "live",
        },
      ],
      screenshots: [
        {
          src: require("../../assets/screenshots/job-tracker/dashboard.png"),
          caption: "Dashboard with application stats and filters",
        },
        {
          src: require("../../assets/screenshots/job-tracker/add_job_form.png"),
          caption: "Add job application form",
        },
        {
          src: require("../../assets/screenshots/job-tracker/edit_job_form.png"),
          caption: "Edit existing job application form",
        },
        {
          src: require("../../assets/screenshots/job-tracker/filtered_jobs.png"),
          caption: "Filtered application results",
        },
        {
          src: require("../../assets/screenshots/job-tracker/export_pdf.png"),
          caption: "PDF export report for job applications",
        },
      ],
    },
    {
      title: "Blood Bank Management System",
      badge: "Published Django Project",
      description:
        "A Django-based blood bank management system for managing donors, blood requests, admin workflows, dashboards, authentication, and PDF reports.",
      impact:
        "Built as a complete Django project with user and admin workflows, CAPTCHA protection, staff-only admin access, verification actions, PDF reporting, Docker deployment, and academic publication support.",
      tech: [
        "Django",
        "PostgreSQL",
        "Bootstrap",
        "Docker",
        "Render",
        "Gunicorn",
        "WeasyPrint",
      ],
      features: [
        "User auth",
        "Donor flow",
        "Request flow",
        "Admin dashboard",
        "PDF report",
        "CAPTCHA security",
      ],
      links: [
        {
          label: "GitHub",
          icon: FaGithub,
          url: "https://github.com/Dno-J/Django-BloodBank-Management-System",
          type: "github",
        },
        {
          label: "Live Demo",
          icon: FaExternalLinkAlt,
          url: "https://bloodbank-backend-zvbu.onrender.com",
          type: "live",
        },
        {
          label: "Publication",
          icon: FaBookOpen,
          url: "https://www.jetir.org/papers/JETIRGW06017.pdf",
          type: "docs",
        },
      ],
      screenshots: [
        {
          src: require("../../assets/screenshots/bbms/Signup.png"),
          caption: "Custom signup page with CAPTCHA protection",
        },
        {
          src: require("../../assets/screenshots/bbms/login.png"),
          caption: "Login page for users and staff",
        },
        {
          src: require("../../assets/screenshots/bbms/admin_dash.png"),
          caption: "Admin dashboard with summaries and management actions",
        },
        {
          src: require("../../assets/screenshots/bbms/User_dash.png"),
          caption: "User dashboard showing donation and request activity",
        },
        {
          src: require("../../assets/screenshots/bbms/donate.png"),
          caption: "Blood donation form",
        },
        {
          src: require("../../assets/screenshots/bbms/request.png"),
          caption: "Blood request form",
        },
        {
          src: require("../../assets/screenshots/bbms/pdf_report.png"),
          caption: "Generated PDF blood summary report",
        },
      ],
    },
    {
      title: "Portfolio App",
      badge: "Personal Brand",
      description:
        "A full-stack developer portfolio with a React frontend, FastAPI backend, contact form, protected submissions dashboard, JWT login, CSV export, and deployment setup.",
      impact:
        "Built to present projects professionally while also demonstrating backend integration, authentication, Dockerized local development, contact submission workflows, and deployment experience across AWS and Render.",
      tech: ["React", "FastAPI", "PostgreSQL", "Docker", "Nginx", "Render", "AWS EC2"],
      features: [
        "Project showcase",
        "Contact form",
        "JWT admin login",
        "Submissions dashboard",
        "CSV export",
        "Dark mode",
      ],
      links: [
        {
          label: "GitHub",
          icon: FaGithub,
          url: "https://github.com/Dno-J/portfolio-app",
          type: "github",
        },
        {
          label: "Live Demo",
          icon: FaExternalLinkAlt,
          url: "https://portfolio-frontend-wy8a.onrender.com/",
          type: "live",
        },
      ],
      screenshots: [
        {
          src: require("../../assets/screenshots/portfolio/landing.png"),
          caption: "Portfolio landing page",
        },
        {
          src: require("../../assets/screenshots/portfolio/projects.png"),
          caption: "Projects showcase page",
        },
        {
          src: require("../../assets/screenshots/portfolio/submissions_dashboard.png"),
          caption: "Protected submissions dashboard",
        },
      ],
    },
  ];

  return (
    <section className="projects-page">
      <div className="projects-shell">
        <div className="projects-header">
          <span className="section-kicker">Selected Work</span>
          <h1>Projects built with backend depth and full-stack delivery.</h1>
          <p>
            A curated set of production-style projects covering APIs, databases,
            authentication, dashboards, deployment, scraping, AI search,
            reporting, testing, and clean user-facing workflows.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;