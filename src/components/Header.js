import React, { useEffect, useState } from 'react';

const getActivePath = () => {
  const path = window.location.pathname.replace(/\/+$/, '');
  return path || '/about';
};

const PAGE_DETAILS = {
  '/about': { number: '01', label: 'About' },
  '/experience': { number: '02', label: 'Experience' },
  '/projects': { number: '03', label: 'Projects' },
};

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

  const activePath = getActivePath();
  const currentPage = PAGE_DETAILS[activePath] || PAGE_DETAILS['/about'];

  const handleNavigate = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <div className="container">
        <nav aria-label="Primary navigation">
          <div className="current-page" aria-label={`Current page: ${currentPage.label}`}>
            <span className="current-page-value">{currentPage.label}</span>
          </div>
          <ul id="primary-nav" className={`nav-links${menuOpen ? ' is-open' : ''}`}>
            <li><a className={activePath === '/about' ? 'active' : ''} aria-current={activePath === '/about' ? 'page' : undefined} href="/about" onClick={handleNavigate}>About</a></li>
            <li><a className={activePath === '/experience' ? 'active' : ''} aria-current={activePath === '/experience' ? 'page' : undefined} href="/experience" onClick={handleNavigate}>Experience</a></li>
            <li><a className={activePath === '/projects' ? 'active' : ''} aria-current={activePath === '/projects' ? 'page' : undefined} href="/projects" onClick={handleNavigate}>Projects</a></li>
          </ul>
          <div className="nav-actions">
            <a
              href="https://youtu.be/xvFZjo5PgG0?si=e2d4R0ybH1zhHJZS"
              target="_blank"
              rel="noopener noreferrer"
              className="surprise-nav-btn"
            >
              /useless
            </a>
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
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
