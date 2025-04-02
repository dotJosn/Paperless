"use client";
import { useState, useEffect } from 'react';

export default function HTMLPreviewer() {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFile(e.target.files?.[0]);
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
    processFile(e.dataTransfer.files?.[0]);
  };

  const processFile = (file: File | undefined) => {
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setHtmlContent(event.target?.result as string);
      };
      
      reader.readAsText(file);
    }
  };

  const handlePreview = () => {
    if (htmlContent) {
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 text-white">Paperless HTML Previewer</h1>
        
        <label 
          className={`block mb-4 border-2 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} border-dashed rounded-md p-8 text-center transition-colors cursor-pointer`}
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

        {fileName && (
          <div className="mb-4 p-3 bg-white rounded-md border border-gray-200">
            <p className="text-sm font-medium text-gray-700">
              Selected file: <span className="text-blue-600">{fileName}</span>
            </p>
          </div>
        )}

        {htmlContent && (
          <button
            onClick={handlePreview}
            className="mb-4 px-6 py-3 bg-[#062E29] text-white rounded-md
                     hover:bg-green-600 transition-colors font-medium
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Show Preview
          </button>
        )}

        {previewUrl && (
          <div className="mt-6 border rounded-lg overflow-hidden shadow-lg bg-white">
            <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
              <h3 className="font-medium text-gray-700">HTML Preview</h3>
              <a 
                href={previewUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Open in new tab
              </a>
            </div>
            <iframe
              title="HTML Preview"
              src={previewUrl}
              className="w-full h-96"
              sandbox="allow-scripts"
            />
          </div>
        )}
      </div>
    </div>
  );
}