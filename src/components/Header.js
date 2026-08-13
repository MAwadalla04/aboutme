import React, { useEffect, useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header>
      <div className="container">
        <nav aria-label="Primary navigation">
          <a className="logo" href="#main-content" aria-label="MA, Mohamed Awadalla home">MA</a>
          <ul id="primary-nav" className={`nav-links${menuOpen ? ' is-open' : ''}`}>
            <li><a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>About</a></li>
            <li><a href="#experience" onClick={(e) => handleSmoothScroll(e, '#experience')}>Experience</a></li>
            <li><a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')}>Projects</a></li>
            <li><a href="#reading" onClick={(e) => handleSmoothScroll(e, '#reading')}>Reading</a></li>
            <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a></li>
          </ul>
          <div className="nav-actions">
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="primary-nav"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6 6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
            <a
              href="https://youtu.be/xvFZjo5PgG0?si=e2d4R0ybH1zhHJZS"
              target="_blank"
              rel="noopener noreferrer"
              className="surprise-nav-btn"
            >
              /useless
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
