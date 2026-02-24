import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: 'NBA Analytics Conversational AI - Fine-tuned LLaMA 3.2',
      description: [
        'Fine-tuned LLaMA 3.2 model using LoRA techniques to create a specialized New York Knicks knowledge base, implementing custom tokenization and data preprocessing pipelines for sports analytics applications.',
        'Developed automated data collection system for NBA Twitter content, creating text cleaning algorithms and sentiment analysis tools to extract meaningful basketball insights and performance metrics from social media data.'
      ],
      tech: ['LLaMA 3.2', 'LoRA', 'NLP', 'Python', 'Sentiment Analysis']
    },
    {
      title: 'Automated Log Analysis',
      description: [
        'Developed Python-based data processing pipeline for parsing and analyzing large-scale security logs, implementing statistical analysis and anomaly detection algorithms for real-time threat intelligence.',
        'Integrated Splunk and ELK Stack for distributed data processing, creating automated alert systems that reduced incident response time by 40% through intelligent pattern recognition.',
        'Built comprehensive monitoring dashboard with data visualization components, enabling real-time analysis of system performance metrics and security event correlation.'
      ],
      tech: ['Python', 'Splunk', 'ELK Stack', 'Anomaly Detection', 'Data Visualization']
    },
    {
      title: 'Stock Price Prediction Neural Network',
      description: [
        'Developed LSTM neural network using PyTorch to predict stock price movements, implementing time series analysis and feature engineering techniques for financial market data processing.',
        'Built comprehensive data pipeline integrating multiple financial APIs, creating automated preprocessing workflows for handling missing data, normalization, and sequential feature extraction.',
        'Achieved predictive accuracy improvements through hyperparameter optimization and ensemble methods, demonstrating practical application of deep learning for financial forecasting and risk analysis.'
      ],
      tech: ['PyTorch', 'LSTM', 'Time Series', 'Financial APIs', 'Deep Learning']
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
