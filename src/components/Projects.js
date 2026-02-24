import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: 'NLP & Unstructured Data Processing Pipeline (NYC Emergency Management)',
      description: [
        'Built a production-scale NLP pipeline processing 16,000+ unstructured legal documents.',
        'Implemented automated classification using OCR integration (AWS Textract), text-pattern analysis, and hybrid rule-based/probabilistic classification.',
        'Designed scalable ETL workflows and data validation pipelines that standardized multi-source vendor data.'
      ],
      tech: ['Python', 'AWS Textract', 'OCR', 'NLP', 'Database Storage', 'REST APIs']
    },
    {
      title: 'Event Registration System (NYC Emergency Management)',
      description: [
        'Designed and deployed automated event registration system serving 1,000+ participants.',
        'Built using Microsoft Power Platform (Power Automate workflows), SharePoint Lists, and custom connectors.',
        'Eliminated manual registration processing with zero downtime during peak periods.'
      ],
      tech: ['Power Platform', 'Power Automate', 'SharePoint', 'REST APIs']
    },
    {
      title: 'Custom Autograd Engine + Character-Level Language Model',
      description: [
        'Built reverse-mode automatic differentiation engine from scratch in Jupyter Notebooks.',
        'Implemented dynamic computation graphs, custom gradient functions, and full training loop for neural networks.',
        'Developed character-level language model inspired by Karpathy\'s makemore.'
      ],
      tech: ['Python', 'Jupyter Notebooks', 'Neural Networks', 'Backpropagation']
    },
    {
      title: 'Case Management Workflow System (NYC Emergency Management)',
      description: [
        'Designed case management workflows and data architecture using SharePoint Lists and Power Automate.',
        'Implemented structured request intake processes and document routing automation.',
        'Improved departmental operational efficiency by 30%.'
      ],
      tech: ['SharePoint', 'Power Automate', 'Workflow Automation']
    },
    {
      title: 'Context-Aware Spotify Recommendation Engine (In Progress)',
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
