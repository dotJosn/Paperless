import React from "react";

interface ProcessStep {
  id: string;
  type: string;
  reference: string;
  comment: string;
  diameter: number;
  rc?: number;
  rib?: number;
  height?: number;
  zMin: number;
  lat2D?: number;
  lat?: number;
  vert?: number;
  stepLat?: number;
  stepVert?: number;
  tolerance: number;
  rotation: number;
  advance: number;
  angle: string;
  workPlane: string;
  cutTime: string;
  totalTime: string;
  measurement?: string;
  rubric?: string;
  cutter: string;
  support: string;
  postProcessor?: string;
}

interface ProcessTableProps {
  steps: ProcessStep[];
}

export const ProcessTable: React.FC<ProcessTableProps> = ({ steps }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-800 text-xs">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-700 p-1" rowSpan={2}>Programa</th>
            <th className="border border-gray-700 p-1" rowSpan={2}>Tipo Percurso</th>
            <th className="border border-gray-700 p-1" rowSpan={2}>Ref.</th>
            <th className="border border-gray-700 p-1" rowSpan={2}>Comentário</th>
            <th className="border border-gray-700 p-1" colSpan={5}>Ferramenta</th>
            <th className="border border-gray-700 p-1" rowSpan={2}>Z min</th>
            <th className="border border-gray-700 p-1" colSpan={3}>Sob. Esp.</th>
            <th className="border border-gray-700 p-1" colSpan={2}>Passo</th>
            <th className="border border-gray-700 p-1" rowSpan={2}>Tol.</th>
            <th className="border border-gray-700 p-1" rowSpan={2}>Rot.</th>
            <th className="border border-gray-700 p-1" rowSpan={2}>Av.</th>
            <th className="border border-gray-700 p-1" rowSpan={2}>Ângulo</th>
            <th className="border border-gray-700 p-1" rowSpan={2}>Plano Trab.</th>
            <th className="border border-gray-700 p-1" colSpan={2}>Tempo</th>
            <th className="border border-gray-700 p-1" rowSpan={2}>Medição</th>
            <th className="border border-gray-700 p-1" rowSpan={2}>Rúbrica</th>
          </tr>
          <tr className="bg-gray-700 text-white">
            <th className="border border-gray-600 p-1">Ø</th>
            <th className="border border-gray-600 p-1">RC</th>
            <th className="border border-gray-600 p-1">Rib.</th>
            <th className="border border-gray-600 p-1" colSpan={2}>Alt.</th>
            <th className="border border-gray-600 p-1">Lat.2D</th>
            <th className="border border-gray-600 p-1">Lat.</th>
            <th className="border border-gray-600 p-1">Vert.</th>
            <th className="border border-gray-600 p-1">Lat.</th>
            <th className="border border-gray-600 p-1">Vert.</th>
            <th className="border border-gray-600 p-1">Corte</th>
            <th className="border border-gray-600 p-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((step) => (
            <React.Fragment key={step.id}>
              <tr className="hover:bg-gray-100">
                <td className='border border-gray-300 p-1 text-center font-bold'>{step.id}</td>
                <td className="border border-gray-300 p-1 text-center">{step.type}</td>
                <td className='border border-gray-300 p-1 text-center font-bold text-red-600'>{step.reference}</td>
                <td className="border border-gray-300 p-1 text-blue-600 italic">{step.comment}</td>
                <td className='border border-gray-300 p-1 text-center font-bold text-orange-700'>{step.diameter}</td>
                <td className='border border-gray-300 p-1 text-center font-bold text-orange-700'>{step.rc || '-'}</td>
                <td className='border border-gray-300 p-1 text-center font-bold'>{step.rib || '-'}</td>
                <td className="border border-gray-300 p-1 text-center" colSpan={2}>{step.height || '-'}</td>
                <td className="border border-gray-300 p-1 text-center">{step.zMin}</td>
                <td className="border border-gray-300 p-1 text-center">{step.lat2D || '-'}</td>
                <td className="border border-gray-300 p-1 text-center">{step.lat || '-'}</td>
                <td className="border border-gray-300 p-1 text-center">{step.vert || '-'}</td>
                <td className="border border-gray-300 p-1 text-center">{step.stepLat || '-'}</td>
                <td className="border border-gray-300 p-1 text-center">{step.stepVert || '-'}</td>
                <td className="border border-gray-300 p-1 text-center">{step.tolerance}</td>
                <td className="border border-gray-300 p-1 text-center">{step.rotation}</td>
                <td className="border border-gray-300 p-1 text-center">{step.advance}</td>
                <td className="border border-gray-300 p-1 text-center">{step.angle}</td>
                <td className="border border-gray-300 p-1 text-center">{step.workPlane}</td>
                <td className="border border-gray-300 p-1 text-center">{step.cutTime}</td>
                <td className="border border-gray-300 p-1 text-center">{step.totalTime}</td>
                <td className="border border-gray-300 p-1 text-center">{step.measurement || '-'}</td>
                <td className="border border-gray-300 p-1 text-center">{step.rubric || '-'}</td>
              </tr>
              {step.postProcessor && (
                <tr>
                  <td className="border border-gray-300 p-0 text-red-500 text-xs" colSpan={24}>
                    {step.postProcessor}
                  </td>
                </tr>
              )}
              <tr>
                <th className="border border-gray-300 p-1 text-left" colSpan={1}>Fresa:</th>
                <td className="border border-gray-300 p-1 text-green-700" colSpan={5}>{step.cutter}</td>
                <th className="border border-gray-300 p-1 text-left" colSpan={1}>Sup.:</th>
                <td className="border border-gray-300 p-1 text-green-700" colSpan={16}>{step.support}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};