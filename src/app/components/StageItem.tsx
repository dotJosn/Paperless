'use client';
import { ProjectStage } from '@/app/lib/types/project';
import { FiCheck, FiClock, FiUsers } from 'react-icons/fi';

interface StageItemProps {
  stage: ProjectStage;
}

export default function StageItem({ stage }: StageItemProps) {
  return (
    <div className="grid grid-cols-5 gap-2 items-center p-3 hover:bg-[#0A4338]/10 rounded-lg transition-colors">
      <div>
        {stage.status === 'completed' ? (
          <span className="inline-flex items-center text-green-500">
            <FiCheck className="mr-1" /> Concluído
          </span>
        ) : stage.status === 'in-progress' ? (
          <span className="inline-flex items-center text-yellow-500">
            <FiClock className="mr-1" /> Em andamento
          </span>
        ) : (
          <span className="inline-flex items-center text-gray-400">
            <FiClock className="mr-1" /> Pendente
          </span>
        )}
      </div>
      <div className="col-span-2 font-medium">{stage.name}</div>
      <div className="flex items-center">
        <FiUsers className="mr-2 text-gray-400" />
        {stage.responsible}
      </div>
      <div className="text-gray-400">
        {new Date(stage.deadline).toLocaleDateString('pt-BR')}
      </div>
    </div>
  );
}