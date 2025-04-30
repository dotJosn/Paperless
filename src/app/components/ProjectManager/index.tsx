'use client';
import { useState, useEffect } from 'react';
import type { Project } from '@/app/lib/types/project';
import projectsData from '@/app/lib/storage/projects.json';
import HeaderSection from './HeaderSection';
import ProjectsList from './ProjectsList';
import Loading from './Loading';

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(projectsData as Project[]);
      setFilteredProjects(projectsData as Project[]);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const handleNewProject = () => {
    alert('Funcionalidade de novo projeto não disponível em JSON estático');
  };

  const handleDeleteProject = () => {
    alert('Funcionalidade de exclusão não disponível em JSON estático');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-gray-900 p-6 text-white">
      <HeaderSection searchTerm={searchTerm} onSearchChange={setSearchTerm} onNewProject={handleNewProject} />
      <ProjectsList
        projects={filteredProjects}
        expandedProject={expandedProject}
        searchTerm={searchTerm}
        onToggleProject={setExpandedProject}
        onDeleteProject={handleDeleteProject}
      />
    </main>
  );
};

export default ProjectManager;
