"use client";
import { useState, useEffect } from 'react';
import FileUploadArea from './FileUploadArea';
import FileInfo from './FileInfo';
import PreviewButton from './PreviewButton';
import PreviewFrame from './PreviewFrame';

export default function HTMLPreviewer() {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const processFile = (file: File | undefined) => {
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      setFileName(file.name);

      const reader = new FileReader();
      
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      };
      
      reader.onloadstart = () => {
        setIsUploading(true);
        setUploadProgress(0);
      };
      
      reader.onload = (event) => {
        setHtmlContent(event.target?.result as string);
        setUploadProgress(100);
        setTimeout(() => setIsUploading(false), 500); // Pequeno delay para visualização
      };
      
      reader.onerror = () => {
        setIsUploading(false);
        setUploadProgress(0);
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
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Paperless HTML Previewer</h1>
      
      <FileUploadArea 
        onFileProcessed={processFile} 
        uploadProgress={uploadProgress}
        isUploading={isUploading}
      />
      
      {fileName && (
        <FileInfo 
          fileName={fileName} 
          progress={uploadProgress} 
          isUploading={isUploading} 
        />
      )}
      
      {htmlContent && !isUploading && <PreviewButton onClick={handlePreview} />}
      
      {previewUrl && <PreviewFrame previewUrl={previewUrl} />}
    </div>
  );
}