import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./Lightbox.module.css";

const Lightbox = ({ screenshots = [], onClose, currentIndex = 0, darkMode }) => {
  const overlayRef = useRef(null);
  const [index, setIndex] = useState(currentIndex);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const prevSlide = useCallback(() => {
    if (screenshots.length > 0) {
      setIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    }
  }, [screenshots.length]);

  const nextSlide = useCallback(() => {
    if (screenshots.length > 0) {
      setIndex((prev) => (prev + 1) % screenshots.length);
    }
  }, [screenshots.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, prevSlide, nextSlide]);

  const handleClickOutside = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  const currentImage = screenshots[index];

  const overlayStyle = {
    background: darkMode ? "rgba(0,0,0,0.85)" : "rgba(245,245,245,0.95)",
  };
  const captionColor = darkMode ? "#f5f5f5" : "#111";
  const counterColor = darkMode ? "#ccc" : "#333";
  const arrowColor = darkMode ? "#fff" : "#111";

  const iconStyle = {
    background: "transparent",
    border: "none",
    fontSize: "1.7rem",
    fontWeight: "600",
    padding: "0 0.5rem",
    cursor: "pointer",
    transition: "transform 0.2s",
  };

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      style={overlayStyle}
      onClick={handleClickOutside}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.container}>
        {/* Image */}
        <div className={styles.imgWrap}>
          <img
            src={currentImage.src}
            alt={currentImage.caption || "Screenshot"}
            className={styles.image}
          />
        </div>

        {/* Caption and counter */}
        {currentImage.caption && (
          <div className={styles.meta}>
            <div className={styles.caption} style={{ color: captionColor }}>
              {currentImage.caption}
            </div>
            <div className={styles.counter} style={{ color: counterColor }}>
              {index + 1} / {screenshots.length}
            </div>
          </div>
        )}

        {/* Navigation: Left × Right */}
        {screenshots.length > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <button
              onClick={prevSlide}
              style={{ ...iconStyle, color: arrowColor }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={onClose}
              style={{ ...iconStyle, color: arrowColor }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <FaTimes />
            </button>

            <button
              onClick={nextSlide}
              style={{ ...iconStyle, color: arrowColor }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
