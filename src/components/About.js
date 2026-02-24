import React from 'react';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>I am a Computer Science student at Long Island University's Honors College with a strong focus on Artificial Intelligence, Machine Learning, and Cybersecurity. My technical expertise spans across modern AI frameworks, neural networks, and large language models, with hands-on experience in fine-tuning and evaluating LLMs.</p>
            <p>Currently serving as a Legal Intern at NYC Emergency Management, I'm developing full-stack applications and intelligent document processing systems using AI/ML technologies. My passion lies in leveraging cutting-edge AI to solve real-world problems and create innovative solutions.</p>
            <p>I actively engage in machine learning projects, from fine-tuning LLaMA models for specialized knowledge bases to building neural networks for financial forecasting. My goal is to contribute meaningfully to the AI/ML field and help organizations harness the power of artificial intelligence.</p>
          </div>
          <div className="education">
            <h3>Education</h3>
            <div className="education-item">
              <strong>Long Island University</strong>
              <div>Honors College</div>
              <div>Brooklyn, NY</div>
            </div>
            <div className="education-item">
              <strong>Bachelor of Science in Computer Science</strong>
              <div>Anticipated 2026</div>
            </div>
            <div className="education-item">
              <em>Dean's List, Dean Scholar</em>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
