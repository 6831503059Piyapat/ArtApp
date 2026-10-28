'use client';
import Navbar from '@/app/components/navbar';
import React, { useState } from 'react';
import { Store, User, CheckCircle2, Save, SlidersHorizontal } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Completed');
  const [language, setLanguage] = useState<'EN' | 'TH'>('EN');
  const [currency, setCurrency] = useState('THB');
  const [currencySymbol, setCurrencySymbol] = useState('฿');
  const [username, setUsername] = useState('Alex Chen');
  const [stallAlias, setStallAlias] = useState('alexchen');
  const [email, setEmail] = useState('alex.chen@artmarket.io');
  const [showToast, setShowToast] = useState(false);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCurrency(val);
    const symbols: Record<string, string> = { THB: '฿', USD: '$', EUR: '€', JPY: '¥' };
    setCurrencySymbol(symbols[val] || '฿');
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8fd] text-slate-800 font-sans antialiased">
      <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl transition-all duration-300 border border-slate-700/50 ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        <span className="text-sm font-semibold">Changes saved successfully!</span>
      </div>

      <Navbar/>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 mt-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">User Profile</h1>
        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm p-6 md:p-8 space-y-8">
          <div className="bg-gradient-to-r from-purple-50/70 to-indigo-50/30 border border-purple-100/80 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-purple-200/60 border border-purple-300/40 text-purple-700 font-bold text-2xl flex items-center justify-center shrink-0">AC</div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-bold text-slate-900">{username}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">@{stallAlias}</span>
              </div>
              <p className="text-sm font-medium text-slate-500">{email}</p>
              <div className="flex items-center gap-2 text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full w-fit border border-purple-100 mt-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>Active Host: MFU Night Market (MON 14)
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3"><h3 className="text-lg font-bold text-slate-900">Personal information</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl px-4 py-3 text-sm font-medium text-slate-800 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Stall Alias</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">@</span>
                  <input type="text" value={stallAlias} onChange={(e) => setStallAlias(e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl pl-8 pr-4 py-3 text-sm font-medium text-slate-800 outline-none" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl px-4 py-3 text-sm font-medium text-slate-800 outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-slate-50/60 rounded-2xl border border-slate-200/70 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><SlidersHorizontal className="w-4 h-4" /></div>
                <h3 className="text-base font-bold text-slate-900">App Preferences & Language</h3>
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-100/70 text-purple-700 border border-purple-200/50">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>Auto-saved
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Display Language</label>
                <div className="bg-white p-1 rounded-xl border border-slate-200 flex shadow-sm">
                  <button type="button" onClick={() => setLanguage('EN')} className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold ${language === 'EN' ? 'bg-purple-600 text-white' : 'text-slate-500'}`}>✓ English (EN)</button>
                  <button type="button" onClick={() => setLanguage('TH')} className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold ${language === 'TH' ? 'bg-purple-600 text-white' : 'text-slate-500'}`}>ภาษาไทย (TH)</button>
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
                  <div className="bg-purple-100/70 border border-purple-200 rounded-xl px-4 py-1.5 text-right min-w-[100px]">
                    <div className="text-[10px] font-bold text-purple-600 uppercase">Preview:</div>
                    <div className="text-xs font-black text-purple-700">{currencySymbol}150.00</div>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-slate-400 mt-1">Acts as display suffix/prefix across terminal and receipts.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="button" onClick={handleSave} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-7 py-3 rounded-2xl shadow-lg transition-all cursor-pointer">
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