import React, { useRef, useState } from "react";
import Lightbox from "./Lightbox";

const ProjectCard = ({
  title,
  badge,
  description,
  impact,
  tech = [],
  features = [],
  links = [],
  screenshots = [],
}) => {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const hasScreenshots = screenshots.length > 0;
  const hasMultipleScreenshots = screenshots.length > 1;

  const nextSlide = () => {
    if (!hasScreenshots) return;
    setCurrent((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    if (!hasScreenshots) return;
    setCurrent((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  const openLightbox = (index) => {
    if (!hasScreenshots) return;

    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const currentScreenshot = hasScreenshots ? screenshots[current] : null;

  return (
    <>
      <article className="project-card">
        <div className="project-card-media">
          {badge && <span className="project-badge">{badge}</span>}

          {hasScreenshots ? (
            <div
              className="carousel-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <button
                type="button"
                className="screenshot-button"
                onClick={() => openLightbox(current)}
                aria-label={`Open ${title} screenshot`}
              >
                <img
                  src={currentScreenshot.src || currentScreenshot}
                  alt={currentScreenshot.caption || `${title} screenshot`}
                />
              </button>

              {hasMultipleScreenshots && (
                <div className="carousel-controls" aria-label="Screenshot controls">
                  <button type="button" onClick={prevSlide} aria-label="Previous screenshot">
                    ‹
                  </button>

                  <span>
                    {current + 1} / {screenshots.length}
                  </span>

                  <button type="button" onClick={nextSlide} aria-label="Next screenshot">
                    ›
                  </button>
                </div>
              )}

              {currentScreenshot.caption && (
                <p className="carousel-caption">{currentScreenshot.caption}</p>
              )}
            </div>
          ) : (
            <div className="project-placeholder">
              <span>{title}</span>
              <p>Screenshots coming soon</p>
            </div>
          )}
        </div>

        <div className="project-card-body">
          <div className="project-title-row">
            <h2>{title}</h2>
          </div>

          <p className="project-description">{description}</p>

          {impact && <p className="project-impact">{impact}</p>}

          {features.length > 0 && (
            <div className="feature-list">
              {features.slice(0, 6).map((feature) => (
                <span key={feature}>{feature}</span>
              ))}
            </div>
          )}

          {tech.length > 0 && (
            <div className="tech-badge-container" aria-label={`${title} tech stack`}>
              {tech.map((item) => (
                <span key={item} className="tech-badge">
                  {item}
                </span>
              ))}
            </div>
          )}

          {links.length > 0 && (
            <div className="project-links">
              {links.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={`${title}-${link.label}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`project-link ${link.type || ""}`}
                  >
                    {Icon && <Icon />}
                    {link.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </article>

      {lightboxOpen && hasScreenshots && (
        <Lightbox
          screenshots={screenshots}
          onClose={() => setLightboxOpen(false)}
          currentIndex={lightboxIndex}
        />
      )}
    </>
  );
};

export default ProjectCard;