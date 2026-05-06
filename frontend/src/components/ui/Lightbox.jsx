import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import styles from "./Lightbox.module.css";

const Lightbox = ({ screenshots = [], onClose, currentIndex = 0 }) => {
  const overlayRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [index, setIndex] = useState(currentIndex);

  const hasScreenshots = screenshots.length > 0;
  const hasMultipleScreenshots = screenshots.length > 1;

  const normalizeIndex = useCallback(
    (value) => {
      if (!hasScreenshots) return 0;
      return (value + screenshots.length) % screenshots.length;
    },
    [hasScreenshots, screenshots.length]
  );

  const goPrevious = useCallback(() => {
    setIndex((prev) => normalizeIndex(prev - 1));
  }, [normalizeIndex]);

  const goNext = useCallback(() => {
    setIndex((prev) => normalizeIndex(prev + 1));
  }, [normalizeIndex]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    setIndex(normalizeIndex(currentIndex));
  }, [currentIndex, normalizeIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasMultipleScreenshots) goPrevious();
      if (event.key === "ArrowRight" && hasMultipleScreenshots) goNext();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goPrevious, hasMultipleScreenshots, onClose]);

  if (!hasScreenshots) return null;

  const currentImage = screenshots[index];
  const imageSrc = currentImage.src || currentImage;
  const caption = currentImage.caption || "Project screenshot";

  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!hasMultipleScreenshots) return;

    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) goNext();
    if (diff < -50) goPrevious();
  };

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={handleOverlayClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Project screenshot viewer"
    >
      <div className={styles.lightbox}>
        <div className={styles.topBar}>
          <div>
            <span className={styles.kicker}>Screenshot Preview</span>
            <p>
              {index + 1} of {screenshots.length}
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close screenshot viewer"
          >
            <FaTimes />
          </button>
        </div>

        <div className={styles.imageStage}>
          {hasMultipleScreenshots && (
            <button
              type="button"
              className={`${styles.navButton} ${styles.previous}`}
              onClick={goPrevious}
              aria-label="Previous screenshot"
            >
              <FaChevronLeft />
            </button>
          )}

          <img src={imageSrc} alt={caption} className={styles.image} />

          {hasMultipleScreenshots && (
            <button
              type="button"
              className={`${styles.navButton} ${styles.next}`}
              onClick={goNext}
              aria-label="Next screenshot"
            >
              <FaChevronRight />
            </button>
          )}
        </div>

        <div className={styles.footer}>
          <p>{caption}</p>

          {hasMultipleScreenshots && (
            <div className={styles.dots} aria-label="Screenshot position">
              {screenshots.map((item, dotIndex) => (
                <button
                  type="button"
                  key={`${item.caption || "screenshot"}-${dotIndex}`}
                  className={dotIndex === index ? styles.activeDot : ""}
                  onClick={() => setIndex(dotIndex)}
                  aria-label={`Go to screenshot ${dotIndex + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;