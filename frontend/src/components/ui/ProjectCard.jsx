import React, { useState, useRef } from "react";
import "../../App.css";
import Lightbox from "./Lightbox";

const ProjectCard = ({ title, description, tech = [], links = [], screenshots = [], darkMode }) => {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % screenshots.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + screenshots.length) % screenshots.length);

  const handleTouchStart = (e) => (touchStartX.current = e.targetTouches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const arrowStyle = {
    background: "transparent",
    border: "none",
    fontSize: "1.7rem",
    fontWeight: "600",
    padding: "0 0.5rem",
    cursor: "pointer",
    transition: "transform 0.2s",
  };

  return (
    <>
      <div
        className="project-card"
        style={{
          backgroundColor: darkMode ? "#1e1e1e" : "#fff",
          color: darkMode ? "#e0e0e0" : "#000",
        }}
      >
        <div
          className="carousel-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {screenshots.length > 0 && (
            <>
              <img
                src={screenshots[current].src || screenshots[current]}
                alt={`${title} screenshot ${current + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => openLightbox(current)}
              />

              {screenshots.length > 1 && (
                <div
                  className="carousel-buttons"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1.5rem",
                    marginTop: "0.75rem",
                  }}
                >
                  <button
                    onClick={prevSlide}
                    style={{
                      ...arrowStyle,
                      color: darkMode ? "#fff" : "#111",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    ‹
                  </button>

                  <button
                    onClick={() => setLightboxOpen(false)}
                    style={{
                      ...arrowStyle,
                      color: darkMode ? "#fff" : "#111",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    ×
                  </button>

                  <button
                    onClick={nextSlide}
                    style={{
                      ...arrowStyle,
                      color: darkMode ? "#fff" : "#111",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    ›
                  </button>
                </div>
              )}

              {screenshots[current].caption && (
                <div
                  className="carousel-caption"
                  style={{ color: darkMode ? "#ccc" : "#555", marginTop: "0.5rem" }}
                >
                  {screenshots[current].caption}
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-4">
          <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
            {title}
          </h3>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} mb-4`}>
            {description}
          </p>

          <div className="tech-badge-container">
            {tech.map((t, idx) => (
              <span
                key={idx}
                className="tech-badge"
                style={{
                  backgroundColor: darkMode ? "#333" : "#e0e0e0",
                  color: darkMode ? "#f0f0f0" : "#333",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="links">
            <div
              style={{
                color: darkMode ? "#e0e0e0" : "#000",
                fontWeight: "bold",
                marginBottom: "0.25rem",
              }}
            >
              Links
            </div>
            {links.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
                <link.icon
                  style={{ marginRight: "0.25rem", color: darkMode ? "#e0e0e0" : "#111" }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          screenshots={screenshots}
          onClose={() => setLightboxOpen(false)}
          currentIndex={lightboxIndex}
          darkMode={darkMode}
        />
      )}
    </>
  );
};

export default ProjectCard;
