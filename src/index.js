import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProjectCardPlayground from './components/ProjectCardPlayground';

const isProjectPlayground = new URLSearchParams(window.location.search).get('playground') === 'projects';

if (!isProjectPlayground) {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const targetPath = normalizedPath === '/' ? '/about' : normalizedPath;
  if (window.location.pathname !== targetPath) {
    window.history.replaceState({}, '', `${targetPath}${window.location.search}${window.location.hash}`);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {isProjectPlayground ? <ProjectCardPlayground /> : <App />}
  </React.StrictMode>
);
