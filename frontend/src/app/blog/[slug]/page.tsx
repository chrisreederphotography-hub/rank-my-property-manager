import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = fs.readFileSync(filePath, 'utf8');

  return (
    <article className="max-w-3xl mx-auto py-12 px-6">
      <Link href="/blog" className="text-blue-600 font-bold text-sm mb-8 inline-flex items-center hover:underline">
        &larr; Back to Blog
      </Link>
      
      <div className="prose prose-slate prose-lg max-w-none mt-6">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </article>
  );
}
