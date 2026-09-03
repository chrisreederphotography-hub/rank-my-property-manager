"use client";

import React, { useState } from 'react';

interface Manager {
  id: string;
  companyName: string;
  city: string;
  state: string;
  websiteUrl: string;
  contactPhone: string;
  minUnitRequirement: number;
  feeStructure: string;
  isFeatured: boolean;
  
  // Optional new fields for the premium directory look
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
  propertyTypes?: string[];
}

export default function ManagerCard({ manager, rank }: { manager: Manager, rank?: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Strict adherence to NO FAKE DATA rule. Only use real properties.
  const rating = manager.rating; // Will be undefined initially
  const reviewCount = manager.reviewCount;
  const isVerified = manager.isVerified === true; // Must be explicitly true
  const propertyTypes = manager.propertyTypes || []; // Empty if unknown

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const leadData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        units: formData.get('units'),
        managerId: manager.id,
        managerName: manager.companyName,
        city: manager.city,
        createdAt: new Date().toISOString()
      };

      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      
      await addDoc(collection(db, 'leads'), leadData);
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting lead:", error);
      setIsSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div 
        className={`relative flex flex-col h-full overflow-hidden rounded-2xl bg-white transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl ${
          manager.isFeatured 
            ? 'border-2 border-blue-600 shadow-lg ring-4 ring-blue-50/50' 
            : 'border border-slate-200 shadow-md hover:border-slate-300'
        }`}
      >
        {/* Featured Badge */}
        {manager.isFeatured && (
          <div className="absolute top-0 right-0 z-10">
            <span className="inline-flex items-center rounded-bl-xl bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm">
              <svg className="w-3.5 h-3.5 mr-1.5 text-blue-200" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              Top Rated
            </span>
          </div>
        )}
        
        <div className="p-6 pb-5">
          <div className="flex items-start gap-4">
            {/* Rank Badge */}
            {rank && (
              <div className="h-16 w-12 flex-shrink-0 flex items-center justify-center border-r-2 border-slate-100 pr-3">
                <span className={`text-3xl font-black ${rank === 1 ? 'text-amber-500 drop-shadow-md' : rank === 2 ? 'text-slate-400' : rank === 3 ? 'text-amber-700' : 'text-slate-300'}`}>
                  {rank}
                </span>
              </div>
            )}
            
            {/* Logo Placeholder */}
            <div className="h-16 w-16 flex-shrink-0 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center text-slate-700 border border-slate-200 shadow-sm">
              <span className="text-xl font-black tracking-tighter uppercase">{manager.companyName.charAt(0)}</span>
            </div>
            
            <div className="pt-0.5 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900 leading-snug truncate">
                  {manager.companyName}
                </h2>
              </div>
              
              {/* Ratings Row */}
              {rating !== undefined && reviewCount !== undefined && (
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className={`w-4 h-4 ${star <= Math.round(rating) ? 'fill-current' : 'text-slate-200 fill-current'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{rating.toFixed(1)}</span>
                  <span className="text-sm text-slate-400 font-medium">({reviewCount})</span>
                </div>
              )}
              
              {/* Location */}
              <p className="text-sm text-slate-500 flex items-center gap-1.5 font-medium">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {manager.city}, {manager.state}
              </p>
            </div>
          </div>
          
          {/* Trust Badges & Property Types */}
          <div className="mt-5 space-y-3">
            {isVerified && (
              <div className="flex items-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  Verified License & Background Checked
                </span>
              </div>
            )}
            <div className="flex flex-wrap gap-1.5">
              {propertyTypes.map(pt => (
                <span key={pt} className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-200/60">
                  {pt}
                </span>
              ))}
            </div>
          </div>

        </div>
        
        {/* Footer Action */}
        <div className="p-6 pt-5 mt-auto border-t border-slate-100 bg-white">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full inline-flex justify-center items-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-200"
          >
            Get a Free Quote
            <svg className="w-4 h-4 ml-1.5 opacity-70 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </div>

      {/* Quote Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-200">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-extrabold text-slate-900">Request a Quote</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            {isSuccess ? (
              <div className="p-8 text-center bg-white">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-2">Request Sent!</h4>
                <p className="text-slate-500 font-medium leading-relaxed">We've forwarded your information securely to {manager.companyName}. They will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 bg-white">
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                  Fill out the form below and <span className="font-bold text-slate-900">{manager.companyName}</span> will contact you with a customized quote for your properties.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input name="name" required type="text" className="w-full rounded-xl border-slate-200 border-2 px-4 py-3 text-sm font-medium focus:ring-0 focus:border-blue-600 outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input name="email" required type="email" className="w-full rounded-xl border-slate-200 border-2 px-4 py-3 text-sm font-medium focus:ring-0 focus:border-blue-600 outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <input name="phone" required type="tel" className="w-full rounded-xl border-slate-200 border-2 px-4 py-3 text-sm font-medium focus:ring-0 focus:border-blue-600 outline-none transition-colors" placeholder="(555) 123-4567" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Total Units</label>
                      <input name="units" required type="number" min="1" className="w-full rounded-xl border-slate-200 border-2 px-4 py-3 text-sm font-medium focus:ring-0 focus:border-blue-600 outline-none transition-colors" placeholder="e.g. 4" />
                    </div>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-8 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : "Submit Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
