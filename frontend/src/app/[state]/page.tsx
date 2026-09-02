import Link from "next/link";
import seoDataRaw from "../../data/seo_city_database.json";
const seoData = seoDataRaw as any[];
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const states = [...new Set(seoData.map(d => d.state))];
  return states.map(state => ({
    state: state.toLowerCase(),
  }));
}

export default async function StateHubPage({ params }: { params: Promise<{ state: string }> }) {
  const stateParam = (await params).state.toUpperCase();
  const stateCities = seoData.filter(d => d.state === stateParam);
  
  if (stateCities.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">Rank My Property Manager</span>
        </Link>
      </header>
      <main className="flex-1 p-6 sm:p-10 lg:p-12">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm font-medium text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m9 18 6-6-6-6"/></svg>
            <span className="text-slate-900 uppercase">{stateParam}</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-8">Property Management in {stateParam}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stateCities.map(c => {
              const citySlug = (c.city || c.city_name).toLowerCase().replace(/\s+/g, '-');
              return (
                <Link key={citySlug} href={`/${stateParam.toLowerCase()}/${citySlug}`} className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="text-lg font-bold text-blue-600">{c.city || c.city_name}, {c.state}</h2>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
