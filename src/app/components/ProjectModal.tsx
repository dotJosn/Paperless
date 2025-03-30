'use client';
import { useState } from 'react';
import { FiX, FiCalendar, FiUser } from 'react-icons/fi';
import { Project, CreateProjectStage, CreateProject } from '@/app/lib/types/project';

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
      alert('Funcionalidade de criação desativada com armazenamento em JSON.\n\nDados do projeto:\n' + 
            JSON.stringify(newProject, null, 2));
      
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-[#09212D] rounded-xl w-full max-w-2xl border border-[#0A4338]/30">
        <div className="flex justify-between items-center p-5 border-b border-[#0A4338]/30">
          <h3 className="text-xl font-semibold text-white">Novo Projeto</h3>
          <button 
            onClick={() => { onClose(); resetForm(); }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto">
          <div className="p-5 space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Nome do Projeto*</label>
              <input
                type="text"
                required
                className="w-full bg-gray-800 text-white border border-[#0A4338]/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A4338]/50"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Descrição</label>
              <textarea
                className="w-full bg-gray-800 text-white border border-[#0A4338]/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A4338]/50 min-h-[100px]"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Cor do Projeto</label>
              <div className="flex items-center">
                <input
                  type="color"
                  className="w-12 h-12 cursor-pointer"
                  value={formData.color}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                />
                <span className="ml-3">{formData.color}</span>
              </div>
            </div>

            <div className="border-t border-[#0A4338]/30 pt-4">
              <h4 className="text-lg font-medium text-white mb-4">Etapas do Projeto</h4>
              
              {formData.stages.length > 0 && (
                <div className="mb-6 space-y-4">
                  {formData.stages.map((stage, index) => (
                    <div key={index} className="bg-gray-800/50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{stage.name || "Nova Etapa"}</span>
                        <span className="text-sm text-gray-400">
                          {new Date(stage.deadline).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-gray-800/30 p-4 rounded-lg border border-dashed border-[#0A4338]/50">
                <h5 className="text-sm font-medium text-white mb-3">Adicionar Etapa</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Nome da Etapa*</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-gray-800 text-white border border-[#0A4338]/30 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0A4338] text-sm"
                      value={currentStage.name}
                      onChange={(e) => setCurrentStage({...currentStage, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Prazo*</label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="date"
                        required
                        className="w-full bg-gray-800 text-white border border-[#0A4338]/30 rounded px-3 pl-10 py-2 focus:outline-none focus:ring-1 focus:ring-[#0A4338] text-sm"
                        value={currentStage.deadline}
                        onChange={(e) => setCurrentStage({...currentStage, deadline: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-300 text-sm mb-1">Responsável*</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      required
                      className="w-full bg-gray-800 text-white border border-[#0A4338]/30 rounded px-3 pl-10 py-2 focus:outline-none focus:ring-1 focus:ring-[#0A4338] text-sm"
                      value={currentStage.responsible}
                      onChange={(e) => setCurrentStage({...currentStage, responsible: e.target.value})}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddStage}
                  className="w-full py-2 bg-[#0A4338]/50 hover:bg-[#0A4338] text-white rounded transition-colors text-sm"
                >
                  Adicionar Etapa
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end p-5 border-t border-[#0A4338]/30 gap-3">
            <button
              type="button"
              onClick={() => { onClose(); resetForm(); }}
              className="px-5 py-2.5 border border-gray-600 text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0A4338] hover:bg-[#062E29] text-white rounded-lg transition-colors font-medium"
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