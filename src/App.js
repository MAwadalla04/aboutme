import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import CurrentlyReading from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { SocialsDock } from './components/SocialsDock';

function App() {
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

  return (
    <div className="App">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <CurrentlyReading />
        <Contact />
      </main>
      <Footer />
      <SocialsDock />
    </div>
  );
}

export default App;
