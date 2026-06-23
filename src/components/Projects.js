import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: 'LegalDocuMan — Document Processing & Classification Suite',
      featured: true,
      badge: '★ Featured',
      links: [
        { label: 'GitHub', url: 'https://github.com/Mo-Awadalla/LegalDocuMan' }
      ],
      stats: [
        { num: '94.9%', lbl: 'RF-DETR precision' },
        { num: 'Docker', lbl: 'multi-container deploy' },
        { num: 'MIT', lbl: 'open source' }
      ],
      description: [
        'Full-stack document-processing platform with a React frontend, Flask REST API, PostgreSQL persistence, and Redis-backed async workers for scalable background processing.',
        'Designed RESTful endpoints with request validation, error handling, and comprehensive logging for production observability. Deployed containerized services with Docker, managing the API server, worker processes, Redis, and PostgreSQL in a multi-container architecture. AI-powered document classification combines computer vision (RF-DETR, 94.9% precision) with OCR pipelines for automated data extraction.'
      ],
      tech: ['Python', 'Flask', 'PostgreSQL', 'React', 'Redis', 'Docker', 'REST APIs', 'RF-DETR']
    },
    {
      title: 'Custom Autograd Engine & Character-Level Language Model',
      links: [
        { label: 'autograd', url: 'https://github.com/Mo-Awadalla/autograd' },
        { label: 'makemore', url: 'https://github.com/Mo-Awadalla/makemore' }
      ],
      description: [
        'Implemented a reverse-mode autodiff engine from scratch with tensor operations, topological backpropagation, and finite-difference gradient checks validating against torch.autograd.',
        'Trained a character-level neural language model with embeddings, MLP layers, and backpropagation on a 32,000-name dataset.'
      ],
      tech: ['Python', 'PyTorch', 'Autograd', 'Backpropagation']
    },
    {
      title: 'Personal Portfolio',
      links: [
        { label: 'site', url: 'https://moawadalla.com' },
        { label: 'GitHub', url: 'https://github.com/MAwadalla04/aboutme' }
      ],
      description: [
        'Built a React 18 + TypeScript SPA with a custom CSS architecture, responsive layouts, and Intersection Observer-based scroll animations.',
        'Built a Cloudflare Worker API with serverless deployment, CORS handling, and persistent data storage on Cloudflare D1.'
      ],
      tech: ['React', 'TypeScript', 'Cloudflare Workers', 'Cloudflare Pages', 'D1']
    }
  ];

  return (
    <section id="projects">
      <div className="container">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className={`project-card${project.featured ? ' project-featured' : ''}`}>
              <div className="project-content">
                {project.featured && project.badge && (
                  <span className="project-featured-badge">{project.badge}</span>
                )}
                <h3 className="project-title">{project.title}</h3>
                {project.links && (
                  <div className="project-links">
                    {project.links.map((link, linkIndex) => (
                      <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
                {project.featured && project.stats && (
                  <div className="project-featured-stats">
                    {project.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="project-stat">
                        <span className="project-stat-num">{stat.num}</span>
                        <span className="project-stat-lbl">{stat.lbl}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="project-description">
                  {project.description.map((desc, descIndex) => (
                    <p key={descIndex}>{desc}</p>
                  ))}
                </div>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
