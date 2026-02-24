import React from 'react';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>I'm a Computer Science graduate specializing in Artificial Intelligence and Machine Learning. I work with modern AI frameworks, neural networks, and large language models, with hands-on experience in fine-tuning and evaluating LLMs.</p>
            <p>As a Legal Intern at NYC Emergency Management, I develop full-stack applications and intelligent document processing systems using AI/ML technologies. I've built projects ranging from fine-tuned LLaMA models for specialized knowledge bases to neural networks for financial forecasting.</p>
            <p>I'm passionate about leveraging AI to solve real-world problems and help organizations harness the power of artificial intelligence.</p>
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
              <div>2026</div>
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
