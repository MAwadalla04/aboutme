import React from 'react';

const About = ({ knicksMode, onToggleKnicksMode, sectionIndex }) => {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">{sectionIndex ? <span className="section-index">{sectionIndex}</span> : null}About</h2>
        <div className="about-content">
          <div className="about-text">
            <div className="about-beat" style={{ '--beat-delay': '0ms' }}>
              <h3>What I build</h3>
              <p>I build software for operations teams. LegalDocuMan reads legal contracts, pulls out their end dates, and detects signatures. For signature detection I fine-tuned an RF-DETR model on synthetic data and public datasets.</p>
            </div>
            <div className="about-connector" aria-hidden="true" />
            <div className="about-beat" style={{ '--beat-delay': '80ms' }}>
              <h3>How I build</h3>
              <p>I design for failure. My systems retry safely, recover when a step fails, and log enough to show what went wrong. I test the failure cases as well as the normal path.</p>
            </div>
            <div className="about-connector" aria-hidden="true" />
            <div className="about-beat" style={{ '--beat-delay': '160ms' }}>
              <h3>Outside of work</h3>
              <p>
                I am a{' '}
                <button
                  type="button"
                  className="knicks-trigger"
                  aria-pressed={knicksMode}
                  title={knicksMode ? 'Turn off Knicks mode' : 'Turn on Knicks mode'}
                  onClick={onToggleKnicksMode}
                >
                  Knicks
                </button>{' '}
                fan. I built KnicksIQ, a searchable archive of the 2025–26 season with games, box scores, and player stats. It is in public beta. Send me feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
