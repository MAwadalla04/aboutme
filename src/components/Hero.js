import React from 'react';
import { motion } from 'framer-motion';

const SPEED = 2.2;
const CYCLE_MS = 10340;
const EDGE_MS = 620;
const BEAM_DASH = '50 300';
const BEAM_HIDDEN = 50;
const BEAM_END = -200;
const EASE = [0.16, 1, 0.3, 1];

const EDGES = [
  { id: 'e-x1-n1',   d: 'M52,392 L96,300',   fwd: 0,    bwd: 8120 },
  { id: 'e-w1-n1',   d: 'M140,392 L96,300',  fwd: 0,    bwd: 8120 },
  { id: 'e-x2-n2',   d: 'M200,392 L244,300', fwd: 680,  bwd: 7440 },
  { id: 'e-w2-n2',   d: 'M288,392 L244,300', fwd: 680,  bwd: 7440 },
  { id: 'e-n1-n3',   d: 'M96,300 L170,214',  fwd: 1360, bwd: 6760 },
  { id: 'e-n2-n3',   d: 'M244,300 L170,214', fwd: 1360, bwd: 6760 },
  { id: 'e-b-n3',    d: 'M305,214 L170,214', fwd: 2040, bwd: 6080 },
  { id: 'e-n3-tanh', d: 'M170,214 L170,128', fwd: 2720, bwd: 5400 },
  { id: 'e-tanh-L',  d: 'M170,128 L170,44',  fwd: 3400, bwd: 4720 },
];

const beamTransition = (edge, isForward) => {
  const delaySec = ((isForward ? edge.fwd : edge.bwd) * SPEED) / 1000;
  const edgeDur = (EDGE_MS * SPEED) / 1000;
  const cycleDur = (CYCLE_MS * SPEED) / 1000;
  return {
    duration: edgeDur,
    delay: delaySec,
    ease: EASE,
    repeat: Infinity,
    repeatDelay: cycleDur - edgeDur,
  };
};

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-layout">
          <div className="hero-content">
            <h1>Mohamed Awadalla</h1>
            <p className="tagline">Product Software Engineer</p>
            <p className="hero-summary">
              I build end-to-end software that turns complex workflows into reliable products—from AI document systems to data-rich web experiences.
            </p>
            <div className="hero-info">
              <div className="hero-info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                Brooklyn, NY
              </div>
            </div>

            <div className="hero-actions">
              <a
                href="#projects"
                className="project-cta"
              >
                <span>See my work</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={`${process.env.PUBLIC_URL}/resume/Mohamed%27s%20Resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="download-btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg>
                <span>My Resume</span>
              </a>
            </div>
          </div>

          <div className="hero-graph">
            <svg className="autograd-graph" viewBox="0 0 340 470" role="img" aria-label="Computation graph of a small neural network, animated with a forward and backward pass">
              <g className="ag-edges">
                <path id="e-x1-n1" className="ag-edge" style={{animationDelay:'0ms'}} d="M52,392 L96,300"/>
                <path id="e-w1-n1" className="ag-edge" style={{animationDelay:'0ms'}} d="M140,392 L96,300"/>
                <path id="e-x2-n2" className="ag-edge" style={{animationDelay:'0ms'}} d="M200,392 L244,300"/>
                <path id="e-w2-n2" className="ag-edge" style={{animationDelay:'0ms'}} d="M288,392 L244,300"/>
                <path id="e-b-n3" className="ag-edge" style={{animationDelay:'0ms'}} d="M305,214 L170,214"/>
                <path id="e-n1-n3" className="ag-edge" style={{animationDelay:'180ms'}} d="M96,300 L170,214"/>
                <path id="e-n2-n3" className="ag-edge" style={{animationDelay:'180ms'}} d="M244,300 L170,214"/>
                <path id="e-n3-tanh" className="ag-edge" style={{animationDelay:'360ms'}} d="M170,214 L170,128"/>
                <path id="e-tanh-L" className="ag-edge" style={{animationDelay:'540ms'}} d="M170,128 L170,44"/>
              </g>
              <g className="ag-edge-beams">
                {EDGES.map((edge) => {
                  const t = beamTransition(edge, true);
                  return (
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
                      transition={t}
                    />
                  );
                })}
                {EDGES.map((edge) => {
                  const t = beamTransition(edge, false);
                  return (
                    <motion.path
                      key={edge.id + '-bwd'}
                      d={edge.d}
                      stroke="var(--accent-secondary)"
                      strokeWidth={5}
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={BEAM_DASH}
                      initial={{ strokeDashoffset: BEAM_END }}
                      animate={{ strokeDashoffset: BEAM_HIDDEN }}
                      transition={t}
                    />
                  );
                })}
              </g>
              <g className="ag-nodes">
                <g className="ag-node ag-in" style={{animationDelay:'0ms'}}><circle cx="52" cy="392" r="18"/><text x="52" y="392">x₁</text></g>
                <g className="ag-node ag-in" style={{animationDelay:'0ms'}}><circle cx="140" cy="392" r="18"/><text x="140" y="392">w₁</text></g>
                <g className="ag-node ag-in" style={{animationDelay:'0ms'}}><circle cx="200" cy="392" r="18"/><text x="200" y="392">x₂</text></g>
                <g className="ag-node ag-in" style={{animationDelay:'0ms'}}><circle cx="288" cy="392" r="18"/><text x="288" y="392">w₂</text></g>
                <g className="ag-node ag-in" style={{animationDelay:'120ms'}}><circle cx="305" cy="214" r="15"/><text x="305" y="214">b</text></g>
                <g className="ag-node ag-op" style={{animationDelay:'300ms'}}><circle cx="96" cy="300" r="18"/><text x="96" y="300">×</text></g>
                <g className="ag-node ag-op" style={{animationDelay:'300ms'}}><circle cx="244" cy="300" r="18"/><text x="244" y="300">×</text></g>
                <g className="ag-node ag-op" style={{animationDelay:'540ms'}}><circle cx="170" cy="214" r="18"/><text x="170" y="214">+</text></g>
                <g className="ag-node ag-op" style={{animationDelay:'720ms'}}><circle cx="170" cy="128" r="19"/><text x="170" y="128">tanh</text></g>
                <g className="ag-node ag-out" style={{animationDelay:'900ms'}}><circle cx="170" cy="44" r="20"/><text x="170" y="44">L</text></g>
              </g>
            </svg>
            <div className="hero-graph-caption code">
              <span className="dot-fwd">●</span> forward · <span className="dot-bwd">●</span> backward · autograd
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
