import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'AI & Machine Learning',
      skills: [
        'Natural Language Processing (NLP)',
        'Neural Networks & Deep Learning',
        'PyTorch Framework',
        'Large Language Models (LLMs)',
        'Fine-tuning & Evaluating LLMs',
        'Prompt Engineering',
        'Machine Learning Fundamentals',
        'Data Analysis & Visualization',
        'Process Automation (Python)',
        'Scikit-learn, Pandas, NumPy'
      ]
    },
    {
      title: 'Languages & Databases',
      skills: [
        'Python (Advanced)',
        'C++',
        'MySQL',
        'JavaScript/HTML/CSS',
        'SQL & Database Design'
      ]
    },
    {
      title: 'Developer Tools & Platforms',
      skills: [
        'Operating Systems (Windows, MacOS, Linux)',
        'Version Control (Git)',
        'AI Coding Agents',
        'Full-Stack Development',
        'VMware & Virtualization',
        'Splunk & ELK Stack',
        'Cloud Platforms (AWS)'
      ]
    },
    {
      title: 'Product & Communication',
      skills: [
        'Rapid Prototyping',
        'Cross-Functional Collaboration',
        'Technical Communication',
        'MS Office Suite',
        'Project Coordination',
        'Time Management',
        'Problem-Solving'
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
