'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
}

export default function SearchBar({ variant = 'hero' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/glossary?search=${encodeURIComponent(query.trim())}`);
    }
  };

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSearch} className="w-full max-w-2xl">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Bitcoin terms... (e.g., mempool, UTXO, hashrate)"
            className="w-full rounded-full border-2 px-6 py-4 pr-28 text-base placeholder:text-gray-400 focus:outline-none"
            style={{
              borderColor: '#e8d9c8',
              background: 'var(--brand-shell)',
              color: 'var(--brand-ink)',
              fontFamily: 'var(--font-manrope)',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-orange)')}
            onBlur={e => (e.currentTarget.style.borderColor = '#e8d9c8')}
          />
          <button
            type="submit"
            className="hover-rust-bg absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6 py-2 text-sm font-bold text-white transition-colors"
            style={{ background: 'var(--brand-orange)', fontFamily: 'var(--font-manrope)' }}
          >
            Search
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search terms..."
        className="w-full rounded-full border-2 border-orange-200 bg-white px-6 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
      />
    </form>
  );
}
