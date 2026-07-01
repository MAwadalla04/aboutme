import React from 'react';
import { Carousel, Card } from './AppleCardsCarousel';

const Projects = () => {
  const projects = [
    {
      title: 'LegalDocuMan — Document Processing & Classification Suite',
      category: 'Full-Stack · AI',
      gradient:
        'linear-gradient(135deg, #0a1628 0%, #1a2744 60%, #0a1628 100%)',
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
      gradient:
        'linear-gradient(135deg, #1a1d23 0%, #2d323b 60%, #1a1d23 100%)',
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
      title: 'Personal Portfolio',
      category: 'Web · Cloud',
      gradient:
        'linear-gradient(135deg, #1a0a2e 0%, #2d1b69 60%, #1a0a2e 100%)',
      links: [
        { label: 'site', url: 'https://moawadalla.com' },
        { label: 'GitHub', url: 'https://github.com/MAwadalla04/aboutme' },
      ],
      description: [
        'Built a React 18 + TypeScript SPA with a custom CSS architecture, responsive layouts, and Intersection Observer-based scroll animations.',
        'Built a Cloudflare Worker API with serverless deployment, CORS handling, and persistent data storage on Cloudflare D1.',
      ],
      tech: ['React', 'TypeScript', 'Cloudflare Workers', 'Cloudflare Pages', 'D1'],
    },
    {
      title: 'DLS Website Sanitized',
      category: 'Web · Frontend',
      gradient:
        'linear-gradient(135deg, #0a1c24 0%, #0d353e 60%, #0a1c24 100%)',
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
        <p className="acc-hint">Click a card for details</p>
        <Carousel
          items={cards.map((card, index) => (
            <Card key={card.title} card={card} index={index} />
          ))}
          mode="marquee"
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
