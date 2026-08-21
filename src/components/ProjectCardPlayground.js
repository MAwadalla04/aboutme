import React, { useEffect, useRef, useState } from 'react';
import './ProjectCardPlayground.css';
import { PROJECTS } from '../data/projects';
import { ArrowIcon, CloseIcon, ExternalIcon, ProjectVisual } from './ProjectVisual';

const CONCEPTS = {
  dossier: 'Project dossiers',
  index: 'Editorial index',
  carousel: 'Visual carousel',
  bento: 'Bento proof board',
};

const ChoiceButton = ({ concept, selected, onSelect }) => (
  <button
    type="button"
    className={`pg-choice-button${selected ? ' pg-choice-button-selected' : ''}`}
    aria-pressed={selected}
    onClick={() => onSelect(concept)}
  >
    <span>{selected ? 'Direction selected' : 'Choose this direction'}</span>
    <span aria-hidden="true">{selected ? '✓' : '→'}</span>
  </button>
);

const SpecimenHeader = ({ number, title, titleId, description, primitives, concept, selected, onSelect }) => (
  <div className="pg-specimen-header">
    <div className="pg-specimen-copy">
      <p className="pg-specimen-number">Option {number}</p>
      <h2 id={titleId}>{title}</h2>
      <p>{description}</p>
      <div className="pg-primitives" aria-label="Shadcn primitives represented">
        {primitives.map((primitive) => <span key={primitive}>{primitive}</span>)}
      </div>
    </div>
    <ChoiceButton concept={concept} selected={selected} onSelect={onSelect} />
  </div>
);

const DossierSpecimen = ({ selected, onSelect, onOpen }) => (
  <section className="pg-specimen" aria-labelledby="pg-dossier-title">
    <SpecimenHeader
      number="01"
      title="Project dossiers"
      titleId="pg-dossier-title"
      description="Compact case-study covers that open into a structured project narrative. Best when the details and decisions are the proof."
      primitives={['Card', 'Dialog', 'Drawer', 'Tabs', 'Badge']}
      concept="dossier"
      selected={selected}
      onSelect={onSelect}
    />
    <div className="pg-dossier-grid">
      {PROJECTS.map((project) => (
        <button
          type="button"
          className={`pg-dossier-card${project.featured ? ' pg-dossier-featured' : ''}`}
          key={project.id}
          onClick={() => onOpen(project)}
        >
          <div className="pg-dossier-topline">
            <span>{project.category}</span>
            <span>{project.number}</span>
          </div>
          <div className="pg-dossier-main">
            <div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
            <ProjectVisual project={project} compact />
          </div>
          <div className="pg-dossier-proof">
            <strong>{project.metric}</strong>
            <span>{project.metricLabel}</span>
            <span className="pg-dossier-open">Open dossier <ArrowIcon /></span>
          </div>
        </button>
      ))}
    </div>
  </section>
);

