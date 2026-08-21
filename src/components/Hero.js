import React from 'react';
import { motion } from 'framer-motion';

const SPEED = 1.1;
const EDGE_MS = 620;
const BEAM_DASH = '50 300';
const BEAM_HIDDEN = 50;
const BEAM_END = -200;
const INTRO_BEAM_DURATION = 1.3;
const EASE = [0.16, 1, 0.3, 1];
const INTRO_SEEN_KEY = 'mohamed-awadalla-intro-seen';
let introMarkedInMemory = false;

const hasSeenIntro = () => {
  if (introMarkedInMemory) return true;
  try {
    return window.localStorage.getItem(INTRO_SEEN_KEY) === 'true';
  } catch {
    return false;
  }
};

const markIntroSeen = () => {
  introMarkedInMemory = true;
  try {
    window.localStorage.setItem(INTRO_SEEN_KEY, 'true');
  } catch {
    // The in-memory flag still prevents replays during this app session.
  }
};

const EDGES = [
  { id: 'e-x1-n1', d: 'M52,392 L96,300', fwd: 0, bwd: 8120, introFwd: 1700, introBwd: 7200 },
  { id: 'e-w1-n1', d: 'M140,392 L96,300', fwd: 0, bwd: 8120, introFwd: 1700, introBwd: 7200 },
  { id: 'e-x2-n2', d: 'M200,392 L244,300', fwd: 680, bwd: 7440, introFwd: 2100, introBwd: 6800 },
  { id: 'e-w2-n2', d: 'M288,392 L244,300', fwd: 680, bwd: 7440, introFwd: 2100, introBwd: 6800 },
  { id: 'e-n1-n3', d: 'M96,300 L170,214', fwd: 1360, bwd: 6760, introFwd: 2500, introBwd: 6400 },
  { id: 'e-n2-n3', d: 'M244,300 L170,214', fwd: 1360, bwd: 6760, introFwd: 2500, introBwd: 6400 },
  { id: 'e-b-n3', d: 'M305,214 L170,214', fwd: 2040, bwd: 6080, introFwd: 2900, introBwd: 6000 },
  { id: 'e-n3-tanh', d: 'M170,214 L170,128', fwd: 2720, bwd: 5400, introFwd: 3300, introBwd: 5600 },
  { id: 'e-tanh-L', d: 'M170,128 L170,44', fwd: 3400, bwd: 4720, introFwd: 3700, introBwd: 5200 },
];

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

const beamTransition = (edge, isForward, intro = false) => {
  if (intro) {
    return {
      duration: INTRO_BEAM_DURATION,
      delay: (isForward ? edge.introFwd : edge.introBwd) / 1000,
      ease: 'linear',
    };
  }

  return {
    duration: (EDGE_MS * SPEED) / 1000,
    delay: ((isForward ? edge.fwd : edge.bwd) * SPEED) / 1000,
    ease: EASE,
  };
};

const AutogradGraph = ({ intro = false }) => (
  <svg
    className={`autograd-graph${intro ? ' intro-autograd-graph' : ''}`}
    viewBox="0 0 340 470"
    role={intro ? 'presentation' : 'img'}
    aria-label={intro ? undefined : 'Computation graph of a small neural network, animated with a forward and backward pass'}
  >
    <g className="ag-edges">
      {EDGES.map((edge, index) => (
        <path
          key={edge.id}
          id={intro ? `${edge.id}-intro` : edge.id}
          className="ag-edge"
          style={{ animationDelay: `${index * 90}ms` }}
          d={edge.d}
        />
      ))}
    </g>
    <g className="ag-edge-beams">
      {EDGES.map((edge) => (
        <motion.path
          key={edge.id}
          d={edge.d}
          stroke="var(--accent-primary)"
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={BEAM_DASH}
          initial={{ strokeDashoffset: BEAM_HIDDEN }}
          animate={{ strokeDashoffset: BEAM_END }}
          transition={beamTransition(edge, true, intro)}
        />
      ))}
      {EDGES.map((edge) => (
        <motion.path
          key={`${edge.id}-bwd`}
          d={edge.d}
          stroke="var(--accent-secondary)"
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={BEAM_DASH}
          initial={{ strokeDashoffset: BEAM_END }}
          animate={{ strokeDashoffset: BEAM_HIDDEN }}
          transition={beamTransition(edge, false, intro)}
        />
      ))}
    </g>
    <g className="ag-nodes">
      {NODES.map((node) => (
        <g
          key={`${node.label}-${node.x}-${node.y}`}
          className={`ag-node ag-${node.type}`}
          style={{ animationDelay: `${node.delay}ms` }}
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
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches || hasSeenIntro() ? 'done' : 'graph';
  });
  const [introPass, setIntroPass] = React.useState('forward');
  const [landingTransform, setLandingTransform] = React.useState({ x: 0, y: 0, scale: 1 });

  React.useEffect(() => {
    if (introPhase === 'graph') markIntroSeen();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const backpropTimer = window.setTimeout(() => setIntroPass('backprop'), 5100);
    const greetingTimer = window.setTimeout(() => setIntroPhase('greeting'), 9000);
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
    }, 9700);
    return () => {
      window.clearTimeout(backpropTimer);
      window.clearTimeout(greetingTimer);
      window.clearTimeout(landingTimer);
    };
  // The initial phase is intentionally captured once: the intro claims its
  // one allowed play as soon as it mounts, before any route navigation.
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  transition={{ duration: 0.55, ease: EASE }}
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
                    transition={{ duration: 1.2, ease: EASE }}
                    onAnimationComplete={() => {
                      if (introPhase === 'landing') setIntroPhase('done');
                    }}
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
