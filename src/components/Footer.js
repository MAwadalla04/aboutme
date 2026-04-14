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
          <p>
            &copy; 2025 Mohamed Awadalla. All rights reserved.
          </p>
          <div className="visit-count">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
            {visitCount} visits
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
