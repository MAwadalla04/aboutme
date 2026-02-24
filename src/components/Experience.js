import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: 'Legal Intern - Development',
      company: 'New York City Emergency Management',
      location: 'Brooklyn, NY',
      date: 'June 2025 – Present',
      description: [
        '• Developed a full-stack web application for a Disaster Law Symposium, enabling 1000+ participants to register and attend both online and in-person sessions, demonstrating scalable system design and user experience optimization',
        '• Built an intelligent Document Processing Suite that automated the sorting and renaming of 16,000+ procurement contracts and supporting documents using Python, implementing machine learning-based document classification, OCR technology for scanned documents, and intelligent vendor name standardization',
        '• Engineered automated workflow solutions that reduced manual contract processing time by implementing smart document classification (MSA, SOW, NDA, Purchase Orders) and metadata extraction for large-scale document management systems'
      ]
    },
    {
      title: 'Honors College Assistant',
      company: 'Long Island University Brooklyn',
      location: 'Brooklyn, NY',
      date: 'Sep 2022 - Present',
      description: [
        '• Led engaging campus tours for 100+ prospective students and their families, effectively showcasing university programs and campus life while providing exceptional support throughout the admissions process',
        '• Assist in coordinating and executing 15+ Honors College events annually, programs, and activities, ensuring an engaging community for 200+ students and leveraging data-driven insights to optimize event planning and student engagement strategies',
        '• Collaborate with staff to manage communications and outreach efforts across 5+ digital platforms, enhancing visibility and engagement through promotional materials, and automated workflow solutions to streamline administrative processes'
      ]
    }
  ];

  return (
    <section id="experience">
      <div className="container">
        <h2>Relevant Experience</h2>
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <div>
                <h3 className="experience-title">{exp.title}</h3>
                <div className="experience-company">{exp.company}</div>
                <div>{exp.location}</div>
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
    </section>
  );
};

export default Experience;
