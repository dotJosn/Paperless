'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setOpenSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setOpenSubmenu(null);
    }
  };

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  if (pathname === '/sign-in') {
    return;
  }

  return (
    <header className="bg-[#062E29] text-white shadow-lh">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-2xl">
              <span className="text-white">Paperless</span>
            </Link>
          </div>

          <nav className="hidden space-x-8 md:flex">
            <Link
              href="/"
              className={`transition-colors duration-300 hover:text-gray-400 ${pathname === '/' ? 'font-bold underline' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/sobre"
              className={`transition-colors duration-300 hover:text-gray-400 ${pathname === '/sobre' ? 'font-bold underline' : ''}`}
            >
              Sobre o Paperless
            </Link>
            <Link
              href="/contato"
              className={`transition-colors duration-300 hover:text-gray-400 ${pathname === '/contato' ? 'font-bold underline' : ''}`}
            >
              Contato
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>

            <button
              className="text-white transition-transform duration-300 focus:outline-none md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Menu mobile"
              type="button"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        className={`overflow-hidden bg-[#09212D] transition-all duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 py-2">
          <Link
            href="/"
            className="block border-[#0A4338] border-b py-3 transition-colors duration-300 hover:text-gray-400"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            href="/sobre"
            className="block py-3 transition-colors duration-300 hover:text-gray-400"
            onClick={toggleMobileMenu}
          >
            Sobre o Paperless
          </Link>
          <Link
            href="/contato"
            className="block py-3 transition-colors duration-300 hover:text-gray-400"
            onClick={toggleMobileMenu}
          >
            Contato
          </Link>
        </div>
      </div>
    </header>
  );
}