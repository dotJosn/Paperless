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
      <FiSearch className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-[#09212D] text-white border border-[#0A4338]/30 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A4338]/50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}