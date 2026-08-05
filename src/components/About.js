import React from 'react';
import { toggleKnicksTheme } from '../utils/animatedThemeToggle';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>I build AI systems for regulated industries. At NYC Emergency Management's Office of the Chief Counsel, I built LegalDocuMan. It started as an internal script for processing a legal drive of contracts. I turned it into a production system with a fine tuned RF-DETR vision model for signature detection, deployed ahead of a hard migration deadline.</p>
            <p>I care about the boring parts: retry logic, dead letter queues, observability. The stuff that keeps systems running when nobody's watching.</p>
            <p>Sometimes my work overlaps with my life. I watch the <span className="knicks-trigger" onClick={(e) => toggleKnicksTheme(e.currentTarget)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleKnicksTheme(e.currentTarget); } }}>Knicks</span>.</p>
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
