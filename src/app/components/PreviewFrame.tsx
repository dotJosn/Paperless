'use client';
interface PreviewFrameProps {
  previewUrl: string;
}

export default function PreviewFrame({ previewUrl }: PreviewFrameProps) {
  return (
    <div className="mt-6 overflow-hidden rounded-lg border bg-white shadow-lg">
      <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
        <h3 className="font-medium text-gray-700">HTML Preview</h3>
        <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
          Open in new tab
        </a>
      </div>
      <iframe title="HTML Preview" src={previewUrl} className="h-96 w-full" sandbox="allow-scripts" />
    </div>
  );
}
