'use client';
interface PreviewButtonProps {
  onClick: () => void;
}

export default function PreviewButton({ onClick }: PreviewButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 rounded-md bg-[#062E29] px-6 py-3 font-medium text-white transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      Show Preview
    </button>
  );
}
