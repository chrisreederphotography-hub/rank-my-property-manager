import Link from "next/link";
import realPmData from "../../../data/real_pm_database.json";
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PropertyConcierge from '../../../components/PropertyConcierge';
import ManagerCard from '../../../components/ManagerCard';
import seoDataRaw from '../../../data/seo_city_database.json';
const seoData = seoDataRaw as any[];

interface Props {
  params: Promise<{ state: string; city: string; }>;
}

// Generate static params so Next.js statically builds all these routes ahead of time
export async function generateStaticParams() {
  return seoData.map((data) => ({
    state: data.state?.toLowerCase(),
    city: data.city?.toLowerCase().replace(/\s+/g, '-') || data.city_name?.toLowerCase().replace(/\s+/g, '-') || '',
  }));
}

// Dynamically generate the SEO Meta Title for the head tag
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const cityParam = params.city;
  const stateParam = params.state;
  const data = seoData.find(d => 
    (d.city?.toLowerCase().replace(/\s+/g, '-') === cityParam) || 
    (d.city_name?.toLowerCase().replace(/\s+/g, '-') === cityParam)
  );

  if (!data) {
    return {
      title: 'Property Managers | Rank My Property Manager',
    };
  }

  return {
    title: data.meta_title || `Best Property Management in ${data.city || data.city_name}`,
    description: data.intro_paragraph ? data.intro_paragraph.substring(0, 160) + '...' : (data.meta_description || ''),
  };
}

export default async function CityDirectoryPage(props: Props) {
  const params = await props.params;
  const cityParam = params.city;
  
  // Look up the SEO data based on the city slug
  const pageData = seoData.find(d => 
    (d.city?.toLowerCase().replace(/\s+/g, '-') === cityParam) || 
    (d.city_name?.toLowerCase().replace(/\s+/g, '-') === cityParam)
  );
  
  if (!pageData) {
    notFound();
  }

  const cityName = pageData.city || pageData.city_name || '';
  const citySlug = cityName.toLowerCase().replace(/\s+/g, '-') || 'fallback';
  const realManagers = (realPmData as Record<string, any[]>)[citySlug] || [];
  
  const managers = realManagers.map((m: any) => ({...m, city: cityName, state: pageData.state}));

  // Genuine Mathematical Ranking Algorithm
  // 1. Featured partners stay at the top.
  // 2. Otherwise, rank based on a weighted score: Rating * log10(Reviews + 1)
  const sortedManagers = [...managers].sort((a, b) => {
    if (b.isFeatured !== a.isFeatured) return Number(b.isFeatured || 0) - Number(a.isFeatured || 0);
    
    const scoreA = (a.rating || 0) * Math.log10((a.reviewCount || 0) + 1);
    const scoreB = (b.rating || 0) * Math.log10((b.reviewCount || 0) + 1);
    
    return scoreB - scoreA;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-inner border border-blue-500 group-hover:bg-blue-700 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">Rank My Property Manager</span>
        </Link>
        
        <div className="flex flex-1 gap-x-6 items-center justify-end">
          <nav className="hidden md:flex items-center gap-6 mr-4">
            <Link href="/resources" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Resources</Link>
            <Link href="/contact" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Contact</Link>
          </nav>
          <div className="relative w-full max-w-md hidden sm:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search managers..."
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-14 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white shadow-sm"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <kbd className="inline-flex items-center rounded border border-slate-200 px-2 font-sans text-xs font-medium text-slate-400 bg-slate-50">
                ⌘K
              </kbd>
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all flex items-center justify-center">
            <svg className="h-5 w-5 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-72 shrink-0 border-r border-slate-200 bg-white overflow-y-auto z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Directory Filters</h3>
              <span className="text-xs font-medium text-blue-600 cursor-pointer hover:text-blue-800">Reset</span>
            </div>
            
            <div className="space-y-8">
              {/* Portfolio Size */}
              <div>
                <label className="text-sm font-semibold text-slate-900">Portfolio Size</label>
                <div className="mt-4 space-y-3">
                  {['1-5 Units', '6-20 Units', '21-50 Units', '50+ Units'].map((size) => (
                    <div key={size} className="flex items-center group">
                      <input id={size} name="portfolio" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer" />
                      <label htmlFor={size} className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 cursor-pointer font-medium">{size}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="text-sm font-semibold text-slate-900">Property Type</label>
                <div className="mt-4 space-y-3">
                  {['Single Family', 'Multi-Family', 'Commercial', 'HOA'].map((type) => (
                    <div key={type} className="flex items-center group">
                      <input id={type} name="type" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer" />
                      <label htmlFor={type} className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 cursor-pointer font-medium">{type}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Max Fee */}
              <div>
                <label className="text-sm font-semibold text-slate-900">Fee Structure</label>
                <select className="mt-3 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 font-medium shadow-sm">
                  <option>Any Structure</option>
                  <option>Flat Fee Only</option>
                  <option>Percentage Only</option>
                </select>
              </div>
            </div>
            
            <button className="mt-10 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Dynamic Hero Section */}
          <div className="bg-slate-900 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 to-slate-900 px-6 py-12 sm:px-10 lg:px-12 border-b border-slate-800">
            <div className="max-w-6xl mx-auto">
              <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm font-medium text-blue-300 mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500"><path d="m9 18 6-6-6-6"/></svg>
                <Link href={`/${(pageData.state || '').toLowerCase()}`} className="hover:text-white transition-colors uppercase">{pageData.state}</Link>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500"><path d="m9 18 6-6-6-6"/></svg>
                <span className="text-white">{pageData.city || pageData.city_name}</span>
              </nav>
              <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20 mb-4 border border-blue-500/30">
                Verified Local Markets
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl mb-4 leading-tight">
                {pageData.h1 || pageData.hero_title}
              </h1>
              <p className="mt-2 text-lg leading-relaxed text-slate-300 max-w-3xl font-medium">
                {pageData.intro_paragraph || pageData.meta_description}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                 <h2 className="text-xl font-bold text-slate-900">Top Rated Providers</h2>
                 <p className="text-sm font-medium text-slate-500">Showing {sortedManagers.length} vetted results</p>
              </div>
              
              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedManagers.map((manager, index) => (
                  <ManagerCard key={manager.id} manager={manager} rank={index + 1} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <PropertyConcierge />
    </div>
  );
}
