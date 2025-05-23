import type React from "react";
import { ProcessHeader } from "./ProcessHeader";
import { ProcessTable } from "./ProcessTable";

interface ProcessSheetProps {
  headerData: {
    material: string;
    printedDate: string;
    programFolder: string;
    projectFolder: string;
    programmer: string;
    projectTime: string;
  };
  steps: ProcessStep[];
}

export const ProcessSheet: React.FC<ProcessSheetProps> = ({ headerData, steps }) => {
  return (
    <div className='mx-auto my-4 w-full max-w-6xl overflow-hidden rounded-md border border-gray-800'>
      <h1 className='py-2 text-center font-bold text-black'>
        FOLHA DE PROCESSOS
      </h1>
      
      <ProcessHeader {...headerData} />
      <ProcessTable steps={steps} />
    </div>
  );
};