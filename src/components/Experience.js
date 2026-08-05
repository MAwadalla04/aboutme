import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: 'Software Development & Automation Intern',
      company: 'New York City Emergency Management',
      location: 'Brooklyn, NY',
      date: 'June 2025 – Present',
      description: [
        'Replaced a spreadsheet workflow with a REST API that processed 1,000+ registrations. Caught failures before users noticed.',
        'Automated compliance reporting for a legal team managing citywide emergency contracts. Reduced manual tracking from hours to minutes.',
        'Built pipelines that processed legal documents ahead of a hard migration deadline. Failure meant missing the court date.',
        'Evaluated 8 vendors on security and integration fit. Recommended the architecture to Chief Counsel.'
      ]
    }
  ];

  return (
    <section id="experience">
      <div className="container">
        <h2>Relevant Experience</h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <div>
                  <h3 className="experience-title">{exp.title}</h3>
                  <div className="experience-company">{exp.company}</div>
                  <div className="experience-location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    {exp.location}
                  </div>
                </div>
                <div className="experience-date">{exp.date}</div>
              </div>
              <div className="experience-description">
                {exp.description.map((desc, descIndex) => (
                  <p key={descIndex}>{desc}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
