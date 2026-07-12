'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Term } from '@/lib/glossary';
import LanguageSelector from '@/components/LanguageSelector';

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
        const response = await fetch(`/api/terms?lang=${currentLang}&limit=1000`);
        if (!response.ok) {
          throw new Error('Failed to fetch terms');
        }
        const data = await response.json();
        const terms = data.items || [];
        setAllTerms(terms);

        // Apply initial filtering if there's a search query
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

  // Group terms by category
  const termsByCategory = terms.reduce((acc, term) => {
    if (!acc[term.category]) {
      acc[term.category] = [];
    }
    acc[term.category].push(term);
    return acc;
  }, {} as Record<string, typeof terms>);

  const categories = Object.keys(termsByCategory).sort();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-orange-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🧡</span>
              <h1 className="text-xl font-bold text-gray-900">Bitcoin Plain Talk</h1>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/glossary" className="text-sm font-medium text-orange-600">
                Glossary
              </Link>
              <Link href="/chat" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
                Chat
              </Link>
              <Link href="/contribute" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
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
          <h2 className="text-4xl font-bold tracking-tight text-orange-500 sm:text-5xl">
            Bitcoin Glossary
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            {terms.length} terms explained in plain language
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-2xl">
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Search terms..."
                className="w-full rounded-full border-2 border-orange-200 bg-white px-6 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
              />
            </div>
          </div>

          {/* Search Results Info */}
          {searchInput && (
            <p className="mt-4 text-center text-sm text-gray-600">
              {terms.length > 0
                ? `Found ${terms.length} term${terms.length === 1 ? '' : 's'} matching "${searchInput}"`
                : `No terms found matching "${searchInput}"`
              }
            </p>
          )}
        </div>

        {/* Terms Grid by Category */}
        <div className="space-y-16">
          {categories.map(category => (
            <div key={category}>
              <h3 className="mb-6 text-2xl font-bold text-orange-500">
                {category}
                <span className="ml-3 text-sm font-normal text-gray-600">
                  ({termsByCategory[category].length})
                </span>
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {termsByCategory[category].map(term => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="group rounded-2xl border border-orange-200 bg-white p-6 transition-all hover:border-orange-400 hover:shadow-lg hover:shadow-orange-100"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600">
                        {term.title}
                      </h4>
                      <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">
                        EN
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-700">
                      {term.plainEnglish}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-orange-600 group-hover:text-orange-700">
                      Read more →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg text-gray-600">Loading terms...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && terms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg text-gray-600">No terms found</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-orange-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600">
              Built with 🧡 by{' '}
              <a
                href="https://twitter.com/wandiology"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-orange-600 hover:text-orange-700"
              >
                @wandiology
              </a>
            </p>
            <p className="text-sm text-gray-600">
              MIT License — Free to use, share, and build on
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
