import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages & Frameworks',
      icon: '</>',
      skills: [
        'Python',
        'C++',
        'JavaScript',
        'TypeScript',
        'HTML/CSS',
        'SQL',
        'PyTorch',
        'Scikit-learn',
        'NumPy',
        'Pandas'
      ]
    },
    {
      title: 'Machine Learning & AI',
      icon: 'ML',
      skills: [
        'LLM Fine-Tuning (LoRA)',
        'Neural Networks',
        'Transformers',
        'NLP',
        'Time-Series Modeling (LSTM)',
        'Backpropagation',
        'Custom Autograd'
      ]
    },
    {
      title: 'Data Engineering',
      icon: 'ETL',
      skills: [
        'Data Pipelines',
        'Feature Engineering',
        'Text Processing',
        'Data Cleaning',
        'OCR (Tesseract, AWS Textract)',
        'REST API Integration',
        'ETL'
      ]
    },
    {
      title: 'Tools & Infrastructure',
      icon: 'Git',
      skills: [
        'Git',
        'Linux',
        'Docker',
        'AWS',
        'Cloudflare (Pages, Workers)',
        'Jupyter',
        'REST APIs',
        'CI/CD'
      ]
    },
    {
      title: 'Low-Code Development & Automation',
      icon: 'Auto',
      skills: [
        'Microsoft Power Platform (Power Apps, Power Automate)',
        'SharePoint',
        'SharePoint Lists',
        'Workflow Automation'
      ]
    },
    {
      title: 'Foundations',
      icon: 'CS',
      skills: [
        'Data Structures & Algorithms',
        'Object-Oriented Design',
        'Automatic Differentiation',
        'Systems Design',
        'Empirical Experimentation'
      ]
    }
  ];

  return (
    <section id="skills">
      <div className="container">
        <h2>Skills</h2>
        <div className="skills-container">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>
                <span className="skill-icon">{category.icon}</span>
                {category.title}
              </h3>
              <ul className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
