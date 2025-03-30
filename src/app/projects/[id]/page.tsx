'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FiArrowLeft, FiUsers, FiBarChart2, FiEdit2, FiDownload, FiUserPlus, FiPrinter, FiUser, FiCalendar, FiLoader } from 'react-icons/fi';
import Link from 'next/link';
import { Project } from '@/app/lib/types/project';
import projectsData from '@/app/lib/storage/projects.json';

export default function ProjectDetails() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundProject = projectsData.find(p => p.id === projectId) as Project | undefined;
      setProject(foundProject || null);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
        <FiLoader className="animate-spin text-2xl mr-2" />
        Carregando projeto...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
        Projeto não encontrado
      </div>
    );
  }

  const progress = Math.round(
    (project.stages.filter(s => s.status === 'completed').length / project.stages.length) * 100
  );

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center text-white hover:text-gray-300 mb-6 transition-colors">
          <FiArrowLeft className="mr-2" /> Voltar para projetos
        </Link>

        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.name}</h1>
            <p className="text-gray-300">{project.description}</p>
          </div>
          <button 
            className="flex items-center text-white hover:text-gray-300 transition-colors"
            onClick={() => alert('Edição não disponível em JSON estático')}
          >
            <FiEdit2 className="mr-1" /> Editar
          </button>
        </div>

        <div className="bg-[#09212D] rounded-xl p-6 mb-8 border border-[#0A4338]/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center">
              <FiBarChart2 className="text-2xl text-white mr-3" />
              <div>
                <p className="text-gray-400">Progresso</p>
                <p className="text-xl font-bold text-white">{progress}%</p>
              </div>
            </div>
            <div className="flex items-center">
              <FiUsers className="text-2xl text-white mr-3" />
              <div>
                <p className="text-gray-400">Membros</p>
                <p className="text-xl font-bold text-white">{project.members}</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1 text-gray-300">
              <span>Progresso do Projeto</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-[#0A4338]" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#09212D] rounded-xl p-6 border border-[#0A4338]/30">
            <h2 className="text-xl font-semibold text-white mb-4">Etapas</h2>
            <div className="space-y-4">
              {project.stages.map((stage) => (
                <div key={stage.id} className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{stage.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      stage.status === 'completed' ? 'bg-green-900 text-green-300' :
                      stage.status === 'in-progress' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-gray-700 text-gray-400'
                    }`}>
                      {stage.status === 'completed' ? 'Concluído' :
                       stage.status === 'in-progress' ? 'Em andamento' : 'Pendente'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <FiUser className="mr-1" />
                      <span>{stage.responsible}</span>
                    </div>
                    <div>
                      <FiCalendar className="inline mr-1" />
                      <span>{new Date(stage.deadline).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  {stage.description && (
                    <p className="mt-2 text-gray-300 text-sm">{stage.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#09212D] rounded-xl p-6 border border-[#0A4338]/30">
            <h2 className="text-xl font-semibold text-white mb-4">Ações</h2>
            <div className="grid grid-cols-1 gap-4">
              <button 
                className="flex items-center justify-center bg-[#0A4338] hover:bg-[#062E29] text-white py-3 px-4 rounded-lg transition-colors"
                onClick={() => alert('Funcionalidade não disponível em JSON estático')}
              >
                <FiDownload className="mr-2" />
                Adicionar Documento
              </button>
              <button 
                className="flex items-center justify-center bg-[#0A4338] hover:bg-[#062E29] text-white py-3 px-4 rounded-lg transition-colors"
                onClick={() => alert('Funcionalidade não disponível em JSON estático')}
              >
                <FiUserPlus className="mr-2" />
                Gerenciar Membros
              </button>
              <button 
                className="flex items-center justify-center bg-[#0A4338] hover:bg-[#062E29] text-white py-3 px-4 rounded-lg transition-colors"
                onClick={() => alert('Funcionalidade não disponível em JSON estático')}
              >
                <FiPrinter className="mr-2" />
                Gerar Relatório
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}