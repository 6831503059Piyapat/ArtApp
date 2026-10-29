"use client";
import React, { Suspense , useState} from 'react';
import { 
  FileSpreadsheet, FileText, Share2,
  Wallet, Receipt, DollarSign, Users, List,
  History, User, Check, CheckCircle2,Search, ChevronDown, ChevronLeft, ChevronRight, Box
  ,Lock, Tag, UserPlus, Package
} from 'lucide-react';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';

// ข้อมูลจำลองสำหรับหน้า Sales Log
const salesData = [
  {
    id: "#88", time: "22:15:30", name: "Turtle food 500g", sku: "SKU-TF-500",
    supplier: "P' Kaimook", qty: 5, price: 80, total: 400, soldBy: "Ploy W.",
    iconColor: "bg-[#7C5CFF]/10 text-[#7C5CFF]", supColor: "bg-[#7C5CFF]/10 text-[#7C5CFF]", soldColor: "text-[#ED571B]"
  },
  {
    id: "#87", time: "22:04:12", name: "Green Horned Frog", sku: "SKU-GHF-01",
    supplier: "Host (My Products)", qty: 1, price: 150, total: 150, soldBy: "Alex Chen",
    iconColor: "bg-[#7C5CFF]/10 text-[#7C5CFF]", supColor: "bg-[#7C5CFF]/15 text-[#7C5CFF]", soldColor: "text-[#7C5CFF]"
  },
  {
    id: "#86", time: "21:58:05", name: "Mini Terrarium Starter Glass", sku: "SKU-TER-ST",
    supplier: "Nong' Japan", qty: 1, price: 190, total: 190, soldBy: "Ploy W.",
    iconColor: "bg-[#FFB24C]/15 text-[#FFB24C]", supColor: "bg-[#FFB24C]/15 text-[#FFB24C]", soldColor: "text-[#ED571B]"
  },
  {
    id: "#85", time: "21:42:19", name: "Japanese turtle (Small)", sku: "SKU-JT-SM",
    supplier: "P' Kaimook", qty: 2, price: 100, total: 200, soldBy: "Alex Chen",
    iconColor: "bg-[#7C5CFF]/10 text-[#7C5CFF]", supColor: "bg-[#7C5CFF]/10 text-[#7C5CFF]", soldColor: "text-[#7C5CFF]"
  },
  {
    id: "#84", time: "21:30:44", name: "Aquarium Moss Ball (Medium)", sku: "SKU-MB-MED",
    supplier: "Nong' Japan", qty: 2, price: 60, total: 120, soldBy: "Ploy W.",
    iconColor: "bg-[#FFB24C]/15 text-[#FFB24C]", supColor: "bg-[#FFB24C]/15 text-[#FFB24C]", soldColor: "text-[#ED571B]"
  }
];

// ข้อมูลจำลองสำหรับหน้า Expenses Log
const expensesData = [
  {
    id: "#01",
    timestamp: "14/09/26 12:43:05",
    description: "Booth's rent",
    category: "Market Facilities",
    amount: 70.00,
    paidBy: "Alex Chen (Host)",
    note: "Paid in cash at management tent"
  }
];

// ข้อมูลจำลองสำหรับหน้า Audit Trail/ Changes Made
const auditData = [
  {
    timestamp: "14/09/26 22:30:00",
    action: "End Run Verified",
    icon: Lock,
    tagColor: "bg-[#7C5CFF]/15 text-[#7C5CFF]",
    entity: "Run Status",
    details: <>Session closed, inventory locked</>,
    changedBy: "Alex Chen (Host)"
  },
  {
    timestamp: "14/09/26 18:45:10",
    action: "Price Update",
    icon: Tag,
    tagColor: "bg-[#FEF0EA] text-[#ED571B]",
    entity: "Rare Betta (Sunset)",
    details: <>Adjusted price from <span className="line-through text-gray-400">฿380</span> to <strong className="text-[#7C5CFF]">฿350</strong></>,
    changedBy: "Alex Chen (Host)"
  },
  {
    timestamp: "14/09/26 16:20:00",
    action: "Assistant Joined",
    icon: UserPlus,
    tagColor: "bg-[#F062C0]/15 text-[#F062C0]",
    entity: "Permissions",
    details: <>Ploy W. joined as Cashier (Sell products only)</>,
    changedBy: "Alex Chen (Host)"
  },
  {
    timestamp: "14/09/26 14:10:22",
    action: "Restock / Stock Adjustment",
    icon: Package,
    tagColor: "bg-gray-100 text-[#0B0F4F] border border-gray-200",
    entity: "Turtle food 500g",
    details: <>Stock adjusted <strong className="text-[#7C5CFF]">+10 units</strong> (Mid-run replenishment)</>,
    changedBy: "Alex Chen (Host)"
  }
];


