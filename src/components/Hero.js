import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];
export const INTRO_STORAGE_KEY = 'aboutme-graph-intro-seen';
export const INTRO_TIMELINE = Object.freeze({
  assembly: 600, forward: 600, backward: 2400, stage: 400,
  greeting: 4200, landing: 4800, done: 6000,
});

export const EDGES = [
  ['e-x1-n1', 52, 392, 96, 300, 0],
  ['e-w1-n1', 140, 392, 96, 300, 0],
  ['e-x2-n2', 200, 392, 244, 300, 0],
  ['e-w2-n2', 288, 392, 244, 300, 0],
  ['e-n1-n3', 96, 300, 170, 214, 1],
  ['e-n2-n3', 244, 300, 170, 214, 1],
  ['e-b-n3', 305, 214, 170, 214, 1],
  ['e-n3-tanh', 170, 214, 170, 128, 2],
  ['e-tanh-L', 170, 128, 170, 44, 3],
].map(([id, x1, y1, x2, y2, stage]) => ({
  id, stage, d: `M${x1},${y1} L${x2},${y2}`,
  length: Math.hypot(x2 - x1, y2 - y1),
}));

// A single dash crosses the entire edge, including its tail, within its stage.
export const beamTimeline = (edge, forward) => ({
  start: (forward ? INTRO_TIMELINE.forward : INTRO_TIMELINE.backward)
    + (forward ? edge.stage : 3 - edge.stage) * INTRO_TIMELINE.stage,
  duration: INTRO_TIMELINE.stage,
  dash: `50 ${edge.length + 50}`,
  from: forward ? 50 : -edge.length,
  to: forward ? -edge.length : 50,
});

const NODES = [
  { type: 'in', x: 52, y: 392, label: 'x₁', delay: 0 },
  { type: 'in', x: 140, y: 392, label: 'w₁', delay: 0 },
  { type: 'in', x: 200, y: 392, label: 'x₂', delay: 0 },
  { type: 'in', x: 288, y: 392, label: 'w₂', delay: 0 },
  { type: 'in', x: 305, y: 214, label: 'b', delay: 120, radius: 15 },
  { type: 'op', x: 96, y: 300, label: '×', delay: 300 },
  { type: 'op', x: 244, y: 300, label: '×', delay: 300 },
  { type: 'op', x: 170, y: 214, label: '+', delay: 540 },
  { type: 'op', x: 170, y: 128, label: 'tanh', delay: 720, radius: 19 },
  { type: 'out', x: 170, y: 44, label: 'L', delay: 900, radius: 20 },
];

const AutogradGraph = ({ intro = false }) => (
  <svg
    className={`autograd-graph${intro ? ' intro-autograd-graph' : ''}`}
    viewBox="0 0 340 470"
    role={intro ? 'presentation' : 'img'}
    aria-label={intro ? undefined : 'Computation graph of a small neural network, animated with a forward and backward pass'}
  >
    <g className="ag-edges">
      {EDGES.map((edge) => (
        <path
          key={edge.id}
          id={intro ? `${edge.id}-intro` : edge.id}
          className="ag-edge"
          style={{ animationDelay: `${edge.stage * 60}ms`, animationDuration: `${INTRO_TIMELINE.assembly - 180}ms` }}
          d={edge.d}
        />
      ))}
    </g>
    <g className="ag-edge-beams">
      {[true, false].flatMap((forward) => EDGES.map((edge) => {
        const beam = beamTimeline(edge, forward);
        return ['halo', 'core'].map((layer) => (
          <path
            key={`${edge.id}-${forward}-${layer}`}
            className={`ag-beam ag-beam-${layer}`}
            d={edge.d}
            stroke={forward ? 'var(--accent-primary)' : 'var(--accent-secondary)'}
            strokeWidth={3}
            strokeLinecap="butt"
            fill="none"
            strokeDasharray={beam.dash}
            style={{
              '--beam-from': beam.from, '--beam-to': beam.to,
              animationDelay: `${beam.start}ms`,
              animationDuration: `${beam.duration}ms`,
            }}
          />
        ));
      }))}
    </g>
    <g className="ag-nodes">
      {NODES.map((node) => (
        <g
          key={`${node.label}-${node.x}-${node.y}`}
          className={`ag-node ag-${node.type}`}
          style={{ animationDelay: `${node.delay / 6}ms`, animationDuration: `${INTRO_TIMELINE.assembly - 150}ms` }}
        >
          <circle cx={node.x} cy={node.y} r={node.radius || 18} />
          <text x={node.x} y={node.y}>{node.label}</text>
        </g>
      ))}
    </g>
  </svg>
);

