'use client';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Buscar...' }: SearchBarProps) {
  return (
    <div className="relative w-full md:w-96">
      <FiSearch className="absolute top-3 left-3 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#0A4338]/30 bg-[#09212D] py-2 pr-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-[#0A4338]/50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
