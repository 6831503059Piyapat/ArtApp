'use client';
import Navbar from '@/app/components/navbar';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// Mock Data
const INITIAL_RUNS = [
  {
    id: 1,
    title: 'MFU Outside Night Market',
    shortDay: 'Mon 14',
    date: 'Mon 14 Sep 2026',
    rawDate: '14/09/2026',
    sold: 88,
    gross: '฿8,490',
    net: '฿8,420',
  },
  {
    id: 2,
    title: 'Sunday Craft Fair (Baan Kang Wat)',
    shortDay: 'Sun 08',
    date: 'Sun 08 Sep 2026',
    rawDate: '08/09/2026',
    sold: 62,
    gross: '฿6,850',
    net: '฿6,400',
  },
  {
    id: 3,
    title: 'Artisan Weekend Pop-up (Nimman Soi 11)',
    shortDay: 'Sun 01',
    date: 'Sun 01 Sep 2026',
    rawDate: '01/09/2026',
    sold: 45,
    gross: '฿5,430',
    net: '฿5,030',
  },
];

export default function CompletedRunsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Logic
  const filteredRuns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return INITIAL_RUNS;
    
    return INITIAL_RUNS.filter((run) =>
      run.title.toLowerCase().includes(query) ||
      run.date.toLowerCase().includes(query) ||
      run.rawDate.includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-creatory-canvas text-creatory-navy font-sans antialiased">
      {/* Header Navigation */}
      
    <Navbar />
      {/* Main Content */}
      <main className="flex-1 w-full pt-12">
        <div className="max-w-[1280px] mx-auto px-[18px] pt-[28px]">
          <div className="flex flex-col w-full gap-4">
            
            {/* Breadcrumb & Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="h-3 flex items-center gap-1 text-[9px] leading-3 font-semibold text-creatory-gray">
                  <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[11px]">home</span>
                    <span>Home</span>
                  </Link>
                  <span>/</span>
                  <span className="hover:text-primary transition-colors cursor-pointer">Sales Runs</span>
                  <span>/</span>
                  <span className="text-primary font-bold">Completed Runs</span>
                </div>
                <h1 className="h-6 text-[22px] leading-6 font-extrabold tracking-tight flex items-center gap-2">
                  Completed Sales Runs
                  <span className="px-1.5 py-0.5 rounded-full bg-creatory-lavender font-bold text-[8px] text-primary border border-primary/20">3 Archived</span>
                </h1>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[10px]">
              <div className="h-[90px] p-[10px] rounded-[14px] bg-white border border-creatory-border shadow-[0_4px_16px_rgba(11,15,79,0.03)] flex flex-col justify-between hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between text-creatory-gray">
                  <span className="uppercase tracking-wide font-bold text-[8px]">Settled Runs</span>
                  <div className="w-7 h-7 rounded-lg bg-creatory-lavender flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[13px]">verified</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[22px] leading-6 font-extrabold">3</span>
                    <span className="text-[8px] text-primary font-bold bg-creatory-lavender px-1.5 py-0.5 rounded-full">Completed</span>
                  </div>
                  <p className="text-[8px] leading-3 text-creatory-gray">100% reconciled across all artists</p>
                </div>
              </div>
              
              <div className="h-[90px] p-[10px] rounded-[14px] bg-white border border-creatory-border shadow-[0_4px_16px_rgba(11,15,79,0.03)] flex flex-col justify-between hover:border-creatory-pink/30 transition-all">
                <div className="flex items-center justify-between text-creatory-gray">
                  <span className="uppercase tracking-wide font-bold text-[8px]">AVG RUN TIME</span>
                  <div className="w-7 h-7 rounded-lg bg-pink-50 flex items-center justify-center text-creatory-pink">
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[22px] leading-6 font-extrabold">6h 10m</span>
                    <span className="text-[8px] text-creatory-gray font-semibold">Avg / run</span>
                  </div>
                  <p className="text-[8px] leading-3 text-creatory-gray">18h 30m Total duration recorded</p>
                </div>
              </div>

              <div className="h-[90px] p-[10px] rounded-[14px] bg-white border border-creatory-border shadow-[0_4px_16px_rgba(11,15,79,0.03)] flex flex-col justify-between hover:border-creatory-orange/40 transition-all">
                <div className="flex items-center justify-between text-creatory-gray">
                  <span className="uppercase tracking-wide font-bold text-[8px]">Total Items Sold</span>
                  <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-creatory-orange">
                    <span className="material-symbols-outlined text-[13px]">shopping_bag</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[22px] leading-6 font-extrabold">195</span>
                    <span className="text-[8px] text-creatory-gray font-semibold">Items</span>
                  </div>
                  <p className="text-[8px] leading-3 text-creatory-gray">Clearance Rate: <strong className="text-creatory-navy font-semibold">85%</strong></p>
                </div>
              </div>

              <div className="h-[90px] p-[10px] rounded-[14px] bg-gradient-to-br from-creatory-lavender to-white border border-creatory-pink/40 shadow-[0_4px_20px_rgba(124,92,255,0.08)] flex flex-col justify-between">
                <div className="flex items-center justify-between text-creatory-gray">
                  <span className="uppercase tracking-wide font-bold text-[8px] text-creatory-navy">Total Revenue</span>
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-creatory-pink to-creatory-orange flex items-center justify-center text-white shadow-sm">
                    <span className="material-symbols-outlined text-[13px]">payments</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[22px] leading-6 font-extrabold tracking-tight">฿20,770</span>
                  </div>
                  <p className="text-[8px] leading-3 font-semibold text-primary">Avg ฿6,923 / run intake</p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="h-[46px] p-[7px] rounded-[14px] bg-white border border-creatory-border shadow-sm">
              <div className="h-full flex items-center gap-2 bg-creatory-canvas border border-creatory-border rounded-[10px] px-2 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all">
                <span className="material-symbols-outlined text-creatory-gray text-[14px]">search</span>
                <input
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search completed runs by name, location, or date..." 
                  className="w-full bg-transparent text-creatory-navy placeholder-creatory-gray text-[10px] font-medium focus:outline-none"
                />
                {searchQuery && (
                  <button aria-label="Clear search" onClick={() => setSearchQuery('')} className="text-creatory-gray hover:text-creatory-navy">
                    <span className="material-symbols-outlined text-[14px]">cancel</span>
                  </button>
                )}
              </div>
            </div>

            {/* List Header */}
            <div className="h-3 flex items-center justify-between text-[8px] leading-3 font-semibold text-creatory-gray px-0.5">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[12px] text-primary">folder_special</span>
                <span>Finalized Ledger Archive</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Sorted by</span>
                <span className="text-creatory-navy font-bold">Most Recent Close</span>
              </div>
            </div>

            {/* Cards Container */}
            <div className="mt-[2px] flex flex-col gap-[10px]">
              {filteredRuns.length > 0 ? (
                filteredRuns.map((run) => (
                  <div key={run.id} className="min-h-[111px] rounded-[14px] bg-white border border-creatory-border hover:border-primary/40 hover:shadow-[0_8px_24px_rgba(124,92,255,0.06)] transition-all px-[13px] py-[11px] flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex flex-col gap-1 min-w-0 md:w-[82px] md:flex-none">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-creatory-lavender text-primary text-[8px] font-bold border border-primary/20 whitespace-nowrap">
                          <span className="w-1 h-1 rounded-full bg-primary"></span>
                          Settled & Closed
                        </span>
                      </div>
                      <h2 className="text-[11px] leading-[17px] font-bold tracking-tight mt-0.5">{run.title} ({run.shortDay})</h2>
                      <p className="text-[8px] text-creatory-gray">{run.date}</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 md:self-center md:ml-auto">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="text-[7px] text-creatory-gray uppercase tracking-wider font-bold">Total Sold</span>
                          <span className="text-[10px] font-bold">{run.sold} items</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[7px] text-creatory-gray uppercase tracking-wider font-bold">Gross</span>
                          <span className="text-[10px] font-bold">{run.gross}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[7px] text-primary uppercase tracking-wider font-bold">Net Intake</span>
                          <span className="text-[10px] text-primary font-extrabold">{run.net}</span>
                        </div>
                      </div>
                      <Link href="#" className="inline-flex items-center gap-1 px-[10px] py-1 rounded-xl bg-gradient-to-r from-primary to-[#6842FF] hover:from-[#6A47F2] hover:to-[#5730EA] text-white text-[8px] font-bold transition-all shadow-sm shadow-primary/30 ml-auto md:ml-0 whitespace-nowrap">
                        <span>View Run Breakdown</span>
                        <span className="material-symbols-outlined text-[11px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                /* Empty State */
                <div className="flex p-10 rounded-2xl bg-white border border-creatory-border text-center flex-col items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-creatory-lavender flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[30px]">manage_search</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-bold">No completed runs match your query</h3>
                    <p className="text-xs text-creatory-gray">Try searching with a different market name or switch your date filter range.</p>
                  </div>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 rounded-xl bg-creatory-lavender text-primary font-bold text-xs hover:bg-primary hover:text-white transition-all shadow-sm"
                  >
                    Clear Search & Filters
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}