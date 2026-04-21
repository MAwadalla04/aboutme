import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: 'Legal Tech & Automation Intern',
      company: 'New York City Emergency Management',
      location: 'Brooklyn, NY',
      date: 'June 2025 – Present',
      description: [
        'Designed and built a custom event registration and tracking website (HTML, CSS, JavaScript) integrated with the Zoom Events REST API, handling sign-up and attendance tracking for 1,000+ registrants across hybrid events and replacing a manual coordination process with a reusable template adopted by the department.',
        'Authored a vendor evaluation framework benchmarking 8 competing legal matter management platforms (Thomson Reuters-class systems) on technical capabilities, cost, and integration fit; framework adopted by Chief Counsel and drove the department’s final vendor selection.',
        'Designed and deployed an end-to-end OKR tracking and reporting system for the Office of the Chief Counsel: built a dynamic Power Apps form with cascading dropdowns backed by a SharePoint list of 63 pre-populated records across 4 attorneys, and orchestrated 3 Power Automate flows for quarterly reminders, 48-hour compliance follow-ups, and automated HTML report generation and email delivery.'
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
