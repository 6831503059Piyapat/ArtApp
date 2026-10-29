"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Store,
  ShieldAlert,
  ChevronDown,
  Calculator,
  Edit3,
  LayoutGrid,
  User,
  Plus,
  AlertTriangle,
  Lock,
  Trash2,
  Undo2,
  ShoppingBag,
  History,
  Lightbulb,
  Receipt,
  UserPlus,
  X,
  PlusCircle,
  Leaf,
  Sun,
  Mountain,
  Rabbit,
  Fish,
  Grid,
  Droplets,
  Package,
  Wallet,
  Pencil,
  Copy,
  QrCode,
  Shield,
  UsersRound,
  ShieldCheck,
  RotateCcw,
  Check,
  Minus
} from 'lucide-react';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
export default function SalesRunDetail() {
  // ตัวอย่าง State สำหรับจัดการจำนวนสต็อก/สินค้า
  const Suppliers = [
    {
    id: "host-8466468345",
    name: "My Products",
    role: "Host's inventory",
    accent: "purple",
    category: "host",
    placeholder: "Item Name (e.g. Linen Coaster Set)",

    products: [
      {
      id: '1',
      name: 'Green Horned Frog',
      start: 10,
      stock: 0,
      price: 150,
      sold: 10,
      icon: Leaf,
      iconBg: 'bg-[#7C5CFF]/10 text-[#7C5CFF]',
      supplierId: "host-8466468345"
    },
    {
      id: '2',
      name: 'Yellow Horned Frog',
      start: 10,
      stock: 1,
      price: 150,
      sold: 9,
      icon: Sun,
      iconBg: 'bg-[#FFB24C]/15 text-[#FFB24C]',
      supplierId: "host-8466468345"
      
    },
    {
      id: '3',
      name: 'Brown Horned Frog',
      start: 10,
      stock: 6,
      price: 150,
      sold: 4,
      icon: Mountain,
      iconBg: 'bg-[#7C5CFF]/10 text-[#7C5CFF]',
      supplierId: "host-8466468345"
     
    },
    ],
  },
   {
    id: "kaimook-8466468345",
    name: "P Kaimook",
    role: "Host's inventory",
    accent: "purple",
    placeholder: "Item Name (e.g. Linen Coaster Set)",
    category: "supplier",
    products: [
      {
      id: '1',
      name: 'Green Horned Frog',
      start: 10,
      stock: 0,
      price: 150,
      sold: 10,
      icon: Leaf,
      iconBg: 'bg-[#7C5CFF]/10 text-[#7C5CFF]',
      supplierId: "kaimook-8466468345"
     
    },
    {
      id: '2',
      name: 'Yellow Horned Frog',
      start: 10,
      stock: 1,
      price: 150,
      sold: 9,
      icon: Sun,
      iconBg: 'bg-[#FFB24C]/15 text-[#FFB24C]',
      supplierId: "kaimook-8466468345"
     
    },
    {
      id: '3',
      name: 'Brown Horned Frog',
      start: 10,
      stock: 6,
      price: 150,
      sold: 4,
      icon: Mountain,
      iconBg: 'bg-[#7C5CFF]/10 text-[#7C5CFF]',
      supplierId: "kaimook-8466468345"
    },
    ],
  },
  ];
  const assistants = [
    {
      id:'1',
      name: 'Alex Chen',
      status: true,
      avatar: '/path/to/alex_chen.jpg',
      permission:{
        Sell:true,
        Crud:true,
        Record:true,
        ViewLog:true,
        ManagePermission:true
      }
    },
  
  ];
  // const initialProducts = [
  //   // My Products / Host Items
  //   {
  //     id: '1',
  //     name: 'Green Horned Frog',
  //     start: 10,
  //     stock: 0,
  //     price: 150,
  //     sold: 10,
  //     icon: Leaf,
  //     iconBg: 'bg-purple-100/70 text-purple-600',
  //     category: 'host'
  //   },
  //   {
  //     id: '2',
  //     name: 'Yellow Horned Frog',
  //     start: 10,
  //     stock: 1,
  //     price: 150,
  //     sold: 9,
  //     icon: Sun,
  //     iconBg: 'bg-amber-100/70 text-amber-500',
  //     category: 'host'
  //   },
  //   {
  //     id: '3',
  //     name: 'Brown Horned Frog',
  //     start: 10,
  //     stock: 6,
  //     price: 150,
  //     sold: 4,
  //     icon: Mountain,
  //     iconBg: 'bg-purple-100/70 text-purple-600',
  //     category: 'host'
  //   },
  //   // P' Kaimook
  //   {
  //     id: '4',
  //     name: 'Japanese turtle (Big)',
  //     start: 8,
  //     stock: 3,
  //     price: 250,
  //     sold: 5,
  //     icon: Rabbit,
  //     iconBg: 'bg-pink-100/70 text-pink-500',
  //     supplier: "P' Kaimook",
  //     category: 'kaimook'
  //   },
  //   {
  //     id: '5',
  //     name: 'Japanese turtle (Small)',
  //     start: 17,
  //     stock: 10,
  //     price: 100,
  //     sold: 7,
  //     icon: Fish,
  //     iconBg: 'bg-pink-100/70 text-pink-500',
  //     supplier: "P' Kaimook",
  //     category: 'kaimook'
  //   },
  //   {
  //     id: '6',
  //     name: 'Turtle food 500g',
  //     start: 62,
  //     stock: 40,
  //     price: 80,
  //     sold: 22,
  //     icon: Grid,
  //     iconBg: 'bg-amber-100/70 text-amber-500',
  //     supplier: "P' Kaimook",
  //     category: 'kaimook'
  //   },
  //   // Nong' Japan
  //   {
  //     id: '7',
  //     name: 'Aquarium Moss Ball (Medium)',
  //     start: 15,
  //     stock: 8,
  //     price: 60,
  //     sold: 7,
  //     icon: Package,
  //     iconBg: 'bg-purple-100/70 text-purple-600',
  //     supplier: "Nong' Japan",
  //     category: 'japan'
  //   },
  //   {
  //     id: '8',
  //     name: 'Mini Terrarium Starter Glass',
  //     start: 6,
  //     stock: 3,
  //     price: 190,
  //     sold: 3,
  //     icon: Droplets,
  //     iconBg: 'bg-purple-100/70 text-purple-600',
  //     supplier: "Nong' Japan",
  //     category: 'japan'
  //   }
  // ];
  const expensesList = [
    {
      id: '01',
      timestamp: '14/9/26 12:43:05',
      detail: 'Weekend Market Stall Rent',
      dotColor: 'bg-[#FFB24C]',
      category: 'Booth Fee',
      categoryBg: 'bg-[#FFB24C]/10 text-[#FFB24C] border-[#FFB24C]/20',
      loggedBy: 'Alex Chen',
      role: '(Host)',
      amount: '฿700.00'
    },
    {
      id: '02',
      timestamp: '14/9/26 15:10:20',
      detail: 'Ice bucket, string bags & tape',
      dotColor: 'bg-[#7C5CFF]',
      category: 'Stall expense',
      categoryBg: 'bg-[#FFB24C]/10 text-[#FFB24C] border-[#FFB24C]/20',
      loggedBy: 'Alex Chen',
      role: '(Host)',
      amount: '฿150.00'
    }
  ];
  const StockList = [
    {
      id: '1',
      name:"MFU outside night market (MON 14)",
      totalsoldMax:85,
      totalsold:66,
      grossIntake:8490,
    }
  ];
  const [products, setProducts] = useState(Suppliers);
  const [activeNav, setActiveNav] = useState('Ongoing');
  const [activeCatalog, setActiveCatalog] = useState('all');

  //State สำหรับ Toggle Sales Mode / Edit Mode
  const [stepMode, setStepMode] = useState("sales");
  // State สำหรับฟอร์ม Fast Log Shared Expense
  const [expenseTitle, setExpenseTitle] = useState('Ice bag or plastic bags');
  const [category, setCategory] = useState('Stall Supplies');
  const [amount, setAmount] = useState('70');
  //INVITE MODAL
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previousActions, setPreviousActions] = useState<{supplierId: string; productId: string; productName: string; quantity: number; time:string }[]>([]);
  // End Sales Run Modal
  const [isEndRunOpen, setIsEndRunOpen] = useState(false);
  const inviteUrl = 'https://consigndesk.app/join/MFU-M...';
  const joinPin = '88X2-901';
  // Toggle Switches State
  const [activeTab, setActiveTab] = useState<'global' | 'may' | 'tanawat'>('global');
  const [isPermissionEnabled, setIsPermissionEnabled] = useState(false);
  const [permissions, setPermissions] = useState({
    registerSales: true,
    issueDiscounts: false,
    voidTransaction: true,
    viewInventory: true,
    restockQuantities: true,
    addNewProducts: false
  });
  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ฟังก์ชันสำหรับแปลง timestamp เป็นข้อความเวลาแบบ "x นาทีที่แล้ว" หรือ "x ชั่วโมงที่แล้ว"
  const formatTimeAgo = (timestamp: number) => {
  const secondsAgo = Math.floor((Date.now() - timestamp) / 1000);

  if (secondsAgo < 5) return 'เมื่อสักครู่';
  if (secondsAgo < 60) return `${secondsAgo} วินาทีที่แล้ว`;
  
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return `${minutesAgo} นาทีที่แล้ว`;
  
  const hoursAgo = Math.floor(minutesAgo / 60);
  return `${hoursAgo} ชั่วโมงที่แล้ว`;
};


