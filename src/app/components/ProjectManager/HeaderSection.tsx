import { FiPlus } from 'react-icons/fi';
import SearchBar from '../SearchBar';

interface HeaderSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewProject: () => void;
}

export default function HeaderSection({
  searchTerm,
  onSearchChange,
  onNewProject
}: HeaderSectionProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Gerenciador de Projetos</h1>
      <p className="text-gray-400">Monitore e gerencie todas as etapas dos seus projetos</p>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Buscar projetos..."
        />
        <button 
          onClick={onNewProject}
          className="flex items-center bg-[#0A4338] hover:bg-[#062E29] text-white px-4 py-2 rounded-lg transition-colors w-full md:w-auto justify-center"
        >
          <FiPlus className="mr-2" />
          Novo Projeto
        </button>
      </div>
    </div>
  );
}