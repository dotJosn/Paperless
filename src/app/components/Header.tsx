'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setOpenSubmenu(null);
    }
  };

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <header className={`bg-[#062E29] text-white shadow-lg ${pathname === '/sign-in'? 'hidden' : ''}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-white">Paperless</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`hover:text-gray-400 transition-colors duration-300 ${pathname === '/' ? 'underline font-bold' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/sobre" 
              className={`hover:text-gray-400 transition-colors duration-300 ${pathname === '/sobre' ? 'underline font-bold' : ''}`}
            >
              Sobre Nós
            </Link>
            <Link 
              href="/projetos" 
              className={`hover:text-gray-400 transition-colors duration-300 ${pathname === '/projetos' ? 'underline font-bold' : ''}`}
            >
              Projetos
            </Link>
            <Link 
              href="/contato" 
              className={`hover:text-gray-400 transition-colors duration-300 ${pathname === '/contato' ? 'underline font-bold' : ''}`}
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
              className="md:hidden text-white focus:outline-none transition-transform duration-300"
              onClick={toggleMobileMenu}
              aria-label="Menu mobile"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden bg-[#09212D] overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-2">
          <Link 
            href="/" 
            className="block py-3 hover:text-[#0A4338] border-b border-[#0A4338] transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link 
            href="/sobre" 
            className="block py-3 hover:text-[#0A4338] border-b border-[#0A4338] transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            Sobre Nós
          </Link>
          
          <Link 
            href="/projetos" 
            className="block py-3 hover:text-[#0A4338] border-b border-[#0A4338] transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            Projetos
          </Link>
          <Link 
            href="/contato" 
            className="block py-3 hover:text-[#0A4338] transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            Contato
          </Link>
          
          {/* <button className="w-full mt-4 mb-2 bg-[#0A4338] hover:bg-[#09212D] text-white px-4 py-2 rounded-md transition-colors duration-300">
            Fale Conosco
          </button> */}
        </div>
      </div>
    </header>
  );
}