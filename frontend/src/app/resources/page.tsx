import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/markdown';

export default function ResourcesPage() {
  const articles = getAllPosts();

  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold mb-6 text-slate-900 tracking-tight">Resources & Guides</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about property management, tenant screening, and real estate investing in 2026.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.slug} href={`/resources/${article.slug}`} className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
                {article.hero_image && (
                  <Image 
                    src={article.hero_image} 
                    alt={article.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-2">{article.date}</div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 mb-3 leading-snug">{article.title}</h2>
                <p className="text-slate-600 flex-grow mb-6">{article.excerpt}</p>
                <div className="mt-auto text-blue-600 font-medium flex items-center">
                  Read Article <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-20 text-center">
            <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 font-medium bg-slate-100 px-6 py-3 rounded-full transition-colors hover:bg-slate-200">
                &larr; Back to Directory
            </Link>
        </div>
      </main>
    </>
  );
}
