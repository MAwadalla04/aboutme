import React from 'react';
import { toggleKnicksTheme } from '../utils/animatedThemeToggle';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>I am a Computer Science graduate from LIU Honors, Class of 2026. My focus is on building AI-powered systems for regulated industries. At NYC Emergency Management's Office of the Chief Counsel, I built LegalDocuMan, a document classification system using regex rules and a fine-tuned RF-DETR vision model for signature detection, deployed to process a legal drive of contracts ahead of migration to a new legal management system.</p>
            <p>Outside of work, I extend my machine learning fundamentals through projects like a custom autograd engine with tensor operations and a character-level language model trained end-to-end via backpropagation.</p>
            <p>I am interested in roles where engineering substance and AI/ML depth both matter: full-stack work, AI infrastructure, document automation, and regulated-industry tooling.</p>
            <p>Off the clock, I'm usually watching the <span className="knicks-trigger" onClick={(e) => toggleKnicksTheme(e.currentTarget)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleKnicksTheme(e.currentTarget); } }}>Knicks</span>.</p>
          </div>
          <div className="education">
            <h3>Education</h3>
            <div className="education-item">
              <strong>Long Island University</strong>
              <div>Honors College</div>
              <div>Brooklyn, NY</div>
            </div>
            <div className="education-item">
              <strong>Bachelor of Science in Computer Science</strong>
              <div>May 2026</div>
            </div>
            <div className="education-item">
              <em>Dean's List, Dean Scholar</em>
            </div>
            <div className="education-item">
              <em>Relevant Coursework: Data Structures, Algorithms, Database Systems, Operating Systems, Computer Architecture, Machine Learning</em>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
