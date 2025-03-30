'use client';
import { Project } from '@/app/lib/types/project';
import { FiChevronDown, FiChevronUp, FiTrash2 } from 'react-icons/fi';
import StageItem from '@/app/components/StageItem';

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: (projectId: string) => void;
}

export default function ProjectCard({ project, isExpanded, onToggle, onDelete }: ProjectCardProps) {
  const progress = Math.round(
    (project.stages.filter(s => s.status === 'completed').length / project.stages.length) * 100
  );

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Tem certeza que deseja excluir o projeto "${project.name}"?`)) {
      onDelete(project.id);
    }
  };

  return (
    <div className="bg-[#09212D] rounded-lg overflow-hidden border border-[#0A4338]/30">
      <div 
        className="p-4 cursor-pointer flex justify-between items-center hover:bg-[#0A4338]/20 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-3 ${project.color}`}></div>
          <div>
            <h2 className="font-bold text-lg">{project.name}</h2>
            <p className="text-sm text-gray-400">{project.description}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-32 bg-gray-700 rounded-full h-2 mr-4">
            <div 
              className={`h-2 rounded-full ${project.color}`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium mr-3">{progress}%</span>
          <button 
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 p-1 mr-2 transition-colors"
            title="Excluir projeto"
          >
            <FiTrash2 />
          </button>
          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-[#0A4338]/30 p-4">
          <div className="grid grid-cols-5 gap-2 mb-2 px-4 text-sm text-gray-400">
            <div>Status</div>
            <div className="col-span-2">Etapa</div>
            <div>Responsável</div>
            <div>Prazo</div>
          </div>
          
          {project.stages.map((stage) => (
            <StageItem key={stage.id} stage={stage} />
          ))}

          <div className="flex justify-end mt-4 space-x-3">
            <button className="px-3 py-1 text-sm border border-[#0A4338] text-white bg-[#0A4338]/50 hover:bg-[#0A4338] rounded transition-colors">
              Adicionar Etapa
            </button>
            <button className="px-3 py-1 text-sm border border-gray-600 text-white hover:bg-gray-700 rounded transition-colors">
              Editar Projeto
            </button>
          </div>
        </div>
      )}
    </div>
  );
}