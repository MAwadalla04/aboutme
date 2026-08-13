import React from 'react';

const About = ({ knicksMode, onToggleKnicksMode }) => {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title"><span className="section-index">01 /</span> About</h2>
        <div className="about-content">
          <div className="about-text">
            <div className="about-beat" style={{ '--beat-delay': '0ms' }}>
              <span className="about-kicker">01</span>
              <h3>Built for the real world.</h3>
              <p>I build AI systems for regulated industries. At NYC Emergency Management's Office of the Chief Counsel, I built LegalDocuMan. It started as an internal script for processing a legal drive of contracts. I turned it into a production system with a fine tuned RF-DETR vision model for signature detection, deployed ahead of a hard migration deadline.</p>
            </div>
            <div className="about-connector" aria-hidden="true" />
            <div className="about-beat" style={{ '--beat-delay': '80ms' }}>
              <span className="about-kicker">02</span>
              <h3>The boring parts.</h3>
              <p>I care about the boring parts: retry logic, dead letter queues, observability. The stuff that keeps systems running when nobody's watching.</p>
            </div>
            <div className="about-connector" aria-hidden="true" />
            <div className="about-beat" style={{ '--beat-delay': '160ms' }}>
              <span className="about-kicker">03</span>
              <h3>Overlaps with life.</h3>
              <p>
                Sometimes my work overlaps with my life. I watch the{' '}
                <button
                  type="button"
                  className="knicks-trigger"
                  aria-pressed={knicksMode}
                  title="Toggle Knicks mode"
                  onClick={onToggleKnicksMode}
                >
                  Knicks
                </button>.
              </p>
            </div>
          </div>
          <aside className="education" aria-labelledby="education-title">
            <div className="education-topline">
              <span className="education-school-mark">LIU</span>
              <span className="education-class-year" aria-label="Class of 2026">’26</span>
            </div>
            <h3 id="education-title">Long Island University</h3>
            <p className="education-degree">B.S. Computer Science</p>
            <p className="education-meta">Honors College · Brooklyn, NY · May 2026</p>
            <div className="education-rule" />
            <p className="education-honors">Dean’s List <span aria-hidden="true">·</span> Dean Scholar</p>
            <p className="education-coursework">
              <strong>Coursework</strong>
              Data Structures · Algorithms · Database Systems · Operating Systems · Computer Architecture · Machine Learning
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default About;
