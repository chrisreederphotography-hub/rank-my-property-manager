import { getAllPosts, getPostBySlug } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getPostBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Link href="/resources" className="inline-flex items-center text-slate-500 hover:text-blue-600 font-medium transition-colors">
            &larr; Back to Resources
        </Link>
      </div>
      
      <article className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
        {article.hero_image && (
            <div className="relative w-full h-[400px] sm:h-[500px]">
                <Image 
                    src={article.hero_image} 
                    alt={article.title} 
                    fill 
                    priority
                    className="object-cover" 
                />
            </div>
        )}
        
        <div className="p-8 sm:p-12 md:p-16">
            <header className="mb-10 text-center max-w-3xl mx-auto">
                <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
                    {article.date}
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                    {article.title}
                </h1>
                {article.excerpt && (
                    <p className="text-xl text-slate-500 leading-relaxed">
                        {article.excerpt}
                    </p>
                )}
            </header>

            <div className="prose prose-slate prose-lg md:prose-xl max-w-3xl mx-auto prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 prose-img:rounded-xl">
                <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
        </div>
      </article>

      <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 p-10 sm:p-12 rounded-3xl text-center shadow-xl">
        <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Ready to find a top-rated manager?</h3>
        <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
            Skip the hassle of screening managers yourself. Use our verified directory to find the best property managers in your local market, ranked by real reviews.
        </p>
        <Link href="/" className="inline-block bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-400 hover:-translate-y-1 transition-all shadow-lg shadow-blue-500/25">
          Search Directory Now
        </Link>
      </div>
    </main>
  );
}
