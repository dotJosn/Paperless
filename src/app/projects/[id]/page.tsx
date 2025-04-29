import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import projectsData from '@/app/lib/storage/projects.json';
import type { Project } from '@/app/lib/types/project';
import ActionsPanel from '@/app/components/ActionsPanel';
import StagesList from '@/app/components/StagesList';
import ProjectStats from '@/app/components/ProjectStats';
import { EditButton } from '@/app/components/EditButton';

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id
  }));
}

async function getProject(id: string): Promise<Project | undefined> {
  return projectsData.find((p) => p.id === id) as Project | undefined;
}

export default async function ProjectDetails({
  params
}: {
  params: { id: string };
}) {
  const project = await getProject(params.id);

  if (!project) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6 text-white">Projeto não encontrado</div>;
  }

  const progress = Math.round((project.stages.filter((s) => s.status === 'completed').length / project.stages.length) * 100);

  return (
    <main className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="mb-6 flex items-center text-white transition-colors hover:text-gray-300">
          <FiArrowLeft className="mr-2" /> Voltar para projetos
        </Link>

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="mb-2 font-bold text-2xl text-white md:text-3xl">{project.name}</h1>
            <p className="text-gray-300">{project.description}</p>
          </div>
          <EditButton />
        </div>

        <ProjectStats progress={progress} members={project.members} />

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <StagesList stages={project.stages} />
          <ActionsPanel />
        </div>
      </div>
    </main>
  );
}
