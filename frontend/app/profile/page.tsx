'use client';
import Navbar from '@/app/components/navbar';
import React, { useState,useEffect } from 'react';
import { Store, User, CheckCircle2, Save, SlidersHorizontal } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Completed');
  const [language, setLanguage] = useState<'EN' | 'TH'>('EN');
  const [currency, setCurrency] = useState('THB');
  const [currencySymbol, setCurrencySymbol] = useState('฿');
  const [username, setUsername] = useState('Alex Chen');
  const [stallAlias, setStallAlias] = useState('alexchen');
  const [email, setEmail] = useState('alex.chen@artmarket.io');
  const [showToast, setShowToast] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  function handleLanguageChange(lang: 'EN' | 'TH') {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
  }

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCurrency(val);
    const symbols: Record<string, string> = { THB: '฿', USD: '$', EUR: '€', JPY: '¥' };
    setCurrencySymbol(symbols[val] || '฿');
    localStorage.setItem('Currency', currency.toString());
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || '');
        setStallAlias(user.email?.split('@')[0] || '');
        setEmail(user.email || '');
        setProfileImage(user.photoURL || null);
      }
    });
  }, []);

  return (
    <div className="relative isolate min-h-screen flex flex-col bg-[#f7f8fc] text-[#0B0F4F] font-sans antialiased">
      <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 bg-[#0B0F4F] text-white px-5 py-3.5 rounded-2xl shadow-2xl transition-all duration-300 border border-[#0B0F4F]/80 ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        <span className="text-sm font-semibold">Changes saved successfully!</span>
      </div>

      <Navbar/>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 top-[82px] z-0 overflow-hidden">
        <div className="absolute -left-40 top-[4%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(240,98,192,0.22)_0%,rgba(240,98,192,0.1)_42%,transparent_72%)] blur-3xl" />
        <div className="absolute -right-36 top-[30%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.2)_0%,rgba(124,92,255,0.09)_46%,transparent_74%)] blur-3xl" />
        <div className="absolute left-[28%] top-[62%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,178,76,0.2)_0%,rgba(255,178,76,0.09)_46%,transparent_74%)] blur-3xl" />
      </div>

      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 py-8 mt-10">
        <h1 className="text-3xl font-extrabold text-[#0B0F4F] mb-6 tracking-tight">User Profile</h1>
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm p-6 md:p-8">
            <div className="bg-gradient-to-r from-[#7C5CFF]/5 to-[#7C5CFF]/[0.02] border border-[#7C5CFF]/15 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/25 text-[#7C5CFF] font-bold text-2xl flex items-center justify-center shrink-0">AC</div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-bold text-[#0B0F4F]">{username}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#7C5CFF]/10 text-[#7C5CFF] border border-[#7C5CFF]/20">@{stallAlias}</span>
              </div>
              <p className="text-sm font-medium text-slate-500">{email}</p>
              <div className="flex items-center gap-2 text-xs font-medium text-[#7C5CFF] bg-[#7C5CFF]/5 px-3 py-1 rounded-full w-fit border border-[#7C5CFF]/15 mt-2">
                <span className="w-2 h-2 rounded-full bg-[#7C5CFF] animate-pulse"></span>Active Host: MFU Night Market (MON 14)
              </div>
            </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm p-6 md:p-8 space-y-5">
            <div className="border-b border-slate-100 pb-3"><h3 className="text-lg font-bold text-[#0B0F4F]">Personal information</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-[#7C5CFF] focus:bg-white rounded-xl px-4 py-3 text-sm font-medium text-[#0B0F4F] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Stall Alias</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">@</span>
                  <input type="text" value={stallAlias} onChange={(e) => setStallAlias(e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-[#7C5CFF] focus:bg-white rounded-xl pl-8 pr-4 py-3 text-sm font-medium text-[#0B0F4F] outline-none" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-[#7C5CFF] focus:bg-white rounded-xl px-4 py-3 text-sm font-medium text-[#0B0F4F] outline-none" />
              </div>
            </div>

          <div className="border-t border-slate-100 pt-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#7C5CFF]/10 text-[#7C5CFF] rounded-lg"><SlidersHorizontal className="w-4 h-4" /></div>
                <h3 className="text-base font-bold text-[#0B0F4F]">App Preferences & Language</h3>
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#7C5CFF]/10 text-[#7C5CFF] border border-[#7C5CFF]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFF]"></span>Auto-saved
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Display Language</label>
                <div className="bg-white p-1 rounded-xl border border-slate-200 flex shadow-sm">
                  <button type="button" onClick={() => handleLanguageChange('EN')} className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold ${language === 'EN' ? 'bg-[#7C5CFF] text-white' : 'text-slate-500'}`}>✓ English (EN)</button>
                  <button type="button" onClick={() => handleLanguageChange('TH')} className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold ${language === 'TH' ? 'bg-[#7C5CFF] text-white' : 'text-slate-500'}`}>ภาษาไทย (TH)</button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Currency Configuration</label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <select value={currency} onChange={handleCurrencyChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none cursor-pointer shadow-sm">
                      <option value="THB">฿ Thai Baht (THB)</option>
                      <option value="USD">$ US Dollar (USD)</option>
                      <option value="EUR">€ Euro (EUR)</option>
                      <option value="JPY">¥ Japanese Yen (JPY)</option>
                    </select>
                  </div>
                  <div className="bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 rounded-xl px-4 py-1.5 text-center min-w-[100px]">
                    <div className="text-[10px] font-bold text-[#7C5CFF] uppercase">Preview:</div>
                    <div className="text-xs font-black text-[#7C5CFF]">{currencySymbol}150.00</div>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-slate-400 mt-1">Acts as display suffix/prefix across terminal and receipts.</p>
              </div>
            </div>
          </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="button" onClick={handleSave} className="flex items-center gap-2 bg-[#FFB24C] hover:bg-[#F4A62F] text-[#0B0F4F] font-bold px-7 py-3 rounded-2xl shadow-lg transition-all cursor-pointer">
              <Save className="w-4 h-4" />Save Changes
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200/60 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs font-medium text-slate-400">
          © 2025 ConsignDesk POS • Artisanal Market System
        </div>
      </footer>
    </div>
  );
}