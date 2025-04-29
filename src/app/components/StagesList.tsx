import { FiUser, FiCalendar } from 'react-icons/fi';
import type { ProjectStage } from '@/app/lib/types/project';

export default function StagesList({ stages }: { stages: ProjectStage[] }) {
  return (
    <div className="rounded-xl border border-[#0A4338]/30 bg-[#09212D] p-6">
      <h2 className="mb-4 font-semibold text-white text-xl">Etapas</h2>
      <div className="space-y-4">
        {stages.map((stage) => (
          <div key={stage.id} className="rounded-lg bg-gray-800/50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium">{stage.name}</h3>
              <span
                className={`rounded px-2 py-1 text-xs ${
                  stage.status === 'completed'
                    ? 'bg-green-900 text-green-300'
                    : stage.status === 'in-progress'
                      ? 'bg-yellow-900 text-yellow-300'
                      : 'bg-gray-700 text-gray-400'
                }`}
              >
                {stage.status === 'completed' ? 'Concluído' : stage.status === 'in-progress' ? 'Em andamento' : 'Pendente'}
              </span>
            </div>
            <div className="flex justify-between text-gray-400 text-sm">
              <div className="flex items-center">
                <FiUser className="mr-1" />
                <span>{stage.responsible}</span>
              </div>
              <div>
                <FiCalendar className="mr-1 inline" />
                <span>{new Date(stage.deadline).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
            {stage.description && <p className="mt-2 text-gray-300 text-sm">{stage.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
