"use client";
import React, { useState } from 'react';
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
import Navbar from '@/app/components/navbar';
export default function ConsignDeskDashboard() {
  const [activeTab, setActiveTab] = useState('Ongoing');
  const [filter, setFilter] = useState('All Ongoing');

  // ข้อมูลจำลองของการขาย (Sales Runs Data)
  const salesRuns = [
    {
      id: 1,
      title: 'MFU Outside Night Market (Mon 14)',
      status: 'LIVE RUN ACTIVE',
      elapsedText: 'Duration: 1d 4h elapsed',
      remainingText: '5d 20h remaining of 7d max',
      progressPercent: 20, // (1.16/7)
      grossSales: '฿8,490.00',
      netSales: 'Net ฿8,420',
      itemsCleared: '66 / 103',
      soldPercentage: '64% sold out',
      boothStaffCount: '2 / 6',
      boothStaffList: '@may_craft, @...',
    },
    {
      id: 2,
      title: 'Nimman Artisan Weekend Pop-up',
      status: 'LIVE RUN ACTIVE',
      elapsedText: 'Elapsed: 4d 18h',
      remainingText: '2d 6h remaining of 7d max',
      progressPercent: 68,
      grossSales: '฿4,350.00',
      netSales: 'Net ฿4,190',
      itemsCleared: '38 / 70',
      soldPercentage: '54% sold out',
      boothStaffCount: '1 / 6',
      boothStaffList: '@ploy_w',
    },
    {
      id: 3,
      title: 'Chiang Mai Craft Fair (One Nimman)',
      status: 'LIVE RUN ACTIVE',
      elapsedText: 'Elapsed: 5h 20m',
      remainingText: '6d 18h remaining of 7d max',
      progressPercent: 8,
      grossSales: '฿2,080.00',
      netSales: 'Net ฿2,010',
      itemsCleared: '14 / 45',
      soldPercentage: '31% sold out',
      boothStaffCount: '1 / 6',
      boothStaffList: '@art_k',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-[#1c1d36] font-sans pb-12 antialiased selection:bg-purple-100 selection:text-purple-700">
      <Navbar />
      {/* 1. Header Navigation Bar */}
      

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6 space-y-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <span className="hover:text-slate-600 cursor-pointer">Home</span>
          <span>/</span>
          <span className="hover:text-slate-600 cursor-pointer">Sales Runs</span>
          <span>/</span>
          <span className="text-[#6c5ce7] font-semibold">Ongoing Runs</span>
        </div>

        {/* Page Title & Status Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#161233]">
            Ongoing Sales Runs
          </h1>
          
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efebff] text-[#6c5ce7] border border-[#e1d9ff]">
              <span className="w-2 h-2 rounded-full bg-[#6c5ce7]"></span>
              Active Runs: 3 / 5 Max Capacity
            </span>
            
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#e8f8f0] text-[#10b981] border border-[#d1f4e0]">
              2 Slots Available
            </span>
          </div>
        </div>

        {/* Search Bar & Filter Options */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 justify-between items-center">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search ongoing runs by name, location, or assistant..."
              className="w-full bg-[#f6f7fb] text-xs font-medium text-slate-700 pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-purple-300 focus:bg-white focus:outline-none transition-all placeholder-slate-400"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#f6f7fb] p-1 rounded-xl text-xs font-semibold text-slate-500 w-full md:w-auto">
            {['All Ongoing', 'Host Owned', 'Assistant In'].map((item) => (
              <button
                key={item}
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
        <div className="space-y-4">
          {salesRuns.map((run) => (
            <div
              key={run.id}
              className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 relative overflow-hidden transition-all hover:shadow-md"
            >
              {/* Gradient Accent Bar at Top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f97316]"></div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-1">
                
                {/* Left Info Column */}
                <div className="space-y-3 flex-1">
                  
                  {/* Status Badge */}
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e8f8f0] text-[11px] font-bold tracking-wider text-[#10b981]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                      {run.status}
                    </span>
                  </div>

                  {/* Run Title */}
                  <h2 className="text-xl font-bold text-[#141527] tracking-tight">
                    {run.title}
                  </h2>

                  {/* Progress Line and Time Details */}
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800">{run.elapsedText}</span>
                      <span className="text-[#6c5ce7]">{run.remainingText}</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full bg-[#eef0f6] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#7c3aed] to-[#ec4899] h-full rounded-full transition-all duration-500"
                        style={{ width: `${run.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Center Stats Block */}
                <div className="bg-[#f8f9fd] border border-slate-100/80 rounded-2xl p-3.5 px-5 flex items-center justify-between gap-6 md:gap-8 min-w-max">
                  {/* Gross Sales */}
                  <div>
                    <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                      Gross Sales
                    </p>
                    <p className="text-lg font-extrabold text-[#11122a] leading-snug">
                      {run.grossSales}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500">
                      {run.netSales}
                    </p>
                  </div>

                  <div className="w-px h-8 bg-slate-200/60"></div>

                  {/* Items Cleared */}
                  <div>
                    <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                      Items Cleared
                    </p>
                    <p className="text-lg font-extrabold text-[#11122a] leading-snug">
                      {run.itemsCleared}
                    </p>
                    <p className="text-[11px] font-semibold text-[#10b981]">
                      {run.soldPercentage}
                    </p>
                  </div>

                  <div className="w-px h-8 bg-slate-200/60"></div>

                  {/* Booth Staff */}
                  <div>
                    <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                      Booth Staff
                    </p>
                    <p className="text-lg font-extrabold text-[#11122a] leading-snug">
                      {run.boothStaffCount}
                    </p>
                    <p className="text-[11px] font-medium text-slate-400">
                      {run.boothStaffList}
                    </p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 min-w-[200px] justify-center">
                  <button className="w-full bg-[#6c5ce7] hover:bg-[#5b4bc4] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 group">
                    <span>Enter Sales Terminal</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button className="w-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold py-2 px-4 rounded-xl border border-slate-200/80 transition-all duration-200 text-center">
                    Live Sales Activity
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* 3. Bottom Dashed Card (Available Run Slots) */}
        <div className="border-2 border-dashed border-[#d8d0ff] bg-[#f9f8ff]/60 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            {/* Slot Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#e8e2ff] flex items-center justify-center text-[#6c5ce7] shrink-0">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            
            {/* Slot Details */}
            <div>
              <h3 className="text-sm font-bold text-[#1a1836]">
                Available Run Slots (Slots 4 & 5 of 5)
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                You can launch up to 2 more concurrent booths before reaching your 5–run plan limit.
              </p>
            </div>
          </div>

          {/* Launch Button */}
          <button className="w-full md:w-auto bg-white hover:bg-purple-50 text-[#6c5ce7] text-xs font-bold py-2.5 px-5 rounded-xl border border-[#c4b5fd] shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5 shrink-0">
            <Plus className="w-4 h-4" />
            <span>Launch Next Run</span>
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 md:px-8 mt-12 text-xs font-medium text-slate-400">
        © 2025 ConsignDesk POS • Artisanal Market System
      </footer>

    </div>
  );
}