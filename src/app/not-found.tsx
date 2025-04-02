export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Paperless</h1>
        <h2 className="text-4xl font-bold mb-4">404 - Página Não Encontrada</h2>
        <p className="text-xl mb-6">
          A página que você está procurando não existe ou foi movida.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-[#062E29] text-white rounded-lg hover:bg-gray-500 transition-colors"
        >
          Voltar para a página inicial
        </a>
      </div>
    );
  }