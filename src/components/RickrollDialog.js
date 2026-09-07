import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const RickrollDialog = ({ onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  const closeOnBackdrop = (event) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom) {
      onClose();
    }
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className="rickroll-dialog"
      aria-labelledby="rickroll-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={closeOnBackdrop}
    >
      <div className="rickroll-dialog-heading">
        <h2 id="rickroll-title">You know the rules.</h2>
        <button type="button" className="rickroll-close" onClick={onClose}>
          <span>Close</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <iframe
        className="rickroll-player"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=3lWz-tXwk-1xnebm"
        title="Rick Astley — Never Gonna Give You Up"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </dialog>,
    document.body,
  );
};

export default RickrollDialog;
