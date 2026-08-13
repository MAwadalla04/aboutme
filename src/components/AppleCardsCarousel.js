import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const CarouselContext = createContext({
  onCardClose: () => {},
});

const getCardStep = (carousel) => {
  const card = carousel?.querySelector(".acc-card");
  const row = carousel?.querySelector(".acc-row");
  if (!card) return 0;

  const rowStyles = row ? window.getComputedStyle(row) : null;
  const gap = Number.parseFloat(rowStyles?.columnGap || rowStyles?.gap) || 16;
  return card.getBoundingClientRect().width + gap;
};

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      callback(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};

const ArrowLeft = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M3 12h18" />
    <path d="M17 6l-6 6 6 6" />
  </svg>
);

const ArrowRight = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M3 12h18" />
    <path d="M7 6l6 6-6 6" />
  </svg>
);

const CloseIcon = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

const scrollBehavior = () => (
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
);

export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      const step = getCardStep(carouselRef.current);
      if (step) setCurrentIndex(Math.round(scrollLeft / step));
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -getCardStep(carouselRef.current),
        behavior: scrollBehavior(),
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: getCardStep(carouselRef.current),
        behavior: scrollBehavior(),
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollLeft();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollRight();
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const scrollPosition = getCardStep(carouselRef.current) * index;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: scrollBehavior(),
      });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose }}>
      <div
        className="acc-root"
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex="0"
        onKeyDown={handleKeyDown}
      >
        <div
          className="acc-track"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="acc-row">
            {items.map((item, index) => (
              <div key={"card-" + index} className="acc-item">
                {item}
              </div>
            ))}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">Project {currentIndex + 1} of {items.length}</p>
        <div className="acc-controls">
          <button
            className="acc-arrow"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Previous project"
          >
            <ArrowLeft className="acc-arrow-icon" />
          </button>
          <button
            className="acc-arrow"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Next project"
          >
            <ArrowRight className="acc-arrow-icon" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const { onCardClose } = useContext(CarouselContext);
  const modalTitleId = `project-modal-title-${index}`;

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab" || !containerRef.current) return;
      const focusable = Array.from(containerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.body.classList.add("project-modal-open");
    window.addEventListener("keydown", onKeyDown);
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("project-modal-open");
      triggerRef.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    triggerRef.current = document.activeElement;
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {open && (
            <div className="acc-modal-overlay">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="acc-modal-backdrop"
              />
              <motion.div
                ref={containerRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={modalTitleId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="acc-modal"
              >
                <button
                  ref={closeButtonRef}
                  className="acc-modal-close"
                  onClick={handleClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </button>
                <p className="acc-modal-category">
                  {card.category}
                </p>
                <h3
                  id={modalTitleId}
                  className="acc-modal-title"
                >
                  {card.title}
                </h3>
                <div className="acc-modal-body">{card.content}</div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <button
        ref={triggerRef}
        onClick={handleOpen}
        className="acc-card"
        style={{
          "--card-accent": `var(--project-accent-${card.accent})`,
        }}
      >
        <div className="acc-card-header">
          <p className="acc-card-category">
            {card.category}
          </p>
          {card.featured && <span className="acc-card-featured">Featured</span>}
        </div>
        <div className="acc-card-body">
          <h3 className="acc-card-title">
            {card.title}
          </h3>
          <p className="acc-card-summary">{card.description?.[0]}</p>
          {card.stats && (
            <div className="acc-card-stats">
              {card.stats.map((stat) => (
                <div key={stat.lbl} className="acc-card-stat">
                  <strong>{stat.num}</strong>
                  <span>{stat.lbl}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="acc-card-footer">
          <div className="acc-card-tech" aria-label="Technologies">
            {card.tech?.slice(0, 4).map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <span className="acc-card-action">Open details <span aria-hidden="true">→</span></span>
        </div>
      </button>
    </>
  );
};
