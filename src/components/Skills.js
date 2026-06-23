import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: '</>',
      skills: ['Python', 'JavaScript/TypeScript', 'SQL', 'C++']
    },
    {
      title: 'Backend',
      icon: 'API',
      skills: ['Flask', 'FastAPI', 'Node.js', 'REST APIs', 'PostgreSQL', 'Redis', 'Docker']
    },
    {
      title: 'AI/ML',
      icon: 'ML',
      skills: ['PyTorch', 'Autograd', 'Computer Vision', 'NLP', 'Model Fine-tuning', 'OCR']
    },
    {
      title: 'Infrastructure',
      icon: 'Ops',
      skills: ['Git', 'Linux', 'Docker', 'Docker Compose', 'Cloudflare Workers/Pages']
    }
  ];

  return (
    <section id="skills">
      <div className="container">
        <h2>Technical Skills</h2>
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
