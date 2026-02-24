import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [visitCount, setVisitCount] = useState('Loading...');

  useEffect(() => {
    async function fetchVisitCount() {
      try {
        const response = await fetch('https://solitary-paper-a975.mohamedawadalla75.workers.dev/visits');
        if (!response.ok) {
          console.error('Visit counter API error:', response.status);
          setVisitCount('N/A');
          return;
        }
        
        const data = await response.json();
        
        if (data.visits !== undefined) {
          setVisitCount(Number(data.visits).toLocaleString());
        } else {
          setVisitCount('N/A');
        }
      } catch (error) {
        console.error('Failed to fetch visit count:', error);
        setVisitCount('N/A');
      }
    }

    fetchVisitCount();
  }, []);

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div>
            © 2025 Mohamed Awadalla. All rights reserved.
            <br /> <span style={{ fontSize: '0.8em' }}>Visitor Count: <span id="visit-count">{visitCount}</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
