import React, {
  useEffect,
  useCallback,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
  registerOpen: () => {},
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

export const Carousel = ({
  items,
  initialScroll = 0,
  mode = "off",
  cycleInterval = 4000,
  marqueeDuration = 30,
}) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasOpenModal, setHasOpenModal] = useState(false);
  const openCountRef = useRef(0);
  const lastInteractionRef = useRef(0);
  const pausedRef = useRef(false);

  const isMarquee = mode === "marquee";
  // Pause the marquee on hover or while a modal is open.
  const isPaused = isHovered || hasOpenModal;

  // Keep the ref in sync with state so the step-mode interval reads fresh values.
  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);

  // In marquee mode, duplicate the items so the CSS animation can loop
  // seamlessly via translateX(-50%).
  const trackItems = isMarquee && items.length > 0
    ? [...items, ...items]
    : items;

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
    }
  };

  const markInteraction = () => {
    lastInteractionRef.current = Date.now();
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -getCardStep(carouselRef.current), behavior: "smooth" });
      markInteraction();
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: getCardStep(carouselRef.current), behavior: "smooth" });
      markInteraction();
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const scrollPosition = getCardStep(carouselRef.current) * index;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
      markInteraction();
    }
  };

  const registerOpen = useCallback((isOpen) => {
    openCountRef.current = Math.max(0, openCountRef.current + (isOpen ? 1 : -1));
    setHasOpenModal(openCountRef.current > 0);
  }, []);

  // Step mode: advance one card every cycleInterval, with a grace period
  // after the user interacts.
  useEffect(() => {
    if (mode !== "step") return undefined;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      if (openCountRef.current > 0) return;
      if (Date.now() - lastInteractionRef.current < cycleInterval) return;
      const el = carouselRef.current;
      if (!el) return;
      if (el.scrollWidth <= el.clientWidth + 1) return;
      const step = getCardStep(el);
      const maxScroll = el.scrollWidth - el.clientWidth;
      const atEnd = el.scrollLeft >= maxScroll - 1;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const next = Math.min(el.scrollLeft + step, maxScroll);
        el.scrollTo({ left: next, behavior: "smooth" });
      }
    }, cycleInterval);
    return () => clearInterval(id);
  }, [mode, cycleInterval]);

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex, registerOpen }}>
      <div
        className={`acc-root${isMarquee ? " acc-root-marquee" : ""}`}
        role="region"
        aria-label="Project carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`acc-track${isMarquee ? " acc-track-marquee" : ""}`}
          ref={carouselRef}
          onScroll={() => { checkScrollability(); markInteraction(); }}
          onTouchStart={markInteraction}
        >
          <div className="acc-fade-right" />
          <div
            className={`acc-row${isMarquee ? " acc-row-marquee" : ""}`}
            style={isMarquee ? {
              animationDuration: `${marqueeDuration}s`,
              animationPlayState: isPaused ? "paused" : "running",
            } : undefined}
          >
            {trackItems.map((item, index) => (
              <motion.div
                key={"card-" + index}
                initial={false}
                className="acc-item"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        {!isMarquee && (
          <div className="acc-controls">
            <button
              className="acc-arrow"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <ArrowLeft className="acc-arrow-icon" />
            </button>
            <button
              className="acc-arrow"
              onClick={scrollRight}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <ArrowRight className="acc-arrow-icon" />
            </button>
          </div>
        )}
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const { onCardClose, registerOpen } = useContext(CarouselContext);
  const modalTitleId = `project-modal-title-${index}`;

  useEffect(() => {
    registerOpen(open);
    return () => { if (open) registerOpen(false); };
  }, [open, registerOpen]);

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
                layoutId={layout ? `card-${card.title}` : undefined}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
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
                <motion.p
                  layoutId={layout ? `category-${card.title}` : undefined}
                  className="acc-modal-category"
                >
                  {card.category}
                </motion.p>
                <motion.h3
                  id={modalTitleId}
                  layoutId={layout ? `title-${card.title}` : undefined}
                  className="acc-modal-title"
                >
                  {card.title}
                </motion.h3>
                <div className="acc-modal-body">{card.content}</div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <motion.button
        ref={triggerRef}
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="acc-card"
        aria-label={`View details for ${card.title}`}
        style={{
          "--card-accent": `var(--project-accent-${card.accent})`,
        }}
      >
        <div className="acc-card-header">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="acc-card-category"
          >
            {card.category}
          </motion.p>
          {card.featured && <span className="acc-card-featured">Featured</span>}
        </div>
        <div className="acc-card-body">
          <motion.h3
            layoutId={layout ? `title-${card.title}` : undefined}
            className="acc-card-title"
          >
            {card.title}
          </motion.h3>
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
      </motion.button>
    </>
  );
};
