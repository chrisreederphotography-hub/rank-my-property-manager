import React from 'react';
import Link from 'next/link';

export default function Home() {
  const topCities = [
    { name: 'Austin, TX', slug: 'tx/austin' },
    { name: 'Miami, FL', slug: 'fl/miami' },
    { name: 'Dallas, TX', slug: 'tx/dallas' },
    { name: 'Chicago, IL', slug: 'il/chicago' },
    { name: 'Houston, TX', slug: 'tx/houston' },
    { name: 'Atlanta, GA', slug: 'ga/atlanta' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Richer Header */}
      <header className="bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 to-slate-950 text-white py-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-inner border border-blue-500 group-hover:bg-blue-500 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight group-hover:text-blue-100 transition-colors">RankMyPropertyManager</h1>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/resources" className="text-slate-300 hover:text-white font-medium transition-colors">Resources</Link>
            <Link href="/contact" className="text-slate-300 hover:text-white font-medium transition-colors">Contact</Link>
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6 border border-blue-200">
            The Nation's #1 Property Management Directory
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Find the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Property Management.</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            We aggregate, rank, and review the top-rated property management companies across the United States. Compare fees, services, and tenant reviews to protect your investment.
          </p>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 w-full text-left ring-1 ring-slate-900/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                Browse Top Markets
              </h3>
              <span className="text-sm font-medium text-slate-500">50+ Cities Live</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {topCities.map((city) => (
                <Link 
                  key={city.slug} 
                  href={`/${city.slug}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-blue-700">{city.name}</span>
                  <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-10 text-center text-slate-500">
        <p className="font-medium">© 2026 RankMyPropertyManager. All rights reserved.</p>
      </footer>
    </div>
  );
}
