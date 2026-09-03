import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function BlogIndex() {
  const contentDir = path.join(process.cwd(), 'src/content/blog');
  
  let posts: any[] = [];
  try {
    const files = fs.readdirSync(contentDir);
    posts = files.filter(file => file.endsWith('.md')).map(file => {
      const content = fs.readFileSync(path.join(contentDir, file), 'utf8');
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
      
      return {
        slug: file.replace('.md', ''),
        title
      };
    });
  } catch (error) {
    console.error("Error reading blog directory:", error);
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-black text-slate-900 mb-8">RankMyPropertyManager Blog</h1>
      <div className="grid gap-6">
        {posts.map(post => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="block p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all bg-white">
            <h2 className="text-xl font-bold text-slate-900">{post.title}</h2>
            <p className="text-blue-600 font-medium mt-2">Read Article &rarr;</p>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-slate-500">No blog posts found.</p>
        )}
      </div>
    </div>
  );
}
