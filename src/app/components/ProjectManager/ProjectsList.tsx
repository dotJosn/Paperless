import { FiSearch } from 'react-icons/fi';
import ProjectCard from '@/app/components/ProjectCard';
import type { Project } from '@/app/lib/types/project';

interface ProjectsListProps {
  projects: Project[];
  expandedProject: string | null;
  searchTerm: string;
  onToggleProject: (projectId: string) => void;
  onDeleteProject: () => void;
}

export default function ProjectsList({
  projects,
  expandedProject,
  searchTerm,
  onToggleProject,
  onDeleteProject
}: ProjectsListProps) {
  return (
    <div className="space-y-6">
      {projects.length > 0 ? (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isExpanded={expandedProject === project.id}
            onToggle={() => onToggleProject(project.id)}
            onDelete={onDeleteProject}
          />
        ))
      ) : (
        <div className="rounded-lg border border-[#0A4338]/30 bg-[#09212D] p-12 text-center">
          <FiSearch className="mx-auto mb-5 text-4xl text-gray-400" />
          <h3 className="mb-2 font-semibold text-xl">Nenhum projeto encontrado</h3>
          <p className="text-gray-400">
            {searchTerm ? 'Nenhum projeto corresponde à sua busca' : 'Você ainda não tem projetos criados'}
          </p>
        </div>
      )}
    </div>
  );
}
