import React from 'react';

export default function DirectoryHome() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Small-Portfolio Property Management
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect property manager for your 1-5 unit portfolio. No hidden fees.
          </p>
        </header>

        {/* Database Query Placeholder */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Top Rated Managers in Austin, TX</h2>
          
          <div className="space-y-4">
            {/* Featured Listing (isFeatured == true) */}
            <div className="p-5 border-2 border-blue-400 bg-blue-50 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-blue-900">Apex Property Management <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full ml-2">Featured</span></h3>
                  <p className="text-sm text-gray-600 mt-1">contact@apex-example-pm.com | 555-0199</p>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-blue-900">Flat Fee: $120/mo</span>
                  <span className="block text-sm text-blue-700">Min Units: 1</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Property Concierge Chat */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-slate-900 text-white p-4 rounded-t-xl rounded-bl-xl shadow-2xl w-80 border border-slate-700">
            <div className="flex items-center space-x-3 mb-3 border-b border-slate-700 pb-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-semibold">Property Concierge</h3>
            </div>
            <p className="text-sm text-slate-300 mb-4">
              Need a manager for your rental? Tell us your zip code and unit count, and we'll match you with a verified local provider instantly.
            </p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors text-sm">
              Start Match (Free)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
