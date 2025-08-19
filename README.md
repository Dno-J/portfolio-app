# 🚀 Portfolio App

[![GitHub](https://img.shields.io/badge/Dno--J%2Fportfolio--app-181717?logo=github)](https://github.com/Dno-J/portfolio-app) 
[![Live App — AWS EC2](https://img.shields.io/badge/Live%20App%20EC2-FF9900?logo=amazonaws&logoColor=white&style=flat-square)](http://16.171.148.202) 
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin)](https://www.linkedin.com/in/dino-jackson-486840368/) 
[![Last Commit](https://img.shields.io/github/last-commit/Dno-J/portfolio-app?style=flat-square)](https://github.com/Dno-J/portfolio-app/commits/main) 
![Stars](https://img.shields.io/github/stars/Dno-J/portfolio-app?style=flat-square) 
![Forks](https://img.shields.io/github/forks/Dno-J/portfolio-app?style=flat-square)

A full-stack personal portfolio application showcasing my projects, skills, and deployment architecture. Built with FastAPI, React, Docker, and deployed on EC2 with Nginx reverse proxy.

---

## 🛠 Tech Stack

| Layer            | Technologies |
|------------------|--------------|
| **Frontend**     | ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) |
| **Backend**      | ![FastAPI](https://img.shields.io/badge/FastAPI-005571?logo=fastapi&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white) |
| **Database**     | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white) |
| **Authentication** | ![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens) |
| **Deployment**   | ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) ![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-232F3E?logo=amazon-aws&logoColor=white) |
| **Version Control** | ![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white) |

---

## 📦 Features

* ⚙️ **Modular multi-container setup with Docker** — backend (FastAPI) + frontend (React) + Nginx proxy.
* 🔐 **JWT-based authentication** — secure login flow for submissions dashboard.
* 🌐 **CORS-safe API proxying via Nginx** — clean separation of frontend/backend traffic.
* 📄 **SPA routing support** — React Router with client-side navigation.
* 🧪 **Reproducible builds & environment-driven config** — `.env` and `.env.example` for portability.
* 📬 **Submissions Dashboard** — view and manage messages from the contact form.
* 📊 **Export submissions as CSV** — easily download and analyze received messages.
* 📑 **Integrated Resume Viewer & Download** — PDF resume embedded in the app.
* 🖼 **Project Showcase** — interactive cards with screenshots, tech stack, and live links.
* 🎨 **Light/Dark Mode support** — global theming with React Context API.
* 🔧 **CI-ready structure** — backend and frontend separated with Docker + Nginx config for smooth deployment.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Dno-J/portfolio-app.git
cd portfolio-app
```

### 2. Set up environment variables

All required environment variables are listed in `.env.example`.

To get started:
```bash
cp .env.example .env
```

### 3. Build and run containers

```bash
docker-compose up --build
```

App will be available at `http://localhost:8001` or your EC2 IP.

---

## 📄 API Documentation

FastAPI auto-generates interactive docs at:

http://16.171.148.202:8001/docs

## 🎥 Demo

**Landing Page**  
A clean, responsive hero section introducing me and my portfolio.  
![Landing Page](frontend/src/assets/screenshots/portfolio/landing.png)

**Projects Page**  
Showcases my deployed projects (Job Tracker, BBMS, etc.) with live links and details.  
![Projects Page](frontend/src/assets/screenshots/portfolio/projects.png)

**Submissions Dashboard**  
Interactive dashboard for managing portfolio form submissions (e.g., contact requests).  
![Submissions Dashboard](frontend/src/assets/screenshots/portfolio/submissions_dashboard.png)

🔗 [Live App on AWS EC2](http://16.171.148.202)


## 🔧 File Structure

```
portfolio-app/
├── backend/
│   ├── Dockerfile               # Backend container setup
│   ├── requirements.txt         # Python dependencies
│   └── app/
│       ├── main.py              # FastAPI app entrypoint
│       ├── api.py               # API route definitions
│       ├── auth.py              # JWT auth logic
│       ├── contact.py           # Contact form handling
│       ├── database.py          # DB connection setup
│       ├── models.py            # Pydantic models / ORM schemas
│       └── settings.py          # Env config loader via os.getenv()
│
├── frontend/
│   ├── Dockerfile               # Frontend container setup
│   ├── nginx.conf               # Nginx reverse proxy config
│   ├── public/
│   │   └── index.html           # HTML entrypoint for React
│   └── src/
│       ├── App.js               # Root React component
│       ├── index.js             # React DOM renderer
│       ├── theme.js             # Theme config (light/dark)
│       ├── components/
│       │   ├── layout/Navbar.jsx        # Top navigation bar
│       │   ├── sections/Hero.jsx        # Hero section of landing page
│       │   ├── sections/About.jsx       # About section
│       │   └── ui/ProjectCard.jsx       # Project display card
│       ├── pages/
│       │   ├── Landing/Landing.jsx      # Main landing page
│       │   ├── Projects/Projects.jsx    # Project showcase page
│       │   └── Login/LoginForm.jsx      # Login form component
│       └── context/ThemeContext.jsx     # Global theme context
```

---

## 📡 Deployment Notes

- EC2 instance with open ports `80`, `443`, and `8001`
- Nginx reverse proxy handles static assets and API routing
- PostgreSQL hosted on Neon.tech with SSL and channel binding
- Safe container orchestration with isolated networks

---

## 👨‍💻 Author

**Dino Jackson**  
_Aspiring full-stack developer & deployment architect_  
[![LinkedIn](https://img.shields.io/badge/Linkedin-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dino-jackson-486840368)
[![GitHub](https://img.shields.io/badge/Github-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Dno-J)
[![Email](https://img.shields.io/badge/jacksodino00%40gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:jacksodino00@gmail.com)


---

## License

This project is licensed under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2025 Dino Jackson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
<p align="center">
  Built with ❤️ by <strong>Dino Jackson</strong>
</p>

