"use client";
import React, { Suspense, useState, useSyncExternalStore,useEffect } from 'react';
import {useParams} from 'next/navigation';
import { 
  FileSpreadsheet, FileText, Share2,
  Wallet, Receipt, DollarSign, Users, List,
  History, User, Check, CheckCircle2,Search, ChevronDown, ChevronLeft, ChevronRight, Box
  ,Lock, Tag, UserPlus, Package
} from 'lucide-react';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';

const subscribeToLanguage = () => () => {};
const getLanguageSnapshot = (): 'EN' | 'TH' =>
  localStorage.getItem('language') === 'EN' ? 'EN' : 'TH';
const getServerLanguageSnapshot = (): 'EN' | 'TH' => 'TH';
import {getAuth,onAuthStateChanged} from 'firebase/auth';

// ข้อมูลจำลองสำหรับหน้า Sales Log
const salesData = [
  {
    id: "#88", time: "22:15:30", name: "Turtle food 500g", sku: "SKU-TF-500",
    supplier: "P' Kaimook", qty: 5, price: 80, total: 400, paymentMethod: "Cash", soldBy: "Ploy W.",
    iconColor: "bg-[#7C5CFF]/10 text-[#7C5CFF]", supColor: "bg-[#7C5CFF]/10 text-[#7C5CFF]", soldColor: "text-[#ED571B]"
  },
  {
    id: "#87", time: "22:04:12", name: "Green Horned Frog", sku: "SKU-GHF-01",
    supplier: "Host (My Products)", qty: 1, price: 150, total: 150, paymentMethod: "Mobile banking", soldBy: "Alex Chen",
    iconColor: "bg-[#7C5CFF]/10 text-[#7C5CFF]", supColor: "bg-[#7C5CFF]/15 text-[#7C5CFF]", soldColor: "text-[#7C5CFF]"
  },
  {
    id: "#86", time: "21:58:05", name: "Mini Terrarium Starter Glass", sku: "SKU-TER-ST",
    supplier: "Nong' Japan", qty: 1, price: 190, total: 190, paymentMethod: "Cash", soldBy: "Ploy W.",
    iconColor: "bg-[#FFB24C]/15 text-[#FFB24C]", supColor: "bg-[#FFB24C]/15 text-[#FFB24C]", soldColor: "text-[#ED571B]"
  },
  {
    id: "#85", time: "21:42:19", name: "Japanese turtle (Small)", sku: "SKU-JT-SM",
    supplier: "P' Kaimook", qty: 2, price: 100, total: 200, paymentMethod: "Mobile banking", soldBy: "Alex Chen",
    iconColor: "bg-[#7C5CFF]/10 text-[#7C5CFF]", supColor: "bg-[#7C5CFF]/10 text-[#7C5CFF]", soldColor: "text-[#7C5CFF]"
  },
  {
    id: "#84", time: "21:30:44", name: "Aquarium Moss Ball (Medium)", sku: "SKU-MB-MED",
    supplier: "Nong' Japan", qty: 2, price: 60, total: 120, paymentMethod: "Cash", soldBy: "Ploy W.",
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
    const { id } = useParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState('payouts');
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    getServerLanguageSnapshot
  );
  //const [activeTab, setActiveTab] = useState('sales'); 
  // 1. เพิ่ม State เก็บข้อความที่พิมพ์ค้นหา
  const [searchQuery, setSearchQuery] = useState('');
  // 1. เพิ่ม State สำหรับ Dropdown Supplier
  const [selectedSupplier, setSelectedSupplier] = useState('All Suppliers');
  const [isSupplierDropdownOpen, setIsSupplierDropdownOpen] = useState(false);

  // 1. เพิ่ม State สำหรับ Dropdown Staff
  const [selectedStaff, setSelectedStaff] = useState('All Staff');
  const [isStaffDropdownOpen, setIsStaffDropdownOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const exportCSV = async () => {
    const user = getAuth().currentUser;

    if (!user) {
      console.error('Cannot export products: user is not authenticated');
      return;
    }

    setIsExporting(true);
    try {
        const idToken = await user.getIdToken();
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + `/backend/export/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        if (!response.ok) {
            throw new Error(`Export failed: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = response.headers
          .get("content-disposition")
          ?.match(/filename="?([^"]+)"?/)?.[1] ?? "products.csv";

        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Could not export products:", error);
    } finally {
        setIsExporting(false);
    }
  };
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

  async function fetchData(idToken:string) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/backend/complete-list/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}` // ส่ง token ไปด้วย
      }
    });
    const data = await response.json();
    console.log('Fetched data:', data);
  }
 useEffect(() => {
  const auth = getAuth();
   const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if(user){
    const idToken = await user?.getIdToken();
    fetchData(idToken);
    }
    
  });
  return () => unsubscribe(); // Cleanup subscription on unmount
},[])

  return (
    <div className="relative isolate flex min-h-screen flex-col bg-[#f7f8fc] font-sans text-[#0B0F4F]">
      {/* Navigation Bar */}
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 top-[82px] z-0 overflow-hidden">
        <div className="absolute -left-40 top-[4%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(240,98,192,0.22)_0%,rgba(240,98,192,0.1)_42%,transparent_72%)] blur-3xl" />
        <div className="absolute -right-36 top-[30%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.2)_0%,rgba(124,92,255,0.09)_46%,transparent_74%)] blur-3xl" />
        <div className="absolute left-[28%] top-[62%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,178,76,0.2)_0%,rgba(255,178,76,0.09)_46%,transparent_74%)] blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 mx-auto mt-[60px] w-full max-w-[1280px] min-w-0 flex-1 overflow-x-clip px-3 pb-10 sm:px-6 md:w-[95%] lg:px-8">

        {/* Header Section */}
        <div className="relative isolate mb-6 min-w-0 overflow-hidden rounded-2xl border border-[#E9EBF3] bg-white/90 p-3 shadow-sm sm:p-4 md:p-5">
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-[#FFB24C]/30 blur-2xl" />
          <div className="relative flex flex-col gap-4 min-[900px]:flex-row min-[900px]:items-start min-[900px]:justify-between">
            <div className="min-w-0">
              <h1 className="mb-2 flex min-w-0 flex-wrap items-center gap-2 break-words text-xl font-bold tracking-tight text-[#0B0F4F] md:gap-3 md:text-2xl">
                MFU Outside Night Market (Mon 14)
              </h1>
              <span className="inline-flex items-center gap-1 rounded-md bg-[#7C5CFF]/10 px-2 py-1 text-[10px] font-semibold text-[#7C5CFF]">
                <Lock size={11} aria-hidden="true" />
                {language === 'EN' ? 'Archived • Settled' : 'เก็บถาวร • ชำระเงินแล้ว'}
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-[#ED571B]" aria-hidden="true" />
                  {language === 'EN' ? 'Closed on 14/09/2026 at 22:30' : 'ปิดการขายเมื่อ 14/09/2026 เวลา 22:30'}
                </span>
                <span className="flex items-center gap-1">
                  <User size={13} className="text-[#7C5CFF]" aria-hidden="true" />
                  {language === 'EN' ? 'Host:' : 'เจ้าของร้าน:'} <strong className="text-[#0B0F4F]">Alex Chen</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Users size={13} className="text-[#7C5CFF]" aria-hidden="true" />
                  {language === 'EN' ? 'Assistant:' : 'ผู้ช่วย:'} <strong className="text-[#0B0F4F]">Ploy W.</strong>
                </span>
              </div>
            </div>
            <div className="relative grid w-full grid-cols-1 gap-2 sm:grid-cols-3 min-[900px]:flex min-[900px]:w-auto min-[900px]:shrink-0 min-[900px]:flex-wrap min-[900px]:items-center min-[900px]:min-w-0 min-[900px]:justify-end">
              <button
                type="button"
                onClick={exportCSV}
                disabled={isExporting}
                className="flex min-h-11 w-full items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-xs font-medium text-[#0B0F4F] shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 min-[900px]:min-h-0 min-[900px]:w-auto min-[900px]:whitespace-nowrap min-[900px]:text-[10px]"
              >
                <FileSpreadsheet size={13} className="text-blue-500" /> {isExporting ? (language === 'EN' ? 'Downloading...' : 'กำลังดาวน์โหลด...') : (language === 'EN' ? 'Download CSV' : 'ดาวน์โหลด CSV')}
              </button>
              <button className="flex min-h-11 w-full items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-xs font-medium text-[#0B0F4F] shadow-sm transition hover:bg-gray-50 min-[900px]:min-h-0 min-[900px]:w-auto min-[900px]:whitespace-nowrap min-[900px]:text-[10px]">
                <FileText size={13} className="text-[#F062C0]" /> {language === 'EN' ? 'PDF Statement' : 'เอกสารสรุป PDF'}
              </button>
              <button className="flex min-h-11 w-full items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-[#ED571B] to-[#F062C0] px-3 py-2 text-center text-xs font-medium text-white shadow-sm transition hover:opacity-90 min-[900px]:min-h-0 min-[900px]:w-auto min-[900px]:whitespace-nowrap min-[900px]:text-[10px]">
                <Share2 size={13} /> {language === 'EN' ? 'Share PDF File' : 'แชร์ไฟล์ PDF'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats 4 Columns */}
        <div className="mb-6 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
          {/* Card 1 */}
          <div className="flex min-w-0 flex-col rounded-xl border border-[#E9EBF3] bg-white p-3 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">{language === 'EN' ? 'Gross Sales' : 'ยอดขายรวม'}</span>
              <div className="bg-[#7C5CFF]/10 p-1.5 rounded-md"><Wallet size={16} className="text-[#7C5CFF]" /></div>
            </div>
            <div className="text-2xl font-bold text-[#7C5CFF] mb-3">฿8,490.00</div>
            <div className="mb-1 flex flex-wrap justify-between gap-x-2 gap-y-1 text-xs text-gray-500">
              <span className="min-w-0 break-words">{language === 'EN' ? 'Units: 88 sold / 96 initial' : 'จำนวน: ขายแล้ว 88 / เริ่มต้น 96'}</span>
              <span className="font-medium text-[#7C5CFF]">{language === 'EN' ? '91.6% sellout' : 'ขายได้ 91.6%'}</span>
            </div>
            <div className="mt-auto w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-[#7C5CFF] to-[#F062C0] h-1.5 rounded-full" style={{ width: '91.6%' }}></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex min-w-0 flex-col rounded-xl border border-[#E9EBF3] bg-white p-3 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">{language === 'EN' ? 'Total Deductions' : 'ยอดหักรวม'}</span>
              <div className="bg-[#FEF0EA] p-1.5 rounded-md"><Receipt size={16} className="text-[#ED571B]" /></div>
            </div>
            <div className="text-2xl font-bold text-[#ED571B] mb-3">฿70.00</div>
            <div className="mb-1 flex flex-wrap justify-between gap-x-2 gap-y-1 text-xs text-gray-500">
              <span className="min-w-0 break-words">{language === 'EN' ? '1 Stall Expense logged' : 'บันทึกค่าใช้จ่ายร้านค้า 1 รายการ'}</span>
              <span className="font-medium text-[#ED571B]">{language === 'EN' ? 'Booth Rent' : 'ค่าเช่าบูธ'}</span>
            </div>
            <div className="mt-auto w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-[#ED571B] h-1.5 rounded-full" style={{ width: `${(70 / 8490) * 100}%` }}></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex min-w-0 flex-col rounded-xl border border-[#E9EBF3] bg-white p-3 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">{language === 'EN' ? 'Net Total' : 'ยอดสุทธิ'}</span>
              <div className="bg-[#ECFDF5] p-1.5 rounded-md"><DollarSign size={16} className="text-[#059669]" /></div>
            </div>
            <div className="text-2xl font-bold text-[#0B0F4F] mb-3">฿8,420.00</div>
            <div className="flex justify-end text-xs text-[#059669] font-medium mb-1">
              {language === 'EN' ? '99.18% gained from gross sales' : 'คิดเป็น 99.18% จากยอดขายรวม'}
            </div>
            <div className="mt-auto w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-[#059669] h-1.5 rounded-full" style={{ width: '99.18%' }}></div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex min-w-0 flex-col rounded-xl border border-[#E9EBF3] bg-white p-3 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">{language === 'EN' ? 'Suppliers Payout' : 'ยอดจ่ายซัพพลายเออร์'}</span>
              <div className="flex items-center text-xs text-[#7C5CFF] font-medium bg-[#7C5CFF]/10 px-2 py-0.5 rounded-full">
                <CheckCircle2 size={12} className="mr-1" /> {language === 'EN' ? 'Ready' : 'พร้อมจ่าย'}
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
        <div className="mb-6 flex w-full flex-nowrap items-center gap-1 overflow-x-auto border-b border-gray-200 px-1 sm:px-2">
          <button onClick={() => setActiveTab('sales')}
            className={`flex min-h-11 shrink-0 items-center justify-start gap-1.5 whitespace-nowrap rounded-t-lg px-2 py-2 text-left text-xs font-medium transition-colors sm:min-h-0 sm:gap-2 sm:px-3 sm:pt-2.5 sm:pb-3 ${
              activeTab === 'sales' ? 'text-[#7C5CFF] bg-[#7C5CFF]/10 border-b-2 border-[#7C5CFF]' : 'text-gray-500 hover:text-[#0B0F4F]'
            }`}
          >
            <List size={16} /> {language === 'EN' ? 'Sales Log' : 'รายการขาย'}
            <span className="bg-[#7C5CFF]/15 text-[#7C5CFF] text-xs px-1.5 py-0.5 rounded-md">88</span>
          </button>
          
          <button onClick={() => setActiveTab('expenses')}
            className={`flex min-h-11 shrink-0 items-center justify-start gap-1.5 whitespace-nowrap rounded-t-lg px-2 py-2 text-left text-xs font-medium transition-colors sm:min-h-0 sm:gap-2 sm:px-3 sm:pt-2.5 sm:pb-3 ${
              activeTab === 'expenses' ? 'text-[#ED571B] bg-[#FEF0EA]/70 border-b-2 border-[#ED571B]' : 'text-gray-500 hover:text-[#0B0F4F]'
            }`}
          >
            <Receipt size={16} className={activeTab === 'expenses' ? '' : 'text-[#ED571B]'} /> {language === 'EN' ? 'Expenses Log' : 'รายการค่าใช้จ่าย'}
            <span className="bg-[#FEF0EA] text-[#ED571B] text-xs px-1.5 py-0.5 rounded-md">1</span>
          </button>

          <button onClick={() => setActiveTab('changes')}
            className={`flex min-h-11 shrink-0 items-center justify-start gap-1.5 whitespace-nowrap rounded-t-lg px-2 py-2 text-left text-xs font-medium transition-colors sm:min-h-0 sm:gap-2 sm:px-3 sm:pt-2.5 sm:pb-3 ${
              activeTab === 'changes' ? 'text-[#F062C0] bg-[#F062C0]/10 border-b-2 border-[#F062C0]' : 'text-gray-500 hover:text-[#0B0F4F]'
            }`}
          >
            <History size={16} className="text-[#F062C0]" /> {language === 'EN' ? 'Changes Made' : 'รายการเปลี่ยนแปลง'}
            <span className={`${activeTab === 'changes' ? 'bg-[#F062C0]/15 text-[#F062C0]' : 'bg-[#F062C0]/10 text-[#F062C0]'} text-xs px-1.5 py-0.5 rounded-md`}>4</span>
          </button>

          <button onClick={() => setActiveTab('payouts')}
            className={`flex min-h-11 shrink-0 items-center justify-start gap-1.5 whitespace-nowrap rounded-t-lg px-2 py-2 text-left text-xs font-medium transition-colors sm:min-h-0 sm:gap-2 sm:px-3 sm:pt-2.5 sm:pb-3 ${
              activeTab === 'payouts' ? 'text-[#7C5CFF] bg-[#7C5CFF]/10 border-b-2 border-[#7C5CFF]' : 'text-gray-500 hover:text-[#0B0F4F]'
            }`}
          >
            <Users size={16} /> {language === 'EN' ? 'Payout Summaries' : 'สรุปการจ่ายเงิน'}
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
              <div className="flex flex-col gap-3 border-b border-gray-100 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4">
                <div className="relative w-full sm:max-w-md sm:flex-1">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    value={searchQuery} // <-- เพิ่มตรงนี้
                    onChange={(e) => setSearchQuery(e.target.value)} // <-- เพิ่มตรงนี้ให้รับค่าจากคีย์บอร์ด
                    placeholder={language === 'EN' ? 'Filter by product, supplier, or cashier...' : 'กรองตามสินค้า ซัพพลายเออร์ หรือแคชเชียร์...'} 
                    className="min-h-11 w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-[#7C5CFF] focus:outline-none focus:ring-2 focus:ring-[#7C5CFF]/20"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-2 text-xs text-gray-600 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:text-sm">
                  {/* ปุ่ม Supplier Dropdown */}
                  <div className="flex min-w-0 items-center justify-between gap-2 sm:justify-start">
                    <span className="text-gray-500">{language === 'EN' ? 'Supplier:' : 'ซัพพลายเออร์:'}</span>
                    <div className="relative">
                      <button 
                        onClick={() => setIsSupplierDropdownOpen(!isSupplierDropdownOpen)}
                        className="flex min-h-11 min-w-0 w-[min(62vw,240px)] items-center justify-between gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-left font-medium hover:bg-gray-100 sm:min-h-0 sm:w-auto sm:min-w-[150px]"
                      >
                        {selectedSupplier === 'All Suppliers' ? (language === 'EN' ? 'All Suppliers' : 'ซัพพลายเออร์ทั้งหมด') : selectedSupplier} <ChevronDown size={14} className={`transition-transform ${isSupplierDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* เมนู Dropdown ที่จะโชว์ตอนกด */}
                      {isSupplierDropdownOpen && (
                        <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                          <button 
                            onClick={() => { setSelectedSupplier('All Suppliers'); setIsSupplierDropdownOpen(false); }}
                            className="min-h-11 w-full px-3 py-2 text-left text-sm text-[#0B0F4F] hover:bg-blue-50 hover:text-blue-600"
                          >
                            {language === 'EN' ? 'All Suppliers' : 'ซัพพลายเออร์ทั้งหมด'}
                          </button>
                          <button 
                            onClick={() => { setSelectedSupplier('Host (Alex Chen)'); setIsSupplierDropdownOpen(false); }}
                            className="min-h-11 w-full px-3 py-2 text-left text-sm text-[#0B0F4F] hover:bg-blue-50 hover:text-blue-600"
                          >
                            Host (Alex Chen)
                          </button>
                          <button 
                            onClick={() => { setSelectedSupplier("P' Kaimook"); setIsSupplierDropdownOpen(false); }}
                            className="min-h-11 w-full px-3 py-2 text-left text-sm text-[#0B0F4F] hover:bg-blue-50 hover:text-blue-600"
                          >
                            P&apos; Kaimook
                          </button>
                          <button 
                            onClick={() => { setSelectedSupplier("Nong' Japan"); setIsSupplierDropdownOpen(false); }}
                            className="min-h-11 w-full px-3 py-2 text-left text-sm text-[#0B0F4F] hover:bg-blue-50 hover:text-blue-600"
                          >
                            Nong&apos; Japan
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
              
               
                  {/* ปุ่ม Staff Dropdown */}
                  <div className="flex min-w-0 items-center justify-between gap-2 sm:justify-start">
                    <span className="text-gray-500">{language === 'EN' ? 'Staff:' : 'พนักงาน:'}</span>
                    <div className="relative">
                      <button 
                        onClick={() => setIsStaffDropdownOpen(!isStaffDropdownOpen)}
                        className="flex min-h-11 min-w-0 w-[min(62vw,240px)] items-center justify-between gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-left font-medium hover:bg-gray-100 sm:min-h-0 sm:w-auto sm:min-w-[120px]"
                      >
                        {selectedStaff === 'All Staff' ? (language === 'EN' ? 'All Staff' : 'พนักงานทั้งหมด') : selectedStaff} <ChevronDown size={14} className={`transition-transform ${isStaffDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* เมนู Dropdown ที่จะโชว์ตอนกด */}
                      {isStaffDropdownOpen && (
                        <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                          <button 
                            onClick={() => { setSelectedStaff('All Staff'); setIsStaffDropdownOpen(false); }}
                            className="min-h-11 w-full px-3 py-2 text-left text-sm text-[#0B0F4F] hover:bg-blue-50 hover:text-blue-600"
                          >
                            {language === 'EN' ? 'All Staff' : 'พนักงานทั้งหมด'}
                          </button>
                          <button 
                            onClick={() => { setSelectedStaff('Ploy W.'); setIsStaffDropdownOpen(false); }}
                            className="min-h-11 w-full px-3 py-2 text-left text-sm text-[#0B0F4F] hover:bg-blue-50 hover:text-blue-600"
                          >
                            Ploy W.
                          </button>
                          <button 
                            onClick={() => { setSelectedStaff('Alex Chen'); setIsStaffDropdownOpen(false); }}
                            className="min-h-11 w-full px-3 py-2 text-left text-sm text-[#0B0F4F] hover:bg-blue-50 hover:text-blue-600"
                          >
                            Alex Chen
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="break-words text-gray-400 sm:pl-2">{language === 'EN' ? `Showing ${filteredSales.length} of ${salesData.length} receipts` : `แสดง ${filteredSales.length} จาก ${salesData.length} รายการ`}</span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase bg-gray-50/30">
                      <th className="p-4 font-semibold">{language === 'EN' ? '# / TIME SOLD' : '# / เวลาขาย'}</th>
                      <th className="p-4 font-semibold">{language === 'EN' ? 'PRODUCT NAME' : 'ชื่อสินค้า'}</th>
                      <th className="p-4 font-semibold">{language === 'EN' ? 'SUPPLIER' : 'ซัพพลายเออร์'}</th>
                      <th className="p-4 font-semibold text-center">{language === 'EN' ? 'QTY' : 'จำนวน'}</th>
                      <th className="p-4 font-semibold text-right">{language === 'EN' ? 'UNIT PRICE' : 'ราคาต่อหน่วย'}</th>
                      <th className="p-4 font-semibold text-right">{language === 'EN' ? 'TOTAL (฿)' : 'รวม (฿)'}</th>
                      <th className="p-4 font-semibold">{language === 'EN' ? 'PAYMENT METHOD' : 'วิธีชำระเงิน'}</th>
                      <th className="p-4 font-semibold text-right">{language === 'EN' ? 'SOLD BY' : 'ผู้ขาย'}</th>
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
                          <td className="p-4">
                            <span className={`inline-flex whitespace-nowrap rounded-md border border-gray-200 bg-gray-50 py-1 text-xs font-medium text-gray-600 ${item.paymentMethod === 'Cash' ? 'px-4' : 'px-2.5'}`}>
                              {item.paymentMethod}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium">
                              <User size={12} className={item.soldColor} /> {item.soldBy}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="p-10 text-center text-gray-400">
                         {language === 'EN' ? `No results found for "${searchQuery}"` : `ไม่พบข้อมูลที่ค้นหา "${searchQuery}"`}
                        </td>
                      </tr>
                    )}

                  </tbody>
                </table>
              </div>

              {/* Pagination / Footer */}
              <div className="flex flex-col gap-3 border-t border-gray-100 p-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:p-4">
                <span className="text-gray-500">{language === 'EN' ? `Showing ${filteredSales.length} of ${salesData.length} completed transactions` : `แสดง ${filteredSales.length} จาก ${salesData.length} ธุรกรรมที่เสร็จสิ้น`}</span>
                <div className="flex flex-wrap items-center justify-center gap-1 sm:justify-end">
                  <button className="flex h-10 w-10 items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 sm:h-8 sm:w-8">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded bg-[#7C5CFF] font-medium text-white sm:h-8 sm:w-8">1</button>
                  <button className="flex h-10 w-10 items-center justify-center rounded border border-transparent font-medium text-gray-600 hover:bg-gray-50 sm:h-8 sm:w-8">2</button>
                  <button className="flex h-10 w-10 items-center justify-center rounded border border-transparent font-medium text-gray-600 hover:bg-gray-50 sm:h-8 sm:w-8">3</button>
                  <span className="px-1 text-gray-400">...</span>
                  <button className="flex h-10 w-10 items-center justify-center rounded border border-transparent font-medium text-gray-600 hover:bg-gray-50 sm:h-8 sm:w-8">18</button>
                  <button className="flex h-10 w-10 items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 sm:h-8 sm:w-8">
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
              <div className="flex flex-col items-start justify-between gap-3 border-b border-gray-100 p-4 sm:flex-row sm:gap-4 sm:p-6">
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-[#0B0F4F]">{language === 'EN' ? 'Expenses Log (Booth & Stall Deductions)' : 'รายการค่าใช้จ่าย (ค่าเช่าบูธและร้านค้า)'}</h2>
                  <p className="text-sm text-gray-500 mt-1">{language === 'EN' ? 'Recorded market fees, electrical charges, or shared booth amenities.' : 'บันทึกค่าตลาด ค่าไฟ หรือสิ่งอำนวยความสะดวกร่วมของบูธ'}</p>
                </div>
                <div className="flex max-w-full items-center gap-2 rounded-full border border-[#FEF0EA] bg-[#FEF0EA]/30 px-4 py-2">
                  <span className="text-sm text-[#0B0F4F] font-medium">{language === 'EN' ? 'Total Recorded:' : 'บันทึกรวม:'}</span>
                  <span className="text-sm font-bold text-[#ED571B]">฿70.00</span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs font-bold text-gray-500 uppercase bg-gray-50/50">
                      <th className="p-4 font-semibold">#</th>
                      <th className="p-4 font-semibold">{language === 'EN' ? 'TIMESTAMP' : 'เวลา'}</th>
                      <th className="p-4 font-semibold">{language === 'EN' ? 'DESCRIPTION' : 'รายละเอียด'}</th>
                      <th className="p-4 font-semibold text-center">{language === 'EN' ? 'CATEGORY' : 'หมวดหมู่'}</th>
                      <th className="p-4 font-semibold text-right">{language === 'EN' ? 'AMOUNT (฿)' : 'จำนวนเงิน (฿)'}</th>
                      <th className="p-4 font-semibold">{language === 'EN' ? 'PAID BY / INPUTTED BY' : 'ผู้จ่าย / ผู้บันทึก'}</th>
                      <th className="p-4 font-semibold">{language === 'EN' ? 'RECEIPT / NOTE' : 'ใบเสร็จ / หมายเหตุ'}</th>
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
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h2 className="text-lg font-bold text-[#0B0F4F]">{language === 'EN' ? 'Changes Made & Audit Trail' : 'รายการเปลี่ยนแปลงและประวัติการตรวจสอบ'}</h2>
                <p className="text-sm text-gray-400 mt-1">{language === 'EN' ? 'Immutable record of run configuration adjustments, price updates, and staff additions.' : 'บันทึกถาวรของการตั้งค่าการขาย การปรับราคา และการเพิ่มพนักงาน'}</p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase bg-gray-50/30">
                      <th className="p-4 pl-6">{language === 'EN' ? 'TIMESTAMP' : 'เวลา'}</th>
                      <th className="p-4">{language === 'EN' ? 'ACTION / CHANGE TYPE' : 'การดำเนินการ / ประเภทการเปลี่ยนแปลง'}</th>
                      <th className="p-4">{language === 'EN' ? 'ITEM / ENTITY' : 'รายการ / หน่วยงาน'}</th>
                      <th className="p-4">{language === 'EN' ? 'DETAILS' : 'รายละเอียด'}</th>
                      <th className="p-4 pr-6 text-right">{language === 'EN' ? 'CHANGED BY' : 'เปลี่ยนแปลงโดย'}</th>
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
                              {language === 'EN' ? item.action : ({
                                'End Run Verified': 'ยืนยันการปิดการขาย',
                                'Price Update': 'อัปเดตราคา',
                                'Assistant Joined': 'ผู้ช่วยเข้าร่วม',
                                'Restock / Stock Adjustment': 'เติมสต็อก / ปรับสต็อก',
                              }[item.action] || item.action)}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-[#0B0F4F]">{item.entity}</td>
                          <td className="p-4 text-gray-500">
                            {language === 'EN' ? item.details : ({
                              'End Run Verified': 'ปิดเซสชันและล็อกสต็อกแล้ว',
                              'Price Update': <>ปรับราคาจาก <span className="line-through text-gray-400">฿380</span> เป็น <strong className="text-[#7C5CFF]">฿350</strong></>,
                              'Assistant Joined': 'Ploy W. เข้าร่วมเป็นแคชเชียร์ (ขายสินค้าเท่านั้น)',
                              'Restock / Stock Adjustment': <>ปรับสต็อก <strong className="text-[#7C5CFF]">+10 ชิ้น</strong> (เติมระหว่างการขาย)</>,
                            }[item.action] || item.details)}
                          </td>
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
            <div className="mb-8 overflow-x-visible pb-0 sm:overflow-x-auto sm:pb-2">
              <div className="flex min-w-0 flex-col gap-3 sm:min-w-full sm:flex-row sm:gap-5">
              {/* Card 1 - Host */}
              <div className="relative flex w-full min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#E9EBF3] bg-white shadow-sm sm:min-w-[280px]">
                <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-gradient-to-br from-[#7C5CFF]/25 via-[#7C5CFF]/10 to-transparent blur-2xl" />
                <div className="relative z-10 flex-grow p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex w-20 justify-center bg-[#7C5CFF]/10 text-[#7C5CFF] text-xs font-semibold px-2 py-1 rounded-md">{language === 'EN' ? 'Host' : 'เจ้าของร้าน'}</span>
                    <span className="text-xs text-gray-400 font-medium">54.0% {language === 'EN' ? 'of stall' : 'ของร้าน'}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0B0F4F]">Alex Chen (Host)</h3>
                  <hr className="my-3 border-gray-300" />
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{language === 'EN' ? 'Gross Sales' : 'ยอดขายรวม'}</span>
                      <span className="font-semibold text-[#0B0F4F] font-mono">฿4,570.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{language === 'EN' ? 'Shared expense' : 'ค่าใช้จ่ายร่วม'}</span>
                      <span className="font-semibold text-[#ED571B] font-mono">-฿23.34</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100 flex justify-between">
                      <span className="font-semibold text-[#0B0F4F]">{language === 'EN' ? 'Net Payout:' : 'ยอดจ่ายสุทธิ:'}</span>
                      <span className="font-bold text-[#7C5CFF] font-mono">฿4,546.66</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[#7C5CFF]/5 border-t border-gray-50 flex justify-center items-center">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#0B0F4F] bg-[#7C5CFF]/10 px-4 py-2 rounded-lg w-full justify-center">
                    <div className="w-4 h-4 bg-[#7C5CFF] rounded-sm flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                    {language === 'EN' ? 'Host Withdrawn & Reconciled' : 'เจ้าของร้านถอนเงินและกระทบยอดแล้ว'}
                  </div>
                </div>
              </div>

              {/* Card 2 - Partner 1 */}
              <div className="relative flex w-full min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#E9EBF3] bg-white shadow-sm sm:min-w-[280px]">
                <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-gradient-to-br from-[#F062C0]/25 via-[#F062C0]/10 to-transparent blur-2xl" />
                <div className="relative z-10 flex-grow p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex min-h-8 w-auto min-w-[6.5rem] items-center justify-center whitespace-nowrap rounded-md bg-[#F062C0]/10 px-3 py-1 text-center text-xs font-semibold leading-tight text-[#F062C0] sm:w-20 sm:min-w-0 sm:px-2">{language === 'EN' ? 'Suppliers' : 'ซัพพลายเออร์'}</span>
                    <span className="text-xs text-gray-400 font-medium">28.8% {language === 'EN' ? 'of stall' : 'ของร้าน'}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0B0F4F]">P&apos; Kaimook</h3>
                  <hr className="my-3 border-gray-300" />
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{language === 'EN' ? 'Gross Sales' : 'ยอดขายรวม'}</span>
                      <span className="font-semibold text-[#0B0F4F] font-mono">฿2,450.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{language === 'EN' ? 'Shared expense' : 'ค่าใช้จ่ายร่วม'}</span>
                      <span className="font-semibold text-[#ED571B] font-mono">-฿23.33</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100 flex justify-between">
                      <span className="font-semibold text-[#0B0F4F]">{language === 'EN' ? 'Net Payout:' : 'ยอดจ่ายสุทธิ:'}</span>
                      <span className="font-bold text-[#7C5CFF] font-mono">฿2,426.67</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50/30 border-t border-gray-50 flex justify-center items-center">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-lg w-full justify-center shadow-sm cursor-pointer hover:bg-gray-50 transition">
                    <div className="w-4 h-4 border border-gray-300 rounded-sm"></div>
                    {language === 'EN' ? "Supplier's payout settled" : 'ชำระยอดจ่ายซัพพลายเออร์แล้ว'}
                  </div>
                </div>
              </div>

              {/* Card 3 - Partner 2 */}
              <div className="relative flex w-full min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#E9EBF3] bg-white shadow-sm sm:min-w-[280px]">
                <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-gradient-to-br from-[#FFB24C]/30 via-[#FFB24C]/10 to-transparent blur-2xl" />
                <div className="relative z-10 flex-grow p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex min-h-8 w-auto min-w-[6.5rem] items-center justify-center whitespace-nowrap rounded-md bg-[#FFB24C]/15 px-3 py-1 text-center text-xs font-semibold leading-tight text-[#FFB24C] sm:w-20 sm:min-w-0 sm:px-2">{language === 'EN' ? 'Suppliers' : 'ซัพพลายเออร์'}</span>
                    <span className="text-xs text-gray-400 font-medium">17.2% {language === 'EN' ? 'of stall' : 'ของร้าน'}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0B0F4F]">Nong&apos; Japan</h3>
                  <hr className="my-3 border-gray-300" />
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{language === 'EN' ? 'Gross Sales' : 'ยอดขายรวม'}</span>
                      <span className="font-semibold text-[#0B0F4F] font-mono">฿1,470.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{language === 'EN' ? 'Shared expense' : 'ค่าใช้จ่ายร่วม'}</span>
                      <span className="font-semibold text-[#ED571B] font-mono">-฿23.33</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100 flex justify-between">
                      <span className="font-semibold text-[#0B0F4F]">{language === 'EN' ? 'Net Payout:' : 'ยอดจ่ายสุทธิ:'}</span>
                      <span className="font-bold text-[#7C5CFF] font-mono">฿1,446.67</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50/30 border-t border-gray-50 flex justify-center items-center">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-lg w-full justify-center shadow-sm cursor-pointer hover:bg-gray-50 transition">
                    <div className="w-4 h-4 border border-gray-300 rounded-sm"></div>
                    {language === 'EN' ? "Supplier's payout settled" : 'ชำระยอดจ่ายซัพพลายเออร์แล้ว'}
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