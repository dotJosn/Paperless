'use client';
interface FileInfoProps {
  fileName: string;
  progress?: number;
  isUploading?: boolean;
}

export default function FileInfo({ fileName, progress, isUploading }: FileInfoProps) {
  return (
    <div className="mb-4 rounded-md border border-gray-200 bg-white p-3">
      <p className="font-medium text-gray-700 text-sm">
        Arquivo selecionado: <span className="text-blue-600">{fileName}</span>
      </p>
      {isUploading && progress !== undefined && (
        <div className="mt-2">
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-gray-500 text-xs">{progress}% concluído</p>
        </div>
      )}
    </div>
  );
}
