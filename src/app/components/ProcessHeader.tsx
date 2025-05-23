import Image from "next/image";
import type React from "react";

interface ProcessHeaderProps {
  material: string;
  printedDate: string;
  programFolder: string;
  projectFolder: string;
  programmer: string;
  projectTime: string;
}

export const ProcessHeader: React.FC<ProcessHeaderProps> = ({
  material,
  printedDate,
  programFolder,
  projectFolder,
  programmer,
  projectTime,
}) => {
  return (
    <div className='w-full border-gray-800 border-b'>
      {/* First Row - Logo, Material, Mold Image */}
      <div className='flex h-24 items-center justify-between border-gray-800 border-b p-2'>
        {/* Logo Container */}
        <div className='relative h-full w-1/4'>
          <Image
            src="/img/CompanyLogo.jpg"
            alt="Company Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Material Info */}
        <div className="text-center">
          <span className="font-bold text-red-600">Material: </span>
          <span className="font-bold">{material}</span>
        </div>

        {/* Mold Image Container */}
        <div className='relative h-full w-1/4'>
          <Image
            src="/img/capa.png"
            alt="Mold preview"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Second Row - Printed Date */}
      <div className='flex border-gray-800 border-b p-2'>
        <div className="flex items-center">
          <span className='mr-2 font-bold'>Impresso:</span>
          <span className='mr-1 font-bold'>Data:</span>
          <span>{printedDate}</span>
        </div>
      </div>

      {/* Folders Row */}
      <div className='border-gray-800 border-b p-2'>
        <div className="mb-1">
          <span className="font-bold">Pasta dos Programas:</span>
          <span className='ml-1 text-blue-600 underline'>{programFolder}</span>
        </div>
        <div>
          <span className="font-bold">Pasta do Projeto Powermill:</span>
          <span className="ml-1">{projectFolder}</span>
        </div>
      </div>

      {/* Footer Row - Programmer and Project Time */}
      <div className="flex justify-between p-2">
        <div>
          <span className="font-bold">Programador:</span>
          <span className="ml-1">{programmer}</span>
        </div>
        <div>
          <span className="font-bold">Tempo Projeto:</span>
          <span className='ml-1 font-bold text-red-600'>{projectTime}</span>
        </div>
      </div>
    </div>
  );
};