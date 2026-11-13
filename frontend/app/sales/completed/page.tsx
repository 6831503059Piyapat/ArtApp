'use client';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import React, { useState, useMemo,useEffect } from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import Link from 'next/link';
import { BadgeCheck, Banknote, Clock3, ShoppingBag,Sparkles } from 'lucide-react';

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
  const [language, setLanguage] = useState<'EN' | 'TH'>('EN'); // Default to English
  async function fetchListCompleteRun(idToken: string){
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/complete-list',{
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json',
       
      },
      method: 'GET',

    });
    console.log("Response from backend:", await response.json());
  }
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
useEffect(() => {
  const auth = getAuth();
  setLanguage(localStorage.getItem('language') === 'TH' ? 'TH' : 'EN');
   const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if(user){
    const idToken = await user?.getIdToken();
    fetchListCompleteRun(idToken);
    }
    
  });
  return () => unsubscribe(); // Cleanup subscription on unmount
},[])
  return (
    <div className="flex min-h-screen flex-col bg-creatory-canvas text-creatory-navy font-sans antialiased">
      {/* Header Navigation */}
      
    <Navbar />
      {/* Main Content */}
      <main className="mb-8 min-w-0 w-full flex-1 overflow-x-hidden pt-12">
        <div className="mx-auto w-full max-w-[1280px] min-w-0 px-3 pt-5 sm:px-[18px] sm:pt-[28px] md:w-[85%]">
          <div className="flex flex-col w-full gap-4">
            
            {/* Breadcrumb & Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="flex flex-wrap items-center gap-2 text-2xl font-extrabold tracking-tight leading-7">
                  {language === 'EN' ? 'Completed Sales Runs' : 'การขายที่เสร็จสิ้น'}
                  <span className="rounded-full border border-primary/20 bg-creatory-lavender px-2.5 py-0 text-[9px] font-bold leading-4 text-primary">3 {language === 'EN' ? 'Archived' : 'การขาย'}</span>
                </h1>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <div className="flex min-h-[96px] min-w-0 flex-col justify-between rounded-[14px] border border-creatory-border bg-white p-2.5 shadow-[0_4px_16px_rgba(11,15,79,0.03)] transition-all hover:border-primary/30 md:h-[82px] md:min-h-0">
                <div className="flex items-center justify-between text-creatory-gray">
                  <span className="text-[9px] font-bold uppercase tracking-wide md:text-[10px]">{language === 'EN' ? 'Settled Runs' : 'การขายที่เสร็จสิ้น'}</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-creatory-lavender text-primary">
                    <BadgeCheck className="h-[18px] w-[18px]" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <div className="-translate-y-1 flex items-baseline gap-1">
                    <span className="text-lg font-extrabold leading-5 md:text-xl">3</span>
                    <span className="rounded-full bg-creatory-lavender px-1.5 py-0.5 text-[9px] font-bold text-primary"> {language === 'EN' ? 'Completed' : 'เสร็จสิ้น'}</span>
                  </div>
                  <p className="text-[9px] leading-3 text-creatory-gray md:text-[10px]"> {language === 'EN' ? '100% reconciled across all artists' : '100% ตรวจสอบแล้ว across all artists'}</p>
                </div>
              </div>
              
              <div className="flex min-h-[96px] min-w-0 flex-col justify-between rounded-[14px] border border-creatory-border bg-white p-2.5 shadow-[0_4px_16px_rgba(11,15,79,0.03)] transition-all hover:border-creatory-pink/30 md:h-[82px] md:min-h-0">
                <div className="flex items-center justify-between text-creatory-gray">
                  <span className="text-[9px] font-bold uppercase tracking-wide md:text-[10px]">{language === 'EN' ? 'AVG RUN TIME' : 'เวลาเฉลี่ยต่อการขาย'}</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-50 text-creatory-pink">
                    <Clock3 className="h-[18px] w-[18px]" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <div className="-translate-y-1 flex items-baseline gap-1">
                    <span className="text-lg font-extrabold leading-5 md:text-xl">6{language === 'EN' ? 'h' : 'ชม'} 10{language === 'EN' ? 'm' : 'นาที'}</span>
                    <span className="text-[9px] font-semibold text-creatory-gray"> {language === 'EN' ? 'Avg / run' : 'เฉลี่ยต่อการรัน'}</span>
                  </div>
                  <p className="text-[9px] leading-3 text-creatory-gray md:text-[10px]">18{language === 'EN' ? 'h' : 'ชม'} 30{language === 'EN' ? 'm' : 'นาที'} {language === 'EN' ? 'Total duration' : ''} </p>
                </div>
              </div>

              <div className="flex min-h-[96px] min-w-0 flex-col justify-between rounded-[14px] border border-creatory-border bg-white p-2.5 shadow-[0_4px_16px_rgba(11,15,79,0.03)] transition-all hover:border-creatory-orange/40 md:h-[82px] md:min-h-0">
                <div className="flex items-center justify-between text-creatory-gray">
                  <span className="text-[9px] font-bold uppercase tracking-wide md:text-[10px]"> {language === 'EN' ? 'Total Items Sold' : 'จำนวนการขาย'}</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-creatory-orange">
                    <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <div className="-translate-y-1 flex items-baseline gap-1">
                    <span className="text-lg font-extrabold leading-5 md:text-xl">195</span>
                    <span className="text-[9px] font-semibold text-creatory-gray">{language === 'EN' ? 'Items' : 'รายการ'}</span>
                  </div>
                  <p className="text-[9px] leading-3 text-creatory-gray md:text-[10px]">{language === 'EN' ? 'Clearance Rate' : 'อัตราการขาย'}: <strong className="font-semibold text-creatory-navy">85%</strong></p>
                </div>
              </div>

              <div className="flex min-h-[96px] min-w-0 flex-col justify-between rounded-[14px] border border-creatory-pink/40 bg-gradient-to-br from-creatory-lavender to-white p-2.5 shadow-[0_4px_20px_rgba(124,92,255,0.08)] md:h-[82px] md:min-h-0">
                <div className="flex items-center justify-between text-creatory-gray">
                  <span className="text-[9px] font-bold uppercase tracking-wide text-creatory-navy md:text-[10px]"> {language === 'EN' ? 'Total Revenue' : 'รายได้รวม'}</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-creatory-pink to-creatory-orange text-white shadow-sm">
                    <Banknote className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <div className="-translate-y-1 flex items-baseline gap-1.5">
                    <span className="text-lg font-extrabold leading-5 tracking-tight md:text-xl">฿20,770</span>
                  </div>
                  <p className="text-[9px] font-semibold leading-3 text-primary md:text-[10px]"> {language === 'EN' ? 'Avg' : 'เฉลี่ย'} ฿6,923 / {language === 'EN' ? 'run intake' : 'รัน'}</p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="min-h-12 rounded-[14px] border border-creatory-border bg-white p-[5px] shadow-sm sm:h-[46px] sm:min-h-0 sm:p-[7px]">
              <div className="h-full flex items-center gap-2 bg-creatory-canvas border border-creatory-border rounded-[10px] px-2 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all">
                <span className="material-symbols-outlined text-creatory-gray text-[14px]">search </span>
                <input
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'EN' ? 'Search completed runs by name, location, or date...' : 'ค้นหาการรันที่เสร็จสิ้นโดยชื่อ, สถานที่, หรือวันที่...'} 
                  className="min-w-0 w-full bg-transparent text-sm font-medium text-creatory-navy placeholder-creatory-gray focus:outline-none sm:text-xs"
                />
                {searchQuery && (
                  <button aria-label="Clear search" onClick={() => setSearchQuery('')} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-creatory-gray hover:text-creatory-navy sm:h-auto sm:w-auto">
                    <span className="material-symbols-outlined text-[14px]"> {language === 'EN' ? 'cancel' : 'cancel'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* List Header */}
            <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 px-0.5 text-[10px] font-semibold leading-4 text-creatory-gray">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[12px] text-primary">folder_special</span>
                <span>{language === 'EN' ? 'Archived Runs' : 'รันที่ถูกเก็บรักษา'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span> {language === 'EN' ? 'Sorted by' : 'เรียงตาม'}</span>
                <span className="text-creatory-navy font-bold">{language === 'EN' ? 'Most Recent Close' : 'การปิดล่าสุด'}</span>
              </div>
            </div>

            {/* Cards Container */}
            <div className="mt-[2px] flex flex-col gap-[10px]">
              {filteredRuns.length > 0 ? (
                filteredRuns.map((run) => (
                  <div key={run.id} className="min-w-0 rounded-[14px] border border-creatory-border bg-white px-3 py-3 transition-all hover:border-primary/40 hover:shadow-[0_8px_24px_rgba(124,92,255,0.06)] sm:px-4">
                    <div className="flex min-w-0 flex-col gap-3 px-2 py-1 sm:px-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex min-w-0 flex-col gap-1 md:flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-primary/20 bg-creatory-lavender px-1.5 py-0.5 text-[10px] font-bold text-primary">
                          <span className="w-1 h-1 rounded-full bg-primary"></span>
                          {language === 'EN' ? 'Settled & Closed' : 'ปิดแล้ว'}
                        </span>
                      </div>
                      <h2 className="mt-0.5 break-words text-sm font-bold leading-5 tracking-tight sm:text-base">{run.title} ({run.shortDay})</h2>
                      <p className="text-[10px] text-creatory-gray">{run.date}</p>
                    </div>
                    
                    <div className="flex min-w-0 flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:self-center md:ml-auto">
                      <div className="grid w-full grid-cols-3 gap-2 md:w-auto md:flex md:items-center md:gap-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-creatory-gray"> {language === 'EN' ? 'Total Sold' : 'ขายรวม'}</span>
                          <span className="text-xs font-bold">{run.sold} {language === 'EN' ? 'items' : 'ชิ้น'}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-creatory-gray"> {language === 'EN' ? 'Gross' : 'รวม'}</span>
                          <span className="text-xs font-bold">{run.gross}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary"> {language === 'EN' ? 'Net Intake' : 'รายได้สุทธิ'}</span>
                          <span className="text-xs font-extrabold text-primary">{run.net}</span>
                        </div>
                      </div>
                      <Link href={`/sales/completed/${run.id}`} className="inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-primary to-[#6842FF] px-3 py-2 text-center text-xs font-bold text-white transition-all shadow-sm shadow-primary/30 hover:from-[#6A47F2] hover:to-[#5730EA] md:min-h-0 md:w-auto md:whitespace-nowrap md:px-[10px] md:py-1.5 md:text-[10px]">
                        <span> {language === 'EN' ? 'View Run Breakdown' : 'รายละเอียดการขาย'}</span>
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
                    <h3 className="text-base font-bold">{language === 'EN' ? 'No completed runs match your query' : 'ไม่มีการขายที่เสร็จสมบูรณ์ตรงกับการค้นหาของคุณ'}</h3>
                    <p className="text-xs text-creatory-gray"> {language === 'EN' ? 'Try searching with a different market name or switch your date filter range.' : 'ลองค้นหาด้วยชื่อตลาดอื่นหรือเปลี่ยนช่วงเวลาในการกรอง'}</p>
                  </div>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 rounded-xl bg-creatory-lavender text-primary font-bold text-xs hover:bg-primary hover:text-white transition-all shadow-sm"
                  >
                     {language === 'EN' ? 'Clear Search & Filters' : 'ล้างการค้นหาและตัวกรอง'}
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