// Component สำหรับแสดงเวลาที่ผ่านมาแบบเรียลไทม์

const ActionTimeAgo = ({ createdAt }: { createdAt: number }) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    // ให้ Re-render ตัวเองทุกๆ 1 วินาที เพื่ออัปเดตเวลาที่นับผ่านไป
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span>{formatTimeAgo(createdAt)}</span>; 
};
const handleUndo = () => {
  if (previousActions.length === 0) return;

  const lastAction = previousActions[previousActions.length - 1];

  // 1. คืน Stock และ Sold ของสินค้าที่ขายล่าสุด
  setProducts((prev) =>
    prev.map((supplier) => {
      // ค้นหา Supplier ที่ตรงกัน
      if (supplier.id !== lastAction.supplierId) {
        return supplier;
      }

      return {
        ...supplier,
        products: (supplier.products ?? []).map((item) => {
          // ค้นหาสินค้าที่ต้องการ Undo
          if (item.id !== lastAction.productId) {
            return item;
          }

          return {
            ...item,
            stock: item.stock + lastAction.quantity,
            sold: item.sold - lastAction.quantity,
          };
        }),
      };
    })
  );

  // 2. ลบ Action ล่าสุดออกจากประวัติ
  setPreviousActions((prev) => prev.slice(0, -1));
};



