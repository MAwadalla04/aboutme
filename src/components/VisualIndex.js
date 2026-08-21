import React, { useState } from 'react';
import './ProjectCardPlayground.css';
import { PROJECTS } from '../data/projects';
import { ArrowIcon, ExternalIcon, ProjectVisual } from './ProjectVisual';

const VisualIndex = ({ onOpen }) => {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="projects-index" aria-label="Selected projects">
      <div className="container">
        <div className="pg-index live-project-index">
          {PROJECTS.map((project) => {
            const isOpen = openId === project.id;
            const panelId = `projects-index-panel-${project.id}`;

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
                    <div className="pg-tech-row" aria-label={`${project.title} technologies`}>
                      {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
                    </div>
                    <div className="projects-index-actions">
                      <button type="button" className="projects-index-case-study" onClick={() => onOpen(project)}>
                        Project description <ArrowIcon />
                      </button>
                      <a href={project.href} target="_blank" rel="noopener noreferrer">
                        {project.linkLabel} <ExternalIcon />
                      </a>
                    </div>
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
      </div>
    </section>
  );
};

export default VisualIndex;
