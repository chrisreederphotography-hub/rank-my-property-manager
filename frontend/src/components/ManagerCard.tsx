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
}

export default function ManagerCard({ manager }: { manager: Manager }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
        className={`relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white transition-all hover:-translate-y-1 hover:shadow-xl ${
          manager.isFeatured ? 'border-2 border-blue-500 shadow-md' : 'border border-slate-200 shadow-sm'
        }`}
      >
        {manager.isFeatured && (
          <div className="absolute top-0 right-0 z-10">
            <span className="inline-flex items-center rounded-bl-xl bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm">
              <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              Top Rated
            </span>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start gap-4 mb-5">
            <div className="h-14 w-14 flex-shrink-0 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 border border-slate-200 shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="pt-1">
              <h2 className="text-lg font-bold tracking-tight text-slate-900 leading-snug pr-8">
                {manager.companyName}
              </h2>
              <p className="text-sm text-slate-500 mt-1.5 flex items-center gap-1 font-medium">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {manager.city}, {manager.state}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 my-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fee Structure</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{manager.feeStructure}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Min Units</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {manager.minUnitRequirement ? `${manager.minUnitRequirement} Units` : 'No Minimum'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6 pt-0 mt-auto flex items-center justify-between gap-4 border-t border-slate-100 mt-4 pt-4 bg-slate-50/50">
          <p className="text-sm text-slate-700 font-bold">{manager.contactPhone}</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-all"
          >
            Get a Free Quote
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Request a Quote</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            {isSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Request Sent!</h4>
                <p className="text-slate-500">We've forwarded your information to {manager.companyName}. They will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6">
                <p className="text-sm text-slate-600 mb-6">
                  Fill out the form below and <span className="font-bold text-slate-900">{manager.companyName}</span> will contact you with a customized quote.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                    <input name="name" required type="text" className="w-full rounded-lg border-slate-200 border px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                    <input name="email" required type="email" className="w-full rounded-lg border-slate-200 border px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all" placeholder="john@example.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
                      <input name="phone" required type="tel" className="w-full rounded-lg border-slate-200 border px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all" placeholder="(555) 123-4567" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Total Units</label>
                      <input name="units" required type="number" min="1" className="w-full rounded-lg border-slate-200 border px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all" placeholder="e.g. 4" />
                    </div>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-8 rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center"
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
