import React from 'react';
import PropertyConcierge from '../../../../components/PropertyConcierge';

interface Props {
  params: {
    state: string;
    city: string;
  };
}

export default async function LocationDirectoryPage({ params }: Props) {
  const { state, city } = params;
  
  const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const formattedState = state.toUpperCase();

  const mockManagers = [
    {
      id: '1',
      companyName: `Apex Management of ${formattedCity}`,
      city: formattedCity,
      state: formattedState,
      websiteUrl: 'https://example.com',
      contactPhone: '(555) 010-0982',
      minUnitRequirement: 2,
      feeStructure: 'Flat $120/mo',
      isFeatured: true
    },
    {
      id: '2',
      companyName: `${formattedCity} Property Pros`,
      city: formattedCity,
      state: formattedState,
      websiteUrl: 'https://pros-example.com',
      contactPhone: '(555) 010-3841',
      minUnitRequirement: 1,
      feeStructure: '10% of gross rent',
      isFeatured: false
    },
    {
      id: '3',
      companyName: `Elevate Real Estate`,
      city: formattedCity,
      state: formattedState,
      websiteUrl: 'https://elevate-example.com',
      contactPhone: '(555) 293-8472',
      minUnitRequirement: 5,
      feeStructure: '8% of gross rent',
      isFeatured: false
    }
  ];

  const sortedManagers = [...mockManagers].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Rank My Property Manager" className="h-8 w-8 rounded-md object-cover border border-slate-200 shadow-sm" />
          <span className="text-xl font-semibold tracking-tight text-slate-900">Rank My Property Manager</span>
        </div>
        
        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center justify-end">
          <div className="relative w-full max-w-md hidden sm:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search managers..."
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-14 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6 bg-slate-50"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <kbd className="inline-flex items-center rounded border border-slate-200 px-2 font-sans text-xs font-medium text-slate-400">
                ⌘K
              </kbd>
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden cursor-pointer">
            <svg className="h-full w-full text-slate-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0 border-r border-slate-200 bg-white overflow-y-auto">
          <div className="p-6">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Filters</h3>
            
            <div className="space-y-6">
              {/* Portfolio Size */}
              <div>
                <label className="text-sm font-medium text-slate-900">Portfolio Size</label>
                <div className="mt-3 space-y-2">
                  {['1-5 Units', '6-20 Units', '21-50 Units', '50+ Units'].map((size) => (
                    <div key={size} className="flex items-center">
                      <input id={size} name="portfolio" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                      <label htmlFor={size} className="ml-3 text-sm text-slate-600">{size}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="text-sm font-medium text-slate-900">Property Type</label>
                <div className="mt-3 space-y-2">
                  {['Single Family', 'Multi-Family', 'Commercial', 'HOA'].map((type) => (
                    <div key={type} className="flex items-center">
                      <input id={type} name="type" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                      <label htmlFor={type} className="ml-3 text-sm text-slate-600">{type}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Max Fee */}
              <div>
                <label className="text-sm font-medium text-slate-900">Fee Structure</label>
                <select className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-900 sm:text-sm sm:leading-6">
                  <option>Any Structure</option>
                  <option>Flat Fee Only</option>
                  <option>Percentage Only</option>
                </select>
              </div>
            </div>
            
            <button className="mt-8 w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Property Managers in {formattedCity}, {formattedState}
              </h1>
              <p className="mt-2 text-lg text-slate-600">
                Compare {sortedManagers.length} vetted local management companies tailored for your portfolio.
              </p>
            </div>
            
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedManagers.map((manager) => (
                <div 
                  key={manager.id} 
                  className={`relative flex flex-col justify-between overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md ${
                    manager.isFeatured ? 'border-blue-300 ring-1 ring-blue-300' : 'border-slate-200'
                  }`}
                >
                  {manager.isFeatured && (
                    <div className="absolute top-0 right-0">
                      <span className="inline-flex items-center rounded-bl-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                        Top Rated
                      </span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 shadow-inner">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 leading-tight">
                          {manager.companyName}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                          {manager.city}, {manager.state}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 my-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fee Structure</p>
                        <p className="mt-1 text-sm font-medium text-slate-900">{manager.feeStructure}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Min Units</p>
                        <p className="mt-1 text-sm font-medium text-slate-900">
                          {manager.minUnitRequirement ? `${manager.minUnitRequirement} Units` : 'No Minimum'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-0 mt-auto flex items-center justify-between gap-4">
                    <p className="text-sm text-slate-600 font-medium">{manager.contactPhone}</p>
                    <a 
                      href={manager.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <PropertyConcierge />
    </div>
  );
}
