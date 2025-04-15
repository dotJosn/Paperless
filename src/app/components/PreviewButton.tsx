"use client";
interface PreviewButtonProps {
  onClick: () => void;
}

export default function PreviewButton({ onClick }: PreviewButtonProps) {
  return (
    <button
      onClick={onClick}
      className="mb-4 px-6 py-3 bg-[#062E29] text-white rounded-md
               hover:bg-green-600 transition-colors font-medium
               focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      Show Preview
    </button>
  );
}