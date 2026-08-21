import React, { useCallback, useState } from 'react';
import VisualIndex from './VisualIndex';
import { CaseStudyPanel } from './ProjectCardPlayground';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const closeCaseStudy = useCallback(() => setActiveProject(null), []);

  return (
    <>
      <VisualIndex onOpen={setActiveProject} />
      <CaseStudyPanel project={activeProject} onClose={closeCaseStudy} />
    </>
  );
};

export default Projects;
