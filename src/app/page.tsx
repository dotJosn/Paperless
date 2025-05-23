
import Link from "next/link";
import { dataProjects } from "@/data/projects";
import Image from "next/image";

export default function ProjectsListPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className='mb-6 font-bold text-2xl'>Projetos de Usinagem</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {dataProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className='rounded-lg border border-gray-800 bg-gray-100 transition-shadow hover:shadow-lg'
          >
            {/* Project Cover Sheet */}
            <div className="p-0 font-sans text-black">
              {/* Nova linha apenas para o Logo */}
              <div className='flex justify-center border-gray-800 border-b p-2'>
                <img
                  src="/img/CompanyLogo.jpg"
                  alt="Company Logo"
                  className="h-16 object-contain"
                />
              </div>

              {/* Header Row (original, sem a célula do logo) */}
              <div className='flex border-gray-800 border-b'>
                {/* Machine Cell (agora ocupa 1/3) */}
                <div className='w-1/3 border-gray-800 border-r p-1'>
                  <div className="text-center">
                    <p className='font-bold text-xs'>Máquina:</p>
                    <p className='font-bold text-blue-600 text-xl'>F2000</p>
                  </div>
                </div>
                
                {/* Date Cell (agora ocupa 2/3) */}
                <div className='flex w-2/3 items-center justify-center p-1'>
                  <p className='font-bold text-sm'>
                    Data: {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              {/* Second Row */}
              <div className='flex border-gray-800 border-b'>
                {/* Program Folder */}
                <div className='w-2/4 border-gray-800 border-r p-1 text-center'>
                  <p className='font-bold text-xs'>Pasta dos Programas:</p>
                  <p className='truncate px-1 font-bold text-red-600 text-sm'>
                    {project.details.header.programFolder}
                  </p>
                </div>
                
                {/* Material */}
                <div className="w-2/4 p-1 text-center">
                  <p className='font-bold text-red-600 text-sm'>Material:</p>
                  <p className='font-bold text-sm'>{project.material}</p>
                </div>
              </div>
              
              {/* Third Row */}
              <div className='flex border-gray-800 border-b'>
                {/* Programmer */}
                <div className='w-1/3 border-gray-800 border-r p-1 text-center'>
                  <p className='font-bold text-xs'>Programador:</p>
                  <p className="text-sm">{project.programmer}</p>
                </div>
                
                {/* Clamping */}
                <div className='w-1/3 border-gray-800 border-r p-1 text-center'>
                  <p className='font-bold text-green-600 text-sm'>1º APERTO</p>
                </div>
                
                {/* Project Time */}
                <div className="w-1/3 p-1 text-center">
                  <p className='font-bold text-xs'>Tempo Projeto:</p>
                  <p className='font-bold text-red-600 text-sm'>
                    {project.summary.totalTime}
                  </p>
                </div>
              </div>
              
              {/* Image Placeholder */}
              <div className='relative h-48 border-gray-800 border-b bg-white'>
                <Image
                  src={project.preview}
                  alt={project.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
              </div>
              
              {/* Reference Points */}
              <div className='flex border-gray-800 border-b'>
                <div className='w-1/2 border-gray-800 border-r p-1 text-center'>
                  <p className='font-bold text-xs'>CENTRO DO BLOCO: X0,0 Y0,0</p>
                </div>
                <div className="w-1/2 p-1 text-center">
                  <p className='font-bold text-xs'>REF. EM Z: Z0,0</p>
                </div>
              </div>
              
              {/* Observation */}
              <div className="p-2 text-center">
                <p className='font-bold text-xs'>Observação:</p>
                <p className='font-bold text-red-600 text-sm'>
                  {project.details.operations[0]?.comentario || "Nenhuma observação"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}