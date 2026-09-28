import React from 'react';

const CurrentlyReading = ({ sectionIndex }) => {
  return (
    <section id="reading">
      <div className="container">
        <h2 className="section-title">{sectionIndex ? <span className="section-index">{sectionIndex}</span> : null}Currently Reading</h2>
        <div className="reading-content">
          <p><em>Build a Reasoning Model (From Scratch)</em> by Sebastian Raschka</p>
        </div>
      </div>
    </section>
  );
};

export default CurrentlyReading;
