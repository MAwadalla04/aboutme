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
  currentIndex: 0,
  registerOpen: () => {},
});

const getCardStep = () => {
  const cardWidth = window.innerWidth < 768 ? 224 : 384;
  const gap = 16;
  return cardWidth + gap;
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
      carouselRef.current.scrollBy({ left: -getCardStep(), behavior: "smooth" });
      markInteraction();
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: getCardStep(), behavior: "smooth" });
      markInteraction();
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const scrollPosition = getCardStep() * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
      markInteraction();
    }
  };

  const registerOpen = (isOpen) => {
    openCountRef.current = Math.max(0, openCountRef.current + (isOpen ? 1 : -1));
    setHasOpenModal(openCountRef.current > 0);
  };

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
      const step = getCardStep();
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
                initial={isMarquee ? false : { opacity: 0, y: 20 }}
                animate={isMarquee ? undefined : {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * (index % items.length),
                    ease: "easeOut",
                  },
                }}
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
  const { onCardClose, registerOpen } = useContext(CarouselContext);

  useEffect(() => {
    registerOpen(open);
    return () => { if (open) registerOpen(false); };
  }, [open, registerOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
    };
    document.body.style.overflow = open ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => setOpen(true);
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
                layoutId={layout ? `card-${card.title}` : undefined}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="acc-modal"
              >
                <button
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
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="acc-card"
        style={{
          "--card-accent": card.accent,
        }}
      >
        <div className="acc-card-shade" />
        <div className="acc-card-text">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="acc-card-category"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="acc-card-title"
          >
            {card.title}
          </motion.p>
        </div>
        {card.src && (
          <img
            src={card.src}
            alt={card.title}
            className="acc-card-image"
            loading="lazy"
          />
        )}
      </motion.button>
    </>
  );
};
