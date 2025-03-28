"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface ThemeComProps {
  children: ReactNode;
}

export default function ThemeCom({ children }: ThemeComProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log("Mounted:", mounted);
    console.log("Theme:", theme);
  }, [mounted, theme]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={theme}>
      <div className='min-h-screen bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-200'>
        {children}
      </div>
    </div>
  );
}