import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from "../../context/ThemeContext";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import './ContactForm.css';

const ContactForm = () => {
  const { darkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setStatus('');
  };

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSending(true);
    setError('');
    setStatus('Sending...');
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to send message.');
      }

      const data = await res.json();
      setStatus(data.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (error) {
      const firstEmpty = Object.keys(formData).find(key => !formData[key]);
      if (firstEmpty) document.getElementsByName(firstEmpty)[0]?.focus();
    }
  }, [error, formData]);

  return (
    <div className={`contact-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="contact-form-wrapper">
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit} aria-live="polite">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              maxLength="500"
              required
            />
            <div className="char-counter">{formData.message.length}/500</div>
          </div>

          <button type="submit" className="send-btn" disabled={sending}>
            {sending ? 'Sending...' : 'Send'}
          </button>

          {error && <p className="status error">{error}</p>}
          {status && !error && <p className="status success">{status}</p>}
        </form>

        <div className="quick-contact">
          <p>Or reach me directly via:</p>
          <div className="contact-links">
            <a href="mailto:jacksondino00@gmail.com" aria-label="Email">
              <FaEnvelope size={24} />
            </a>
            <a href="https://linkedin.com/in/dino-jackson-486840368/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/Dno-J" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
