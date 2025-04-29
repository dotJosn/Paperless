'use client';
import type { Project } from '@/app/lib/types/project';
import { FiChevronDown, FiChevronUp, FiTrash2 } from 'react-icons/fi';
import StageItem from '@/app/components/StageItem';

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: (projectId: string) => void;
}

export default function ProjectCard({ project, isExpanded, onToggle, onDelete }: ProjectCardProps) {
  const progress = Math.round((project.stages.filter((s) => s.status === 'completed').length / project.stages.length) * 100);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Tem certeza que deseja excluir o projeto "${project.name}"?`)) {
      onDelete(project.id);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-[#0A4338]/30 bg-[#09212D]">
      <div
        className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-[#0A4338]/20"
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      >
        <div className="flex items-center">
          <div className={`mr-3 h-3 w-3 rounded-full ${project.color}`} />
          <div>
            <h2 className="font-bold text-lg">{project.name}</h2>
            <p className="text-gray-400 text-sm">{project.description}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-4 h-2 w-32 rounded-full bg-gray-700">
            <div className={`h-2 rounded-full ${project.color}`} style={{ width: `${progress}%` }} />
          </div>
          <span className="mr-3 font-medium text-sm">{progress}%</span>
          <button
            type="button"
            onClick={handleDelete}
            className="mr-2 p-1 text-gray-400 transition-colors hover:text-red-500"
            title="Excluir projeto"
          >
            <FiTrash2 />
          </button>
          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </div>

      {isExpanded && (
        <div className="border-[#0A4338]/30 border-t p-4">
          <div className="mb-2 grid grid-cols-5 gap-2 px-4 text-gray-400 text-sm">
            <div>Status</div>
            <div className="col-span-2">Etapa</div>
            <div>Responsável</div>
            <div>Prazo</div>
          </div>

          {project.stages.map((stage) => (
            <StageItem key={stage.id} stage={stage} />
          ))}

          <div className="mt-4 flex justify-end space-x-3">
            <button
              className="rounded border border-[#0A4338] bg-[#0A4338]/50 px-3 py-1 text-sm text-white transition-colors hover:bg-[#0A4338]"
              type="button"
            >
              Adicionar Etapa
            </button>
            <button
              className="rounded border border-gray-600 px-3 py-1 text-sm text-white transition-colors hover:bg-gray-700"
              type="button"
            >
              Editar Projeto
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
