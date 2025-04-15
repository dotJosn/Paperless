"use client";
interface PreviewFrameProps {
  previewUrl: string;
}

export default function PreviewFrame({ previewUrl }: PreviewFrameProps) {
  return (
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
  );
}