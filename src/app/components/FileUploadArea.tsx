"use client";
import { useState } from 'react';

interface FileUploadAreaProps {
  onFileProcessed: (file: File | undefined) => void;
  uploadProgress: number;
  isUploading: boolean;
}

export default function FileUploadArea({ 
  onFileProcessed, 
  uploadProgress, 
  isUploading 
}: FileUploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileProcessed(e.target.files?.[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    onFileProcessed(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="space-y-2">
      <label 
        className={`block border-2 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} ${isUploading ? 'opacity-50 pointer-events-none' : ''} border-dashed rounded-md p-8 text-center transition-colors cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <svg 
            className="w-12 h-12 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-blue-600">Clique para selecionar</span> ou arraste
          </p>
          <p className="text-xs text-gray-400">HTML files only</p>
          
          <input
            type="file"
            accept=".html,text/html"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      </label>

      {isUploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}