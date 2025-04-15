"use client";
interface FileInfoProps {
  fileName: string;
  progress?: number;
  isUploading?: boolean;
}

export default function FileInfo({ fileName, progress, isUploading }: FileInfoProps) {
  return (
    <div className="mb-4 p-3 bg-white rounded-md border border-gray-200">
      <p className="text-sm font-medium text-gray-700">
        Arquivo selecionado: <span className="text-blue-600">{fileName}</span>
      </p>
      {isUploading && progress !== undefined && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{progress}% concluído</p>
        </div>
      )}
    </div>
  );
}