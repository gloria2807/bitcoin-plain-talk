'use client';

import Link from 'next/link';
import { useState } from 'react';
import Logo from '@/components/Logo';

const EXAMPLE_QUESTIONS = [
  'Eleza UTXO kwa Kiswahili, kwa maneno rahisi.',
  'Toa mfano halisi wa mempool.',
  'Elezea seed phrase kwa mlinganisho unaoeleweka.',
];

interface Comparison {
  base: string;
  tuned: string;
}

export default function AiDemoPage() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<Comparison | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ask = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/ai-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }
      setResult(data);
    } catch {
      setError('Could not reach the demo model. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--brand-sand)' }}>
      <header
        className="border-b backdrop-blur-sm"
        style={{ background: 'rgba(252,247,239,0.88)', borderColor: '#e8d9c8' }}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/"><Logo /></Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/glossary"
                className="hover-rust text-sm font-semibold transition-colors"
                style={{ color: 'var(--brand-ink)', fontFamily: 'var(--font-manrope)' }}
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
              <Link
                href="/ai-demo"
                className="text-sm font-bold"
                style={{ color: 'var(--brand-rust)', fontFamily: 'var(--font-manrope)' }}
              >
                AI Demo
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1
          className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          style={{ color: 'var(--brand-ink)', fontFamily: 'var(--font-sora)' }}
        >
          Swahili AI demo
        </h1>
        <p
          className="mt-4 max-w-2xl text-lg"
          style={{ color: '#5a3e2b', fontFamily: 'var(--font-manrope)' }}
        >
          Ask a Bitcoin question in Swahili. We&apos;ll show the answer from a
          plain, untrained Qwen3 model side by side with the same model
          fine-tuned on our glossary — a real before/after of the training,
          not just a formatting difference.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {EXAMPLE_QUESTIONS.map((example) => (
            <button
              key={example}
              onClick={() => {
                setQuestion(example);
                ask(example);
              }}
              disabled={loading}
              className="rounded-full border px-3 py-1.5 text-sm transition-colors hover-rust disabled:opacity-50"
              style={{ borderColor: 'var(--brand-terracotta)', color: 'var(--brand-ink)', fontFamily: 'var(--font-manrope)' }}
            >
              {example}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(question);
          }}
          className="mt-4 flex gap-3"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Andika swali lako kuhusu Bitcoin..."
            className="flex-1 rounded-lg border px-4 py-3 text-base outline-none"
            style={{ borderColor: '#e8d9c8', background: 'var(--brand-shell)', color: 'var(--brand-ink)', fontFamily: 'var(--font-manrope)' }}
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="rounded-lg px-6 py-3 text-sm font-bold text-white transition-opacity disabled:opacity-50"
            style={{ background: 'var(--brand-rust)', fontFamily: 'var(--font-manrope)' }}
          >
            {loading ? 'Inafikiri...' : 'Uliza'}
          </button>
        </form>

        {error && (
          <p className="mt-6 text-sm font-semibold" style={{ color: 'var(--brand-crimson)', fontFamily: 'var(--font-manrope)' }}>
            {error}
          </p>
        )}

        {loading && (
          <p className="mt-6 text-sm" style={{ color: '#5a3e2b', fontFamily: 'var(--font-manrope)' }}>
            The demo model runs on a free CPU tier and may take up to a minute,
            especially on the first request while it wakes up.
          </p>
        )}

        {result && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border p-5" style={{ borderColor: '#e8d9c8', background: 'var(--brand-shell)' }}>
              <h2
                className="mb-3 text-sm font-bold uppercase tracking-wide"
                style={{ color: '#5a3e2b', fontFamily: 'var(--font-manrope)' }}
              >
                Base Qwen3 (no training)
              </h2>
              <p style={{ color: 'var(--brand-ink)', fontFamily: 'var(--font-manrope)', whiteSpace: 'pre-wrap' }}>
                {result.base || '—'}
              </p>
            </div>
            <div
              className="rounded-xl border-2 p-5"
              style={{ borderColor: 'var(--brand-rust)', background: 'var(--brand-shell)' }}
            >
              <h2
                className="mb-3 text-sm font-bold uppercase tracking-wide"
                style={{ color: 'var(--brand-rust)', fontFamily: 'var(--font-manrope)' }}
              >
                Fine-tuned on Bitcoin Plain Talk
              </h2>
              <p style={{ color: 'var(--brand-ink)', fontFamily: 'var(--font-manrope)', whiteSpace: 'pre-wrap' }}>
                {result.tuned || '—'}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
