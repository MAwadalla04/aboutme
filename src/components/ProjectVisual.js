import React from 'react';

export const ArrowIcon = ({ direction = 'right' }) => (
  <svg className={direction === 'left' ? 'pg-icon pg-icon-left' : 'pg-icon'} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ExternalIcon = () => (
  <svg className="pg-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14 5h5v5M19 5l-9 9M19 14v5H5V5h5" />
  </svg>
);

export const CloseIcon = () => (
  <svg className="pg-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const DocumentDiagram = () => (
  <>
    <rect className="pg-art-paper" x="116" y="24" width="168" height="192" rx="5" />
    <path className="pg-art-muted" d="M138 48h66M138 62h42M138 86h124M138 96h108" />
    <rect className="pg-art-highlight" x="132" y="112" width="136" height="34" rx="3" />
    <text x="144" y="133">END DATE</text>
    <path className="pg-art-muted" d="M138 160h74" />
    <rect className="pg-art-outline" x="132" y="174" width="136" height="28" rx="3" />
    <path className="pg-art-line" d="M145 194c16-25 3-20 5-6s12-15 14-5 8 4 12 0 6 6 15 1h22" />
    <path className="pg-art-accent" d="m243 188 4 4 8-9" />
  </>
);

const GraphDiagram = () => (
  <>
    <g className="pg-art-line">
      <path d="M81 90l48 20M81 150l48-20M173 120h74M223 52h47v45M293 120h27" />
      <path d="M123 103l6 7-9 1M120 129l9 1-6 7M241 116l6 4-6 4M266 91l4 6 4-6M314 116l6 4-6 4" />
    </g>
    <g className="pg-art-paper">
      <circle cx="60" cy="80" r="23" /><circle cx="60" cy="160" r="23" />
      <circle cx="150" cy="120" r="23" /><circle cx="200" cy="52" r="23" />
      <circle cx="270" cy="120" r="23" />
    </g>
    <circle className="pg-art-highlight" cx="343" cy="120" r="23" />
    <g className="pg-art-symbol" textAnchor="middle" dominantBaseline="central">
      <text x="60" y="80">x</text><text x="60" y="160">w</text>
      <text x="150" y="120">×</text><text x="200" y="52">b</text>
      <text x="270" y="120">+</text><text x="343" y="120">y</text>
    </g>
    <text className="pg-art-caption" x="200" y="210" textAnchor="middle">y = x × w + b</text>
  </>
);

const CourtDiagram = () => (
  <>
    <g className="pg-art-line">
      <rect x="68" y="26" width="264" height="188" rx="2" />
      <path d="M155 26v94h90V26M155 120a45 45 0 0 0 90 0M91 26v43a109 109 0 0 0 218 0V26M172 214a28 28 0 0 1 56 0" />
      <path className="pg-art-muted" d="M155 120a45 45 0 0 1 90 0" strokeDasharray="4 5" />
      <path d="M182 43h36M200 43v8" />
    </g>
    <circle className="pg-art-highlight" cx="200" cy="61" r="19" />
    <circle className="pg-art-accent" cx="200" cy="61" r="9" />
  </>
);

const RegistrationDiagram = () => (
  <>
    <rect className="pg-art-paper" x="86" y="38" width="228" height="164" rx="5" />
    <path className="pg-art-muted" d="M86 149h228" strokeDasharray="4 5" />
    <text x="108" y="67">DISASTER LAW</text>
    <text x="108" y="87">SYMPOSIUM</text>
    <path className="pg-art-muted" d="M108 109h90M108 120h65" />
    <circle className="pg-art-highlight" cx="271" cy="111" r="21" />
    <path className="pg-art-accent" d="m262 111 6 6 12-13" />
    <text className="pg-art-caption" x="108" y="180">REGISTRATION</text>
    <path className="pg-art-muted" d="M261 167v16m5-16v16m8-16v16m4-16v16m7-16v16m6-16v16" />
  </>
);

const DIAGRAMS = {
  documents: DocumentDiagram,
  graph: GraphDiagram,
  court: CourtDiagram,
  schedule: RegistrationDiagram,
};

export const ProjectVisual = ({ project, compact = false }) => {
  if (project.image) {
    return (
      <div className="pg-visual pg-visual-screenshot">
        <img src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} loading="lazy" decoding="async" />
      </div>
    );
  }
  const Diagram = DIAGRAMS[project.visual];

  return (
    <div className={`pg-visual pg-visual-${project.visual}${compact ? ' pg-visual-compact' : ''}`} aria-hidden="true">
      <svg className="pg-art" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" focusable="false">
        {Diagram && <Diagram />}
      </svg>
    </div>
  );
};
