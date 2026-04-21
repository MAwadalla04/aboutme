import React from 'react';

const Projects = () => {
  const projects = [
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
      title: 'LegalDocuMan — Document Processing & Classification Suite',
      links: [
        { label: 'LegalDocuMan', url: 'https://github.com/Mo-Awadalla/LegalDocuMan' }
      ],
      description: [
        'Built a modular Python application for automated legal document classification, signature detection, and vendor-based file organization — deployed at NYC Emergency Management’s Office of the Chief Counsel to process a legal drive of 16,000+ contracts ahead of migration to a new legal management system.',
        'Architected as a multi-component pipeline (processing engine, threaded GUI, CLI query tool, test suite) with OCR fallback via Tesseract, PDF text extraction via pdfplumber, and persistent metadata tracking for retention and destruction scheduling; released as MIT-licensed open-source with full installation and contribution documentation.'
      ],
      tech: ['Python', 'Tesseract', 'pdfplumber', 'OCR', 'CLI', 'GUI']
    },
    {
      title: 'Financial Time-Series Forecasting (LSTM & Sequence Modeling)',
      description: [
        'Built a PyTorch LSTM for sequence modeling on financial market data, with a multi-API ingestion pipeline, systematic hyperparameter search, and ensemble experimentation to improve forecasting accuracy.',
        'Engineered time-series features across multi-API sources, ran controlled experiments on model architecture and training procedure, and analyzed performance across configurations to improve generalization on out-of-sample data.'
      ],
      tech: ['Python', 'PyTorch', 'LSTM', 'Time-Series Modeling', 'Feature Engineering']
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
    },
    {
      title: 'Context-Aware Spotify Recommendation Engine',
      description: [
        'Developing a behavioral ML system that predicts user intent from skip patterns and listening context.',
        'Moving beyond collaborative filtering to model psychological engagement (discovery vs. comfort modes).',
        'Engineered 4 custom recommendation algorithms: momentum-based transitions ("Ghost Target"), rage-skip detection with immediate fallback, novelty injection for zero-play tracks ("Trojan Horse"), and user-controlled exploration parameters.',
        'Built ETL pipeline processing 100K+ songs with engineered audio features (valence, energy, tempo).',
        'Training XGBoost classifier on simulated preference data as baseline before LSTM sequence modeling.'
      ],
      tech: ['Python', 'XGBoost', 'LSTM', 'ETL Pipelines', 'Feature Engineering', 'Behavioral ML']
    }
  ];

  return (
    <section id="projects">
      <div className="container">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-content">
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
