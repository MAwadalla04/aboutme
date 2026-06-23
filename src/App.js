import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
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
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;

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

    // Autograd forward/backward pass animation
    function setupAutograd() {
      const graph = document.querySelector('.autograd-graph');
      if (!graph || reduceMotion) return null;
      const svgNS = 'http://www.w3.org/2000/svg';
      const fwdOrder = ['e-x1-n1','e-w1-n1','e-x2-n2','e-w2-n2','e-n1-n3','e-n2-n3','e-b-n3','e-n3-tanh','e-tanh-L'];
      const bwdOrder = [...fwdOrder].reverse();

      function dot(color) {
        const c = document.createElementNS(svgNS, 'circle');
        c.setAttribute('r', '4.5');
        c.setAttribute('class', 'ag-dot ' + color);
        graph.appendChild(c);
        return c;
      }

      function travel(edgeId, reverse, travelMs) {
        return new Promise(resolve => {
          const path = document.getElementById(edgeId);
          if (!path) return resolve();
          const len = path.getTotalLength();
          const c = dot(reverse ? 'ag-dot-bwd' : 'ag-dot-fwd');
          const start = performance.now();
          function frame(now) {
            if (cancelled) { c.remove(); return resolve(); }
            const t = Math.min((now - start) / travelMs, 1);
            const p = path.getPointAtLength(reverse ? (1 - t) * len : t * len);
            c.setAttribute('cx', p.x);
            c.setAttribute('cy', p.y);
            c.style.opacity = t < 0.08 ? t / 0.08 : (t > 0.9 ? (1 - t) / 0.1 : 1);
            if (t < 1) requestAnimationFrame(frame);
            else { c.remove(); resolve(); }
          }
          requestAnimationFrame(frame);
        });
      }

      async function runPass(order, reverse, travelMs, gap) {
        for (let i = 0; i < order.length; i++) {
          const concurrent = (i % 2 === 0 && i + 1 < order.length && order[i] !== 'e-b-n3' && order[i] !== 'e-n3-tanh' && order[i] !== 'e-tanh-L');
          if (concurrent) {
            await Promise.all([travel(order[i], reverse, travelMs), travel(order[i+1], reverse, travelMs)]);
            i++;
          } else {
            await travel(order[i], reverse, travelMs);
          }
          if (gap) await new Promise(r => setTimeout(r, gap));
        }
      }

      let stop = false;
      async function loop() {
        while (!stop && !cancelled) {
          await runPass(fwdOrder, false, 620, 60);
          await new Promise(r => setTimeout(r, 700));
          await runPass(bwdOrder, true, 620, 60);
          await new Promise(r => setTimeout(r, 1600));
        }
      }
      setTimeout(loop, 2500);
      return () => { stop = true; };
    }

    const stopAutograd = setupAutograd();

    return () => {
      cancelled = true;
      if (navObs) navObs.disconnect();
      if (stopAutograd) stopAutograd();
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
