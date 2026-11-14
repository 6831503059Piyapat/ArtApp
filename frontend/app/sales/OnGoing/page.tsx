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
import {getAuth,onAuthStateChanged} from "firebase/auth";

import { getRunTiming } from '../../features/OnGoing/utils/time';

type SalesRun = {
  id: string;
  isOwner: boolean;
  title: string;
  status: boolean;
  booth_time_create: string;
  boothtimeEnd: string;
  grossSales: number;
  netSales: number;
  itemsCleared: number;
  itemsClearedMax: number;
  soldPercentage: number;
  boothStaffMax: number;
  boothStaffList: number;
};

export default function ConsignDeskDashboard() {
  const [filter, setFilter] = useState('All Ongoing');
  const [searchQuery, setSearchQuery] = useState('');
  const [salesRunsFetch, setSalesRunsFetch] = useState<SalesRun[]>([]);
  const [now, setNow] = useState<number | null>(null);
  const [language, setLanguage] = useState<'EN' | 'TH'>('EN'); 
  async function fetchOngoingList(token: string) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/backend/ongoing-list',{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to load ongoing sales: ${response.status}`);
    }
    const data = await response.json();
    console.log("Ongoing Sales Runs:", data);
    setSalesRunsFetch(data);
  }
  useEffect(() => {
    const auth = getAuth();
    const updateNow = () => setNow(Date.now());
    const initialTimer = window.setTimeout(updateNow, 0);
    const timer = window.setInterval(updateNow, 60_000);
    setLanguage(localStorage.getItem('language') === 'TH' ? 'TH' : 'EN');
     const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if(user){
    const idToken = await user?.getIdToken();
    fetchOngoingList(idToken);
    }
    
  });
    
    return () => {
      unsubscribe();
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);


  
  const filteredSalesRuns = salesRunsFetch.filter((run) => matchesSalesRun(run, searchQuery, filter));
  
  return (
    <div className="min-h-screen bg-[#f7f8fc] text-[#1c1d36] font-sans antialiased selection:bg-purple-100 selection:text-purple-700 ">
      
      {/* 1. Header Navigation Bar */}
      <Navbar />

      {/* Main Container */}
      <main className="mx-auto mt-15 mb-10 w-full max-w-[1280px] space-y-6 px-4 pt-6 md:w-[85%] md:px-8">
        
        {/* Page Title & Status Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#161233] sm:text-[22px]">
            {language === 'EN' ? 'Ongoing Sales Runs' : 'รายการขายที่กำลังดำเนินอยู่'}
          </h1>
          
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efebff] text-[#6c5ce7] border border-[#e1d9ff]">
              <span className="w-2 h-2 rounded-full bg-[#6c5ce7]"></span>
               {language === 'EN' ? 'Active Runs' : 'รายการที่กำลังดำเนินอยู่'} {salesRunsFetch?.length || 0} / 5 {language === 'EN' ? 'Max Capacity' : 'ความจุสูงสุด'}
            </span>
            {salesRunsFetch?.length < 5 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f8f0] text-[#10b981] border border-[#d1f4e0]">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                {5 - salesRunsFetch?.length}  {language === 'EN' ? 'Slots Available' : 'ช่องที่สามารถใช้ได้'}
              </span>
            )}
            {salesRunsFetch?.length >= 5 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-200/50 text-red-500 border border-red-300/50">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                 {language === 'EN' ? 'No more slots available' : 'ไม่มีช่องว่างเหลืออยู่'}
              </span>
            )}
          
          </div>
        </div>

        {/* Search Bar & Filter Options */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 justify-between items-center">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <label htmlFor="sales-run-search" className="sr-only">
             {language === 'EN' ? 'Search ongoing sales runs' : 'ค้นหารายการขายที่กำลังดำเนินอยู่'}
            </label>
            <Search aria-hidden="true" className="pointer-events-none w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="sales-run-search"
              type="search"
              list="sales-run-options"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              autoComplete="off"
              placeholder={language === 'EN' ? 'Search by name or location...' : 'ค้นหาตามชื่อหรือสถานที่...'}
              className="w-full bg-[#f6f7fb] text-xs font-medium text-slate-700 pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all placeholder:text-slate-500"
            />
            <datalist id="sales-run-options">
              {salesRunsFetch.map((run) => (
                <option key={run.id} value={run.title}>
                  {run.id}
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
              <p className="text-sm font-bold text-slate-800"> {language === 'EN' ? 'No matching sales runs' : 'ไม่มีรายการขายที่ตรงกับการค้นหา'}</p>
              <p className="mt-1 text-xs text-slate-500"> {language === 'EN' ?'Try another search or filter.' : 'ลองค้นหาหรือกรองอีกครั้ง'}</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setFilter('All Ongoing');
                }}
                className="mt-4 rounded-xl bg-[#6c5ce7] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#5b4bc4] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
              >
                Show all runs {language === 'EN' ? 'Show all runs' : 'แสดงทั้งหมด'}
              </button>
            </div>
          )}
          {filteredSalesRuns.map((run) => {
            const timing = getRunTiming(
              run.booth_time_create,
              run.boothtimeEnd,
              now ?? Date.parse(run.booth_time_create),
            );

            return <div
              key={run.id}
              className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-slate-100 relative overflow-hidden transition-all hover:shadow-md"
            >
              <div className="flex min-w-0 flex-col gap-3 px-2 py-1 sm:px-3 md:grid md:grid-cols-[minmax(0,1fr)_minmax(280px,auto)] md:items-center lg:flex lg:w-full lg:flex-row lg:justify-between">
                
                {/* Left Info Column */}
                <div className="min-w-0 flex-1 space-y-1">
                  
                  {/* Status Badge */}
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f8f0] px-2 py-0.5 text-[9px] font-bold tracking-wider text-[#10b981]">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></span>
                       {language === 'EN' ? 'Active run' : 'รายการที่กำลังดำเนินอยู่'}
                    </span>
                  </div>

                  {/* Run Title */}
                  <h2 className="break-words text-sm font-bold text-[#141527] tracking-tight sm:text-base">
                    {run.title}
                  </h2>

                  {/* Progress Line and Time Details */}
                  <div className="w-full max-w-xl space-y-1 md:max-w-[220px] lg:max-w-xl">
                    <div className="flex flex-wrap justify-between gap-x-3 gap-y-0.5 text-[10px] font-semibold">
                      <span className="text-slate-800"> {language === 'EN' ? 'Elapsed' : 'ผ่านไปแล้ว'}: {timing.elapsed}</span>
                      <span className="text-[#6c5ce7]">{language === 'EN' ? 'Remaining' : 'เหลืออีก'}: {timing.remaining}</span>
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
                <div className="bg-[#f8f9fd] border border-slate-100/80 rounded-lg p-1 px-5 flex w-full min-w-0 items-center justify-center gap-0 md:col-span-1 md:w-auto lg:flex-none lg:justify-center">
                  {/* Gross Sales */}
                  <div className="min-w-0 text-center">
                    <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                      {language === 'EN' ? 'Gross Sales' : 'ยอดขายรวม'}
                    </p>
                    <p className="text-sm font-extrabold text-[#11122a] leading-snug">
                      ฿{run.grossSales.toLocaleString('en-US')}
                    </p>
                    <p className="text-[10px] font-medium text-slate-500">
                     Net ฿{run.netSales.toLocaleString('en-US')}
                    </p>
                  </div>

                  <div className="mx-1 w-px h-6 shrink-0 bg-slate-200/60"></div>

                  {/* Items Cleared */}
                  <div className="min-w-0 text-center">
                    <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                      {language === 'EN' ? 'Items Cleared' : 'สินค้าที่ขายแล้ว'}
                    </p>
                    <p className="text-sm font-extrabold text-[#11122a] leading-snug">
                      {run.itemsCleared} / {run.itemsClearedMax}
                    </p>
                    <p className="text-[10px] font-semibold text-[#10b981]">
                      {run.soldPercentage} % {language === 'EN' ? 'sold out' : 'ขายหมดแล้ว'}
                    </p>
                  </div>

                  <div className="mx-1 w-px h-6 shrink-0 bg-slate-200/60"></div>

                  {/* Booth Staff */}
                  <div className="min-w-0 text-center">
                    <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                      {language === 'EN' ? 'Booth Staff' : 'ผู้ช่วยขาย'}
                    </p>
                    <p className="text-sm font-extrabold text-[#11122a] leading-snug">
                      {run.boothStaffList} / {run.boothStaffMax}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400">
                      
                      {run.boothStaffList < run.boothStaffMax
                        ? language === 'EN' ? `Available Slots: ${run.boothStaffMax - run.boothStaffList}` : `ช่องว่างที่เหลือ: ${run.boothStaffMax - run.boothStaffList}`
                        : 'No Available Slots'}

                    </p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex min-w-0 flex-col gap-1 sm:flex-row md:col-span-2 md:justify-end lg:col-span-1 lg:min-w-[140px] lg:flex-col">
                  <Link href={`/ViewUser/${run.id}`} target="_blank" className="w-full bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold py-1 px-2.5 rounded-lg border border-slate-200/80 transition-all duration-200 text-center">
                     {language === 'EN' ? 'Live Sales Activity' : 'ไลฟ์กิจกรรมการขาย'}
                  </Link>
                  <Link href={`/sales/OnGoing/${run.id}`} className="w-full bg-[#6c5ce7] hover:bg-[#5b4bc4] text-white text-[10px] font-bold py-1.5 px-2.5 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5 group">
                    <span>{language === 'EN' ? 'Enter Sales Terminal' : 'เข้าสู่ระบบขาย'}</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

              </div>
            </div>;
            
          })}
        </div>

        {/* 3. Bottom Dashed Card (Available Run Slots) */}
        {salesRunsFetch?.length < 5 && (
        <div className="border-2 border-dashed border-[#d8d0ff] bg-[#f9f8ff]/60 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            {/* Slot Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#e8e2ff] flex items-center justify-center text-[#6c5ce7] shrink-0">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            
            {/* Slot Details */}
            
              <div>
              <h3 className="text-sm font-bold text-[#1a1836]">
               {5- salesRunsFetch?.length}  {language === 'EN' ? 'Left Available Run Slots' : 'ช่องว่างที่เหลือ'}
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                 {language === 'EN' ? 'You can launch up to' : 'คุณสามารถเริ่มต้นได้อีก'} {5 - salesRunsFetch?.length} {language === 'EN' ? 'Once you reach the limit, you will need to wait for a run to complete before starting a new one.' : 'เมื่อคุณถึงขีดจำกัดแล้ว คุณจะต้องรอให้กิจกรรมหนึ่งเสร็จสิ้นก่อนจึงจะเริ่มต้นใหม่ได้'}
              </p>
            </div>
            
            
          </div>
          
          {/* Launch Button */}
          <Link href="/SaleRun" className="w-full md:w-auto bg-white hover:bg-purple-50 text-[#6c5ce7] text-xs font-bold py-2.5 px-5 rounded-xl border border-[#c4b5fd] shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5 shrink-0">
            <Plus className="w-4 h-4" />
            <span>{language === 'EN' ? 'Launch Next Run ' : 'เริ่มต้นกิจกรรมใหม่ '}</span>
          </Link>
        </div>
        )}

      </main>

      {/* Footer */}
      <div className="mt-75">
        <Footer/>
      </div>
        

    </div>
  );
}