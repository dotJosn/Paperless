'use client';
import { useState, useEffect } from 'react';

export default function HTMLPreviewer() {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const togglePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    } else if (htmlContent) {
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-6 font-bold text-3xl text-white">Paperless HTML Previewer</h1>

        <label
          className={`mb-4 block border-2 ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          } cursor-pointer rounded-md border-dashed p-8 text-center transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="image"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <p className="text-gray-600 text-sm">
              <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-gray-500 text-xs">HTML files only</p>

            <input type="file" accept=".html,text/html" onChange={handleFileInput} className="hidden" />
          </div>
        </label>

        {fileName && (
          <div className="mb-4 rounded-md border border-gray-200 bg-white p-3">
            <p className="font-medium text-gray-700 text-sm">
              Selected file: <span className="text-blue-600">{fileName}</span>
            </p>
          </div>
        )}

        {htmlContent && (
          <div className="mb-4 flex items-center justify-center gap-10">
            <button
              type="button"
              onClick={togglePreview}
              className="mb-4 cursor-pointer rounded-md bg-green-500 px-6 py-3 font-medium text-white transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {previewUrl ? 'Esconder Preview' : 'Mostrar Preview'}
            </button>

            <button
              type="button"
              className="mb-4 cursor-pointer rounded-md bg-green-500 px-6 py-3 font-medium text-white transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Enviar
            </button>
          </div>
        )}

        {previewUrl && (
          <div className="mt-6 overflow-hidden rounded-lg border bg-white shadow-lg">
            <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
              <h3 className="font-medium text-gray-700">HTML Preview</h3>
              <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                Open in new tab
              </a>
            </div>
            <iframe title="HTML Preview" src={previewUrl} className="h-96 w-full" sandbox="allow-scripts" />
          </div>
        )}
      </div>
    </div>
  );
}
