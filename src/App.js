import React, { useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import CurrentlyReading from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { SocialsDock } from './components/SocialsDock';
import { restoreKnicksTheme } from './utils/animatedThemeToggle';

function App() {
  const toastRef = useRef(null);

  useEffect(() => {
    // Add fade-in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

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

    return () => {
      if (navObs) navObs.disconnect();
    };
  }, []);

  useEffect(() => {
    restoreKnicksTheme();

    const toast = toastRef.current;
    if (!toast) return;
    let hideTimer = null;
    const onToggle = (e) => {
      if (e.detail?.active) {
        const phrases = ["LET'S GO KNICKS!", "BING BONG!!"];
        toast.textContent = phrases[Math.floor(Math.random() * phrases.length)];
        toast.classList.add('show');
        if (hideTimer) clearTimeout(hideTimer);
        hideTimer = setTimeout(() => toast.classList.remove('show'), 2200);
      } else {
        toast.classList.remove('show');
        if (hideTimer) clearTimeout(hideTimer);
      }
    };
    document.addEventListener('knicks:toggle', onToggle);
    return () => {
      document.removeEventListener('knicks:toggle', onToggle);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="App">
      <div className="knicks-toast" ref={toastRef} aria-live="polite"></div>
      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <CurrentlyReading />
      <Contact />
      <Footer />
      <SocialsDock />
    </div>
  );
}

export default App;
