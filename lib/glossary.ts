import fs from 'fs';
import path from 'path';

const glossaryDirectory = path.join(process.cwd(), 'glossary');

export interface Term {
  slug: string;
  title: string;
  category: string;
  plainEnglish: string;
  analogy: string;
  inContext: string;
  contextMeaning: string;
  whyItMatters?: string;
  relatedTerms: string[];
  language: string;
  content: string;
}

export function getAllTerms(language: string = 'en'): Term[] {
  const langPath = path.join(glossaryDirectory, language);

  if (!fs.existsSync(langPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(langPath);
  const terms: Term[] = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(langPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8').replace(/\r\n/g, '\n');

      // Parse the markdown content
      const lines = fileContents.split('\n');
      const title = lines[0]?.replace(/^#\s*/, '') || slug;

      // Extract category
      const categoryLine = lines.find(l => l.startsWith('**Category:**') || l.startsWith('**Kategoria:**') || l.startsWith('**Ẹ̀ka:**'));
      const category = categoryLine?.replace(/\*\*(Category|Kategoria|Ẹ̀ka):\*\*\s*/, '') || 'General';

      // Extract plain English (after ## Plain English header)
      const plainEnglishStart = lines.findIndex(l => l.trim() === '## Plain English');
      const plainEnglish = plainEnglishStart >= 0
        ? lines[plainEnglishStart + 2]?.trim() || ''
        : '';

      return {
        slug,
        title,
        category,
        plainEnglish,
        analogy: '',
        inContext: '',
        contextMeaning: '',
        relatedTerms: [],
        language,
        content: fileContents,
      };
    });

  return terms.sort((a, b) => a.title.localeCompare(b.title));
}

export function getTermBySlug(slug: string, language: string = 'en'): Term | null {
  const langPath = path.join(glossaryDirectory, language);
  const fullPath = path.join(langPath, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8').replace(/\r\n/g, '\n');
  const lines = fileContents.split('\n');

  const title = lines[0]?.replace(/^#\s*/, '') || slug;
  const categoryLine = lines.find(l => l.startsWith('**Category:**') || l.startsWith('**Kategoria:**') || l.startsWith('**Ẹ̀ka:**'));
  const category = categoryLine?.replace(/\*\*(Category|Kategoria|Ẹ̀ka):\*\*\s*/, '') || 'General';

  // Support English, Swahili, Pidgin, Kikuyu and Yoruba headers
  const plainEnglishStart = lines.findIndex(l => l.trim() === '## Plain English' || l.trim() === '## Maelezo Rahisi' || l.trim() === '## Na njira huthu' || l.trim() === '## Plain Pidgin' || l.trim() === '## Ní Ìtumọ̀ Rọrùn');
  const plainEnglish = plainEnglishStart >= 0
    ? lines[plainEnglishStart + 2]?.trim() || ''
    : '';

  const analogyStart = lines.findIndex(l => l.trim() === '## Analogy' || l.trim() === '## Mfano wa Kila Siku' || l.trim() === '## Àpẹẹrẹ');
  const analogy = analogyStart >= 0
    ? lines[analogyStart + 2]?.trim() || ''
    : '';

  const contextStart = lines.findIndex(l => l.trim() === '## In Context' || l.trim() === '## Jinsi Inavyotumiwa' || l.trim() === '## Ní Ìtumọ̀ Gidi');
  const inContext = contextStart >= 0
    ? lines[contextStart + 2]?.replace(/^\*"|"\*$/g, '').trim() || ''
    : '';

  const contextMeaning = contextStart >= 0
    ? lines[contextStart + 4]?.replace(/^\*\*(What this means|Maana yake|Ìtumọ̀ èyí):\*\*\s*/, '').trim() || ''
    : '';

  const whyItMattersStart = lines.findIndex(l => l.trim() === '## Why It Matters' || l.trim() === '## Kwa Nini Ni Muhimu' || l.trim() === '## Kí Ló Dé Tí Ó Fi Ṣe Pátáki?');
  const whyItMatters = whyItMattersStart >= 0
    ? lines[whyItMattersStart + 2]?.trim() || undefined
    : undefined;

  const relatedTermsStart = lines.findIndex(l => l.trim() === '## Related Terms' || l.trim() === '## Maneno Yanayohusiana' || l.trim() === '## Àwọn Ọ̀rọ̀ Tó Ní Ìbáṣepọ̀');
  const relatedTermsEnd = relatedTermsStart >= 0
    ? lines.findIndex((l, i) => i > relatedTermsStart && l.trim() === '---')
    : -1;

  const relatedTerms: string[] = [];
  if (relatedTermsStart >= 0 && relatedTermsEnd >= 0) {
    for (let i = relatedTermsStart + 2; i < relatedTermsEnd; i++) {
      const line = lines[i]?.trim();
      if (line && line.startsWith('-')) {
        relatedTerms.push(line.replace(/^-\s*/, ''));
      }
    }
  }

  return {
    slug,
    title,
    category,
    plainEnglish,
    analogy,
    inContext,
    contextMeaning,
    whyItMatters,
    relatedTerms,
    language,
    content: fileContents,
  };
}
