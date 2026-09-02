import Link from 'next/link';
import { articles } from '@/data/articles';

export default function ResourcesPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Resources & Guides</h1>
        <p className="text-xl text-slate-600 mb-12">Everything you need to know about property management, tenant screening, and real estate investing in 2026.</p>
        
        <div className="grid gap-8">
          {articles.map((article) => (
            <Link key={article.slug} href={`/resources/${article.slug}`} className="group block bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm text-slate-500 mb-2">{article.date}</div>
              <h2 className="text-2xl font-semibold text-slate-900 group-hover:text-blue-600 mb-3">{article.title}</h2>
              <p className="text-slate-600">{article.excerpt}</p>
              <div className="mt-4 text-blue-600 font-medium">Read Article &rarr;</div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
            <Link href="/" className="text-slate-500 hover:text-slate-900">&larr; Back to Directory</Link>
        </div>
      </main>
    </>
  );
}
