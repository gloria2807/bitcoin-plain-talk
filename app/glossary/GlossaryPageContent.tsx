'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Term } from '@/lib/glossary';
import LanguageSelector from '@/components/LanguageSelector';
import Logo from '@/components/Logo';

export default function GlossaryPageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const currentLang = searchParams.get('lang') || 'en';

  const [allTerms, setAllTerms] = useState<Term[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<Term[]>([]);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/terms?lang=${currentLang}&limit=500`);
        const data = await response.json();
        const terms: Term[] = Array.isArray(data) ? data : (data.items ?? []);
        setAllTerms(terms);

        if (!searchQuery.trim()) {
          setFilteredTerms(terms);
        } else {
          const lowerQuery = searchQuery.toLowerCase();
          const filtered = terms.filter((term: Term) =>
            term.title.toLowerCase().includes(lowerQuery) ||
            term.plainEnglish.toLowerCase().includes(lowerQuery) ||
            term.category.toLowerCase().includes(lowerQuery)
          );
          setFilteredTerms(filtered);
        }
      } catch (error) {
        console.error('Failed to fetch terms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, [currentLang, searchQuery]);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const filterTerms = (query: string) => {
    if (!query.trim()) {
      setFilteredTerms(allTerms);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = allTerms.filter((term: Term) =>
      term.title.toLowerCase().includes(lowerQuery) ||
      term.plainEnglish.toLowerCase().includes(lowerQuery) ||
      term.category.toLowerCase().includes(lowerQuery)
    );
    setFilteredTerms(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    filterTerms(value);
  };

  const terms = filteredTerms;

  const termsByCategory = terms.reduce((acc, term) => {
    if (!acc[term.category]) acc[term.category] = [];
    acc[term.category].push(term);
    return acc;
  }, {} as Record<string, typeof terms>);

  const categories = Object.keys(termsByCategory).sort();

  return (
    <div className="min-h-screen" style={{ background: 'var(--brand-sand)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-10 border-b backdrop-blur-sm"
        style={{ background: 'rgba(252,247,239,0.92)', borderColor: '#e8d9c8' }}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Logo />
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/glossary"
                className="text-sm font-bold"
                style={{ color: 'var(--brand-rust)', fontFamily: 'var(--font-manrope)' }}
              >
                Glossary
              </Link>
              <Link
                href="/contribute"
                className="hover-rust text-sm font-semibold transition-colors"
                style={{ color: 'var(--brand-ink)', fontFamily: 'var(--font-manrope)' }}
              >
                Contribute
              </Link>
              <LanguageSelector />
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <p
            className="mb-3 text-xs font-bold tracking-widest uppercase"
            style={{ color: 'var(--brand-teal)', fontFamily: 'var(--font-manrope)' }}
          >
            Reference
          </p>
          <h2
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{ color: 'var(--brand-ink)', fontFamily: 'var(--font-sora)' }}
          >
            Bitcoin Glossary
          </h2>
          <p
            className="mt-4 text-lg"
            style={{ color: '#5a3e2b', fontFamily: 'var(--font-manrope)' }}
          >
            {terms.length} terms explained in plain language
          </p>

          {/* Search */}
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-2xl">
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Search terms..."
                className="w-full rounded-full border-2 px-6 py-3 text-base focus:outline-none"
                style={{
                  borderColor: '#e8d9c8',
                  background: 'var(--brand-shell)',
                  color: 'var(--brand-ink)',
                  fontFamily: 'var(--font-manrope)',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = 'var(--brand-orange)';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = '#e8d9c8';
                }}
              />
            </div>
          </div>

          {searchInput && (
            <p className="mt-4 text-sm" style={{ color: '#5a3e2b', fontFamily: 'var(--font-manrope)' }}>
              {terms.length > 0
                ? `Found ${terms.length} term${terms.length === 1 ? '' : 's'} matching "${searchInput}"`
                : `No terms found matching "${searchInput}"`}
            </p>
          )}
        </div>

        {/* Terms Grid by Category */}
        <div className="space-y-16">
          {categories.map(category => (
            <div key={category}>
              <h3
                className="mb-6 text-2xl font-bold"
                style={{ color: 'var(--brand-rust)', fontFamily: 'var(--font-sora)' }}
              >
                {category}
                <span
                  className="ml-3 text-sm font-normal"
                  style={{ color: '#5a3e2b', fontFamily: 'var(--font-manrope)' }}
                >
                  ({termsByCategory[category].length})
                </span>
              </h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {termsByCategory[category].map(term => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="card-link group rounded-2xl p-6"
                    style={{ background: 'var(--brand-shell)' }}
                  >
                    <div className="flex items-start justify-between">
                      <h4
                        className="text-xl font-bold"
                        style={{ color: 'var(--brand-ink)', fontFamily: 'var(--font-sora)' }}
                      >
                        {term.title}
                      </h4>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                        style={{ background: '#FFE8C0', color: 'var(--brand-rust)' }}
                      >
                        {currentLang.toUpperCase()}
                      </span>
                    </div>
                    <p
                      className="mt-3 line-clamp-2 text-sm leading-relaxed"
                      style={{ color: '#5a3e2b', fontFamily: 'var(--font-manrope)' }}
                    >
                      {term.plainEnglish}
                    </p>
                    <div
                      className="mt-4 flex items-center text-sm font-semibold"
                      style={{ color: 'var(--brand-rust)', fontFamily: 'var(--font-manrope)' }}
                    >
                      Read more →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg" style={{ color: '#5a3e2b', fontFamily: 'var(--font-manrope)' }}>
              Loading terms...
            </p>
          </div>
        )}

        {!loading && terms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg" style={{ color: '#5a3e2b', fontFamily: 'var(--font-manrope)' }}>
              No terms found
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t py-12" style={{ borderColor: '#2a1e16', background: 'var(--brand-ink)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <img src="/logo-full-lockup-reversed.svg" alt="Bitcoin Plain Talk" style={{ height: 28 }} />
            <p className="text-sm" style={{ color: '#b8a090', fontFamily: 'var(--font-manrope)' }}>
              Built by{' '}
              <a
                href="https://twitter.com/wandiology"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold"
                style={{ color: 'var(--brand-orange)' }}
              >
                @wandiology
              </a>{' '}
              · MIT License — Free to use, share, and build on
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
