import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages & Frameworks',
      skills: [
        'Python',
        'C++',
        'SQL',
        'PyTorch',
        'Scikit-learn'
      ]
    },
    {
      title: 'Machine Learning & AI',
      skills: [
        'LLM Fine-Tuning (LoRA)',
        'NLP',
        'Neural Networks',
        'Time-Series Modeling (LSTM)',
        'Prompt Engineering',
        'ML Libraries: Pandas, Scikit-learn, TensorFlow'
      ]
    },
    {
      title: 'Data Engineering',
      skills: [
        'Pandas',
        'NumPy',
        'Feature Engineering',
        'Text Processing',
        'Data Cleaning',
        'OCR (Tesseract/AWS Textract)',
        'API Integration',
        'ETL Workflows',
        'Data Pipeline Development'
      ]
    },
    {
      title: 'Cloud & Infrastructure',
      skills: [
        'AWS (EC2, S3, Textract)',
        'Azure (basic experience)',
        'Docker',
        'Database Administration'
      ]
    },
    {
      title: 'Low-Code Development & Automation',
      skills: [
        'Microsoft Power Platform (Power Apps, Power Automate)',
        'SharePoint',
        'SharePoint Lists',
        'PowerShell',
        'Workflow Automation'
      ]
    },
    {
      title: 'Tools & Infrastructure',
      skills: [
        'Git',
        'GitHub',
        'Linux',
        'REST APIs',
        'MySQL',
        'PostgreSQL',
        'Training Pipelines'
      ]
    },
    {
      title: 'Web Development & APIs',
      skills: [
        'RESTful API Design',
        'Web Application Development',
        'Custom Connectors'
      ]
    },
    {
      title: 'Database',
      skills: [
        'MySQL',
        'PostgreSQL',
        'Database Schema Design'
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
              <h3>{category.title}</h3>
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
