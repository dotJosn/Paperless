import { FiLoader } from 'react-icons/fi';

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 p-6 text-white">
      <FiLoader className="mr-2 animate-spin text-2xl" />
      Carregando projetos...
    </main>
  );
}
