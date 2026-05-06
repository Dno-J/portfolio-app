import React, { useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8001";

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    if (!trimmedData.name || !trimmedData.email || !trimmedData.message) {
      setError("Please fill in all fields before sending your message.");
      return;
    }

    if (!validateEmail(trimmedData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (trimmedData.message.length < 10) {
      setError("Please write a slightly longer message.");
      return;
    }

    setSending(true);
    setError("");
    setStatus("");

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmedData),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.detail || "Failed to send message. Please try again.");
      }

      setStatus(data.message || "Message sent successfully. I’ll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact form error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact-page">
      <div className="contact-shell">
        <div className="contact-header">
          <span className="section-kicker">Contact</span>
          <h1>Let’s connect about roles, projects, or collaboration.</h1>
          <p>
            I’m currently open to backend and full-stack developer opportunities.
            Send a message through the form or reach me directly through email,
            GitHub, or LinkedIn.
          </p>
        </div>

        <div className="contact-grid">
          <aside className="contact-info-card">
            <h2>Contact details</h2>
            <p>
              Best for job opportunities, project discussions, feedback on my work,
              or collaboration related to Python, FastAPI, Django, React, and
              full-stack projects.
            </p>

            <div className="contact-methods">
              <a href="mailto:jacksondino00@gmail.com">
                <span>
                  <FaEnvelope />
                </span>
                <div>
                  <strong>Email</strong>
                  <small>jacksondino00@gmail.com</small>
                </div>
              </a>

              <a
                href="https://github.com/Dno-J"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <FaGithub />
                </span>
                <div>
                  <strong>GitHub</strong>
                  <small>github.com/Dno-J</small>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/dino-jackson-486840368/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <FaLinkedin />
                </span>
                <div>
                  <strong>LinkedIn</strong>
                  <small>Dino Jackson</small>
                </div>
              </a>
            </div>

            <div className="contact-note">
              <strong>Current focus</strong>
              <p>
                Seeking backend and full-stack developer opportunities while continuing
                to improve my skills in FastAPI, Django, React, cloud deployment, testing,
                and production-ready project development.
              </p>
            </div>
          </aside>

          <div className="contact-form-card">
            <h2>Send a message</h2>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-row">
                <div className="label-row">
                  <label htmlFor="message">Message</label>
                  <span>{formData.message.length}/500</span>
                </div>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about the role, opportunity, project, or feedback..."
                  rows="7"
                  maxLength="500"
                  required
                />
              </div>

              <button type="submit" className="contact-submit" disabled={sending}>
                {sending ? "Sending..." : "Send Message"}
                <FaPaperPlane />
              </button>

              {error && (
                <div className="contact-alert error" role="alert">
                  <FaExclamationCircle />
                  <span>{error}</span>
                </div>
              )}

              {status && !error && (
                <div className="contact-alert success" role="status">
                  <FaCheckCircle />
                  <span>{status}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;