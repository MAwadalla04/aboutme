import React from 'react';

const Header = () => {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
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
        <nav>
          <div className="logo">MA</div>
          <ul className="nav-links">
            <li><a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>About</a></li>
            <li><a href="#skills" onClick={(e) => handleSmoothScroll(e, '#skills')}>Skills</a></li>
            <li><a href="#experience" onClick={(e) => handleSmoothScroll(e, '#experience')}>Experience</a></li>
            <li><a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')}>Projects</a></li>
            <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a></li>
          </ul>
          <a
            href="https://youtu.be/xvFZjo5PgG0?si=e2d4R0ybH1zhHJZS"
            target="_blank"
            rel="noopener noreferrer"
            className="surprise-nav-btn"
          >
            /useless
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
