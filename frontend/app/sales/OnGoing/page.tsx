"use client";
import React, { useEffect, useState } from 'react';
import { 
  Store, 
  User, 
  Search, 
  ArrowRight, 
  Plus, 
  ArrowUpRight, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Footer from "@/app/components/footer";
import Link from 'next/link';
import Navbar from '@/app/components/navbar';
import { matchesSalesRun } from '../../features/OnGoing/utils/search';
import { getRunTiming } from '../../features/OnGoing/utils/time';

type SalesRun = {
  id: number;
  isOwner: boolean;
  title: string;
  status: boolean;
  boothtimecreate: string;
  boothtimeEnd: string;
  grossSales: number;
  netSales: number;
  itemsCleared: number;
  itemsCleardMax: number;
  soldPercentage: number;
  boothStaffMax: number;
  boothStaffList: string[];
};

export default function ConsignDeskDashboard() {
  const [activeTab, setActiveTab] = useState('Ongoing');
  const [filter, setFilter] = useState('All Ongoing');
  const [searchQuery, setSearchQuery] = useState('');
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const updateNow = () => setNow(Date.now());
    const initialTimer = window.setTimeout(updateNow, 0);
    const timer = window.setInterval(updateNow, 60_000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  // ข้อมูลจำลองของการขาย (Sales Runs Data)
  const salesRuns: SalesRun[] = [
    {
      id: 1,
      isOwner: true,
      title: 'งานที่จัดขึ้นที่เชียงใหม่',
      status: false,
      boothtimecreate: '2026-10-24T04:00:00Z',
      boothtimeEnd: '2026-10-31T04:00:00Z',
      grossSales: 8490.00,
      netSales: 8420.00,
      itemsCleared: 66,
      itemsCleardMax: 103,
      soldPercentage: 64,
      boothStaffMax: 6,
      boothStaffList: ['@may_craft', '@...'],
    },
    {
      id: 2,
      isOwner: true,
      title: 'Nimman Artisan Weekend Pop-up',
      status: true,
      boothtimecreate: '2026-10-20T10:00:00Z',
      boothtimeEnd: '2026-10-27T10:00:00Z',
      grossSales: 4350.00,
      netSales: 4190.00,
      itemsCleared: 38,
      itemsCleardMax: 70  ,
      soldPercentage: 54,
      boothStaffMax: 6,
      boothStaffList: ['@ploy_w'],
    },
     {
      id: 3,
      isOwner: true,
      title: 'Chiang Mai Craft Fair (One Nimman)',
      status: false,
      boothtimecreate: '2026-10-25T03:00:00Z',
      boothtimeEnd: '2026-11-01T03:00:00Z',
      grossSales: 2080.00,
      netSales: 2010.00,
      itemsCleared: 14,
      itemsCleardMax: 45,
      soldPercentage: 31,
      boothStaffMax: 6,
      boothStaffList: ['@art_kajoifaoiwfhiahfo'],
    },
    {
      id: 4,
      isOwner: false,
      title: 'Chiang Mai Craft Fair (One Nimman)',
      status: true,
      boothtimecreate: '2026-10-25T03:00:00Z',
      boothtimeEnd: '2026-11-01T03:00:00Z',
      grossSales: 2080.00,
      netSales: 2010.00,
      itemsCleared: 14,
      itemsCleardMax: 45,
      soldPercentage: 31,
      boothStaffMax: 6,
      boothStaffList: ['@art_k',"daw",'@art_k',"daw",'@art_k',"daw"],
    },
    
    
  ];
  const filteredSalesRuns = salesRuns.filter((run) => matchesSalesRun(run, searchQuery, filter));

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-[#1c1d36] font-sans antialiased selection:bg-purple-100 selection:text-purple-700 ">
      
      {/* 1. Header Navigation Bar */}
      <Navbar />

      {/* Main Container */}
      <main className="mx-auto mt-15 mb-10 w-full max-w-[1280px] space-y-6 px-4 pt-6 md:w-[85%] md:px-8">
        
        {/* Page Title & Status Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#161233] sm:text-[22px]">
            Ongoing Sales Runs
          </h1>
          
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efebff] text-[#6c5ce7] border border-[#e1d9ff]">
              <span className="w-2 h-2 rounded-full bg-[#6c5ce7]"></span>
              Active Runs: {salesRuns.length} / 5 Max Capacity
            </span>
            {salesRuns.length < 5 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f8f0] text-[#10b981] border border-[#d1f4e0]">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                {5 - salesRuns.length} Slots Available
              </span>
            )}
            {salesRuns.length >= 5 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-200/50 text-red-500 border border-red-300/50">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Slots Not Available
              </span>
            )}
          
          </div>
        </div>

        {/* Search Bar & Filter Options */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 justify-between items-center">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <label htmlFor="sales-run-search" className="sr-only">
              Search ongoing sales runs
            </label>
            <Search aria-hidden="true" className="pointer-events-none w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="sales-run-search"
              type="search"
              list="sales-run-options"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              autoComplete="off"
              placeholder="Search by name, location, or assistant..."
              className="w-full bg-[#f6f7fb] text-xs font-medium text-slate-700 pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all placeholder:text-slate-500"
            />
            <datalist id="sales-run-options">
              {salesRuns.map((run) => (
                <option key={run.id} value={run.title}>
                  {run.boothStaffList.join(', ')}
                </option>
              ))}
            </datalist>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#f6f7fb] p-1 rounded-xl text-xs font-semibold text-slate-500 w-full md:w-auto">
            {['All Ongoing', 'Host Owned', 'Assistant In'].map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg transition-all ${
                  filter === item
                    ? 'bg-white text-[#6c5ce7] shadow-sm font-bold'
                    : 'hover:text-slate-800'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Cards List (Sales Runs) */}
        <div id="sales-run-list" className="space-y-4" aria-live="polite">
          {filteredSalesRuns.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
              <p className="text-sm font-bold text-slate-800">No matching sales runs</p>
              <p className="mt-1 text-xs text-slate-500">Try another search or filter.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setFilter('All Ongoing');
                }}
                className="mt-4 rounded-xl bg-[#6c5ce7] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#5b4bc4] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
              >
                Show all runs
              </button>
            </div>
          )}
          {filteredSalesRuns.map((run) => {
            const timing = getRunTiming(
              run.boothtimecreate,
              run.boothtimeEnd,
              now ?? Date.parse(run.boothtimecreate),
            );

            return <div
              key={run.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 relative overflow-hidden transition-all hover:shadow-md"
            >
              {/* Gradient Accent Bar at Top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f97316]"></div>

              <div className="flex flex-col lg:mx-auto lg:w-[92%] lg:flex-row lg:items-center lg:justify-between gap-2 pt-1">
                
                {/* Left Info Column */}
                <div className="space-y-1 flex-1">
                  
                  {/* Status Badge */}
                  <div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${run.status ? 'bg-[#e8f8f0]  text-[#10b981]' : 'bg-[#ffebee] text-red-500'} text-[9px] font-bold tracking-wider`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${run.status ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
                      {run.status ? 'LIVE RUN ACTIVE' : 'RUN INACTIVE'}
                    </span>
                  </div>

                  {/* Run Title */}
                  <h2 className="text-sm font-bold text-[#141527] tracking-tight">
                    {run.title}
                  </h2>

                  {/* Progress Line and Time Details */}
                  <div className="space-y-1 max-w-xl">
                    <div className="flex justify-between text-[10px] font-semibold">
                      <span className="text-slate-800"> Elapsed: {timing.elapsed}</span>
                      <span className="text-[#6c5ce7]">{timing.remaining}</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full bg-[#eef0f6] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#7c3aed] to-[#ec4899] h-full rounded-full transition-all duration-500"
                        style={{ width: `${timing.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Center Stats Block */}
                <div className="bg-[#f8f9fd] border border-slate-100/80 rounded-lg p-2 px-2.5 flex items-center justify-between gap-2 min-w-max">
                  {/* Gross Sales */}
                  <div>
                    <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                      Gross Sales
                    </p>
                    <p className="text-sm font-extrabold text-[#11122a] leading-snug">
                      ฿{run.grossSales.toLocaleString('en-US')}
                    </p>
                    <p className="text-[10px] font-medium text-slate-500">
                     Net ฿{run.netSales.toLocaleString('en-US')}
                    </p>
                  </div>

                  <div className="w-px h-6 bg-slate-200/60"></div>

                  {/* Items Cleared */}
                  <div>
                    <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                      Items Cleared
                    </p>
                    <p className="text-sm font-extrabold text-[#11122a] leading-snug">
                      {run.itemsCleared} / {run.itemsCleardMax}
                    </p>
                    <p className="text-[10px] font-semibold text-[#10b981]">
                      {run.soldPercentage} % sold out
                    </p>
                  </div>

                  <div className="w-px h-6 bg-slate-200/60"></div>

                  {/* Booth Staff */}
                  <div>
                    <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                      Booth Staff
                    </p>
                    <p className="text-sm font-extrabold text-[#11122a] leading-snug">
                      {run.boothStaffList.length} / {run.boothStaffMax}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400">
                      
                      {run.boothStaffList.length < run.boothStaffMax
                        ? `Available Slots: ${run.boothStaffMax - run.boothStaffList.length}`
                        : 'No Available Slots'}

                    </p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-1 min-w-[140px] justify-center">
                  <Link href={`/sales/OnGoing/${run.id}`} className="w-full bg-[#6c5ce7] hover:bg-[#5b4bc4] text-white text-[10px] font-bold py-1.5 px-2.5 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5 group">
                    <span>Enter Sales Terminal</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link href={`/ViewUser/${run.id}`} target="_blank" className="w-full bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold py-1 px-2.5 rounded-lg border border-slate-200/80 transition-all duration-200 text-center">
                    Live Sales Activity
                  </Link>
                </div>

              </div>
            </div>;
            
          })}
        </div>

        {/* 3. Bottom Dashed Card (Available Run Slots) */}
        {salesRuns.length < 5 && (
        <div className="border-2 border-dashed border-[#d8d0ff] bg-[#f9f8ff]/60 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            {/* Slot Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#e8e2ff] flex items-center justify-center text-[#6c5ce7] shrink-0">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            
            {/* Slot Details */}
            
              <div>
              <h3 className="text-sm font-bold text-[#1a1836]">
               {5- salesRuns.length} Left Available Run Slots 
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                You can launch up to {5 - salesRuns.length} more concurrent booths before reaching your 5–run plan limit.
              </p>
            </div>
            
            
          </div>

          {/* Launch Button */}
          <Link href="/SaleRun" className="w-full md:w-auto bg-white hover:bg-purple-50 text-[#6c5ce7] text-xs font-bold py-2.5 px-5 rounded-xl border border-[#c4b5fd] shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5 shrink-0">
            <Plus className="w-4 h-4" />
            <span>Launch Next Run</span>
          </Link>
        </div>
        )}

      </main>

      {/* Footer */}
        <Footer/>

    </div>
  );
}