import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  hero_image: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir);
  const posts = files
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace('.md', '');
      const filePath = path.join(contentDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        hero_image: data.hero_image || '',
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    hero_image: data.hero_image || '',
    content,
  };
}
