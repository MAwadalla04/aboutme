import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: 'LegalDocuMan — Document Processing & Classification Suite',
      featured: true,
      badge: '★ Featured',
      links: [
        { label: 'LegalDocuMan', url: 'https://github.com/Mo-Awadalla/LegalDocuMan' }
      ],
      stats: [
        { num: 'RF-DETR', lbl: 'signature detection' },
        { num: 'Docker', lbl: 'one-command deploy' },
        { num: 'MIT', lbl: 'open source' }
      ],
      description: [
        'Full-stack document processing platform for regulated legal workflows — deployed at NYC Emergency Management’s Office of the Chief Counsel to classify and organize a legal drive of contracts ahead of migration to a new legal management system.',
        'Architecture: Flask REST API with PostgreSQL persistence and a React frontend, containerized via Docker Compose. Classification is explainable regex-based (MSA, SOW, NDA, PO, Amendment, License); execution status combines deterministic regex with a fine-tuned RF-DETR computer-vision model detecting handwritten signature strokes. Pluggable OCR backends (Tesseract local, NVIDIA stub), fuzzy vendor matching, retention-category mapping, audit trail, and per-tenant user roles with API-key and rate-limit gates.'
      ],
      tech: ['Python', 'Flask', 'React', 'PostgreSQL', 'Docker', 'RF-DETR', 'Tesseract OCR', 'Redis/RQ']
    },
    {
      title: 'Custom Autograd Engine & Character-Level Language Model',
      links: [
        { label: 'autograd', url: 'https://github.com/Mo-Awadalla/autograd' },
        { label: 'makemore', url: 'https://github.com/Mo-Awadalla/makemore' }
      ],
      description: [
        'Re-implemented a reverse-mode automatic differentiation engine in Python (inspired by Karpathy’s micrograd), then extended it beyond the tutorial with tensor operations, a numerical gradient checker using finite differences, and a PyTorch benchmark suite validating gradient correctness against torch.autograd on identical inputs.',
        'Built a character-level language model on top of the custom engine with tokenization, embedding layers, and an MLP architecture following Bengio et al. (2003), trained end-to-end via backpropagation on a 32,000-name dataset.'
      ],
      tech: ['Python', 'PyTorch', 'Backpropagation', 'Custom Autograd', 'Neural Networks']
    },
    {
      title: 'Stock Return Prediction (XGBoost & Gradient Boosting)',
      links: [
        { label: 'stock-return-prediction', url: 'https://github.com/Mo-Awadalla/stock-return-prediction' }
      ],
      description: [
        'Python pipeline for next-day price prediction on AAPL using 9 technical indicators. Predicted next-day returns to handle non-stationarity, then reconstructed price for evaluation against a naive baseline on a held-out test set.',
        'XGBoost achieved 1.54% MAPE vs. 1.05% for the baseline, a known finance-ML result.'
      ],
      tech: ['Python', 'XGBoost', 'Gradient Boosting', 'Time-Series Modeling', 'Technical Indicators']
    },
    {
      title: 'DLS Website Sanitized',
      links: [
        { label: 'dls-website-sanitized', url: 'https://github.com/Mo-Awadalla/dls-website-sanitized' }
      ],
      description: [
        'Built a sanitized public version of the Disaster Law Symposium registration and tracking website used for hybrid event sign-up and attendance workflows.',
        'Implemented reusable front-end registration flows with HTML, CSS, and JavaScript, designed around the same operational needs as the internal Zoom Events-integrated system.'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'REST APIs', 'Event Registration']
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
