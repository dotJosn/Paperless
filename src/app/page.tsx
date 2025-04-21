'use client';
import { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiLoader } from 'react-icons/fi';
import { Project } from '@/app/lib/types/project';
import projectsData from '@/app/lib/storage/projects.json';
import ProjectCard from '@/app/components/ProjectCard';
import SearchBar from '@/app/components/SearchBar';

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento assíncrono
    const timer = setTimeout(() => {
      setProjects(projectsData as Project[]);
      setFilteredProjects(projectsData as Project[]);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
        <FiLoader className="animate-spin text-2xl mr-2" />
        Carregando projetos...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gerenciador de Projetos</h1>
        <p className="text-gray-400">Monitore e gerencie todas as etapas dos seus projetos</p>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">
          <SearchBar 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar projetos..."
          />
          <button 
            onClick={() => alert('Funcionalidade de novo projeto não disponível em JSON estático')}
            className="flex items-center bg-[#0A4338] hover:bg-[#062E29] text-white px-4 py-2 rounded-lg transition-colors w-full md:w-auto justify-center"
          >
            <FiPlus className="mr-2" />
            Novo Projeto
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedProject === project.id}
              onToggle={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
              onDelete={() => alert('Funcionalidade de exclusão não disponível em JSON estático')}
            />
          ))
        ) : (
          <div className="bg-[#09212D] rounded-lg p-12 text-center border border-[#0A4338]/30">
            <FiSearch className="mx-auto text-4xl text-gray-400 mb-5" />
            <h3 className="text-xl font-semibold mb-2">Nenhum projeto encontrado</h3>
            <p className="text-gray-400">
              {searchTerm ? 'Nenhum projeto corresponde à sua busca' : 'Você ainda não tem projetos criados'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}