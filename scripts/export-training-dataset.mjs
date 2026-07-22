/**
 * Bitcoin Plain Talk — training dataset export
 *
 * Walks glossary/<lang>/*.md and emits instruction/output pairs (JSONL) for
 * instruction-tuning a model in that language. Four variants per term:
 * direct explanation, analogy-only, example-only, and a combined
 * "explain like I'm new to Bitcoin" long-form answer.
 *
 * Usage:
 *   node scripts/export-training-dataset.mjs                # sw, default
 *   node scripts/export-training-dataset.mjs --lang sw
 *   node scripts/export-training-dataset.mjs --lang sw --out datasets/custom.jsonl
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GLOSSARY_DIR = path.join(__dirname, '..', 'glossary');
const SITE_BASE_URL = 'https://bitcoin-plain-talk.vercel.app';

// Section headers as actually written to disk per language.
// Must match glossary/_template.md + lib/glossary.ts + scripts/generate-glossary.mjs.
const LANG_HEADERS = {
  sw: {
    plainEnglish: '## Maelezo Rahisi',
    analogy: '## Mfano wa Kila Siku',
    context: '## Jinsi Inavyotumiwa',
    contextMeaningPrefix: /^\*\*Maana yake:\*\*\s*/,
    whyItMatters: '## Kwa Nini Ni Muhimu',
    relatedTerms: '## Maneno Yanayohusiana',
  },
  en: {
    plainEnglish: '## Plain English',
    analogy: '## Analogy',
    context: '## In Context',
    contextMeaningPrefix: /^\*\*What this means:\*\*\s*/,
    whyItMatters: '## Why It Matters',
    relatedTerms: '## Related Terms',
  },
  pcm: {
    plainEnglish: '## Plain English',
    analogy: '## Analogy',
    context: '## In Context',
    contextMeaningPrefix: /^\*\*What this means:\*\*\s*/,
    whyItMatters: '## Why It Matters',
    relatedTerms: '## Related Terms',
  },
  yo: {
    plainEnglish: '## Plain English',
    analogy: '## Analogy',
    context: '## In Context',
    contextMeaningPrefix: /^\*\*What this means:\*\*\s*/,
    whyItMatters: '## Why It Matters',
    relatedTerms: '## Related Terms',
  },
  ki: {
    plainEnglish: '## Na njira huthu',
    analogy: '## Analogy',
    context: '## In Context',
    contextMeaningPrefix: /^\*\*What this means:\*\*\s*/,
    whyItMatters: '## Why It Matters',
    relatedTerms: '## Related Terms',
  },
};

// Instruction phrasing per language. Falls back to English phrasing for
// languages that don't have a dedicated set yet.
const INSTRUCTION_TEMPLATES = {
  sw: {
    direct: (term) => `Eleza ${term} kwa Kiswahili, kwa maneno rahisi.`,
    analogy: (term) => `Elezea ${term} kwa mlinganisho unaoeleweka.`,
    example: (term) => `Toa mfano halisi wa ${term}.`,
    combined: (term) => `Nieleze kuhusu ${term} kwa undani, kama unavyomweleza mtu ambaye ni mgeni kabisa kwenye Bitcoin.`,
  },
  en: {
    direct: (term) => `Explain ${term} in plain English.`,
    analogy: (term) => `Explain ${term} using an easy-to-understand analogy.`,
    example: (term) => `Give a real-world example of ${term}.`,
    combined: (term) => `Explain ${term} in detail, as if to someone completely new to Bitcoin.`,
  },
};

function parseTerm(lang, slug, content) {
  const headers = LANG_HEADERS[lang] ?? LANG_HEADERS.en;
  const lines = content.split('\n');

  const title = lines[0]?.replace(/^#\s*/, '').trim() || slug;

  const sectionBody = (headerLine) => {
    const start = lines.findIndex((l) => l.trim() === headerLine);
    return start >= 0 ? (lines[start + 2]?.trim() || '') : '';
  };

  const plainEnglish = sectionBody(headers.plainEnglish);
  const analogy = sectionBody(headers.analogy);
  const whyItMatters = sectionBody(headers.whyItMatters);

  const contextStart = lines.findIndex((l) => l.trim() === headers.context);
  const inContext = contextStart >= 0
    ? (lines[contextStart + 2]?.replace(/^\*"|"\*$/g, '').trim() || '')
    : '';
  const contextMeaning = contextStart >= 0
    ? (lines[contextStart + 4]?.replace(headers.contextMeaningPrefix, '').trim() || '')
    : '';

  return { slug, title, plainEnglish, analogy, inContext, contextMeaning, whyItMatters };
}

function loadEnglishTitle(slug, fallback) {
  const enPath = path.join(GLOSSARY_DIR, 'en', `${slug}.md`);
  if (!fs.existsSync(enPath)) return fallback;
  const firstLine = fs.readFileSync(enPath, 'utf8').split('\n')[0];
  return firstLine?.replace(/^#\s*/, '').trim() || fallback;
}

function buildExamples(lang, term, sourceUrl) {
  const templates = INSTRUCTION_TEMPLATES[lang] ?? INSTRUCTION_TEMPLATES.en;
  const examples = [];

  const add = (instruction, output) => {
    const trimmed = output?.trim();
    if (trimmed) {
      examples.push({ instruction, output: trimmed, term_en: term.term_en, source_url: sourceUrl });
    }
  };

  add(templates.direct(term.term_en), term.plainEnglish);
  add(templates.analogy(term.term_en), term.analogy);

  const exampleOutput = term.inContext && term.contextMeaning
    ? `"${term.inContext}" — ${term.contextMeaning}`
    : term.contextMeaning || term.inContext;
  add(templates.example(term.term_en), exampleOutput);

  const combinedParts = [term.plainEnglish, term.analogy];
  if (term.inContext && term.contextMeaning) {
    combinedParts.push(`"${term.inContext}" — ${term.contextMeaning}`);
  }
  if (term.whyItMatters) combinedParts.push(term.whyItMatters);
  add(templates.combined(term.term_en), combinedParts.filter(Boolean).join('\n\n'));

  return examples;
}

function main() {
  const args = process.argv.slice(2);
  const langIdx = args.indexOf('--lang');
  const outIdx = args.indexOf('--out');
  const lang = langIdx >= 0 ? args[langIdx + 1] : 'sw';
  const outPath = outIdx >= 0
    ? path.resolve(args[outIdx + 1])
    : path.join(__dirname, '..', 'datasets', `bitcoin-plain-talk-${lang}.jsonl`);

  const langDir = path.join(GLOSSARY_DIR, lang);
  if (!fs.existsSync(langDir)) {
    console.error(`No glossary directory for language "${lang}" at ${langDir}`);
    process.exit(1);
  }

  const fileNames = fs.readdirSync(langDir).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
  const lines = [];
  let termCount = 0;

  for (const fileName of fileNames) {
    const slug = fileName.replace(/\.md$/, '');
    const content = fs.readFileSync(path.join(langDir, fileName), 'utf8');
    const parsed = parseTerm(lang, slug, content);
    const term_en = loadEnglishTitle(slug, parsed.title);
    const sourceUrl = `${SITE_BASE_URL}/glossary/${slug}?lang=${lang}`;

    const examples = buildExamples(lang, { ...parsed, term_en }, sourceUrl);
    if (examples.length === 0) continue;

    termCount += 1;
    for (const example of examples) {
      lines.push(JSON.stringify(example));
    }
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');

  console.log(`Wrote ${lines.length} examples from ${termCount} terms (lang=${lang}) to ${path.relative(process.cwd(), outPath)}`);
}

main();
