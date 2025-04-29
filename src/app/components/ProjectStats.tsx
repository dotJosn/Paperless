import { FiBarChart2, FiUsers } from 'react-icons/fi';

export default function ProjectStats({
  progress,
  members
}: {
  progress: number;
  members: number;
}) {
  return (
    <div className="mb-8 rounded-xl border border-[#0A4338]/30 bg-[#09212D] p-6">
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex items-center">
          <FiBarChart2 className="mr-3 text-2xl text-white" />
          <div>
            <p className="text-gray-400">Progresso</p>
            <p className="font-bold text-white text-xl">{progress}%</p>
          </div>
        </div>
        <div className="flex items-center">
          <FiUsers className="mr-3 text-2xl text-white" />
          <div>
            <p className="text-gray-400">Membros</p>
            <p className="font-bold text-white text-xl">{members}</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-1 flex justify-between text-gray-300 text-sm">
          <span>Progresso do Projeto</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-800">
          <div className="h-2 rounded-full bg-[#0A4338]" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
