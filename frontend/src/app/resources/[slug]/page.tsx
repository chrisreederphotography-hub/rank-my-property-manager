import { articles } from '@/data/articles';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = articles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Link href="/resources" className="text-blue-600 hover:underline font-medium">&larr; Back to Resources</Link>
      </div>
      
      <article className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-blue-600">
        <div className="text-sm text-slate-500 font-mono mb-4">{article.date}</div>
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </article>

      <div className="mt-16 bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to find a top-rated manager?</h3>
        <p className="text-slate-600 mb-6">Skip the hassle of screening managers yourself. Use our directory to find the best property managers in your local market.</p>
        <Link href="/" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
          Search Directory
        </Link>
      </div>
    </main>
  );
}
