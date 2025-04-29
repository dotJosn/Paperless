'use client';
import { FiEdit2 } from 'react-icons/fi';

export const EditButton = () => (
  <button
    type="button"
    className="flex items-center text-white transition-colors hover:text-gray-300"
    onClick={() => alert('Edição não disponível em JSON estático')}
  >
    <FiEdit2 className="mr-1" /> Editar
  </button>
);
