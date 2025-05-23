
import Link from "next/link";
import { dataProjects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className='mb-6 font-bold text-2xl'>Projetos de Usinagem</h1>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {dataProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className='rounded-lg border p-4 transition-shadow hover:shadow-md'
          >
            <h2 className='font-semibold text-xl'>{project.name}</h2>
            <div className="mt-2 text-sm">
              <p><span className="font-medium">Material:</span> {project.material}</p>
              <p><span className="font-medium">Programador:</span> {project.programmer}</p>
              <p><span className="font-medium">Operações:</span> {project.summary.totalOperations}</p>
              <p><span className="font-medium">Tempo Total:</span> {project.summary.totalTime}</p>
              <p><span className="font-medium">Criado em:</span> {project.createdAt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}