'use client';
import {useRouter} from "next/navigation";
import { useState,useEffect } from 'react';
import {onAuthStateChanged} from "firebase/auth";
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import {
  CalendarDays,
  ChevronRight,
  CircleHelp,
  Link2,
  ListFilter,
  Plus,
  Radio,
  Star,
  Users,
  Wallet,
  LogIn,
  UserRoundPlus,
  X,
  Keyboard,
} from 'lucide-react';
import Navbar from '@/app/components/navbar';

type SessionFilter = 'All Sessions' | 'Active' | 'Completed';

const completedRuns = [
  { name: 'Sunday Craft Fair', date: '15/09/2026', revenue: '฿8,420' },
  { name: 'Artisan Weekend Pop-up', date: '10/09/2026', revenue: '฿12,350' },
];

export default function DashboardPage() {
  const [sessionFilter, setSessionFilter] = useState<SessionFilter>('All Sessions');
  const showOngoing = sessionFilter !== 'Completed';
  const showCompleted = sessionFilter !== 'Active';
  const [DisplayName, setDisplayName] = useState<string>();
const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
const [runCode, setRunCode] = useState('');

const router = useRouter();
async function fetchDisplayName() {
   onAuthStateChanged(auth, (user) => {
  if (user) {
    
    setDisplayName(user.displayName || '');
  } else {
    console.log("ยังไม่ได้ Login");
  }});
  }
useEffect(()=>{
  
  fetchDisplayName();
},[]);
const handleJoinRun = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!runCode.trim()) return;

  // TODO: ตรวจสอบ runCode กับ Backend ก่อน
  // หากรหัสถูกต้องจึงเข้าสู่หน้า Run
  router.push('/sales/OnGoing');
};

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8fc] font-sans text-[#111747]">
      <Navbar />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 pb-8 pt-[70px] sm:px-6 md:w-[85%] lg:px-8">
        <div className="flex flex-col">
          <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-[22px]">
              Welcome back, {DisplayName} <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">— Ready for the next market?</span>
            </h1>
            <p className="mt-1 text-xs text-[#858ba0]">Here&apos;s your stall overview and live consignment performance today.</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
           <button
            type="button"
            onClick={() => setIsJoinModalOpen(true)}
            className="inline-flex h-9 items-center justify-center gap-2
            rounded-xl border border-[#e9ebf3] bg-white px-3
            text-xs font-semibold shadow-sm transition
            hover:border-violet-200 hover:bg-violet-50" >
  <Users size={15} className="text-violet-500" />
  Join Run
</button>
            <Link
              href="/SaleRun"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#ffb84d] px-3 text-xs font-bold text-[#111747] shadow-[0_4px_12px_rgba(255,184,77,0.24)] transition hover:bg-[#ffad32]"
            >
              <Plus size={16} />
              Create New Run
            </Link>
          </div>
          </section>

          <section className="mb-8 grid gap-4 md:grid-cols-2">
          <article className="flex h-full flex-col rounded-2xl border border-[#eceef5] bg-white p-3 shadow-[0_5px_22px_rgba(17,23,71,0.04)] md:p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#858ba0]">Latest active run</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-600">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /> Active Now
              </span>
            </div>
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">
              MFU Outside Night Market <span className="text-sm font-medium text-[#858ba0]">(Mon 14)</span>
            </h2>
            <div className="mt-3 rounded-xl border border-[#f0f1f6] bg-[#f8f9fc] p-3">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-semibold">Stock Cleared</span>
                <span className="font-bold text-violet-500">5.8% Cleared</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#e9ebf3]">
                <div className="h-full w-[5.8%] rounded-full bg-gradient-to-r from-violet-500 to-pink-400" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-[#858ba0]">
                <span className="font-semibold text-[#111747]">6/103 items cleared</span>
                <span>Run created: 14/09/2026</span>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#858ba0]">Live booth revenue</p>
                <p className="mt-0.5 text-2xl font-extrabold tracking-tight">฿980</p>
              </div>
              <Link
                href="/sales/OnGoing"
                className="inline-flex items-center gap-1 rounded-full bg-[#eee9ff] px-3 py-1.5 text-[10px] font-bold text-[#7855ff] transition hover:bg-violet-100"
              >
                <Wallet size={13} /> Resume Selling
              </Link>
            </div>
          </article>

          <article className="flex h-full flex-col rounded-2xl border border-[#eceef5] bg-white p-3 shadow-[0_5px_22px_rgba(17,23,71,0.04)] md:p-4">
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-lg font-bold tracking-tight">Personal records</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-[9px] font-semibold text-orange-500">
                <CalendarDays size={11} /> All-time
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-[#eceef5] bg-[#f8f9fc] p-2.5">
                <p className="text-[10px] text-[#858ba0]">Created</p>
                <p className="text-sm font-bold">14 Total</p>
              </div>
              <div className="rounded-xl border border-violet-100 bg-violet-50/80 p-2.5">
                <p className="text-[10px] text-violet-500">Completed</p>
                <p className="text-sm font-bold text-violet-500">12 Runs</p>
              </div>
              <div className="rounded-xl border border-pink-100 bg-pink-50/80 p-2.5">
                <p className="text-[10px] text-pink-500">Active</p>
                <p className="text-sm font-bold text-pink-500">1 Run</p>
              </div>
              <div className="rounded-xl border border-[#eceef5] bg-[#f8f9fc] p-2.5">
                <p className="text-[10px] text-[#858ba0]">Products Sold</p>
                <p className="text-sm font-bold">88 items sold</p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-xl border border-orange-100 bg-orange-50/70 px-3 py-2.5">
              <span className="flex items-center gap-2 text-[11px] font-semibold">
                <Star size={13} className="fill-orange-400 text-orange-400" /> Best Run Revenue
              </span>
              <span className="text-sm font-extrabold text-amber-700">฿4,250</span>
            </div>
          </article>
          </section>
        </div>

        <section className="border-t border-[#e9ebf3] pt-5">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Market Runs Management</h2>
              <p className="text-xs text-[#858ba0]">Track, edit, and access live consignment registers.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 self-start rounded-full border border-[#e9ebf3] bg-white p-1 sm:self-auto">
              {(['All Sessions', 'Active', 'Completed'] as SessionFilter[]).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={sessionFilter === filter}
                  onClick={() => setSessionFilter(filter)}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-semibold transition ${
                    sessionFilter === filter
                      ? 'bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-sm'
                      : 'text-[#858ba0] hover:bg-violet-50 hover:text-violet-600'
                  }`}
                >
                  {filter === 'All Sessions' ? 'All Sessions (3)' : filter === 'Active' ? '● Active (1)' : 'Completed (2)'}
                </button>
              ))}
            </div>
          </div>

          {showOngoing && (
            <div className="mb-5">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-bold">
                <span className="h-2 w-2 rounded-full bg-pink-400" /> Ongoing runs
              </h3>
              <article className="grid gap-4 rounded-2xl border border-[#eceef5] bg-white p-4 shadow-[0_5px_22px_rgba(17,23,71,0.04)] md:grid-cols-[minmax(220px,1.25fr)_minmax(210px,1fr)_minmax(145px,.72fr)] md:items-center">
                <div>
                  <span className="rounded-full bg-gradient-to-r from-violet-500 to-pink-400 px-2 py-0.5 text-[9px] font-bold text-white">LIVE NOW</span>
                  <h4 className="mt-1 text-lg font-bold tracking-tight">
                    MFU Outside Night Market <span className="text-sm font-medium text-[#858ba0]">(Mon 14)</span>
                  </h4>
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-[#858ba0]">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> 2 assistants active in booth
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#f8f9fc] p-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase text-[#858ba0]">Items sold</p>
                    <p className="mt-0.5 text-lg font-extrabold">6 <span className="text-xs font-medium text-[#858ba0]">/103</span></p>
                    <p className="text-[9px] font-semibold text-amber-600">97 remain in booth</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-[#858ba0]">Gross sales</p>
                    <p className="mt-0.5 text-lg font-extrabold text-violet-500">฿980</p>
                    <p className="text-[9px] font-semibold text-pink-500">Sync active</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/sales/OnGoing" className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[#ffb84d] text-xs font-bold transition hover:bg-[#ffad32]">
                    <Wallet size={13} /> Resume Selling
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/sales/OnGoing" className="inline-flex h-8 items-center justify-center gap-1 rounded-xl border border-violet-100 bg-violet-50 text-[10px] font-semibold text-violet-600 transition hover:bg-violet-100">
                      <ListFilter size={12} /> Edit Run
                    </Link>
                    <Link href="/sales/OnGoing" className="inline-flex h-8 items-center justify-center gap-1 rounded-xl border border-pink-100 bg-pink-50 text-[10px] font-semibold text-pink-500 transition hover:bg-pink-100">
                      <Link2 size={12} /> Live Link
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          )}

          {showCompleted && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-bold">Past Completed Runs</h3>
                <span className="text-[10px] text-[#858ba0]">2 settled markets archived</span>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[#eceef5] bg-white shadow-[0_5px_22px_rgba(17,23,71,0.04)]">
                <div className="hidden grid-cols-[minmax(220px,1.5fr)_1fr_1fr_130px] bg-violet-50/70 px-4 py-3 text-[9px] font-bold uppercase tracking-wide text-[#111747] sm:grid sm:px-5">
                  <span>Market event &amp; location</span>
                  <span>Date closed</span>
                  <span>Total revenue</span>
                  <span className="text-right">Settlement summary</span>
                </div>
                {completedRuns.map((run) => (
                  <div key={run.name} className="grid gap-2 border-t border-[#f0f1f6] px-4 py-3 text-xs sm:grid-cols-[minmax(220px,1.5fr)_1fr_1fr_130px] sm:items-center sm:px-5">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[#f1f2f6] px-2 py-1 text-[9px] font-semibold text-[#858ba0]">• Archived</span>
                      <span className="font-bold">{run.name}</span>
                    </div>
                    <span className="text-[#858ba0]">{run.date}</span>
                    <span className="text-base font-extrabold">{run.revenue}</span>
                    <Link href="/sales/completed" className="inline-flex items-center justify-center gap-1.5 justify-self-start rounded-xl border border-violet-100 bg-violet-50 px-3 py-2 text-[10px] font-semibold text-violet-500 transition hover:bg-violet-100 sm:justify-self-end">
                      View Summary <ChevronRight size={12} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
{isJoinModalOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center
      bg-slate-950/50 p-4 backdrop-blur-sm
      animate-in fade-in duration-200"
    onClick={() => setIsJoinModalOpen(false)}
  >
    {/* MODAL */}
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-run-title"
      className="w-full max-w-[550px] rounded-[30px]
        border border-[#e9e7f2] bg-white p-6
        shadow-2xl sm:p-10"
      onClick={(e) => e.stopPropagation()}
    >
      <form onSubmit={handleJoinRun}>
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <UserRoundPlus
                size={28}
                className="text-violet-500"
              />
              <h2
                id="join-run-title"
                className="text-2xl font-extrabold tracking-tight
                  text-[#111747] sm:text-3xl"
              >
                Join Sales Run
              </h2>
            </div>

            <p className="mt-2 text-sm leading-6 text-[#858ba0]
              sm:text-base">
              Enter the 6 or 8-digit run code or PIN shared
              by the booth host
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsJoinModalOpen(false)}
            aria-label="Close modal"
            className="shrink-0 rounded-lg p-1 text-[#777b91]
              transition hover:bg-slate-100 hover:text-[#111747]"
          >
            <X size={23} />
          </button>
        </div>

        <div className="my-5 border-t border-[#ececf4]" />

        {/* INPUT */}
        <label
          htmlFor="run-code"
          className="mb-2 block text-sm font-semibold
            text-[#111747] sm:text-base"
        >
          RUN / ROOM CODE
        </label>

        <div className="flex h-16 items-center gap-3
          rounded-[24px] border-2 border-violet-400
          px-4 transition focus-within:border-violet-600
          focus-within:ring-4 focus-within:ring-violet-100">
          <input
            id="run-code"
            type="text"
            value={runCode}
            onChange={(e) => setRunCode(e.target.value)}
            placeholder="E.G. 88X2-901 OR 482910"
            autoComplete="off"
            required
            className="min-w-0 flex-1 bg-transparent text-base
              text-[#111747] outline-none placeholder:text-[#858ba0]
              sm:text-xl"
          />

          <Keyboard
            size={21}
            className="shrink-0 text-[#858ba0]"
          />
        </div>

        <p className="mt-3 text-sm text-[#858ba0]">
          Your active host run code is{' '}
          <span className="font-bold text-violet-500">
            88X2-901
          </span>.
        </p>

        <div className="my-7 border-t border-[#ececf4]" />

        {/* FOOTER BUTTONS */}
        <div className="flex flex-col-reverse justify-end gap-3
          sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setIsJoinModalOpen(false)}
            className="h-14 rounded-full border border-[#e9e7f2]
              px-7 text-sm font-semibold text-[#777b91]
              transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex h-14 items-center justify-center
              gap-2 rounded-full bg-violet-500 px-8
              text-sm font-bold text-white shadow-lg
              shadow-violet-200 transition
              hover:bg-violet-600 active:scale-[0.98]"
          >
            <LogIn size={22} />
            Join Run
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      <footer className="mt-1 w-full border-t border-[#e9ebf3] bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-3 px-4 py-4 text-[10px] text-[#858ba0] sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span>ConsignDesk Stalls © 2025</span>
            <span className="text-[#c9cbd5]">•</span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#111747]"><Radio size={11} className="text-violet-500" /> Sync Operational</span>
          </div>
          <nav className="flex flex-wrap gap-4">
            <Link href="/guidelines" className="hover:text-violet-600">Fair Guidelines</Link>
            <Link href="/sales/completed" className="hover:text-violet-600">Settlement Docs</Link>
            <Link href="/help" className="inline-flex items-center gap-1 hover:text-violet-600"><CircleHelp size={11} /> Stall Support</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
