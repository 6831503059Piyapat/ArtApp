'use client';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BadgeCheck, Banknote, Clock3, ShoppingBag } from 'lucide-react';

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
      <main className="mb-8 flex-1 w-full pt-12">
        <div className="mx-auto w-full max-w-[1280px] px-[18px] pt-[28px] md:w-[85%]">
          <div className="flex flex-col w-full gap-4">
            
            {/* Breadcrumb & Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight leading-7">
                  Completed Sales Runs
                  <span className="rounded-full border border-primary/20 bg-creatory-lavender px-2.5 py-0 text-[9px] font-bold leading-4 text-primary">3 Archived</span>
                </h1>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <div className="flex h-[82px] min-w-0 flex-col justify-between rounded-[14px] border border-creatory-border bg-white p-2.5 shadow-[0_4px_16px_rgba(11,15,79,0.03)] transition-all hover:border-primary/30">
                <div className="flex items-center justify-between text-creatory-gray">
                  <span className="text-[9px] font-bold uppercase tracking-wide md:text-[10px]">Settled Runs</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-creatory-lavender text-primary">
                    <BadgeCheck className="h-[18px] w-[18px]" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <div className="-translate-y-1 flex items-baseline gap-1">
                    <span className="text-lg font-extrabold leading-5 md:text-xl">3</span>
                    <span className="rounded-full bg-creatory-lavender px-1.5 py-0.5 text-[9px] font-bold text-primary">Completed</span>
                  </div>
                  <p className="text-[9px] leading-3 text-creatory-gray md:text-[10px]">100% reconciled across all artists</p>
                </div>
              </div>
              
              <div className="flex h-[82px] min-w-0 flex-col justify-between rounded-[14px] border border-creatory-border bg-white p-2.5 shadow-[0_4px_16px_rgba(11,15,79,0.03)] transition-all hover:border-creatory-pink/30">
                <div className="flex items-center justify-between text-creatory-gray">
                  <span className="text-[9px] font-bold uppercase tracking-wide md:text-[10px]">AVG RUN TIME</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-50 text-creatory-pink">
                    <Clock3 className="h-[18px] w-[18px]" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <div className="-translate-y-1 flex items-baseline gap-1">
                    <span className="text-lg font-extrabold leading-5 md:text-xl">6h 10m</span>
                    <span className="text-[9px] font-semibold text-creatory-gray">Avg / run</span>
                  </div>
                  <p className="text-[9px] leading-3 text-creatory-gray md:text-[10px]">18h 30m Total duration recorded</p>
                </div>
              </div>

              <div className="flex h-[82px] min-w-0 flex-col justify-between rounded-[14px] border border-creatory-border bg-white p-2.5 shadow-[0_4px_16px_rgba(11,15,79,0.03)] transition-all hover:border-creatory-orange/40">
                <div className="flex items-center justify-between text-creatory-gray">
                  <span className="text-[9px] font-bold uppercase tracking-wide md:text-[10px]">Total Items Sold</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-creatory-orange">
                    <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <div className="-translate-y-1 flex items-baseline gap-1">
                    <span className="text-lg font-extrabold leading-5 md:text-xl">195</span>
                    <span className="text-[9px] font-semibold text-creatory-gray">Items</span>
                  </div>
                  <p className="text-[9px] leading-3 text-creatory-gray md:text-[10px]">Clearance Rate: <strong className="font-semibold text-creatory-navy">85%</strong></p>
                </div>
              </div>

              <div className="flex h-[82px] min-w-0 flex-col justify-between rounded-[14px] border border-creatory-pink/40 bg-gradient-to-br from-creatory-lavender to-white p-2.5 shadow-[0_4px_20px_rgba(124,92,255,0.08)]">
                <div className="flex items-center justify-between text-creatory-gray">
                  <span className="text-[9px] font-bold uppercase tracking-wide text-creatory-navy md:text-[10px]">Total Revenue</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-creatory-pink to-creatory-orange text-white shadow-sm">
                    <Banknote className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <div className="-translate-y-1 flex items-baseline gap-1.5">
                    <span className="text-lg font-extrabold leading-5 tracking-tight md:text-xl">฿20,770</span>
                  </div>
                  <p className="text-[9px] font-semibold leading-3 text-primary md:text-[10px]">Avg ฿6,923 / run intake</p>
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
                  className="w-full bg-transparent text-xs font-medium text-creatory-navy placeholder-creatory-gray focus:outline-none"
                />
                {searchQuery && (
                  <button aria-label="Clear search" onClick={() => setSearchQuery('')} className="text-creatory-gray hover:text-creatory-navy">
                    <span className="material-symbols-outlined text-[14px]">cancel</span>
                  </button>
                )}
              </div>
            </div>

            {/* List Header */}
            <div className="flex items-center justify-between px-0.5 text-[10px] font-semibold leading-4 text-creatory-gray">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[12px] text-primary">folder_special</span>
                <span>Archived Runs</span>
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
                  <div key={run.id} className="rounded-[14px] border border-creatory-border bg-white px-4 py-3 transition-all hover:border-primary/40 hover:shadow-[0_8px_24px_rgba(124,92,255,0.06)]">
                    <div className="flex min-w-0 flex-col gap-3 px-2 py-1 sm:px-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex min-w-0 flex-col gap-1 md:flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-primary/20 bg-creatory-lavender px-1.5 py-0.5 text-[10px] font-bold text-primary">
                          <span className="w-1 h-1 rounded-full bg-primary"></span>
                          Settled & Closed
                        </span>
                      </div>
                      <h2 className="mt-0.5 text-sm font-bold leading-5 tracking-tight sm:text-base">{run.title} ({run.shortDay})</h2>
                      <p className="text-[10px] text-creatory-gray">{run.date}</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 md:self-center md:ml-auto">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-creatory-gray">Total Sold</span>
                          <span className="text-xs font-bold">{run.sold} items</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-creatory-gray">Gross</span>
                          <span className="text-xs font-bold">{run.gross}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Net Intake</span>
                          <span className="text-xs font-extrabold text-primary">{run.net}</span>
                        </div>
                      </div>
                      <Link href={`/sales/completed/${run.id}`} className="ml-auto inline-flex items-center gap-1 whitespace-nowrap rounded-xl bg-gradient-to-r from-primary to-[#6842FF] px-[10px] py-1.5 text-[10px] font-bold text-white transition-all shadow-sm shadow-primary/30 hover:from-[#6A47F2] hover:to-[#5730EA] md:ml-0">
                        <span>View Run Breakdown</span>
                        <span className="material-symbols-outlined text-[11px]">arrow_forward</span>
                      </Link>
                    </div>
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

      <Footer />
    </div>
  );
}