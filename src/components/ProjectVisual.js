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

export const ProjectVisual = ({ project, compact = false }) => (
  <div className={`pg-visual pg-visual-${project.visual}${compact ? ' pg-visual-compact' : ''}`} aria-hidden="true">
    {/* Project photos are paused for now; restore this when the stock-image pass resumes.
    <img className="pg-photo" src={project.image} alt="" loading={compact ? 'lazy' : 'eager'} />
    <span className="pg-photo-overlay" />
    */}
    {project.visual === 'documents' && (
      <>
        <div className="pg-doc pg-doc-back"><i /><i /><i /></div>
        <div className="pg-doc pg-doc-front"><i /><i /><i /><span /></div>
        <b>END DATE</b>
      </>
    )}
    {project.visual === 'graph' && (
      <>
        <i className="pg-node pg-node-a">x</i>
        <i className="pg-node pg-node-b">w</i>
        <i className="pg-node pg-node-c">×</i>
        <i className="pg-node pg-node-d">+</i>
        <i className="pg-node pg-node-e">L</i>
        <span className="pg-edge pg-edge-a" />
        <span className="pg-edge pg-edge-b" />
        <span className="pg-edge pg-edge-c" />
        <span className="pg-edge pg-edge-d" />
      </>
    )}
    {project.visual === 'court' && (
      <>
        <div className="pg-court-key"><span /></div>
        <i className="pg-shot pg-shot-a" />
        <i className="pg-shot pg-shot-b" />
        <i className="pg-shot pg-shot-c" />
        <div className="pg-score"><b>NYK</b><span>112</span></div>
      </>
    )}
    {project.visual === 'schedule' && (
      <>
        <div className="pg-calendar-head"><b>DISASTER LAW</b><span>SYMPOSIUM</span></div>
        <div className="pg-calendar-grid">{Array.from({ length: 12 }).map((_, index) => <i key={index} />)}</div>
        <strong>1,000+</strong>
      </>
    )}
  </div>
);
