'use client';
import { useState } from 'react';
import { FiX, FiCalendar, FiUser } from 'react-icons/fi';
import type { Project, CreateProjectStage, CreateProject } from '@/app/lib/types/project';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
}

export default function ProjectModal({ isOpen, onClose, onProjectCreated }: ProjectModalProps) {
  const initialStage: CreateProjectStage = {
    name: '',
    status: 'not-started',
    deadline: new Date().toISOString().split('T')[0],
    responsible: '',
    description: ''
  };

  const [formData, setFormData] = useState<CreateProject>({
    name: '',
    description: '',
    stages: [{ ...initialStage, id: 'temp-0' }],
    members: 1,
    color: '#0A4338'
  });

  const [currentStage, setCurrentStage] = useState<CreateProjectStage>(initialStage);

  const handleAddStage = () => {
    const newId = `temp-${formData.stages.length}`;
    setFormData((prev: CreateProject) => ({
      ...prev,
      stages: [...prev.stages, { ...currentStage, id: newId }]
    }));
    setCurrentStage(initialStage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProject: Project = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stages: formData.stages.map((stage: CreateProjectStage & { id: string }, index: number) => ({
        ...stage,
        id: `${Date.now()}-${index}`
      }))
    };

    try {
      // Em um sistema real, aqui você faria a chamada para salvar no backend
      // Como estamos usando JSON estático, apenas simulamos o comportamento
      console.log('Projeto a ser criado:', newProject);
      alert(
        `Funcionalidade de criação desativada com armazenamento em JSON.\n\nDados do projeto:\n${JSON.stringify(newProject, null, 2)}`
      );

      onProjectCreated(newProject);
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      stages: [{ ...initialStage, id: 'temp-0' }],
      members: 1,
      color: '#0A4338'
    });
    setCurrentStage(initialStage);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl border border-[#0A4338]/30 bg-[#09212D]">
        <div className="flex items-center justify-between border-[#0A4338]/30 border-b p-5">
          <h3 className="font-semibold text-white text-xl">Novo Projeto</h3>
          <button
            type="button"
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="text-gray-400 transition-colors hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto">
          <div className="space-y-6 p-5">
            <div>
              <label className="mb-2 block text-gray-300" htmlFor="projectName">
                Nome do Projeto*
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-[#0A4338]/30 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#0A4338]/50"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-300" htmlFor="projectDescription">
                Descrição
              </label>
              <textarea
                className="min-h-[100px] w-full rounded-lg border border-[#0A4338]/30 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#0A4338]/50"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-300" htmlFor="projectColor">
                Cor do Projeto
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  className="h-12 w-12 cursor-pointer"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
                <span className="ml-3">{formData.color}</span>
              </div>
            </div>

            <div className="border-[#0A4338]/30 border-t pt-4">
              <h4 className="mb-4 font-medium text-lg text-white">Etapas do Projeto</h4>

              {formData.stages.length > 0 && (
                <div className="mb-6 space-y-4">
                  {formData.stages.map((stage) => (
                    <div key={stage.id} className="rounded-lg bg-gray-800/50 p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{stage.name || 'Nova Etapa'}</span>
                        <span className="text-gray-400 text-sm">{new Date(stage.deadline).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-lg border border-[#0A4338]/50 border-dashed bg-gray-800/30 p-4">
                <h5 className="mb-3 font-medium text-sm text-white">Adicionar Etapa</h5>

                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-gray-300 text-sm" htmlFor="stepName">
                      Nome da Etapa*
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full rounded border border-[#0A4338]/30 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0A4338]"
                      value={currentStage.name}
                      onChange={(e) => setCurrentStage({ ...currentStage, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-gray-300 text-sm" htmlFor="dueDate">
                      Prazo*
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute top-2.5 left-3 text-gray-400" />
                      <input
                        type="date"
                        required
                        className="w-full rounded border border-[#0A4338]/30 bg-gray-800 px-3 py-2 pl-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0A4338]"
                        value={currentStage.deadline}
                        onChange={(e) => setCurrentStage({ ...currentStage, deadline: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-1 block text-gray-300 text-sm" htmlFor="responsible">
                    Responsável*
                  </label>
                  <div className="relative">
                    <FiUser className="absolute top-2.5 left-3 text-gray-400" />
                    <input
                      type="text"
                      required
                      className="w-full rounded border border-[#0A4338]/30 bg-gray-800 px-3 py-2 pl-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0A4338]"
                      value={currentStage.responsible}
                      onChange={(e) => setCurrentStage({ ...currentStage, responsible: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddStage}
                  className="w-full rounded bg-[#0A4338]/50 py-2 text-sm text-white transition-colors hover:bg-[#0A4338]"
                >
                  Adicionar Etapa
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-[#0A4338]/30 border-t p-5">
            <button
              type="button"
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="rounded-lg border border-gray-600 px-5 py-2.5 text-white transition-colors hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#0A4338] px-5 py-2.5 font-medium text-white transition-colors hover:bg-[#062E29]"
              disabled={formData.stages.length === 0}
            >
              Criar Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
