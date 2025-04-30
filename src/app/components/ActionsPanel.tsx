'use client';
import { FiDownload, FiUserPlus, FiPrinter } from 'react-icons/fi';

export default function ActionsPanel() {
  const handleAction = () => alert('Funcionalidade não disponível em JSON estático');

  return (
    <div className="rounded-xl border border-[#0A4338]/30 bg-[#09212D] p-6">
      <h2 className="mb-4 font-semibold text-white text-xl">Ações</h2>
      <div className="grid grid-cols-1 gap-4">
        <button
          type="button"
          className="flex items-center justify-center rounded-lg bg-[#0A4338] px-4 py-3 text-white transition-colors hover:bg-[#062E29]"
          onClick={handleAction}
        >
          <FiDownload className="mr-2" />
          Adicionar Documento
        </button>
        <button
          type="button"
          className="flex items-center justify-center rounded-lg bg-[#0A4338] px-4 py-3 text-white transition-colors hover:bg-[#062E29]"
          onClick={handleAction}
        >
          <FiUserPlus className="mr-2" />
          Gerenciar Membros
        </button>
        <button
          type="button"
          className="flex items-center justify-center rounded-lg bg-[#0A4338] px-4 py-3 text-white transition-colors hover:bg-[#062E29]"
          onClick={handleAction}
        >
          <FiPrinter className="mr-2" />
          Gerar Relatório
        </button>
      </div>
    </div>
  );
}