export default function ConsignDeskDashboard() {
  const [activeTab, setActiveTab] = useState('payouts');
  //const [activeTab, setActiveTab] = useState('sales'); 
  // 1. เพิ่ม State เก็บข้อความที่พิมพ์ค้นหา
  const [searchQuery, setSearchQuery] = useState('');
  // 1. เพิ่ม State สำหรับ Dropdown Supplier
  const [selectedSupplier, setSelectedSupplier] = useState('All Suppliers');
  const [isSupplierDropdownOpen, setIsSupplierDropdownOpen] = useState(false);

  // 1. เพิ่ม State สำหรับ Dropdown Staff
  const [selectedStaff, setSelectedStaff] = useState('All Staff');
  const [isStaffDropdownOpen, setIsStaffDropdownOpen] = useState(false);



  // 2. ฟังก์ชันกรองข้อมูล: ถ้าคำที่ค้นหาตรงกับชื่อสินค้า, คนขาย, หรือซัพพลายเออร์ ให้แสดงผล
 // 2. ฟังก์ชันกรองข้อมูลแบบใหม่ (รวม Search + Dropdown)
  const filteredSales = salesData.filter((item) => {
    // เช็คเงื่อนไข Dropdown: ถ้าเป็น All Suppliers ให้ผ่านหมด ถ้าไม่ใช่ต้องชื่อตรงกัน
    // (หมายเหตุ: ในข้อมูลจำลองใช้ชื่อ "Host (My Products)" เราจึงจับคู่กับ "Host (Alex Chen)" จากภาพ)
    const matchSupplier = 
      selectedSupplier === 'All Suppliers' || 
      (selectedSupplier === 'Host (Alex Chen)' && item.supplier === 'Host (My Products)') ||
      item.supplier === selectedSupplier;

    // เช็คเงื่อนไขช่องค้นหา
    const matchSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.soldBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());

    // เช็คเงื่อนไข Staff
    const matchStaff = 
      selectedStaff === 'All Staff' || 
      item.soldBy === selectedStaff;

    return matchSupplier && matchSearch && matchStaff;
  });

 

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fc] font-sans text-[#0B0F4F]">
      {/* Navigation Bar */}
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>

      {/* Main Content */}
      <main className="mx-auto mt-[60px] w-full max-w-[1280px] flex-1 px-4 pb-10 sm:px-6 md:w-[95%] lg:px-8">

        {/* Header Section */}
        <div className="relative isolate mb-5 overflow-hidden rounded-2xl border border-[#E9EBF3] bg-white p-4 shadow-sm md:p-5">
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-[#FFB24C]/30 blur-2xl" />
          <div className="relative flex flex-col gap-4 min-[900px]:flex-row min-[900px]:items-start min-[900px]:justify-between">
            <div className="min-w-0">
              <h1 className="mb-2 flex items-center gap-3 text-xl font-bold tracking-tight text-[#0B0F4F] md:text-2xl">
                MFU Outside Night Market (Mon 14)
              </h1>
              <span className="inline-flex items-center gap-1 rounded-md bg-[#7C5CFF]/10 px-2 py-1 text-[10px] font-semibold text-[#7C5CFF]">
                <Lock size={11} aria-hidden="true" />
                Archived • Settled
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-[#ED571B]" aria-hidden="true" />
                  Closed on 14/09/2026 at 22:30
                </span>
                <span className="flex items-center gap-1">
                  <User size={13} className="text-[#7C5CFF]" aria-hidden="true" />
                  Host: <strong className="text-[#0B0F4F]">Alex Chen</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Users size={13} className="text-[#7C5CFF]" aria-hidden="true" />
                  Assistant: <strong className="text-[#0B0F4F]">Ploy W.</strong>
                </span>
              </div>
            </div>
            <div className="relative flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">
              <button className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[10px] font-medium text-[#0B0F4F] shadow-sm transition hover:bg-gray-50 whitespace-nowrap">
                <FileSpreadsheet size={13} className="text-blue-500" /> Download Excel (.xlsx)
              </button>
              <button className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[10px] font-medium text-[#0B0F4F] shadow-sm transition hover:bg-gray-50 whitespace-nowrap">
                <FileText size={13} className="text-[#F062C0]" /> PDF Statement
              </button>
              <button className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#ED571B] to-[#F062C0] px-3 py-2 text-[10px] font-medium text-white shadow-sm transition hover:opacity-90 whitespace-nowrap">
                <Share2 size={13} /> Share PDF File
              </button>
            </div>
          </div>
        </div>

        {/* Stats 4 Columns */}
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          {/* Card 1 */}
          <div className="flex min-w-0 flex-col rounded-xl border border-[#E9EBF3] bg-white p-3 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Gross Sales</span>
              <div className="bg-[#7C5CFF]/10 p-1.5 rounded-md"><Wallet size={16} className="text-[#7C5CFF]" /></div>
            </div>
            <div className="text-2xl font-bold text-[#7C5CFF] mb-3">฿8,490.00</div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Units: 88 sold / 96 initial</span>
              <span className="text-[#7C5CFF] font-medium">91.6% sellout</span>
            </div>
            <div className="mt-auto w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-[#7C5CFF] to-[#F062C0] h-1.5 rounded-full" style={{ width: '91.6%' }}></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex min-w-0 flex-col rounded-xl border border-[#E9EBF3] bg-white p-3 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Total Deductions</span>
              <div className="bg-[#FEF0EA] p-1.5 rounded-md"><Receipt size={16} className="text-[#ED571B]" /></div>
            </div>
            <div className="text-2xl font-bold text-[#ED571B] mb-3">฿70.00</div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>1 Stall Expense logged</span>
              <span className="text-[#ED571B] font-medium">Booth Rent</span>
            </div>
            <div className="mt-auto w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-[#ED571B] h-1.5 rounded-full" style={{ width: `${(70 / 8490) * 100}%` }}></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex min-w-0 flex-col rounded-xl border border-[#E9EBF3] bg-white p-3 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Net Total</span>
              <div className="bg-[#ECFDF5] p-1.5 rounded-md"><DollarSign size={16} className="text-[#059669]" /></div>
            </div>
            <div className="text-2xl font-bold text-[#0B0F4F] mb-3">฿8,420.00</div>
            <div className="flex justify-end text-xs text-[#059669] font-medium mb-1">
              99.18% gained from gross sales
            </div>
            <div className="mt-auto w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-[#059669] h-1.5 rounded-full" style={{ width: '99.18%' }}></div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex min-w-0 flex-col rounded-xl border border-[#E9EBF3] bg-white p-3 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Suppliers Payout</span>
              <div className="flex items-center text-xs text-[#7C5CFF] font-medium bg-[#7C5CFF]/10 px-2 py-0.5 rounded-full">
                <CheckCircle2 size={12} className="mr-1" /> Ready
              </div>
            </div>
            <div className="mt-2 h-[56px] overflow-y-auto text-xs">
              <div className="min-h-full flex flex-col justify-center space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Alex Chen (Host)</span>
                  <span className="font-semibold text-[#0B0F4F]">฿4,546.66</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">P&apos; Kaimook</span>
                  <span className="font-semibold text-[#0B0F4F]">฿2,426.67</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Nong&apos; Japan</span>
                  <span className="font-semibold text-[#0B0F4F]">฿1,446.67</span>
                </div>
                </div>
            </div>
            <div className="mt-auto w-full flex h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#7C5CFF]" style={{ width: '54%' }}></div>
              <div className="bg-[#F062C0]" style={{ width: '29%' }}></div>
              <div className="bg-[#FFB24C]" style={{ width: '17%' }}></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex items-center gap-1 overflow-x-auto border-b border-gray-200 px-2">
          <button onClick={() => setActiveTab('sales')}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-t-lg px-3 pt-2.5 pb-3 font-medium text-xs transition-colors ${
              activeTab === 'sales' ? 'text-[#7C5CFF] bg-[#7C5CFF]/10 border-b-2 border-[#7C5CFF]' : 'text-gray-500 hover:text-[#0B0F4F]'
            }`}
          >
            <List size={16} /> Sales Log
            <span className="bg-[#7C5CFF]/15 text-[#7C5CFF] text-xs px-1.5 py-0.5 rounded-md">88</span>
          </button>
          
          <button onClick={() => setActiveTab('expenses')}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-t-lg px-3 pt-2.5 pb-3 font-medium text-xs transition-colors ${
              activeTab === 'expenses' ? 'text-[#ED571B] bg-[#FEF0EA]/70 border-b-2 border-[#ED571B]' : 'text-gray-500 hover:text-[#0B0F4F]'
            }`}
          >
            <Receipt size={16} className={activeTab === 'expenses' ? '' : 'text-[#ED571B]'} /> Expenses Log
            <span className="bg-[#FEF0EA] text-[#ED571B] text-xs px-1.5 py-0.5 rounded-md">1</span>
          </button>

          <button onClick={() => setActiveTab('changes')}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-t-lg px-3 pt-2.5 pb-3 font-medium text-xs transition-colors ${
              activeTab === 'changes' ? 'text-[#F062C0] bg-[#F062C0]/10 border-b-2 border-[#F062C0]' : 'text-gray-500 hover:text-[#0B0F4F]'
            }`}
          >
            <History size={16} className="text-[#F062C0]" /> Changes Made
            <span className={`${activeTab === 'changes' ? 'bg-[#F062C0]/15 text-[#F062C0]' : 'bg-[#F062C0]/10 text-[#F062C0]'} text-xs px-1.5 py-0.5 rounded-md`}>4</span>
          </button>

          <button onClick={() => setActiveTab('payouts')}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-t-lg px-3 pt-2.5 pb-3 font-medium text-xs transition-colors ${
              activeTab === 'payouts' ? 'text-[#7C5CFF] bg-[#7C5CFF]/10 border-b-2 border-[#7C5CFF]' : 'text-gray-500 hover:text-[#0B0F4F]'
            }`}
          >
            <Users size={16} /> Payout Summaries
            <span className="bg-[#7C5CFF]/15 text-[#7C5CFF] text-xs px-1.5 py-0.5 rounded-md">3</span>
          </button>
        </div>

        {/* Payout Detail Cards */}
        {/* 3. ส่วนเนื้อหาที่จะเปลี่ยนไปตาม Tab ที่กด */}
        <div className="tab-content-area">
        
          {/* ถ้าเลือก Tab Sales */}
          {activeTab === 'sales' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              
              {/* Top Filter Bar */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    value={searchQuery} // <-- เพิ่มตรงนี้
                    onChange={(e) => setSearchQuery(e.target.value)} // <-- เพิ่มตรงนี้ให้รับค่าจากคีย์บอร์ด
                    placeholder="Filter by product, supplier, or cashier..." 
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5CFF]/20 focus:border-[#7C5CFF] transition-all"
                  />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {/* ปุ่ม Supplier Dropdown */}
                  <div className="flex items-center gap-2 relative">
                    <span className="text-gray-500">Supplier:</span>
                    <div className="relative">
                      <button 
                        onClick={() => setIsSupplierDropdownOpen(!isSupplierDropdownOpen)}
                        className="flex items-center justify-between min-w-[150px] font-medium bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-100"
                      >
                        {selectedSupplier} <ChevronDown size={14} className={`transition-transform ${isSupplierDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* เมนู Dropdown ที่จะโชว์ตอนกด */}
                      {isSupplierDropdownOpen && (
                        <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                          <button 
                            onClick={() => { setSelectedSupplier('All Suppliers'); setIsSupplierDropdownOpen(false); }}
                            className="w-full text-left px-3 py-2 text-sm text-[#0B0F4F] hover:bg-blue-50 hover:text-blue-600"
                          >
                            All Suppliers
                          </button>
                          <button 
                            onClick={() => { setSelectedSupplier('Host (Alex Chen)'); setIsSupplierDropdownOpen(false); }}
                            className="w-full text-left px-3 py-2 text-sm text-[#0B0F4F] hover:bg-blue-50 hover:text-blue-600"
                          >
                            Host (Alex Chen)
                          </button>
                          <button 
                            onClick={() => { setSelectedSupplier("P' Kaimook"); setIsSupplierDropdownOpen(false); }}
                            className="w-full text-left px-3 py-2 text-sm text-[#0B0F4F] hover:bg-blue-50 hover:text-blue-600"
                          >
                            P&apos; Kaimook
                          </button>
                          <button 
                            onClick={() => { setSelectedSupplier("Nong' Japan"); setIsSupplierDropdownOpen(false); }}
                            className="w-full text-left px-3 py-2 text-sm text-[#0B0F4F] hover:bg-blue-50 hover:text-blue-600"
                          >
                            Nong&apos; Japan
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
              
               
                  {/* ปุ่ม Staff Dropdown */}
                  <div className="flex items-center gap-2 relative">
                    <span className="text-gray-500">Staff:</span>
                    <div className="relative">
                      <button 
                        onClick={() => setIsStaffDropdownOpen(!isStaffDropdownOpen)}
                        className="flex items-center justify-between min-w-[120px] font-medium bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-100"
                      >
                        {selectedStaff} <ChevronDown size={14} className={`transition-transform ${isStaffDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* เมนู Dropdown ที่จะโชว์ตอนกด */}
                      {isStaffDropdownOpen && (
                        <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                          <button 
                            onClick={() => { setSelectedStaff('All Staff'); setIsStaffDropdownOpen(false); }}
                            className="w-full text-left px-3 py-2 text-sm text-[#0B0F4F] hover:bg-blue-50 hover:text-blue-600"
                          >
                            All Staff
                          </button>
                          <button 
                            onClick={() => { setSelectedStaff('Ploy W.'); setIsStaffDropdownOpen(false); }}
                            className="w-full text-left px-3 py-2 text-sm text-[#0B0F4F] hover:bg-blue-50 hover:text-blue-600"
                          >
                            Ploy W.
                          </button>
                          <button 
                            onClick={() => { setSelectedStaff('Alex Chen'); setIsStaffDropdownOpen(false); }}
                            className="w-full text-left px-3 py-2 text-sm text-[#0B0F4F] hover:bg-blue-50 hover:text-blue-600"
                          >
                            Alex Chen
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-400 pl-2">Showing {filteredSales.length} of {salesData.length} receipts</span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase bg-gray-50/30">
                      <th className="p-4 font-semibold"># / TIME SOLD</th>
                      <th className="p-4 font-semibold">PRODUCT NAME</th>
                      <th className="p-4 font-semibold">SUPPLIER</th>
                      <th className="p-4 font-semibold text-center">QTY</th>
                      <th className="p-4 font-semibold text-right">UNIT PRICE</th>
                      <th className="p-4 font-semibold text-right">TOTAL (฿)</th>
                      <th className="p-4 font-semibold text-right">SOLD BY</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-[#0B0F4F]">
                    
                    {/* ใช้ .map() เพื่อลูปสร้างตารางจากข้อมูลที่ถูก Filter แล้ว */}
                    {filteredSales.length > 0 ? (
                      filteredSales.map((item, index) => (
                        <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                          <td className="p-4">
                            <div className="font-bold text-[#0B0F4F]">{item.id}</div>
                            <div className="text-xs text-gray-400 font-mono mt-0.5">{item.time}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.iconColor}`}>
                                <Box size={20} />
                              </div>
                              <div>
                                <div className="font-semibold text-[#0B0F4F]">{item.name}</div>
                                <div className="text-xs text-gray-400 mt-0.5">{item.sku}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${item.supColor}`}>
                              {item.supplier}
                            </span>
                          </td>
                          <td className="p-4 text-center font-medium">{item.qty}</td>
                          <td className="p-4 text-right text-gray-500">฿{item.price.toFixed(2)}</td>
                          <td className="p-4 text-right font-bold text-[#7C5CFF]">฿{item.total.toFixed(2)}</td>
                          <td className="p-4 text-right">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium">
                              <User size={12} className={item.soldColor} /> {item.soldBy}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-10 text-center text-gray-400">
                         {`ไม่พบข้อมูลที่ค้นหา "${searchQuery}"`}
                        </td>
                      </tr>
                    )}

                  </tbody>
                </table>
              </div>

              {/* Pagination / Footer */}
              <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm">
                <span className="text-gray-500">Showing {filteredSales.length} of {salesData.length} completed transactions</span>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded bg-[#7C5CFF] text-white font-medium">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-transparent text-gray-600 hover:bg-gray-50 font-medium">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-transparent text-gray-600 hover:bg-gray-50 font-medium">3</button>
                  <span className="px-1 text-gray-400">...</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-transparent text-gray-600 hover:bg-gray-50 font-medium">18</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ถ้าเลือก Tab Expenses */}
          {activeTab === 'expenses' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#0B0F4F]">Expenses Log (Booth & Stall Deductions)</h2>
                  <p className="text-sm text-gray-500 mt-1">Recorded market fees, electrical charges, or shared booth amenities.</p>
                </div>
                <div className="bg-[#FEF0EA]/30 border border-[#FEF0EA] px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="text-sm text-[#0B0F4F] font-medium">Total Recorded:</span>
                  <span className="text-sm font-bold text-[#ED571B]">฿70.00</span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs font-bold text-gray-500 uppercase bg-gray-50/50">
                      <th className="p-4 font-semibold">#</th>
                      <th className="p-4 font-semibold">TIMESTAMP</th>
                      <th className="p-4 font-semibold">DESCRIPTION</th>
                      <th className="p-4 font-semibold text-center">CATEGORY</th>
                      <th className="p-4 font-semibold text-right">AMOUNT (฿)</th>
                      <th className="p-4 font-semibold">PAID BY / INPUTTED BY</th>
                      <th className="p-4 font-semibold">RECEIPT / NOTE</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-[#0B0F4F]">
                    
                    {expensesData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                        <td className="p-4 font-bold text-[#0B0F4F]">{item.id}</td>
                        <td className="p-4 text-gray-400 font-mono text-xs">{item.timestamp}</td>
                        <td className="p-4 font-bold text-[#0B0F4F]">{item.description}</td>
                        <td className="p-4 text-center">
                          <span className="inline-flex px-3 py-1 rounded-full bg-[#FEF0EA] text-[#ED571B] text-xs font-medium">
                            {item.category}
                          </span>
                        </td>
                        <td className="p-4 text-right font-bold text-[#ED571B]">฿{item.amount.toFixed(2)}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 text-indigo-700 text-xs font-medium">
                            <User size={14} className="text-indigo-600" /> {item.paidBy}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400 text-xs">{item.note}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
              
            </div>
          )}

          {/* ถ้าเลือก Tab Audit */}
          {activeTab === 'changes' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
              
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-[#0B0F4F]">Changes Made & Audit Trail</h2>
                <p className="text-sm text-gray-400 mt-1">Immutable record of run configuration adjustments, price updates, and staff additions.</p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase bg-gray-50/30">
                      <th className="p-4 pl-6">TIMESTAMP</th>
                      <th className="p-4">ACTION / CHANGE TYPE</th>
                      <th className="p-4">ITEM / ENTITY</th>
                      <th className="p-4">DETAILS</th>
                      <th className="p-4 pr-6 text-right">CHANGED BY</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-600">
                    
                    {auditData.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                          <td className="p-4 pl-6 text-xs text-gray-500 font-mono tracking-tight">{item.timestamp}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${item.tagColor}`}>
                              <IconComponent size={12} strokeWidth={2.5} />
                              {item.action}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-[#0B0F4F]">{item.entity}</td>
                          <td className="p-4 text-gray-500">{item.details}</td>
                          <td className="p-4 pr-6 text-right">
                            <span className="inline-flex items-center justify-end gap-1.5 text-indigo-700 text-xs font-medium w-full">
                              <User size={14} className="text-indigo-600" /> {item.changedBy}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ถ้าเลือก Tab Payouts (โค้ดการ์ด 3 ใบของหนูอยู่ตรงนี้ทั้งหมด) */}
          {activeTab === 'payouts' && (
            <div className="mb-8 overflow-x-auto pb-2">
              <div className="flex min-w-full gap-4">
              {/* Card 1 - Host */}
              <div className="relative flex min-w-[280px] flex-1 flex-col overflow-hidden rounded-2xl border border-[#E9EBF3] bg-white shadow-sm">
                <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-gradient-to-br from-[#7C5CFF]/25 via-[#7C5CFF]/10 to-transparent blur-2xl" />
                <div className="relative z-10 flex-grow p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex w-20 justify-center bg-[#7C5CFF]/10 text-[#7C5CFF] text-xs font-semibold px-2 py-1 rounded-md">Host</span>
                    <span className="text-xs text-gray-400 font-medium">54.0% of stall</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0B0F4F]">Alex Chen (Host)</h3>
                  <hr className="my-3 border-gray-300" />
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Gross Sales</span>
                      <span className="font-semibold text-[#0B0F4F] font-mono">฿4,570.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shared expense</span>
                      <span className="font-semibold text-[#ED571B] font-mono">-฿23.34</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100 flex justify-between">
                      <span className="font-semibold text-[#0B0F4F]">Net Payout:</span>
                      <span className="font-bold text-[#7C5CFF] font-mono">฿4,546.66</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[#7C5CFF]/5 border-t border-gray-50 flex justify-center items-center">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#0B0F4F] bg-[#7C5CFF]/10 px-4 py-2 rounded-lg w-full justify-center">
                    <div className="w-4 h-4 bg-[#7C5CFF] rounded-sm flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                    Host Withdrawn & Reconciled
                  </div>
                </div>
              </div>

              {/* Card 2 - Partner 1 */}
              <div className="relative flex min-w-[280px] flex-1 flex-col overflow-hidden rounded-2xl border border-[#E9EBF3] bg-white shadow-sm">
                <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-gradient-to-br from-[#F062C0]/25 via-[#F062C0]/10 to-transparent blur-2xl" />
                <div className="relative z-10 flex-grow p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex w-20 justify-center bg-[#F062C0]/10 text-[#F062C0] text-xs font-semibold px-2 py-1 rounded-md">Suppliers</span>
                    <span className="text-xs text-gray-400 font-medium">28.8% of stall</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0B0F4F]">P&apos; Kaimook</h3>
                  <hr className="my-3 border-gray-300" />
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Gross Sales</span>
                      <span className="font-semibold text-[#0B0F4F] font-mono">฿2,450.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shared expense</span>
                      <span className="font-semibold text-[#ED571B] font-mono">-฿23.33</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100 flex justify-between">
                      <span className="font-semibold text-[#0B0F4F]">Net Payout:</span>
                      <span className="font-bold text-[#7C5CFF] font-mono">฿2,426.67</span>
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
              <div className="relative flex min-w-[280px] flex-1 flex-col overflow-hidden rounded-2xl border border-[#E9EBF3] bg-white shadow-sm">
                <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-gradient-to-br from-[#FFB24C]/30 via-[#FFB24C]/10 to-transparent blur-2xl" />
                <div className="relative z-10 flex-grow p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex w-20 justify-center bg-[#FFB24C]/15 text-[#FFB24C] text-xs font-semibold px-2 py-1 rounded-md">Suppliers</span>
                    <span className="text-xs text-gray-400 font-medium">17.2% of stall</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0B0F4F]">Nong&apos; Japan</h3>
                  <hr className="my-3 border-gray-300" />
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Gross Sales</span>
                      <span className="font-semibold text-[#0B0F4F] font-mono">฿1,470.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shared expense</span>
                      <span className="font-semibold text-[#ED571B] font-mono">-฿23.33</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100 flex justify-between">
                      <span className="font-semibold text-[#0B0F4F]">Net Payout:</span>
                      <span className="font-bold text-[#7C5CFF] font-mono">฿1,446.67</span>
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
            </div>
          )}
          
        </div>

      </main>

      <Footer />

    </div>
  );
}