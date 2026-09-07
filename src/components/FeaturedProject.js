import React from 'react';
import { FEATURED_PROJECT } from '../data/projects';
import { ArrowIcon, ExternalIcon } from './ProjectVisual';
import './FeaturedProject.css';

const FeaturedProject = () => (
  <section className="featured-project" aria-labelledby="featured-project-title">
    <div className="container">
      <div className="featured-project-heading">
        <h2 id="featured-project-title">{FEATURED_PROJECT.title}</h2>
        <div className="featured-project-copy">
          <p>{FEATURED_PROJECT.summary}</p>
          <div className="featured-project-links">
            <a href={FEATURED_PROJECT.href} target="_blank" rel="noopener noreferrer">
              {FEATURED_PROJECT.linkLabel} <ExternalIcon />
            </a>
            <a href="/projects">Behind the build <ArrowIcon /></a>
          </div>
        </div>
      </div>
      <figure className="featured-project-figure">
        <a href={FEATURED_PROJECT.href} target="_blank" rel="noopener noreferrer" aria-label="Explore the live KnicksIQ season archive">
          <img src={FEATURED_PROJECT.image} alt={FEATURED_PROJECT.imageAlt} width={FEATURED_PROJECT.imageWidth} height={FEATURED_PROJECT.imageHeight} loading="lazy" decoding="async" />
        </a>
        <figcaption>The live season archive · React, FastAPI, PostgreSQL, MCP</figcaption>
      </figure>
    </div>
  </section>
);

export default FeaturedProject;
