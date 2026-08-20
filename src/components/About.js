import React from 'react';

const About = ({ knicksMode, onToggleKnicksMode }) => {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title"><span className="section-index">01 /</span> About</h2>
        <div className="about-content">
          <div className="about-text">
            <div className="about-beat" style={{ '--beat-delay': '0ms' }}>
              <span className="about-kicker">01 —</span>
              <h3>What I build</h3>
              <p>I build software for real operational problems. I built LegalDocuMan to process legal contracts based on their end dates. To explore computer vision models, I fine-tuned an RF-DETR model with synthetic data and publicly available training datasets.</p>
            </div>
            <div className="about-connector" aria-hidden="true" />
            <div className="about-beat" style={{ '--beat-delay': '80ms' }}>
              <span className="about-kicker">02 —</span>
              <h3>How I build</h3>
              <p>I care about reliability. I design for retries, failure recovery, and observability. I also make sure that systems work correctly outside the happy path.</p>
            </div>
            <div className="about-connector" aria-hidden="true" />
            <div className="about-beat" style={{ '--beat-delay': '160ms' }}>
              <span className="about-kicker">03 —</span>
              <h3>Outside of work</h3>
              <p>
                I am a die-hard{' '}
                <button
                  type="button"
                  className="knicks-trigger"
                  aria-pressed={knicksMode}
                  title="Toggle Knicks mode"
                  onClick={onToggleKnicksMode}
                >
                  Knicks
                </button>{' '}
                fan. I built KnicksIQ, a full-stack project that lets people explore games, player statistics, and season data. KnicksIQ is in public beta. I welcome feedback and ideas for improvement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
