export default function NotFound() {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <h1 className='mb-4 font-bold text-4xl'>Paperless</h1>
        <h2 className='mb-4 font-bold text-4xl'>404 - Página Não Encontrada</h2>
        <p className='mb-6 text-xl'>
          A página que você está procurando não existe ou foi movida.
        </p>
        <a
          href="/"
          className='rounded-lg bg-[#062E29] px-6 py-3 text-white transition-colors hover:bg-gray-500'
        >
          Voltar para a página inicial
        </a>
      </div>
    );
  }
