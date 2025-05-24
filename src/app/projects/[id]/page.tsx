import { notFound } from 'next/navigation';
import { dataProjects } from '@/data/projects';
import { ProcessHeader } from '@/app/components/ProcessHeader';
import { ProcessTable } from '@/app/components/ProcessTable';

interface PageProps {
  params: { id: string };
}

export default async function ProjectPage(context: { params: { id: string } }) {
  const { params } = context;
  const { id } = await Promise.resolve(params); // work-around
  
  const project = dataProjects.find(p => p.id === id);

  if (!project) {
    return notFound();
  }

  // Prepara os dados para o cabeçalho
  const headerData = {
    material: project.material,
    printedDate: project.details.header.printedDate,
    programFolder: project.details.header.programFolder,
    projectFolder: project.details.header.projectFolder,
    programmer: project.programmer,
    projectTime: project.summary.totalTime,
  };

  // Mapeia as operações para o formato esperado pela tabela
  const steps = project.details.operations.map(operation => ({
    id: operation.id,
    type: operation.tipoPercurso,
    reference: operation.referencia,
    comment: operation.comentario,
    diameter: Number.parseFloat(operation.diametro.replace(",", ".")),
    rc: operation.rc ? Number.parseFloat(operation.rc) : undefined,
    rib: Number.parseFloat(operation.rib),
    height: Number.parseFloat(operation.altura),
    zMin: Number.parseFloat(operation.zMin),
    lat2D: operation.sobreEspessura.lat2D ? Number.parseFloat(operation.sobreEspessura.lat2D.replace(",", ".")) : undefined,
    lat: operation.sobreEspessura.lat ? Number.parseFloat(operation.sobreEspessura.lat.replace(",", ".")) : undefined,
    vert: operation.sobreEspessura.vert ? Number.parseFloat(operation.sobreEspessura.vert.replace(",", ".")) : undefined,
    stepLat: operation.passo.lat ? Number.parseFloat(operation.passo.lat.replace(",", ".")) : undefined,
    stepVert: operation.passo.vert ? Number.parseFloat(operation.passo.vert.replace(",", ".")) : undefined,
    tolerance: Number.parseFloat(operation.tolerancia.replace(",", ".")),
    rotation: Number.parseFloat(operation.rotacao),
    advance: Number.parseFloat(operation.avanço),
    angle: operation.plano,
    workPlane: operation.planoTrabalho,
    cutTime: operation.tempo.corte,
    totalTime: operation.tempo.total,
    cutter: operation.ferramenta,
    support: operation.suporte,
    postProcessor: "POS FIDIA G17 - 3 EIXOS.pmoptz"
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <ProcessHeader {...headerData} />
      <ProcessTable steps={steps} />
    </div>
  );
}