const Hero = () => {
  const introMohamedRef = React.useRef(null);
  const heroMohamedRef = React.useRef(null);
  const [introPhase, setIntroPhase] = React.useState(() => {
    if (typeof window === 'undefined') return 'graph';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'done';
    try {
      return window.sessionStorage.getItem(INTRO_STORAGE_KEY) ? 'done' : 'graph';
    } catch {
      return 'graph';
    }
  });
  const playIntro = React.useRef(introPhase !== 'done');
  const [introPass, setIntroPass] = React.useState('forward');
  const [landingTransform, setLandingTransform] = React.useState({ x: 0, y: 0, scale: 1 });

  React.useEffect(() => {
    if (!playIntro.current) return undefined;
    try {
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
    } catch {
      // Playback still completes when storage is blocked.
    }

    const backpropTimer = window.setTimeout(() => setIntroPass('backprop'), INTRO_TIMELINE.backward);
    const greetingTimer = window.setTimeout(() => setIntroPhase('greeting'), INTRO_TIMELINE.greeting);
    const landingTimer = window.setTimeout(() => {
      const source = introMohamedRef.current?.getBoundingClientRect();
      const target = heroMohamedRef.current?.getBoundingClientRect();

      if (source && target) {
        setLandingTransform({
          x: target.left + (target.width / 2) - source.left - (source.width / 2),
          y: target.top + (target.height / 2) - source.top - (source.height / 2),
          scale: target.width / source.width,
        });
      }

      setIntroPhase('landing');
    }, INTRO_TIMELINE.landing);
    const doneTimer = window.setTimeout(() => setIntroPhase('done'), INTRO_TIMELINE.done);
    return () => {
      window.clearTimeout(backpropTimer);
      window.clearTimeout(greetingTimer);
      window.clearTimeout(landingTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  return (
    <>
      {introPhase !== 'done' && (
        <div className={`intro-overlay intro-phase-${introPhase}`} aria-hidden="true">
          <div className="intro-stage">
            <div className="intro-graph-wrap">
              <AutogradGraph intro />
              <p className="intro-graph-caption code">
                loading / {introPass === 'forward' ? 'forward pass' : 'backprop pass'}
              </p>
            </div>
            <div className="intro-copy">
              {(introPhase === 'greeting' || introPhase === 'landing') && (
                <motion.p
                  className="intro-greeting"
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: (INTRO_TIMELINE.landing - INTRO_TIMELINE.greeting) / 1000, ease: EASE }}
                >
                  <motion.span
                    className="intro-greeting-context"
                    animate={{ opacity: introPhase === 'landing' ? 0 : 1, x: introPhase === 'landing' ? -12 : 0 }}
                    transition={{ duration: 0.24, ease: EASE }}
                  >
                    Hi, I&apos;m{' '}
                  </motion.span>
                  <motion.span
                    ref={introMohamedRef}
                    className="intro-moving-name"
                    animate={introPhase === 'landing' ? landingTransform : { x: 0, y: 0, scale: 1 }}
                    transition={{ duration: (INTRO_TIMELINE.done - INTRO_TIMELINE.landing) / 1000, ease: EASE }}
                  >
                    Mohamed
                  </motion.span>
                  <motion.span
                    className="intro-greeting-context"
                    animate={{ opacity: introPhase === 'landing' ? 0 : 1 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    .
                  </motion.span>
                </motion.p>
              )}
            </div>
          </div>
        </div>
      )}

      <section className="hero">
        <div className="container">
          <div className="hero-layout">
            <div className="hero-content">
              <h1>
                <span
                  ref={heroMohamedRef}
                  className={`hero-first-name${introPhase !== 'done' ? ' hero-first-name-pending' : ''}`}
                >
                  Mohamed
                </span>{' '}
                <span>Awadalla</span>
              </h1>
              <p className="tagline">Software Engineer</p>
              <p className="hero-summary">
                I like computers, math, and the New York Knicks. I build software that holds up in production.
              </p>
              <div className="hero-info">
                <div className="hero-info-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                  Brooklyn, NY
                </div>
                <div className="hero-info-item hero-education-bubble" aria-label="Long Island University, class of 2026">
                  <span className="hero-education-school">LIU</span>
                  <span className="hero-education-year">’26</span>
                </div>
              </div>

              <div className="hero-actions">
                <a href="/projects" className="project-cta">
                  <span>See my work</span>
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href={`${process.env.PUBLIC_URL}/resume/Mohamed%27s%20Resume.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                  </svg>
                  <span>My Resume</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
