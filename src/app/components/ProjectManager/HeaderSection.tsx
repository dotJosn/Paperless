import { FiPlus } from 'react-icons/fi';
import SearchBar from '../SearchBar';

interface HeaderSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewProject: () => void;
}

export default function HeaderSection({ searchTerm, onSearchChange, onNewProject }: HeaderSectionProps) {
  return (
    <div className="mb-8">
      <h1 className="mb-2 font-bold text-3xl">Gerenciador de Projetos</h1>
      <p className="text-gray-400">Monitore e gerencie todas as etapas dos seus projetos</p>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <SearchBar value={searchTerm} onChange={onSearchChange} placeholder="Buscar projetos..." />
        <button
          type="button"
          onClick={onNewProject}
          className="flex w-full items-center justify-center rounded-lg bg-[#0A4338] px-4 py-2 text-white transition-colors hover:bg-[#062E29] md:w-auto"
        >
          <FiPlus className="mr-2" />
          Novo Projeto
        </button>
      </div>
    </div>
  );
}
