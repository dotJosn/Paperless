import { FiLoader } from 'react-icons/fi';

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <FiLoader className="animate-spin text-2xl mr-2" />
      Carregando projetos...
    </main>
  );
}