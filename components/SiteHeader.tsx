'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from '@/components/Logo';
import LanguageSelectorWrapper from '@/components/LanguageSelectorWrapper';

const NAV_LINKS = [
  { href: '/glossary', label: 'Glossary' },
  { href: '/contribute', label: 'Contribute' },
];

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export default function SiteHeader({ sticky = false }: { sticky?: boolean }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkStyle = (href: string) => {
    const isActive = pathname === href || pathname?.startsWith(`${href}/`);
    return {
      className: isActive
        ? 'text-sm font-bold'
        : 'hover-rust text-sm font-semibold transition-colors',
      style: {
        color: isActive ? 'var(--brand-rust)' : 'var(--brand-ink)',
        fontFamily: 'var(--font-manrope)',
      },
    };
  };

  return (
    <header
      className={`${sticky ? 'sticky top-0 z-10 ' : ''}border-b backdrop-blur-sm`}
      style={{ background: 'rgba(252,247,239,0.92)', borderColor: '#e8d9c8' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Logo animated />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map(({ href, label }) => {
              const link = navLinkStyle(href);
              return (
                <Link key={href} href={href} className={link.className} style={link.style}>
                  {label}
                </Link>
              );
            })}
            <LanguageSelectorWrapper />
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center justify-center rounded-lg border p-2 md:hidden"
            style={{ borderColor: '#e8d9c8', color: 'var(--brand-ink)' }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mt-4 flex flex-col gap-4 border-t pt-4 md:hidden" style={{ borderColor: '#e8d9c8' }}>
            {NAV_LINKS.map(({ href, label }) => {
              const link = navLinkStyle(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={link.className.replace('text-sm', 'text-base')}
                  style={link.style}
                >
                  {label}
                </Link>
              );
            })}
            <LanguageSelectorWrapper />
          </nav>
        )}
      </div>
    </header>
  );
}
