'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  FiArrowLeft,
  FiUsers,
  FiBarChart2,
  FiEdit2,
  FiDownload,
  FiUserPlus,
  FiPrinter,
  FiUser,
  FiCalendar,
  FiLoader
} from 'react-icons/fi';
import Link from 'next/link';
import type { Project } from '@/app/lib/types/project';
import projectsData from '@/app/lib/storage/projects.json';

export default function ProjectDetails() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundProject = projectsData.find((p) => p.id === projectId) as Project | undefined;
      setProject(foundProject || null);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6 text-white">
        <FiLoader className="mr-2 animate-spin text-2xl" />
        Carregando projeto...
      </div>
    );
  }

  if (!project) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6 text-white">Projeto não encontrado</div>;
  }

  const progress = Math.round((project.stages.filter((s) => s.status === 'completed').length / project.stages.length) * 100);

  return (
    <main className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="mb-6 flex items-center text-white transition-colors hover:text-gray-300">
          <FiArrowLeft className="mr-2" /> Voltar para projetos
        </Link>

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="mb-2 font-bold text-2xl text-white md:text-3xl">{project.name}</h1>
            <p className="text-gray-300">{project.description}</p>
          </div>
          <button
            className="flex items-center text-white transition-colors hover:text-gray-300"
            onClick={() => alert('Edição não disponível em JSON estático')}
          >
            <FiEdit2 className="mr-1" /> Editar
          </button>
        </div>

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
                <p className="font-bold text-white text-xl">{project.members}</p>
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

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-[#0A4338]/30 bg-[#09212D] p-6">
            <h2 className="mb-4 font-semibold text-white text-xl">Etapas</h2>
            <div className="space-y-4">
              {project.stages.map((stage) => (
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

          <div className="rounded-xl border border-[#0A4338]/30 bg-[#09212D] p-6">
            <h2 className="mb-4 font-semibold text-white text-xl">Ações</h2>
            <div className="grid grid-cols-1 gap-4">
              <button
                className="flex items-center justify-center rounded-lg bg-[#0A4338] px-4 py-3 text-white transition-colors hover:bg-[#062E29]"
                onClick={() => alert('Funcionalidade não disponível em JSON estático')}
              >
                <FiDownload className="mr-2" />
                Adicionar Documento
              </button>
              <button
                className="flex items-center justify-center rounded-lg bg-[#0A4338] px-4 py-3 text-white transition-colors hover:bg-[#062E29]"
                onClick={() => alert('Funcionalidade não disponível em JSON estático')}
              >
                <FiUserPlus className="mr-2" />
                Gerenciar Membros
              </button>
              <button
                className="flex items-center justify-center rounded-lg bg-[#0A4338] px-4 py-3 text-white transition-colors hover:bg-[#062E29]"
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
