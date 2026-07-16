import React from 'react';
import { Carousel, Card } from './AppleCardsCarousel';

const Projects = () => {
  const projects = [
    {
      title: 'LegalDocuMan — Document Processing & Classification Suite',
      category: 'Full-Stack · AI',
      accent: '#a27b5c',
      featured: true,
      stats: [
        { num: '94.9%', lbl: 'RF-DETR precision' },
        { num: 'Docker', lbl: 'multi-container deploy' },
        { num: 'MIT', lbl: 'open source' },
      ],
      links: [
        { label: 'GitHub', url: 'https://github.com/Mo-Awadalla/LegalDocuMan' },
      ],
      description: [
        'Full-stack document-processing platform with a React frontend, Flask REST API, PostgreSQL persistence, and Redis-backed async workers for scalable background processing.',
        'Designed RESTful endpoints with request validation, error handling, and comprehensive logging for production observability. Deployed containerized services with Docker, managing the API server, worker processes, Redis, and PostgreSQL in a multi-container architecture. AI-powered document classification combines computer vision (RF-DETR, 94.9% precision) with OCR pipelines for automated data extraction.',
      ],
      tech: ['Python', 'Flask', 'PostgreSQL', 'React', 'Redis', 'Docker', 'REST APIs', 'RF-DETR'],
    },
    {
      title: 'Custom Autograd Engine & Character-Level Language Model',
      category: 'AI/ML · Systems',
      accent: '#8d9b6f',
      links: [
        { label: 'autograd', url: 'https://github.com/Mo-Awadalla/autograd' },
        { label: 'makemore', url: 'https://github.com/Mo-Awadalla/makemore' },
      ],
      description: [
        'Implemented a reverse-mode autodiff engine from scratch with tensor operations, topological backpropagation, and finite-difference gradient checks validating against torch.autograd.',
        'Trained a character-level neural language model with embeddings, MLP layers, and backpropagation on a 32,000-name dataset.',
      ],
      tech: ['Python', 'PyTorch', 'Autograd', 'Backpropagation'],
    },
    {
      title: 'KnicksIQ',
      category: 'Full-Stack · Sports Intelligence',
      accent: '#bf8a53',
      links: [
        { label: 'site', url: 'https://www.knicksiq.win' },
        { label: 'GitHub', url: 'https://github.com/Mo-Awadalla/KnicksIQ' },
      ],
      description: [
        'Built an anonymous Knicks archive that answers supported 2025–26 regular-season and playoff questions from immutable game, player, and play-by-play data with claim-level citations.',
        'Engineered a React analyst experience and read-only FastAPI service backed by PostgreSQL, with deterministic release validation and offline data-ingestion tooling.',
      ],
      tech: ['React', 'FastAPI', 'PostgreSQL', 'Docker', 'Python', 'MCP'],
    },
    {
      title: 'DLS Website Sanitized',
      category: 'Web · Frontend',
      accent: '#c39a73',
      links: [
        { label: 'GitHub', url: 'https://github.com/Mo-Awadalla/dls-website-sanitized' },
      ],
      description: [
        'Built a sanitized public version of the Disaster Law Symposium registration and tracking website used for hybrid event sign-up and attendance workflows.',
        'Implemented reusable front-end registration flows with HTML, CSS, and JavaScript, designed around the same operational needs as the internal Zoom Events-integrated system.',
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'REST APIs', 'Event Registration'],
    },
  ];

  const cards = projects.map((project, index) => ({
    ...project,
    content: <ProjectModalBody project={project} />,
  }));

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <Carousel
          items={cards.map((card, index) => (
            <Card key={card.title} card={card} index={index} />
          ))}
          mode="step"
        />
      </div>
    </section>
  );
};

const ProjectModalBody = ({ project }) => (
  <div className="acc-modal-content">
    {project.featured && project.stats && (
      <div className="acc-modal-stats">
        {project.stats.map((stat, i) => (
          <div key={i} className="acc-modal-stat">
            <span className="acc-modal-stat-num">{stat.num}</span>
            <span className="acc-modal-stat-lbl">{stat.lbl}</span>
          </div>
        ))}
      </div>
    )}

    {project.links && (
      <div className="acc-modal-links">
        {project.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="acc-modal-link"
          >
            {link.label} →
          </a>
        ))}
      </div>
    )}

    <div className="acc-modal-description">
      {project.description.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>

    <div className="acc-modal-tech">
      {project.tech.map((t, i) => (
        <span key={i} className="tech-tag">{t}</span>
      ))}
    </div>
  </div>
);

export default Projects;
