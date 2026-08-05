import React from 'react';
import { Carousel, Card } from './AppleCardsCarousel';

const Projects = () => {
  const projects = [
    {
      title: 'LegalDocuMan',
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
        'Turned an internal script into a production document processing platform. RF-DETR for signature detection (94.9% precision), OCR for extraction, Flask API, React frontend, PostgreSQL, Redis workers. Docker multi container deploy.',
      ],
      tech: ['Python', 'Flask', 'PostgreSQL', 'React', 'Redis', 'Docker', 'REST APIs', 'RF-DETR'],
    },
    {
      title: 'Autograd Engine',
      category: 'AI/ML · Systems',
      accent: '#8d9b6f',
      links: [
        { label: 'autograd', url: 'https://github.com/Mo-Awadalla/autograd' },
        { label: 'makemore', url: 'https://github.com/Mo-Awadalla/makemore' },
      ],
      description: [
        'I wanted to understand backpropagation, not just use it. Built the engine from scratch, validated gradients against PyTorch, then trained a character level language model on 32,000 names.',
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
        'A Knicks analytics site that answers any question about the 2025–26 season with citations from play by play data.',
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
        'Built the registration and tracking system for the Disaster Law Symposium, a hybrid legal conference. Processed 1,000+ sign ups.',
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
