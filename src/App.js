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

function App() {
  const [knicksMode, setKnicksMode] = useState(false);

  const toggleKnicksMode = useCallback(() => {
    setKnicksMode((isActive) => !isActive);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('knicks-mode', knicksMode);
    return () => document.body.classList.remove('knicks-mode');
  }, [knicksMode]);

  useEffect(() => {
    // Active nav-link observer
    const navLinks = document.querySelectorAll('.nav-links a');
    const navMap = new Map();
    navLinks.forEach(a => {
      const id = a.getAttribute('href').slice(1);
      const sec = document.getElementById(id);
      if (sec) navMap.set(sec, a);
    });
    let navObs;
    if (navMap.size) {
      navObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            navMap.get(e.target)?.classList.add('active');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      navMap.forEach((_, sec) => navObs.observe(sec));
    }

    // About narrative observer. Content is visible by default and only enters
    // a reveal-ready state once observation is available.
    const beats = document.querySelectorAll('.about-beat');
    let beatObs;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopNarrative = window.matchMedia('(min-width: 769px)').matches;
    if (beats.length && desktopNarrative && !reduceMotion && 'IntersectionObserver' in window) {
      beatObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            beatObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

      beats.forEach(beat => {
        beat.classList.add('reveal-ready');
        beatObs.observe(beat);
      });
    } else {
      beats.forEach(beat => beat.classList.add('in-view'));
    }

    return () => {
      if (navObs) navObs.disconnect();
      if (beatObs) beatObs.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <About knicksMode={knicksMode} onToggleKnicksMode={toggleKnicksMode} />
        <Experience />
        <Projects />
        <CurrentlyReading />
        <Contact />
      </main>
      <Footer />
      <SocialsDock />
      <TerminalEgg knicksMode={knicksMode} onToggleKnicksMode={toggleKnicksMode} />
    </div>
  );
}

export default App;
