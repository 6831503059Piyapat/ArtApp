import React, { Suspense } from 'react';
import { 
  ArrowLeft, FileSpreadsheet, FileText, Share2, 
  Wallet, Receipt, DollarSign, Users, List, 
  History, User, Check, CheckCircle2
} from 'lucide-react';
import Navbar from '@/app/components/navbar';
export default function ConsignDeskDashboard() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans text-gray-800 pb-10">
      {/* Navigation Bar */}
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 mt-6">
        
        {/* Top Breadcrumb & Status */}
        <div className="flex justify-between items-center mb-4">
          <button className="flex items-center text-gray-500 hover:text-gray-800 text-sm font-medium transition">
            <ArrowLeft size={16} className="mr-1" />
            Back to Completed Runs
          </button>
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
            Status: <span className="ml-1 text-gray-700">Reconciled & Ready</span>
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-orange-50/50 rounded-2xl p-6 mb-6 border border-orange-100/50">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-3 flex items-center gap-3">
                MFU Outside Night Market (Mon 14)
              </h1>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-md flex items-center gap-1">
                  🔒 Archived • Settled
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 gap-4">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded border border-gray-300 inline-block"></span>
                  Closed on 14/09/2026 at 22:30
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} /> Host: <strong className="text-gray-700">Alex Chen</strong>
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} /> Assistant: <strong className="text-gray-700">Ploy W.</strong>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
                <FileSpreadsheet size={16} className="text-blue-500" /> Download Excel (.xlsx)
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
                <FileText size={16} className="text-pink-500" /> PDF Statement
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg text-sm font-medium text-white hover:opacity-90 shadow-sm">
                <Share2 size={16} /> Share PDF File
              </button>
            </div>
          </div>
        </div>

        {/* Stats 4 Columns */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Gross Sales</span>
              <div className="bg-purple-50 p-1.5 rounded-md"><Wallet size={16} className="text-purple-500" /></div>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-4">฿8,490.00</div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Units: 88 sold / 96 initial</span>
              <span className="text-purple-500 font-medium">91.6% sellout</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '91.6%' }}></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Total Deductions</span>
              <div className="bg-orange-50 p-1.5 rounded-md"><Receipt size={16} className="text-orange-500" /></div>
            </div>
            <div className="text-3xl font-bold text-orange-500 mb-4">฿70.00</div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>1 Stall Expense logged</span>
              <span className="text-orange-500 font-medium">Booth Rent</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Net Total</span>
              <div className="bg-green-50 p-1.5 rounded-md"><DollarSign size={16} className="text-green-500" /></div>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-4">฿8,420.00</div>
            <div className="flex justify-end text-xs text-green-600 font-medium mb-1">
              99.18% gained from gross sales
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '99.18%' }}></div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">3 Supplier Payouts</span>
              <div className="flex items-center text-xs text-purple-600 font-medium bg-purple-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 size={12} className="mr-1" /> Ready
              </div>
            </div>
            <div className="space-y-2 mt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Alex Chen (Host)</span>
                <span className="font-semibold text-gray-800">฿4,546.66</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">P&apos; Kaimook</span>
                <span className="font-semibold text-gray-800">฿2,426.67</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Nong&apos; Japan</span>
                <span className="font-semibold text-gray-800">฿1,446.67</span>
              </div>
            </div>
            <div className="w-full flex h-1.5 rounded-full overflow-hidden mt-3">
              <div className="bg-purple-500" style={{ width: '54%' }}></div>
              <div className="bg-orange-400" style={{ width: '29%' }}></div>
              <div className="bg-pink-400" style={{ width: '17%' }}></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-6 px-2">
          <button className="flex items-center gap-2 pb-3 text-gray-500 hover:text-gray-800 font-medium text-sm">
            <List size={16} /> Sales Log
            <span className="bg-purple-100 text-purple-700 text-xs px-1.5 py-0.5 rounded-md">88</span>
          </button>
          <button className="flex items-center gap-2 pb-3 text-gray-500 hover:text-gray-800 font-medium text-sm">
            <Receipt size={16} className="text-orange-500" /> Expenses Log
            <span className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-md">1</span>
          </button>
          <button className="flex items-center gap-2 pb-3 text-gray-500 hover:text-gray-800 font-medium text-sm">
            <History size={16} className="text-pink-500" /> Changes Made (Audit Trail)
            <span className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-md">4</span>
          </button>
          <button className="flex items-center gap-2 pb-3 text-purple-600 border-b-2 border-purple-600 font-medium text-sm">
            <Users size={16} /> Supplier Payout Summaries
            <span className="bg-purple-100 text-purple-700 text-xs px-1.5 py-0.5 rounded-md">3</span>
          </button>
        </div>

        {/* Payout Detail Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          
          {/* Card 1 - Host */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-purple-50 text-purple-600 text-xs font-semibold px-2 py-1 rounded-md">Booth Owner</span>
                <span className="text-xs text-gray-400 font-medium">54.0% of stall</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">Alex Chen (Host)</h3>
              <p className="text-sm text-gray-400 mb-6">Exotics & Plant Culture Line</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Gross Sales</span>
                  <span className="font-semibold text-slate-800 font-mono">฿4,570.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shared expense</span>
                  <span className="font-semibold text-orange-500 font-mono">-฿23.34</span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between">
                  <span className="font-semibold text-slate-800">Net Payout:</span>
                  <span className="font-bold text-purple-600 font-mono">฿4,546.66</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-purple-50/50 border-t border-gray-50 flex justify-center items-center">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-purple-100/50 px-4 py-2 rounded-lg w-full justify-center">
                <div className="w-4 h-4 bg-purple-500 rounded-sm flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
                Host Withdrawn & Reconciled
              </div>
            </div>
          </div>

          {/* Card 2 - Partner 1 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-pink-50 text-pink-600 text-xs font-semibold px-2 py-1 rounded-md">Consignor Partner</span>
                <span className="text-xs text-gray-400 font-medium">28.8% of stall</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">P&apos; Kaimook</h3>
              <p className="text-sm text-gray-400 mb-6">Aquatic & Terrarium Feed</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Gross Sales</span>
                  <span className="font-semibold text-slate-800 font-mono">฿2,450.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shared expense</span>
                  <span className="font-semibold text-orange-500 font-mono">-฿23.33</span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between">
                  <span className="font-semibold text-slate-800">Net Payout:</span>
                  <span className="font-bold text-purple-600 font-mono">฿2,426.67</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50/30 border-t border-gray-50 flex justify-center items-center">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-lg w-full justify-center shadow-sm cursor-pointer hover:bg-gray-50 transition">
                <div className="w-4 h-4 border border-gray-300 rounded-sm"></div>
                Supplier&apos;s payout settled
              </div>
            </div>
          </div>

          {/* Card 3 - Partner 2 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-2 py-1 rounded-md">Consignor Partner</span>
                <span className="text-xs text-gray-400 font-medium">17.2% of stall</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">Nong&apos; Japan</h3>
              <p className="text-sm text-gray-400 mb-6">Glassware & Moss Crafts</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Gross Sales</span>
                  <span className="font-semibold text-slate-800 font-mono">฿1,470.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shared expense</span>
                  <span className="font-semibold text-orange-500 font-mono">-฿23.33</span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between">
                  <span className="font-semibold text-slate-800">Net Payout:</span>
                  <span className="font-bold text-purple-600 font-mono">฿1,446.67</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50/30 border-t border-gray-50 flex justify-center items-center">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-lg w-full justify-center shadow-sm cursor-pointer hover:bg-gray-50 transition">
                <div className="w-4 h-4 border border-gray-300 rounded-sm"></div>
                Supplier&apos;s payout settled
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 pb-4">
        © 2025 ConsignDesk POS • Artisanal Market System
      </footer>

    </div>
  );
}