import { NextRequest, NextResponse } from 'next/server';
import { getAllTerms } from '@/lib/glossary';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get('lang') || 'en';

  try {
    let terms = getAllTerms(lang);

    const search = searchParams.get('search')?.trim();
    const category = searchParams.get('category')?.trim();
    const letter = searchParams.get('letter')?.trim();

    if (search) {
      const query = search.toLowerCase();

      terms = terms.filter((term) =>
        term.title.toLowerCase().includes(query) ||
        term.plainEnglish.toLowerCase().includes(query) ||
        term.category.toLowerCase().includes(query) ||
        term.slug.toLowerCase().includes(query)
      );
    }

    if (category) {
      terms = terms.filter(
        (term) => term.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (letter) {
      terms = terms.filter((term) =>
        term.title.toLowerCase().startsWith(letter.toLowerCase())
      );
    }

    const page = Math.max(Number(searchParams.get('page') || 1), 1);
    const limit = Math.max(Number(searchParams.get('limit') || 10), 1);

    const totalItems = terms.length;
    const totalPages = Math.ceil(totalItems / limit);

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedTerms = terms.slice(start, end);

    return NextResponse.json({
      items: paginatedTerms,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch terms' },
      { status: 500 }
    );
  }
}