const handleSell = (id: string) => {

  // 1. ค้นหาสินค้าจากทุก Supplier
  const productToSell = products
    .flatMap((supplier) => supplier.products ?? [])
    .find((item) => item.id === id);

  // 2. ตรวจสอบว่าสินค้ามีอยู่และมี Stock
  if (!productToSell || productToSell.stock <= 0) {
    console.log("Product not found or out of stock");
    return;
  }

  // 3. อัปเดต Stock และ Sold โดยสร้าง State ใหม่
  setProducts((prev) =>
    prev.map((supplier) => ({
      ...supplier,
      products: (supplier.products ?? []).map((item) => {
        if (item.id === id) {
          return {
            ...item,
            stock: item.stock - 1,
            sold: item.sold + 1,
          };
        }

        return item;
      }),
    }))
  );

  // 4. บันทึกประวัติการขาย
  setPreviousActions((prev) => [
    ...prev,
    {
      supplierId: productToSell.supplierId,
      productId: id,
      productName: productToSell.name,
      quantity: 1,
      time: Date.now().toString(),
    },
  ]);
};

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fe] font-sans text-[#0B0F4F]">
      <Navbar />
      <main className="mx-auto w-full max-w-[1280px] flex-1 space-y-5 px-4 pb-6 pt-16 sm:px-6">
        
        {/* TOP HEADER SECTION CARD */}
        <div className="space-y-4 rounded-2xl border border-[#7C5CFF]/15 bg-white px-4 pb-4 pt-5 shadow-sm sm:px-5 sm:pb-5 sm:pt-6">
          {/* Title row */}
          <div className="flex flex-col gap-3 min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-[#0B0F4F] sm:text-3xl">
                  {StockList[0].name}
                </h1>
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                   LIVE RUN
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-[#7C5CFF]">
              <span className="flex items-center gap-1.5 rounded-full border border-[#7C5CFF]/20 bg-[#7C5CFF]/5 px-2.5 py-0.5">
                <User className="h-3.5 w-3.5" /> 1 Assistant
              </span>
              <button
                onClick={() => setIsOpen(true)}
                className="rounded-lg border border-[#7C5CFF]/25 bg-[#7C5CFF]/10 px-2.5 py-1 font-bold text-[#7C5CFF] transition-colors hover:border-[#7C5CFF]/40 hover:bg-[#7C5CFF]/20 hover:text-[#0B0F4F]"
              >
                + Invite
              </button>
            </div>

            {/* Run mode toggle buttons */}
            <div className="flex shrink-0 flex-wrap items-center gap-1.5">
              <div
                className="flex items-center gap-0.5 rounded-lg border border-[#7C5CFF]/20 bg-[#7C5CFF]/5 p-0.5"
                role="group"
                aria-label="Run mode"
              >
                <button
                  type="button"
                  onClick={() => setStepMode("sales")}
                  aria-pressed={stepMode === "sales"}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-bold transition-colors ${
                    stepMode === "sales"
                      ? "bg-[#7C5CFF] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <ShoppingBag className="h-3.5 w-3.5" /> Sales Mode
                </button>
                <button
                  type="button"
                  onClick={() => setStepMode("edit")}
                  aria-pressed={stepMode === "edit"}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-bold transition-colors ${
                    stepMode === "edit"
                      ? "bg-[#7C5CFF] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Receipt className="h-3.5 w-3.5" /> Edit Mode
                </button>
              </div>
              <button
                type="button"
                onClick={() => setIsEndRunOpen(true)}
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#F062C0]/30 bg-[#F062C0]/10 px-2.5 py-1.5 text-xs font-bold text-[#F062C0] transition-colors hover:bg-[#F062C0]/20"
              >
                <X className="h-3.5 w-3.5" /> End Run
              </button>
            </div>
          </div>

          {/* Key Stat Cards Grid */}
          <div className="grid grid-cols-1 gap-3 rounded-2xl bg-[#7C5CFF]/5 p-4 min-[600px]:grid-cols-3 min-[900px]:grid-cols-4">
            {/* Gross Intake */}
            <div className="flex min-h-[76px] min-w-0 items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2.5 shadow-sm min-[900px]:col-span-1">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Gross Intake</p>
                <p className="mt-0.5 text-lg font-extrabold text-[#0B0F4F]">฿{StockList[0].grossIntake.toLocaleString('en-US')}.00</p>
              </div>
              <div className="rounded-md bg-[#7C5CFF]/10 p-2 text-[#7C5CFF]">
                <Receipt className="h-4 w-4" />
              </div>
            </div>

            {/* Total Sold Units */}
            <div className="flex min-h-[76px] min-w-0 items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2.5 shadow-sm min-[900px]:col-span-1">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Total Sold Units</p>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="text-lg font-extrabold text-[#0B0F4F]">{StockList[0].totalsold}</span>
                  <span className="text-xs font-medium text-slate-400">/ {StockList[0].totalsoldMax} starting</span>
                </div>
              </div>
              <div className="rounded-md bg-[#FFB24C]/15 p-2 text-[#FFB24C]">
                <ShoppingBag className="h-4 w-4" />
              </div>
            </div>

            {/* Latest Action & Undo */}
            <div className="flex min-h-[76px] min-w-0 items-center justify-between gap-2 rounded-lg border border-slate-100 bg-white py-2.5 pl-3 pr-5 shadow-sm min-[900px]:col-span-2">
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  <History className="h-3 w-3 text-[#F062C0]" /> Latest Action
                </p>
                <p className="mt-0.5 flex min-w-0 items-center gap-2 truncate text-xs font-semibold text-slate-800">
                  <span className="min-w-0 truncate">
                    {previousActions.length > 0 ? `Sold ${previousActions[previousActions.length - 1].quantity}x ${previousActions[previousActions.length - 1].productName} ` : 'No actions yet'}
                  </span>
                  <span className="shrink-0 rounded-full bg-[#F062C0]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#F062C0]">
                    {previousActions.length > 0 ? <ActionTimeAgo createdAt={Number(previousActions[previousActions.length - 1].time)} /> : '0'}
                  </span>
                </p>
              </div>
              <button onClick={()=>handleUndo()} disabled={previousActions.length === 0} className={`flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-bold text-[#0B0F4F] transition-colors ${previousActions.length === 0 ? 'cursor-not-allowed bg-gray-400 text-white' : 'bg-[#FFB24C] hover:bg-[#f5a733]'}`}>
                <Undo2 className="h-3.5 w-3.5" /> Undo
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT SECTION: SIDEBAR + MAIN TABLES */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-[210px_minmax(0,1fr)]">
          
          {/* LEFT SIDEBAR / CATALOG INDEX */}
          <div className="space-y-4">
            <div className="rounded-xl border border-[#e6e9f2] bg-white p-2 shadow-[0_2px_8px_rgba(11,15,79,0.025)]">
              <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-[#858ba0]">
                Catalog Index
              </h3>
              
              <nav className="space-y-0.5">
                <button className="flex w-full items-center justify-between gap-1.5 rounded-lg border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-1.5 py-1.5 text-left text-xs font-semibold text-[#0B0F4F]">
                  <div className="flex items-center gap-1.5">
                    <LayoutGrid className="h-2.5 w-2.5 shrink-0 text-[#7C5CFF]" />
                    <span>All Products</span>
                  </div>
                  <span className="rounded-full bg-[#7C5CFF]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#7C5CFF]">8</span>
                </button>

                <button className="flex w-full items-center gap-1.5 rounded-lg px-1.5 py-1.5 text-left text-xs text-[#4c526a] transition-colors hover:bg-[#f7f5ff]">
                  <div className="flex items-center gap-1.5">
                    <User className="h-2.5 w-2.5 shrink-0 text-[#7C5CFF]" />
                    <span>My Products (Host)</span>
                  </div>
                </button>

                <button className="flex w-full items-center gap-1.5 rounded-lg px-1.5 py-1.5 text-left text-xs text-[#4c526a] transition-colors hover:bg-[#f7f5ff]">
                  <div className="flex items-center gap-1.5">
                    <Store className="h-2.5 w-2.5 shrink-0 text-[#F062C0]" />
                    <span>P Kaimook</span>
                  </div>
                </button>

                <button className="flex w-full items-center gap-1.5 rounded-lg px-1.5 py-1.5 text-left text-xs text-[#4c526a] transition-colors hover:bg-[#f7f5ff]">
                  <div className="flex items-center gap-1.5">
                    <Store className="h-2.5 w-2.5 shrink-0 text-[#FFB24C]" />
                    <span>Nong Japan</span>
                  </div>
                </button>
              </nav>

              <div className="mt-1.5 border-t border-[#eff0f5] pt-1.5">
                <button onClick={()=>setStepMode("expense")} className="flex w-full items-center justify-between rounded-lg bg-[#FFB24C]/10 px-1.5 py-1.5 text-xs font-semibold text-[#0B0F4F] transition-colors hover:bg-[#FFB24C]/20">
                  <div className="flex items-center gap-1.5">
                    <Receipt className="h-2.5 w-2.5 text-[#FFB24C]" />
                    <span>Booth Expenses</span>
                  </div>
                  <ChevronDown className="h-2.5 w-2.5 -rotate-90 text-[#858ba0]" />
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs font-bold text-[#0B0F4F]">
                <span className="flex items-center gap-1.5"><UsersRound className="h-3.5 w-3.5 text-[#7C5CFF]" /> Assistants</span>
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-600">• 1 Active</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-1.5 rounded-lg bg-slate-50 px-1.5 py-1.5">
                <div className="flex min-w-0 items-center gap-1.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7C5CFF] text-xs font-bold text-white">P</span>
                  <div>
                    <p className="text-xs font-bold leading-4 text-slate-700">Ploy W.</p>
                    <p className="text-[10px] leading-3.5 text-slate-400">Cashier Mode</p>
                  </div>
                </div>
                <span className="shrink-0 text-[10px] font-semibold text-emerald-600">• Online</span>
              </div>
              <button onClick={() => setIsOpen(true)} className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-[#FFB24C] px-1.5 py-1.5 text-[10px] font-bold text-[#0B0F4F] hover:bg-[#f5a733]">
                <UserPlus className="h-3 w-3 shrink-0" /> + Invite Assistant
              </button>
              <button onClick={() => setIsPermissionEnabled(true)} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#7C5CFF]/20 bg-[#7C5CFF]/5 px-2 py-2 text-[11px] font-bold text-[#7C5CFF] hover:bg-[#7C5CFF]/10">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> Manage Permissions
              </button>
            </div>

            {/* Quick Tip Box */}
            <div className="flex gap-1.5 rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFB24C]" />
              <div className="min-w-0 space-y-1 text-xs">
                <p className="font-bold text-[#0B0F4F]">Quick Tip</p>
                <p className="leading-snug text-slate-400">
                  Click supplier tab to jump directly to items. Click action button to register immediate sales.
                </p>
              </div>
            </div>

            <Link href="/ViewUser/1" className="flex items-center justify-between gap-1 rounded-lg bg-gradient-to-r from-[#7C5CFF] to-[#F062C0] px-1.5 py-1.5 text-white shadow-sm">
              <span className="flex min-w-0 items-start gap-1">
                <span className="shrink-0 rounded bg-white/20 p-1"><History className="h-3 w-3" /></span>
                <span className="min-w-0 flex-1"><span className="block text-[10px] font-bold leading-3.5">Sales Activity Board</span><span className="block text-[9px] leading-3 text-white/80">Enter live sales feed &amp; telemetry</span></span>
              </span>
              <ChevronRight className="h-3 w-3 shrink-0" />
            </Link>
          </div>

          {/* RIGHT PRODUCT LIST TABLES */}
          {/* Product cards for each supplier  Edit Mode*/}
          <div className="min-w-0 space-y-3">
            
            {/* 1. SECTION: MY PRODUCTS */}
            {stepMode === "edit" && (
                <>

{products.map((items) => (
  <ProductGroupSection
    key={items.id}
    title={items.name}
    badgeText={items.role}
    badgeColor="bg-[#7C5CFF]/10 text-[#7C5CFF]"
    itemCount={items.products?.length ?? 0}
    dotColor="bg-[#7C5CFF]"
    items={items.products ?? []}
    placeholderText="Item Name (e.g. Linen Coaster Set)"
  />
))}

            

            </>
)}
               {/* Product cards for each supplier  Sales Mode*/}
               
{stepMode === "sales" && (
  <div className="w-full space-y-2">

    {/* 1. HOST PRODUCTS */}
   {products.map((supplier) => (
    <SaleSection key={supplier.id} products={supplier.products} handleSell={handleSell} Name={supplier.name} Role={supplier.category} id={supplier.id} />
   ))}

  </div>
)}

               {stepMode === "expense" && (
                <div className="min-h-screen bg-[#f8f9fe] p-4 md:p-8 text-[#0B0F4F] font-sans max-w-5xl mx-auto space-y-5">
      
      {/* 1. HEADER CARD: Booth's Operating Expenses */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFB24C]/15 text-[#FFB24C] flex items-center justify-center shrink-0">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#0B0F4F] tracking-tight">
              Booth’s Operating Expenses
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              Track and split operational costs for this sales run
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="bg-[#7C5CFF]/5 text-[#7C5CFF] px-3 py-1.5 rounded-full border border-[#7C5CFF]/20 flex items-center gap-2 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Synchronized Ledger</span>
        </div>
      </div>

      {/* 2. FAST LOG SHARED EXPENSE CARD */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs space-y-4">
        {/* Section Title */}
        <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
          <PlusCircle className="w-4 h-4 text-[#FFB24C]" />
          <span>Fast Log Shared Expense</span>
        </div>

        {/* Input Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          
          {/* Expense Title Input */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Expense Title
            </label>
            <div className="relative flex items-center">
              <Pencil className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-3 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-[#7C5CFF] transition-colors"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 appearance-none focus:bg-white focus:outline-[#7C5CFF] transition-colors pr-8 cursor-pointer"
              >
                <option value="Stall Supplies">Stall Supplies</option>
                <option value="Booth Fee">Booth Fee</option>
                <option value="Travel">Travel</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Amount (฿) Input */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Amount (฿)
            </label>
            <div className="relative flex items-center">
              <span className="text-xs font-semibold text-slate-400 absolute left-3.5">
                ฿
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-8 pr-3 py-2.5 text-xs font-bold text-slate-800 text-right focus:bg-white focus:outline-[#7C5CFF] transition-colors"
              />
            </div>
          </div>

          {/* Record Button */}
          <div className="md:col-span-2">
            <button className="w-full py-2.5 bg-[#FFB24C] hover:bg-[#f5a733] active:bg-[#e99a2e] text-[#0B0F4F] font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1">
              <Plus className="w-4 h-4 stroke-[3]" /> Record
            </button>
          </div>

        </div>
      </div>

      {/* 3. RECORDED EXPENSES CARD */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
        {/* Card Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center space-x-2 text-[#0B0F4F] font-bold text-base">
            <Receipt className="w-5 h-5 text-[#FFB24C]" />
            <span>Recorded Expenses</span>
          </div>
          <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-medium">
            Active Read-Only Ledger
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-5 w-12">#</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Expense Detail</th>
                <th className="py-3 px-4 text-center">Category</th>
                <th className="py-3 px-4 text-center">Logged By</th>
                <th className="py-3 px-5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {expensesList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-5 font-bold text-[#0B0F4F]">{item.id}</td>
                  <td className="py-4 px-4 text-slate-400 text-[11px]">{item.timestamp}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${item.dotColor}`}></span>
                      <span className="font-bold text-slate-800">{item.detail}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border ${item.categoryBg}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-semibold text-slate-700">{item.loggedBy} </span>
                    <span className="text-[#FFB24C] font-bold text-[11px]">{item.role}</span>
                  </td>
                  <td className="py-4 px-5 text-right font-black text-[#0B0F4F] text-sm">
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Summary */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">
            Showing 2 settled market expenses
          </span>
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 font-medium">Subtotal Logged:</span>
            <span className="font-black text-[#FFB24C] text-sm">฿850.00</span>
          </div>
        </div>
      </div>

    </div>
               )}
            {/* ADD NEW SUPPLIER BOTTOM CARD */}
            {stepMode === "edit" &&(
            <div className="bg-slate-50/80 border-2 border-dashed border-slate-200 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7C5CFF]/10 text-[#7C5CFF] rounded-xl">
                  <UserPlus className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-800 text-sm">Add New Supplier</span>
              </div>
              <button className="px-4 py-2 bg-[#7C5CFF] hover:bg-[#6847e8] text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Add Supplier
              </button>
            </div>
            )}
          </div>
       
            
        </div>
      </main>

      <Footer />

      {isOpen && (
        <SupplierInviteModal
          onClose={() => setIsOpen(false)}
          copied={copied}
          onCopy={handleCopy}
          inviteUrl={inviteUrl}
          joinPin={joinPin}
          onOpenPermissions={() => {
            setIsOpen(false);
            setIsPermissionEnabled(true);
          }}
        />
      )}
      {isPermissionEnabled && (
       < AssistantPermissionsModal
       onClose={() => setIsPermissionEnabled(false)} />
      )}
      {isEndRunOpen && (
        <EndSalesRunModal
          onClose={() => setIsEndRunOpen(false)}
        />
      )}
    </div>
  );



}
type PermissionProps = {
  registerSales: boolean;
  issueDiscounts: boolean;
  voidTransaction: boolean;
  viewInventory: boolean;
  restockQuantities: boolean;
  addNewProducts: boolean;
};
type ActivePermissionTab = 'global' | 'may' | 'tanawat';
type PermissionModalProps = {
  onClose: () => void;
  activity: ActivePermissionTab;
  permission: PermissionProps;
  activitySet: React.Dispatch<React.SetStateAction<ActivePermissionTab>>;
  togglePermission: (key: keyof PermissionProps) => void;
  resetPermissions: () => void;
};
type SupplierInviteModalProps = {
  onClose: () => void;
  copied: boolean;
  onCopy: () => void;
  inviteUrl: string;
  joinPin: string;
  onOpenPermissions: () => void;
};
// MODAL COMPONENT: Supplier Invite Modal
function SupplierInviteModal({ onClose, copied, onCopy, inviteUrl, joinPin, onOpenPermissions }: SupplierInviteModalProps) {
  return (
    <div onClick={() => onClose()} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      
      {/* MODAL CARD */}
      <div onClick={(e) => e.stopPropagation()}  className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100/80 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* 1. MODAL HEADER */}
        <div className="p-6 pb-4 flex items-start justify-between border-b border-slate-100">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7C5CFF] via-[#7C5CFF] to-[#F062C0] text-white flex items-center justify-center shrink-0 shadow-sm">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0B0F4F] tracking-tight leading-snug">
                Invite Run Assistants
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5 leading-relaxed">
                Invited Assistants need permission from you to make actions
              </p>
            </div>
          </div>

          <button
            onClick={() => onClose()}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. MODAL BODY */}
        <div className="p-6 space-y-6">
          
          {/* Top Section: Link/PIN (Left) + QR Code (Right) */}
          <div className="grid grid-cols-12 gap-4 items-stretch">
            
            {/* Left Inputs (8 cols) */}
            <div className="col-span-7 space-y-4 flex flex-col justify-between">
              
              {/* RUN INVITE LINK */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  RUN INVITE LINK
                </label>
                <div className="flex items-center gap-1.5">
                  <div                   className="bg-[#7C5CFF]/5 border border-[#7C5CFF]/20 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 truncate w-full">
                    {inviteUrl}
                  </div>
                  <button
                    onClick={() => onCopy()}
                    className="bg-[#FFB24C] hover:bg-[#f5a733] active:bg-[#e99a2e] text-[#0B0F4F] font-bold text-xs px-3 py-2 rounded-xl transition-colors shadow-xs flex items-center gap-1 shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* RUN JOIN CODE / PIN */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  RUN JOIN CODE / PIN
                </label>
                <div className="bg-[#7C5CFF]/5 border border-[#7C5CFF]/20 rounded-xl px-3 py-2.5 text-center text-[#7C5CFF] font-black text-base tracking-wider">
                  {joinPin}
                </div>
              </div>

            </div>

            {/* Right QR Box (5 cols) */}
            <div className="col-span-5 bg-slate-50/60 border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center text-center space-y-2">
              <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                {/* Simulated QR Code Graphic */}
                <div className="w-16 h-16 bg-white relative flex items-center justify-center">
                  <QrCode className="w-full h-full text-[#0B0F4F]" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400">
                Fast Booth Scan
              </span>
            </div>

          </div>

          {/* ASSISTANTS JOINED (2) SECTION */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              ASSISTANTS JOINED (2)
            </label>

            <div className="space-y-2">
              {/* Assistant 1: @may_craft (Active) */}
              <div className="bg-[#7C5CFF]/5 border border-[#7C5CFF]/15 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#7C5CFF] text-white font-bold text-xs flex items-center justify-center uppercase shadow-2xs">
                    MC
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    @may_craft
                  </span>
                </div>
                <span className="bg-emerald-100/80 text-emerald-700 border border-emerald-200/60 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </div>

              {/* Assistant 2: granawan.b (Offline) */}
              <div className="bg-[#7C5CFF]/5 border border-[#7C5CFF]/15 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center uppercase">
                    TB
                  </div>
                  <span className="text-xs font-semibold text-slate-600">
                    granawan.b
                  </span>
                </div>
                <span className="bg-slate-100 text-slate-500 border border-slate-200/60 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  Offline
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. MODAL FOOTER */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end space-x-2.5">
          <button onClick={onOpenPermissions} className="px-4 py-2 bg-white hover:bg-slate-50 text-[#7C5CFF] border border-[#7C5CFF]/20 font-bold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#7C5CFF]" />
            <span>Assistant Permissions</span>
          </button>
          
          <button
            onClick={() => onClose()}
            className="px-5 py-2 bg-[#7C5CFF] hover:bg-[#6847e8] active:bg-[#5536d2] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}


// COMPONENT: Product Group Section (ใช้สร้างตารางสินค้าแต่ละ Supplier)
function ProductGroupSection({ title, badgeText, badgeColor, itemCount, dotColor, items, placeholderText }:any) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden space-y-3 p-5">
      {/* Group Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></span>
          <h2 className="font-bold text-[#0B0F4F] text-base">{title}</h2>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeColor}`}>
            {badgeText}
          </span>
        </div>
        <span className="px-2.5 py-0.5 bg-[#7C5CFF]/5 text-[#7C5CFF] rounded-full text-[11px] font-bold border border-[#7C5CFF]/20">
          {itemCount} items
        </span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
        <div className="col-span-5">PRODUCT NAME</div>
        <div className="col-span-3 text-center">STOCK / QTY</div>
        <div className="col-span-2 text-center">PRICE (฿)</div>
        <div className="col-span-1 text-center">SOLD</div>
        <div className="col-span-1 text-center">ACTION</div>
      </div>

      {/* Product Rows */}
      <div className="space-y-2">
        {items.map((item:any) => (
          <div key={item.id} className="grid grid-cols-12 items-center px-3 py-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors text-sm font-medium">
            <div className="col-span-5 flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
              <input
                type="text"
                defaultValue={item.name}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 w-full font-semibold focus:outline-[#7C5CFF] text-sm shadow-2xs"
              />
            </div>

            {/* Qty Stepper */}
            <div className="col-span-3 flex items-center justify-center gap-1">
              <button className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 shadow-2xs">
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center font-bold text-[#7C5CFF]">{item.stock}</span>
              <button className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 shadow-2xs">
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Price */}
            <div className="col-span-2 flex items-center justify-center">
              <div className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 flex items-center gap-1 w-20 shadow-2xs">
                <span className="text-[#FFB24C] font-bold">฿</span>
                <input
                  type="text"
                  defaultValue={item.price}
                  className="w-full bg-transparent font-bold text-slate-800 text-center focus:outline-none"
                />
              </div>
            </div>

            {/* Sold Count */}
            <div className="col-span-1 text-center font-bold text-slate-700">
              {item.sold}
            </div>

            {/* Delete Action */}
            <div className="col-span-1 text-center">
              <button className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors">
                <Trash2 className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Form Row */}
      <div className="grid grid-cols-12 gap-2 pt-2 items-center">
        <div className="col-span-6">
          <input
            type="text"
            placeholder={placeholderText}
            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-[#7C5CFF] transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="col-span-2">
          <input
            type="number"
            placeholder="Qty"
            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3 py-2 text-xs text-center focus:bg-white focus:outline-[#7C5CFF] transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="col-span-2">
          <input
            type="number"
            placeholder="Price ฿"
            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3 py-2 text-xs text-center focus:bg-white focus:outline-[#7C5CFF] transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="col-span-2">
          <button className="w-full py-2 bg-[#7C5CFF] hover:bg-[#6847e8] text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1">
            <PlusCircle className="w-3.5 h-3.5" /> Add Product
          </button>
        </div>
    </div>
    </div>
  );
}
function ProductCard({ item, onSell }: { item: any; onSell: (id: string) => void }) {
  const IconComponent = item.icon;
  const isOutOfStock = item.stock === 0;

  return (
    <div className="flex min-h-[88px] items-center justify-between gap-3 rounded-xl border border-slate-100/80 bg-white p-4 shadow-2xs transition-shadow hover:shadow-md">
      {/* Left Column: Icon + Name + Stock Info */}
      <div className="flex min-w-0 items-center gap-2">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}>
          <IconComponent className="h-5 w-5" />
        </div>

        <div className="min-w-0 space-y-0.5">
          <h3 className="truncate text-base font-bold tracking-tight text-[#0B0F4F]">
            {item.name}
          </h3>
          <div className="flex flex-wrap items-center gap-x-1.5 text-sm font-medium text-slate-400">
            <span>Start: <strong className="text-slate-700">{item.start}</strong></span>
            <span>•</span>
            <span className={isOutOfStock ? 'text-red-600 font-semibold' : 'text-[#7C5CFF] font-semibold'}>
              {isOutOfStock ? 'Out of stock' : `${item.stock} in stock`}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Price + Sold Count + Sell Button */}
      <div className="flex shrink-0 items-center gap-3">
        <div className="text-right">
          <div className="flex items-center justify-end text-lg font-black leading-none text-[#0B0F4F]">
            <span className="mr-0.5 text-sm font-extrabold">฿</span>
            {item.price}
          </div>
          <p className="mt-1 text-sm font-medium text-slate-400">
            Sold: <span className="font-bold text-slate-700">{item.sold}</span>
          </p>
        </div>

        <button
          onClick={() => onSell(item.id)}
          disabled={isOutOfStock}
          className={`flex h-10 min-w-[84px] items-center justify-center gap-1 rounded-lg px-2.5 text-sm font-bold text-white shadow-xs transition-all active:scale-95 ${
            isOutOfStock
              ? 'bg-gray-400 opacity-90 cursor-not-allowed'
              : 'bg-[#7C5CFF] hover:bg-[#6847e8] active:bg-[#5536d2]'
          }`}
        >
          Sell - 1
        </button>
      </div>
    </div>
  );
}
type AssistantPermissionsModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (permissions: Record<string, boolean>) => void;
};
function AssistantPermissionsModal({
  isOpen = true,
  onClose = () => {},
  onSave = () => {}
}: AssistantPermissionsModalProps) {
  // State สำหรับเก็บสถานะสวิตช์ทั้ง 5 รายการ (ค่าเริ่มต้นปิดทั้งหมด 0/5 ตามรูป)
  const [permissions, setPermissions] = useState({
    sellProducts: false,
    editProducts: false,
    recordExpenses: false,
    viewSalesLog: false,
    managePermissions: false
  });

  // State สำหรับ Dropdown เลือก Assistant
  const [selectedAssistant, setSelectedAssistant] = useState('@ploy_w');

  // ฟังก์ชันสลับการเปิด/ปิดสวิตช์ Toggle
  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // คำนวณจำนวนรายการที่เปิดใช้งาน
  const enabledCount = Object.values(permissions).filter(Boolean).length;

  // ถ้าสั่งปิด Modal ให้คืนค่า null ไม่แสดงผล
  if (!isOpen) return null;

  return (
    // BACKDROP (ฉากหลังมืดโปร่งแสง + เบลอด้วย backdrop-blur-sm)
    <div onClick={()=>onClose()} className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-2 sm:p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-200">
      
      {/* MODAL CONTAINER */}
      <div onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-lg max-h-[calc(100vh-1rem)] sm:max-h-[90vh] rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* 1. MODAL HEADER */}
        <div className="p-4 sm:p-6 pb-4 sm:pb-5 flex items-start justify-between gap-3 border-b border-slate-100 shrink-0">
          <div className="flex items-start gap-2.5 sm:gap-3.5 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#7C5CFF]/10 text-[#7C5CFF] flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0B0F4F] tracking-tight">
                Assistant Permissions
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed max-w-xs">
                Default permissions for new assistants: All disabled (toggle on individually to grant access).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. MODAL BODY */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          
          {/* SELECT ASSISTANT SECTION */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>SELECT ASSISTANT</span>
              <span className="text-slate-400 font-semibold lowercase">3 joined</span>
            </div>

            {/* Custom Dropdown Box */}
            <div className="bg-[#7C5CFF]/5 border border-[#7C5CFF]/20 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-[#7C5CFF]/10 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#7C5CFF] text-white font-bold text-sm flex items-center justify-center uppercase shadow-xs">
                  P
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-[#0B0F4F] text-sm">
                      {selectedAssistant}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-semibold">
                    <span className="text-[#FFB24C]">
                      Restricted (Viewer only)
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400 font-medium">
                      All permissions off by default
                    </span>
                  </div>
                </div>
              </div>

              <ChevronDown className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* PERMISSIONS SECTION */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                PERMISSIONS
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-[#FFB24C]">
                All permissions off by default ({enabledCount}/5 enabled)
              </span>
            </div>

            {/* LIST OF PERMISSION TOGGLES */}
            <div className="space-y-2.5">
              
              {/* Item 1: Sell Products / Cashier Mode */}
              <PermissionToggleRow
                icon={<Calculator className="w-5 h-5 text-[#7C5CFF]" />}
                title="Sell Products / Cashier Mode"
                description="Sell products and register sales transactions in Sales Mode"
                enabled={permissions.sellProducts}
                onToggle={() => togglePermission('sellProducts')}
              />

              {/* Item 2: Add / Edit / Delete Products */}
              <PermissionToggleRow
                icon={<Edit3 className="w-5 h-5 text-[#7C5CFF]" />}
                title="Add / Edit / Delete Products"
                description="Manage catalog items, quantities, and pricing"
                enabled={permissions.editProducts}
                onToggle={() => togglePermission('editProducts')}
              />

              {/* Item 3: Record Booth Expenses */}
              <PermissionToggleRow
                icon={<Receipt className="w-5 h-5 text-[#7C5CFF]" />}
                title="Record Booth Expenses"
                description="Record booth expenses and operational costs"
                enabled={permissions.recordExpenses}
                onToggle={() => togglePermission('recordExpenses')}
              />

              {/* Item 4: View Sales Log & Gross Stats */}
              <PermissionToggleRow
                icon={<History className="w-5 h-5 text-[#7C5CFF]" />}
                title="View Sales Log & Gross Stats"
                description="Access transaction history, undo sales, and total stats"
                enabled={permissions.viewSalesLog}
                onToggle={() => togglePermission('viewSalesLog')}
              />

              {/* Item 5: Manage & Grant Permissions */}
              <PermissionToggleRow
                icon={<Shield className="w-5 h-5 text-[#7C5CFF]" />}
                title="Manage & Grant Permissions"
                badgeText="RESTRICTED"
                description="Assign roles and grant assistant permissions"
                enabled={permissions.managePermissions}
                onToggle={() => togglePermission('managePermissions')}
              />

            </div>
          </div>

        </div>

        {/* 3. MODAL FOOTER */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200/80 transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={() => onSave(permissions)}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#7C5CFF] hover:bg-[#6847e8] active:bg-[#5536d2] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Save Permissions</span>
          </button>
        </div>

      </div>
    </div>
  );
}

// COMPONENT ย่อยสำหรับสวิตช์แต่ละแถว
type PermissionToggleRowProps = {
  icon: React.ReactNode;
  title: string;
  badgeText?: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
};

function PermissionToggleRow({
  icon,
  title,
  badgeText,
  description,
  enabled,
  onToggle
}: PermissionToggleRowProps) {
  return (
    <div
      onClick={onToggle}
      className="p-3.5 rounded-2xl border border-slate-100/90 bg-white hover:bg-slate-50/60 transition-colors cursor-pointer flex items-center justify-between gap-3 shadow-2xs"
    >
      <div className="flex items-start space-x-3.5 pr-2">
        <div className="w-10 h-10 rounded-xl bg-[#7C5CFF]/5 flex items-center justify-center shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-[#0B0F4F] text-xs tracking-tight">
              {title}
            </h3>
            {badgeText && (
              <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-[#7C5CFF]/10 text-[#7C5CFF] uppercase tracking-wider">
                {badgeText}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 font-medium leading-normal">
            {description}
          </p>
        </div>
      </div>

      {/* TOGGLE SWITCH */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 focus:outline-none ${
          enabled ? 'bg-[#7C5CFF]' : 'bg-slate-200'
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-xs transform transition-transform duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
type EndSalesRunModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirmEndRun?: () => void;
};
function EndSalesRunModal({
  isOpen = true,
  onClose = () => {},
  onConfirmEndRun = () => {}
}: EndSalesRunModalProps) {
  // State สำหรับ Checkbox การยืนยัน Step 2
  const [isConfirmed, setIsConfirmed] = useState(true);

  // State สำหรับ Text Input ยืนยันคำว่า "END RUN"
  const [confirmText, setConfirmText] = useState('END RUN');

  // ตรวจสอบเงื่อนไขว่าสามารถกดปุ่ม Confirm & End Run ได้หรือไม่
  const isReadyToSubmit = isConfirmed && confirmText.trim().toUpperCase() === 'END RUN';

  // ถ้าสั่งปิด Modal ให้คืนค่า null ไม่แสดงผล
  if (!isOpen) return null;

  return (
    // BACKDROP (ฉากหลังมืดโปร่งแสง + เบลอด้วย backdrop-blur-sm)
    <div onClick={()=>onClose()} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-200">
      
      {/* MODAL CONTAINER */}
      <div onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* 1. MODAL HEADER */}
        <div className="p-6 pb-5 flex items-start justify-between border-b border-slate-100">
          <div className="flex items-start space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#0B0F4F] tracking-tight">
                End Active Sales Run
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5 leading-relaxed">
                Two-step verification required to permanently close session
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. MODAL BODY */}
        <div className="p-6 space-y-5">
          
          {/* STEP 1: SESSION LOCKDOWN WARNINGS BOX */}
          <div className="bg-rose-50/60 border border-rose-200/60 rounded-2xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Step 1: Session Lockdown Warnings</span>
            </div>

            <ul className="text-[11px] text-slate-500 font-medium space-y-1 pl-6 list-disc marker:text-slate-400 leading-relaxed">
              <li>Disconnects active assistants (Ploy W. and others).</li>
              <li>Locks all product inventories and disables instant sales logging.</li>
              <li>Calculates final supplier payouts and locks telemetry tallies.</li>
            </ul>
          </div>

          {/* STEP 2: VERIFICATION & RECONCILIATION */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-800">
              Step 2: Verification & Reconciliation
            </h3>

            {/* CONFIRMATION CHECKBOX BOX */}
            <label
              onClick={() => setIsConfirmed(!isConfirmed)}
              className="bg-[#7C5CFF]/5 border border-[#7C5CFF]/20 rounded-2xl p-3.5 flex items-center space-x-3 cursor-pointer hover:bg-[#7C5CFF]/10 transition-colors select-none"
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                  isConfirmed ? 'bg-[#7C5CFF] text-white' : 'border border-slate-300 bg-white'
                }`}
              >
                {isConfirmed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs font-bold text-slate-800">
                I confirm that the sales session has ended.
              </span>
            </label>

            {/* INPUT CONFIRMATION TEXT */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 block">
                Type <span className="font-bold text-rose-500">END RUN</span> below to confirm:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="END RUN"
                className="w-full bg-slate-50/60 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:outline-rose-500 uppercase transition-all placeholder:text-slate-300"
              />
            </div>
          </div>

        </div>

        {/* 3. MODAL FOOTER */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200/80 transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={() => {
              if (isReadyToSubmit) onConfirmEndRun();
            }}
            disabled={!isReadyToSubmit}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all flex items-center gap-1.5 ${
              isReadyToSubmit
                ? 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 cursor-pointer'
                : 'bg-rose-300 cursor-not-allowed opacity-70'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Confirm & End Run</span>
          </button>
        </div>

      </div>
    </div>
  );
}

function SaleSection({
  products,
  handleSell,
  Name,
  Role,
  id,
}: {
  products: any[];
  handleSell: (id: string) => void;
  Name: string;
  Role: string;
  id: string;
}) {
  // กรองสินค้าของ Supplier ที่ตรงกับ ID
  const filteredProducts = products.filter(
    (item) => item && item.supplierId === id
  );
  const accent = id.toLowerCase().includes("kaimook")
    ? { dot: "bg-[#F062C0]", count: "border-[#F062C0]/20 bg-[#F062C0]/10 text-[#F062C0]" }
    : id.toLowerCase().includes("nong")
      ? { dot: "bg-[#FFB24C]", count: "border-[#FFB24C]/20 bg-[#FFB24C]/10 text-[#FFB24C]" }
      : { dot: "bg-[#7C5CFF]", count: "border-[#7C5CFF]/20 bg-[#7C5CFF]/5 text-[#7C5CFF]" };


  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-slate-100/80 bg-white px-4 py-3 shadow-2xs">
        <div className="flex min-w-0 items-center gap-2">
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${accent.dot}`} />

          <h2 className="truncate text-sm font-extrabold tracking-tight text-[#0B0F4F]">
            {Name}
          </h2>

          <span className="shrink-0 rounded-full bg-[#7C5CFF]/10 px-2 py-1 text-[10px] font-extrabold text-[#7C5CFF]">
            {Role === "host" ? "Host" : "Supplier"}
          </span>
        </div>

        <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-bold ${accent.count}`}>
          {filteredProducts.length} items
        </span>
      </div>

      {/* Product Cards */}
      {filteredProducts.map((cardItem) => (
        <ProductCard
          key={cardItem.id}
          item={cardItem}
          onSell={handleSell}
        />
      ))}
    </div>
  );
}
