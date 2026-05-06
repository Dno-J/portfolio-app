import React from "react";
import {
  FaAws,
  FaDatabase,
  FaDocker,
  FaExternalLinkAlt,
  FaFilePdf,
  FaGitAlt,
  FaGraduationCap,
  FaPython,
  FaReact,
  FaServer,
  FaTasks,
} from "react-icons/fa";
import resume from "../../assets/resume/Dino_Jackson_Resume.pdf";

const About = () => {
  const backendSkills = [
    "Python",
    "FastAPI",
    "Django",
    "Django REST Framework",
    "REST APIs",
    "JWT Auth",
    "SQLModel",
    "Pydantic",
  ];

  const databaseSkills = [
    "PostgreSQL",
    "Neon",
    "SQLite",
    "MongoDB",
    "SQLAlchemy",
    "Database Design",
  ];

  const frontendSkills = [
    "React",
    "Next.js",
    "JavaScript",
    "HTML",
    "CSS",
    "Bootstrap",
    "Tailwind CSS",
  ];

  const deploymentSkills = [
    "Docker",
    "Docker Compose",
    "Render",
    "AWS EC2",
    "Nginx",
    "Gunicorn",
    "Git",
    "GitHub",
  ];

  const highlights = [
    {
      icon: <FaServer />,
      title: "Backend Development",
      text: "I build API-driven applications using FastAPI, Django, authentication, database models, and clean backend workflows.",
    },
    {
      icon: <FaDatabase />,
      title: "Database Workflows",
      text: "I work with PostgreSQL, SQLite, Neon, MongoDB, SQLModel, SQLAlchemy, and structured data modeling.",
    },
    {
      icon: <FaDocker />,
      title: "Deployment",
      text: "I have deployed projects using Docker, Render, AWS EC2, Nginx, Gunicorn, and environment-based configuration.",
    },
    {
      icon: <FaTasks />,
      title: "Testing & Reliability",
      text: "I write backend tests with Pytest and focus on validating authentication, CRUD, exports, APIs, and dashboard behavior.",
    },
  ];

  const experiences = [
    {
      role: "Python Automation Developer",
      company: "TrineBridge",
      period: "Nov 2023 – Jan 2025",
      points: [
        "Built Python automation workflows for batch file processing, directory validation, and CSV-based operations.",
        "Improved reliability using structured error handling and logging.",
        "Standardized automation across 100+ deliverables to reduce manual effort and repetitive errors.",
      ],
    },
    {
      role: "Python Development Intern",
      company: "CODEXINTERN",
      period: "Jul 2025 – Oct 2025",
      points: [
        "Built practical Python applications including a CSV analysis tool, Flask sentiment analysis app, and Gemini/Search API integration.",
        "Worked with REST APIs, debugging, project documentation, and GitHub-based delivery.",
      ],
    },
  ];

  const skillGroups = [
    {
      title: "Backend",
      icon: <FaPython />,
      skills: backendSkills,
    },
    {
      title: "Database",
      icon: <FaDatabase />,
      skills: databaseSkills,
    },
    {
      title: "Frontend",
      icon: <FaReact />,
      skills: frontendSkills,
    },
    {
      title: "Deployment",
      icon: <FaAws />,
      skills: deploymentSkills,
    },
  ];

  return (
    <section className="about-page">
      <div className="about-shell">
        <div className="about-hero">
          <div>
            <span className="section-kicker">About Me</span>
            <h1>Backend-focused developer building complete, deployed applications.</h1>
            <p>
              I’m a Computer Science Engineering graduate focused on backend and
              full-stack development. I build production-style projects with APIs,
              authentication, dashboards, databases, testing, Docker, and cloud
              deployment.
            </p>

            <div className="about-actions">
              <a href={resume} target="_blank" rel="noopener noreferrer" className="about-primary-link">
                View Resume
                <FaFilePdf />
              </a>

              <a
                href="https://github.com/Dno-J"
                target="_blank"
                rel="noopener noreferrer"
                className="about-secondary-link"
              >
                GitHub
                <FaExternalLinkAlt />
              </a>

              <a
                href="https://www.linkedin.com/in/dino-jackson-486840368/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-secondary-link"
              >
                LinkedIn
                <FaExternalLinkAlt />
              </a>
            </div>
          </div>

          <div className="about-summary-card">
            <span>Current Focus</span>
            <h2>Backend / Full-Stack Developer Roles</h2>
            <p>
              I’m currently seeking backend and full-stack developer roles while strengthening
              my skills in FastAPI, Django, React, cloud deployment, automated testing, and
              production-ready application development.
            </p>
          </div>
        </div>

        <div className="about-highlight-grid">
          {highlights.map((item) => (
            <article className="about-highlight-card" key={item.title}>
              <div className="about-icon">{item.icon}</div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="about-section-grid">
          <section className="about-panel">
            <div className="about-section-heading">
              <span className="section-kicker">Experience</span>
              <h2>Professional background</h2>
            </div>

            <div className="timeline">
              {experiences.map((item) => (
                <article className="timeline-item" key={`${item.role}-${item.company}`}>
                  <div className="timeline-marker" />
                  <div>
                    <h3>{item.role}</h3>
                    <p className="timeline-meta">
                      {item.company} · {item.period}
                    </p>
                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="about-panel">
            <div className="about-section-heading">
              <span className="section-kicker">Education</span>
              <h2>Academic background</h2>
            </div>

            <div className="education-card">
              <div className="about-icon">
                <FaGraduationCap />
              </div>
              <div>
                <h3>B.Tech in Computer Science Engineering</h3>
                <p>Geetanjali Institute of Technical Studies</p>
                <span>Graduated: 2025</span>
              </div>
            </div>

            <div className="education-card">
              <div className="about-icon">
                <FaBookIcon />
              </div>
              <div>
                <h3>Published Research Work</h3>
                <p>
                  Blood Bank Management System — International Journal of Emerging
                  Technologies and Innovative Research, Vol. 12, Issue 6, June 2025.
                </p>
                <a
                  href="https://www.jetir.org/papers/JETIRGW06017.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Publication <FaExternalLinkAlt />
                </a>
              </div>
            </div>
          </section>
        </div>

        <section className="about-panel">
          <div className="about-section-heading">
            <span className="section-kicker">Tech Stack</span>
            <h2>Tools I use to build projects</h2>
          </div>

          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.title}>
                <div className="skill-title">
                  <span>{group.icon}</span>
                  <h3>{group.title}</h3>
                </div>

                <div className="skill-tags">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-panel about-goals-panel">
          <div>
            <span className="section-kicker">How I Work</span>
            <h2>Project approach</h2>
          </div>

          <div className="goals-grid">
            <div>
              <h3>Build complete workflows</h3>
              <p>
                I prefer projects that include authentication, database models,
                dashboards, APIs, deployment, and documentation instead of isolated
                code snippets.
              </p>
            </div>

            <div>
              <h3>Document clearly</h3>
              <p>
                I focus on clean READMEs, setup instructions, screenshots, deployment
                notes, and project explanations that recruiters and developers can
                understand quickly.
              </p>
            </div>

            <div>
              <h3>Keep improving</h3>
              <p>
                I’m actively improving FastAPI, React, AWS, CI/CD, testing, and
                production deployment practices through portfolio projects.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

const FaBookIcon = () => <FaGitAlt />;

export default About;