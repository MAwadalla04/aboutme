import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import CurrentlyReading from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { SocialsDock } from './components/SocialsDock';
import TerminalEgg from './components/TerminalEgg';

const ROUTES = new Set(['/about', '/experience', '/projects']);
const KNICKS_MODE_STORAGE_KEY = 'aboutme-knicks-mode';

const normalizePath = (pathname) => {
  const path = pathname.replace(/\/+$/, '');
  return ROUTES.has(path) ? path : '/about';
};

const PageHeader = ({ number, title, description }) => (
  <div className="page-header">
    <div className="container page-header-inner">
      <p className="page-header-index">{number} /</p>
      <h1>{title}</h1>
      {description && <p className="page-header-description">{description}</p>}
    </div>
  </div>
);

function App() {
  const [knicksMode, setKnicksMode] = useState(() => {
    try {
      return window.sessionStorage.getItem(KNICKS_MODE_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const route = normalizePath(window.location.pathname);

  const toggleKnicksMode = useCallback(() => {
    setKnicksMode((isActive) => !isActive);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('knicks-mode', knicksMode);
    try {
      window.sessionStorage.setItem(KNICKS_MODE_STORAGE_KEY, String(knicksMode));
    } catch {
      // Theme state still works when storage is unavailable.
    }
    return () => document.body.classList.remove('knicks-mode');
  }, [knicksMode]);

  useEffect(() => {
    document.title = route === '/experience'
      ? 'Experience — Mohamed Awadalla'
      : route === '/projects'
        ? 'Projects — Mohamed Awadalla'
        : 'Mohamed Awadalla — Software Engineer';

    window.scrollTo(0, 0);

    const beats = document.querySelectorAll('.about-beat');
    let beatObs;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopNarrative = window.matchMedia('(min-width: 769px)').matches;
    if (beats.length && desktopNarrative && !reduceMotion && 'IntersectionObserver' in window) {
      beatObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            beatObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

      beats.forEach((beat) => {
        beat.classList.add('reveal-ready');
        beatObs.observe(beat);
      });
    } else {
      beats.forEach((beat) => beat.classList.add('in-view'));
    }

    return () => beatObs?.disconnect();
  }, [route]);

  const renderPage = () => {
    if (route === '/experience') {
      return (
        <>
          <PageHeader
            number="02"
            title="Experience"
            description="Reliable systems for operational work, from emergency management to legal infrastructure."
          />
          <Experience showHeader={false} />
        </>
      );
    }

    if (route === '/projects') {
      return (
        <>
          <PageHeader
            number="03"
            title="Projects"
          />
          <Projects />
        </>
      );
    }

    return (
      <>
        <Hero />
        <About knicksMode={knicksMode} onToggleKnicksMode={toggleKnicksMode} sectionIndex="01 /" />
        <CurrentlyReading sectionIndex="02 /" />
        <Contact sectionIndex="03 /" />
      </>
    );
  };

  return (
    <div className={`App app-${route.slice(1)}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header knicksMode={knicksMode} />
      <main id="main-content">{renderPage()}</main>
      <Footer />
      <SocialsDock />
      <TerminalEgg />
    </div>
  );
}

export default App;