const EditorialSpecimen = ({ selected, onSelect, onOpen }) => {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="pg-specimen" aria-labelledby="pg-index-title">
      <SpecimenHeader
        number="02"
        title="Editorial index"
        titleId="pg-index-title"
        description="A scan-first project list that expands in place. Best when you want the portfolio to feel precise, mature, and unlike a card wall."
        primitives={['Accordion', 'HoverCard', 'Badge']}
        concept="index"
        selected={selected}
        onSelect={onSelect}
      />
      <div className="pg-index" role="presentation">
        {PROJECTS.map((project) => {
          const isOpen = openId === project.id;
          const panelId = `pg-index-panel-${project.id}`;
          return (
            <article className={`pg-index-item${isOpen ? ' pg-index-item-open' : ''}`} key={project.id}>
              <button
                type="button"
                className="pg-index-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : project.id)}
              >
                <span className="pg-index-number">{project.number}</span>
                <span className="pg-index-title">{project.title}</span>
                <span className="pg-index-category">{project.category}</span>
                <span className="pg-index-mark" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
                <div id={panelId} className="pg-index-panel" hidden={!isOpen}>
                <div className="pg-index-details">
                  <p>{project.summary}</p>
                  <div className="pg-tech-row">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
                  <a href={project.href} target="_blank" rel="noopener noreferrer">{project.linkLabel} <ExternalIcon /></a>
                  {onOpen && <button type="button" className="projects-index-case-study" onClick={() => onOpen(project)}>Project description <ArrowIcon /></button>}
                </div>
                <div className="pg-index-preview">
                  <ProjectVisual project={project} />
                  <div><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

const CarouselSpecimen = ({ selected, onSelect, onOpen }) => {
  const railRef = useRef(null);
  const move = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('.pg-rail-card');
    const distance = (card?.getBoundingClientRect().width || 360) + 20;
    rail.scrollBy({ left: direction * distance, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <section className="pg-specimen pg-specimen-rail" aria-labelledby="pg-carousel-title">
      <SpecimenHeader
        number="03"
        title="Visual carousel"
        titleId="pg-carousel-title"
        description="Project artwork leads; the copy supports it. Best when you want each system to be understood before someone opens the details."
        primitives={['Carousel', 'Card', 'AspectRatio', 'Dialog']}
        concept="carousel"
        selected={selected}
        onSelect={onSelect}
      />
      <div className="pg-rail-shell" role="region" aria-label="Project concepts carousel">
        <div className="pg-rail" ref={railRef}>
          {PROJECTS.map((project) => (
            <article className="pg-rail-card" key={project.id}>
              <ProjectVisual project={project} />
              <div className="pg-rail-content">
                <div className="pg-rail-meta"><span>{project.category}</span><span>{project.number} / 04</span></div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <button type="button" onClick={() => onOpen(project)}>Project description <ArrowIcon /></button>
              </div>
            </article>
          ))}
        </div>
        <div className="pg-rail-controls">
          <button type="button" aria-label="Previous project" onClick={() => move(-1)}><ArrowIcon direction="left" /></button>
          <button type="button" aria-label="Next project" onClick={() => move(1)}><ArrowIcon /></button>
        </div>
      </div>
    </section>
  );
};

const BentoSpecimen = ({ selected, onSelect }) => (
  <section className="pg-specimen" aria-labelledby="pg-bento-title">
    <SpecimenHeader
      number="04"
      title="Bento proof board"
      titleId="pg-bento-title"
      description="An asymmetric overview where card size reflects the amount of evidence. Best when you want range and impact visible in one glance."
      primitives={['Card', 'Badge', 'AspectRatio', 'Tooltip']}
      concept="bento"
      selected={selected}
      onSelect={onSelect}
    />
    <div className="pg-bento-grid">
      {PROJECTS.map((project) => (
        <article className={`pg-bento-card pg-bento-${project.id}`} key={project.id}>
          <div className="pg-bento-copy">
            <div className="pg-bento-meta"><span>{project.number}</span><span>{project.category}</span></div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="pg-bento-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
            <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.linkLabel}: ${project.title}`}>
              {project.linkLabel} <ExternalIcon />
            </a>
          </div>
          <ProjectVisual project={project} compact={!project.featured} />
        </article>
      ))}
    </div>
  </section>
);

export const CaseStudyPanel = ({ project, onClose }) => {
  const panelRef = useRef(null);
  const [tab, setTab] = useState('problem');
  const closeRef = useRef(null);

  useEffect(() => {
    setTab('problem');
    if (!project) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.cancelAnimationFrame(frame);
      previousFocus?.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;

  const tabCopy = { problem: project.problem, build: project.build, result: project.result };
  return (
    <div className="pg-panel-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section ref={panelRef} className="pg-panel" role="dialog" aria-modal="true" aria-labelledby="pg-panel-title">
        <button ref={closeRef} type="button" className="pg-panel-close" onClick={onClose} aria-label="Close case study"><CloseIcon /></button>
        <p className="pg-panel-category">{project.category}</p>
        <h2 id="pg-panel-title">{project.title}</h2>
        <ProjectVisual project={project} />
        <div className="pg-tabs" role="tablist" aria-label="Case study sections">
          {['problem', 'build', 'result'].map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              className={tab === item ? 'pg-tab-active' : ''}
              onClick={() => setTab(item)}
            >
              {item === 'result' ? 'Result' : item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
        <div className="pg-tab-panel" role="tabpanel">
          <p>{tabCopy[tab]}</p>
        </div>
        <div className="pg-panel-footer">
          <div><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
          <a href={project.href} target="_blank" rel="noopener noreferrer">{project.linkLabel} <ExternalIcon /></a>
        </div>
      </section>
    </div>
  );
};

const ProjectCardPlayground = () => {
  const [selectedConcept, setSelectedConcept] = useState(() => {
    try {
      return window.localStorage.getItem('project-card-direction') || '';
    } catch {
      return '';
    }
  });
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    document.body.classList.add('playground-mode');
    const previousTitle = document.title;
    document.title = 'Project Card Test Ground — Mohamed Awadalla';
    return () => {
      document.body.classList.remove('playground-mode');
      document.title = previousTitle;
    };
  }, []);

  const selectConcept = (concept) => {
    const next = selectedConcept === concept ? '' : concept;
    setSelectedConcept(next);
    try {
      if (next) window.localStorage.setItem('project-card-direction', next);
      else window.localStorage.removeItem('project-card-direction');
    } catch {
      // Selection still works for this session when storage is unavailable.
    }
  };

  return (
    <main className="project-playground">
      <header className="pg-header">
        <a className="pg-back" href="/about"><ArrowIcon direction="left" /> Portfolio</a>
        <div className="pg-selection" aria-live="polite">
          <span>Current pick</span>
          <strong>{selectedConcept ? CONCEPTS[selectedConcept] : 'Nothing selected yet'}</strong>
          {selectedConcept && <button type="button" onClick={() => selectConcept(selectedConcept)}>Clear</button>}
        </div>
      </header>

      <div className="pg-shell">
        <section className="pg-intro">
          <p>Project card test ground</p>
          <h1>Four ways to present the work.</h1>
          <div>
            <p>Same projects. Different information hierarchy. Open, expand, swipe, and resize each option before choosing a direction.</p>
            <span>Built from shadcn interaction patterns without touching the live Projects section.</span>
          </div>
        </section>

        <DossierSpecimen selected={selectedConcept === 'dossier'} onSelect={selectConcept} onOpen={setActiveProject} />
        <EditorialSpecimen selected={selectedConcept === 'index'} onSelect={selectConcept} onOpen={setActiveProject} />
        <CarouselSpecimen selected={selectedConcept === 'carousel'} onSelect={selectConcept} onOpen={setActiveProject} />
        <BentoSpecimen selected={selectedConcept === 'bento'} onSelect={selectConcept} />

        <footer className="pg-footer">
          <span>Project systems</span>
          <strong>{selectedConcept ? `${CONCEPTS[selectedConcept]} is selected.` : 'Choose a direction above.'}</strong>
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
              });
            }}
          >
            Back to top ↑
          </a>
        </footer>
      </div>

      <CaseStudyPanel project={activeProject} onClose={() => setActiveProject(null)} />
    </main>
  );
};

export default ProjectCardPlayground;
