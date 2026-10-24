"use client";
import React, { Suspense, useState } from 'react';
import {
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
  ArrowLeft,
  ShoppingBag,
  History,
  Lightbulb,
  Receipt,
  UserPlus,
  Save,
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
  ShieldCheck,
  RotateCcw,
  Check,
  Minus
} from 'lucide-react';
import Navbar from '@/app/components/navbar';
import Footer from "@/app/components/footer";
export default function SalesRunDetail() {
  // ตัวอย่าง State สำหรับจัดการจำนวนสต็อก/สินค้า
  const initialProducts = [
    // My Products / Host Items
    {
      id: '1',
      name: 'Green Horned Frog',
      start: 10,
      stock: 0,
      price: 150,
      sold: 10,
      icon: Leaf,
      iconBg: 'bg-purple-100/70 text-purple-600',
      category: 'host'
    },
    {
      id: '2',
      name: 'Yellow Horned Frog',
      start: 10,
      stock: 1,
      price: 150,
      sold: 9,
      icon: Sun,
      iconBg: 'bg-amber-100/70 text-amber-500',
      category: 'host'
    },
    {
      id: '3',
      name: 'Brown Horned Frog',
      start: 10,
      stock: 6,
      price: 150,
      sold: 4,
      icon: Mountain,
      iconBg: 'bg-purple-100/70 text-purple-600',
      category: 'host'
    },
    // P' Kaimook
    {
      id: '4',
      name: 'Japanese turtle (Big)',
      start: 8,
      stock: 3,
      price: 250,
      sold: 5,
      icon: Rabbit,
      iconBg: 'bg-pink-100/70 text-pink-500',
      supplier: "P' Kaimook",
      category: 'kaimook'
    },
    {
      id: '5',
      name: 'Japanese turtle (Small)',
      start: 17,
      stock: 10,
      price: 100,
      sold: 7,
      icon: Fish,
      iconBg: 'bg-pink-100/70 text-pink-500',
      supplier: "P' Kaimook",
      category: 'kaimook'
    },
    {
      id: '6',
      name: 'Turtle food 500g',
      start: 62,
      stock: 40,
      price: 80,
      sold: 22,
      icon: Grid,
      iconBg: 'bg-amber-100/70 text-amber-500',
      supplier: "P' Kaimook",
      category: 'kaimook'
    },
    // Nong' Japan
    {
      id: '7',
      name: 'Aquarium Moss Ball (Medium)',
      start: 15,
      stock: 8,
      price: 60,
      sold: 7,
      icon: Package,
      iconBg: 'bg-purple-100/70 text-purple-600',
      supplier: "Nong' Japan",
      category: 'japan'
    },
    {
      id: '8',
      name: 'Mini Terrarium Starter Glass',
      start: 6,
      stock: 3,
      price: 190,
      sold: 3,
      icon: Droplets,
      iconBg: 'bg-purple-100/70 text-purple-600',
      supplier: "Nong' Japan",
      category: 'japan'
    }
  ];
  const expensesList = [
    {
      id: '01',
      timestamp: '14/9/26 12:43:05',
      detail: 'Weekend Market Stall Rent',
      dotColor: 'bg-amber-400',
      category: 'Booth Fee',
      categoryBg: 'bg-orange-50 text-orange-600 border-orange-100',
      loggedBy: 'Alex Chen',
      role: '(Host)',
      amount: '฿700.00'
    },
    {
      id: '02',
      timestamp: '14/9/26 15:10:20',
      detail: 'Ice bucket, string bags & tape',
      dotColor: 'bg-purple-600',
      category: 'Stall expense',
      categoryBg: 'bg-orange-50 text-orange-600 border-orange-100',
      loggedBy: 'Alex Chen',
      role: '(Host)',
      amount: '฿150.00'
    }
  ];
  const [products, setProducts] = useState(initialProducts);
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
const handleSell = (id: string) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id && item.stock > 0) {
          return {
            ...item,
            stock: item.stock - 1,
            sold: item.sold + 1
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fe] text-slate-800 font-sans pb-20">
      {/* 1. TOP NAVBAR */}
      <header className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <Suspense fallback={<div>Loading...</div>}>
       <Navbar />
       </Suspense>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6 mt-5">
        
        {/* TOP HEADER SECTION CARD */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100/60 shadow-sm space-y-6">
          {/* Title row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <button className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors mt-0.5">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    MFU outside night market (MON 14)
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    EDIT MODE
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-purple-600 font-medium mt-1.5">
                  <span className="bg-purple-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-purple-100">
                    <User className="w-3 h-3" /> 1 Assistant
                  </span>
                  <button  onClick={() => setIsOpen(true)} className="hover:underline font-semibold">+ Invite</button>
                </div>
              </div>
            </div>

            {/* Top Right Mode Toggle Buttons */}
            <div className="flex items-center gap-2">
              <div
                className="relative flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 shadow-inner"
                role="group"
                aria-label="Run mode"
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-lg bg-white shadow-sm transition-transform duration-300 ease-out ${
                    stepMode === "sales" ? "translate-x-0" : "translate-x-full"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setStepMode("sales")}
                  aria-pressed={stepMode === "sales"}
                  className={`relative z-10 flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                    stepMode === "sales"
                      ? "text-purple-700"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <ShoppingBag className="h-3.5 w-3.5" /> Sales Mode
                </button>
                <button
                  type="button"
                  onClick={() => setStepMode("edit")}
                  aria-pressed={stepMode === "edit"}
                  className={`relative z-10 flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                    stepMode === "edit"
                      ? "text-purple-700"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Receipt className="h-3.5 w-3.5" /> Edit Mode
                </button>
              </div>
              <button 
                type="button" 
                onClick={() => setIsEndRunOpen(true)}
                className="flex items-center gap-1.5 rounded-lg border border-rose-100 px-3.5 py-1.5 text-xs font-semibold text-rose-500 transition-colors hover:bg-rose-50">
                <X className="h-3.5 w-3.5" /> End Run
              </button>
            </div>
          </div>

          {/* Key Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Gross Intake */}
            <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100 flex justify-between items-center">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">GROSS INTAKE</p>
                <p className="text-2xl font-black text-slate-900 mt-1">฿8,490.00</p>
              </div>
              <div className="p-2.5 bg-purple-100/60 text-purple-600 rounded-xl">
                <Receipt className="w-5 h-5" />
              </div>
            </div>

            {/* Total Sold Units */}
            <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100 flex justify-between items-center">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">TOTAL SOLD UNITS</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-slate-900">66</span>
                  <span className="text-xs text-slate-400 font-medium">/ 85 starting</span>
                </div>
              </div>
              <div className="p-2.5 bg-amber-100/60 text-amber-600 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>

            {/* Latest Action & Undo */}
            <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100 flex justify-between items-center">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <History className="w-3 h-3 text-purple-500" /> LATEST ACTION
                </p>
                <p className="text-xs font-semibold text-slate-800 mt-1">
                  Sold 5x Turtle food 500g (฿400)
                </p>
                <span className="inline-block mt-1 text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                  24s ago
                </span>
              </div>
              <button className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-white font-bold text-xs rounded-lg transition-colors shadow-sm flex items-center gap-1">
                <Undo2 className="w-3.5 h-3.5" /> Undo
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT SECTION: SIDEBAR + MAIN TABLES */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* LEFT SIDEBAR / CATALOG INDEX */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
                CATALOG INDEX
              </h3>
              
              <nav className="space-y-1">
                <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-purple-50 text-purple-700 font-semibold text-xs border border-purple-100">
                  <div className="flex items-center gap-2.5">
                    <LayoutGrid className="w-4 h-4 text-purple-600" />
                    <span>All Products</span>
                  </div>
                  <span className="bg-purple-200/60 text-purple-800 px-2 py-0.5 rounded-full text-[10px] font-bold">8</span>
                </button>

                <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-medium transition-colors">
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Products (Host)</span>
                  </div>
                </button>

                <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-medium transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Store className="w-4 h-4 text-pink-400" />
                    <span>P Kaimook</span>
                  </div>
                </button>

                <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-medium transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Store className="w-4 h-4 text-amber-400" />
                    <span>Nong Japan</span>
                  </div>
                </button>
              </nav>

              <button className="w-full py-2 px-3 bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-200/60 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5" /> + Add Supplier
              </button>

              <button onClick={()=>setStepMode("expense")} className="w-full py-2.5 px-3 bg-rose-50/60 hover:bg-rose-50 text-rose-600 rounded-xl font-semibold text-xs transition-colors flex items-center justify-between border border-rose-100">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-rose-500" />
                  <span>Booth Expenses</span>
                </div>
                <span>›</span>
              </button>
            </div>

            {/* Quick Tip Box */}
            <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4 flex gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-amber-900">Quick Tip</p>
                <p className="text-amber-700/80 leading-relaxed">
                  Click supplier tab to jump directly to items. Click action button to register immediate sales.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT PRODUCT LIST TABLES */}
          {/* Product cards for each supplier  Edit Mode*/}
          <div className="lg:col-span-3 space-y-6">
            
            {/* 1. SECTION: MY PRODUCTS */}
            {stepMode === "edit" && (
                <>
            
            <ProductGroupSection
              
              title="My Products"
              badgeText="Host"
              badgeColor="bg-purple-100 text-purple-700"
              itemCount={3}
              dotColor="bg-purple-600"
              items={[
                { id: 1, name: 'Green Horned Frog', qty: 0, price: 150, sold: 10 },
                { id: 2, name: 'Yellow Horned Frog', qty: 0, price: 150, sold: 9 },
                { id: 3, name: 'Brown Horned Frog', qty: 0, price: 150, sold: 4 },
              ]}
              placeholderText="Item Name (e.g. Linen Coaster Set)"
            />

            <ProductGroupSection
              title="P' Kaimook"
              badgeText="Supplier"
              badgeColor="bg-pink-100 text-pink-700"
              itemCount={3}
              dotColor="bg-pink-500"
              items={[
                { id: 4, name: 'Japanese turtle (Big)', qty: 0, price: 250, sold: 5 },
                { id: 5, name: 'Japanese turtle (Small)', qty: 0, price: 100, sold: 7 },
                { id: 6, name: 'Turtle food 500g', qty: 0, price: 80, sold: 22 },
              ]}
              placeholderText="Item Name (e.g. Ceramic Vase)"
            />

            <ProductGroupSection
              title="Nong' Japan"
              badgeText="Supplier"
              badgeColor="bg-amber-100 text-amber-700"
              itemCount={2}
              dotColor="bg-amber-500"
              items={[
                { id: 7, name: 'Aquarium Moss Ball (Medium)', qty: 0, price: 60, sold: 7 },
                { id: 8, name: 'Mini Terrarium Starter Glass', qty: 0, price: 190, sold: 3 },
              ]}
              placeholderText="Item Name (e.g. Postcard Set)"
            />
            </>
)}
               {/* Product cards for each supplier  Sales Mode*/}
               { stepMode === "sales" && (
    <div className="min-h-screen bg-[#f8f9fe] p-4 md:p-8 text-slate-800 font-sans max-w-4xl mx-auto space-y-4">
      
      {/* 1. HOST PRODUCTS SECTION */}
       <div className="pt-2 space-y-3">
        {/* Supplier Header Badge */}
        <div className="bg-white rounded-2xl px-5 py-3 border border-slate-100/80 shadow-2xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
            <h2 className="font-bold text-slate-900 text-sm tracking-tight">
                My Products
            </h2>
            <span className="bg-purple-100/80 text-purple-600 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              Host
            </span>
          </div>
          <span className="bg-pink-50 text-pink-500 border border-pink-100 px-3 py-0.5 rounded-full text-xs font-bold">
            3 items
          </span>
        </div>

        {/* Product Cards */}
        {products
          .filter((item) => item.category === 'host')
          .map((item) => (
            <ProductCard key={item.id} item={item} onSell={handleSell} />
          ))}
      </div>

      {/* 2. SUPPLIER SECTION: P' KAIMOOK */}
      <div className="pt-2 space-y-3">
        {/* Supplier Header Badge */}
        <div className="bg-white rounded-2xl px-5 py-3 border border-slate-100/80 shadow-2xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
            <h2 className="font-bold text-slate-900 text-sm tracking-tight">
              P Kaimook
            </h2>
            <span className="bg-purple-100/80 text-purple-600 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              Supplier
            </span>
          </div>
          <span className="bg-pink-50 text-pink-500 border border-pink-100 px-3 py-0.5 rounded-full text-xs font-bold">
            3 items
          </span>
        </div>

        {/* Product Cards */}
        {products
          .filter((item) => item.category === 'kaimook')
          .map((item) => (
            <ProductCard key={item.id} item={item} onSell={handleSell} />
          ))}
      </div>

      {/* 3. SUPPLIER SECTION: NONG' JAPAN */}
      <div className="pt-2 space-y-3">
        {/* Supplier Header Badge */}
        <div className="bg-white rounded-2xl px-5 py-3 border border-slate-100/80 shadow-2xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <h2 className="font-bold text-slate-900 text-sm tracking-tight">
              Nong Japan
            </h2>
            <span className="bg-purple-100/80 text-purple-600 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              Supplier
            </span>
          </div>
          <span className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-0.5 rounded-full text-xs font-bold">
            3 items
          </span>
        </div>

        {/* Product Cards */}
        {products
          .filter((item) => item.category === 'japan')
          .map((item) => (
            <ProductCard key={item.id} item={item} onSell={handleSell} />
          ))}
      </div>

    </div>
               )}
               {stepMode === "expense" && (
                <div className="min-h-screen bg-[#f8f9fe] p-4 md:p-8 text-slate-800 font-sans max-w-5xl mx-auto space-y-5">
      
      {/* 1. HEADER CARD: Booth's Operating Expenses */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100/70 text-orange-500 flex items-center justify-center shrink-0">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Booth’s Operating Expenses
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              Track and split operational costs for this sales run
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full border border-purple-100 flex items-center gap-2 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Synchronized Ledger</span>
        </div>
      </div>

      {/* 2. FAST LOG SHARED EXPENSE CARD */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs space-y-4">
        {/* Section Title */}
        <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
          <PlusCircle className="w-4 h-4 text-orange-500" />
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
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-3 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-purple-500 transition-colors"
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
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 appearance-none focus:bg-white focus:outline-purple-500 transition-colors pr-8 cursor-pointer"
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
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-8 pr-3 py-2.5 text-xs font-bold text-slate-800 text-right focus:bg-white focus:outline-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Record Button */}
          <div className="md:col-span-2">
            <button className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-900 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1">
              <Plus className="w-4 h-4 stroke-[3]" /> Record
            </button>
          </div>

        </div>
      </div>

      {/* 3. RECORDED EXPENSES CARD */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
        {/* Card Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
            <Receipt className="w-5 h-5 text-orange-500" />
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
                  <td className="py-4 px-5 font-bold text-slate-900">{item.id}</td>
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
                    <span className="text-orange-500 font-bold text-[11px]">{item.role}</span>
                  </td>
                  <td className="py-4 px-5 text-right font-black text-slate-900 text-sm">
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
            <span className="font-black text-orange-500 text-sm">฿850.00</span>
          </div>
        </div>
      </div>

    </div>
               )}
            {/* ADD NEW SUPPLIER BOTTOM CARD */}
            {stepMode === "edit" &&(
            <div className="bg-slate-50/80 border-2 border-dashed border-slate-200 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                  <UserPlus className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-800 text-sm">Add New Supplier</span>
              </div>
              <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Add Supplier
              </button>
            </div>
            )}
          </div>
       
            
        </div>
      </main>

      {/* FOOTER BAR FOR UNSAVED MODIFICATIONS */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3 px-8 z-40 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-2 text-xs font-semibold text-purple-600">
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
          <span>3 Unsaved Modifications</span>
          <span className="text-slate-400 font-normal">
            • Live run updates will apply instantly to register
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 rounded-xl text-xs font-bold text-rose-500 border border-rose-200 hover:bg-rose-50 transition-colors">
            Discard Changes
          </button>
          <button className="px-5 py-2 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 transition-colors shadow-sm flex items-center gap-1.5">
            <Save className="w-4 h-4" /> Apply to Run
          </button>
        </div>
      </footer>

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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-purple-500 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
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
                  <div className="bg-purple-50/60 border border-purple-100/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 truncate w-full">
                    {inviteUrl}
                  </div>
                  <button
                    onClick={() => onCopy()}
                    className="bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-900 font-bold text-xs px-3 py-2 rounded-xl transition-colors shadow-xs flex items-center gap-1 shrink-0"
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
                <div className="bg-purple-50/80 border border-purple-100/80 rounded-xl px-3 py-2.5 text-center text-purple-600 font-black text-base tracking-wider">
                  {joinPin}
                </div>
              </div>

            </div>

            {/* Right QR Box (5 cols) */}
            <div className="col-span-5 bg-slate-50/60 border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center text-center space-y-2">
              <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                {/* Simulated QR Code Graphic */}
                <div className="w-16 h-16 bg-white relative flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-900" />
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
              <div className="bg-purple-50/40 border border-purple-100/60 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center uppercase shadow-2xs">
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
              <div className="bg-purple-50/40 border border-purple-100/60 rounded-2xl p-3 flex items-center justify-between">
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
          <button onClick={onOpenPermissions} className="px-4 py-2 bg-white hover:bg-slate-50 text-purple-600 border border-purple-200/80 font-bold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-purple-600" />
            <span>Assistant Permissions</span>
          </button>
          
          <button
            onClick={() => onClose()}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
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
          <h2 className="font-bold text-slate-900 text-base">{title}</h2>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeColor}`}>
            {badgeText}
          </span>
        </div>
        <span className="px-2.5 py-0.5 bg-purple-50 text-purple-600 rounded-full text-[11px] font-bold border border-purple-100">
          {itemCount} items
        </span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
        <div className="col-span-5">PRODUCT NAME</div>
        <div className="col-span-3 text-center">STOCK / QTY</div>
        <div className="col-span-2 text-center">PRICE (฿)</div>
        <div className="col-span-1 text-center">SOLD</div>
        <div className="col-span-1 text-center">ACTION</div>
      </div>

      {/* Product Rows */}
      <div className="space-y-2">
        {items.map((item:any) => (
          <div key={item.id} className="grid grid-cols-12 items-center px-3 py-2 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors text-xs font-medium">
            <div className="col-span-5 flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
              <input
                type="text"
                defaultValue={item.name}
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 w-full font-semibold focus:outline-purple-500 text-xs shadow-2xs"
              />
            </div>

            {/* Qty Stepper */}
            <div className="col-span-3 flex items-center justify-center gap-1">
              <button className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 shadow-2xs">
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center font-bold text-purple-600">{item.qty}</span>
              <button className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 shadow-2xs">
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Price */}
            <div className="col-span-2 flex items-center justify-center">
              <div className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 flex items-center gap-1 w-20 shadow-2xs">
                <span className="text-amber-500 font-bold">฿</span>
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
            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-purple-500 transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="col-span-2">
          <input
            type="number"
            placeholder="Qty"
            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3 py-2 text-xs text-center focus:bg-white focus:outline-purple-500 transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="col-span-2">
          <input
            type="number"
            placeholder="Price ฿"
            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3 py-2 text-xs text-center focus:bg-white focus:outline-purple-500 transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="col-span-2">
          <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1">
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
    <div className="bg-white rounded-2xl p-4 border border-slate-100/80 shadow-2xs hover:shadow-md transition-shadow flex items-center justify-between">
      {/* Left Column: Icon + Name + Stock Info */}
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
          <IconComponent className="w-6 h-6" />
        </div>

        <div className="space-y-0.5">
          <h3 className="font-bold text-slate-900 text-sm tracking-tight">
            {item.name}
          </h3>
          <div className="flex items-center space-x-1 text-xs text-slate-400 font-medium">
            <span>Start: <strong className="text-slate-700">{item.start}</strong></span>
            <span>•</span>
            <span className={isOutOfStock ? 'text-purple-600 font-semibold' : 'text-purple-600 font-semibold'}>
              {isOutOfStock ? '0 remaining' : `${item.stock} in stock`}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Price + Sold Count + Sell Button */}
      <div className="flex items-center space-x-5">
        <div className="text-right">
          <div className="text-base font-black text-slate-900 flex items-center justify-end leading-none">
            <span className="text-sm font-extrabold mr-0.5">฿</span>
            {item.price}
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            Sold: <span className="font-bold text-slate-700">{item.sold}</span>
          </p>
        </div>

        <button
          onClick={() => onSell(item.id)}
          disabled={isOutOfStock}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-95 flex items-center gap-1 ${
            isOutOfStock
              ? 'bg-purple-600 opacity-90 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'
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
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
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
            <div className="bg-purple-50/40 border border-purple-100/80 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-purple-50/70 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-indigo-500 text-white font-bold text-sm flex items-center justify-center uppercase shadow-xs">
                  P
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-slate-900 text-sm">
                      {selectedAssistant}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-semibold">
                    <span className="text-amber-500">
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
              <span className="text-[11px] sm:text-xs font-bold text-amber-500">
                All permissions off by default ({enabledCount}/5 enabled)
              </span>
            </div>

            {/* LIST OF PERMISSION TOGGLES */}
            <div className="space-y-2.5">
              
              {/* Item 1: Sell Products / Cashier Mode */}
              <PermissionToggleRow
                icon={<Calculator className="w-5 h-5 text-purple-600" />}
                title="Sell Products / Cashier Mode"
                description="Sell products and register sales transactions in Sales Mode"
                enabled={permissions.sellProducts}
                onToggle={() => togglePermission('sellProducts')}
              />

              {/* Item 2: Add / Edit / Delete Products */}
              <PermissionToggleRow
                icon={<Edit3 className="w-5 h-5 text-purple-600" />}
                title="Add / Edit / Delete Products"
                description="Manage catalog items, quantities, and pricing"
                enabled={permissions.editProducts}
                onToggle={() => togglePermission('editProducts')}
              />

              {/* Item 3: Record Booth Expenses */}
              <PermissionToggleRow
                icon={<Receipt className="w-5 h-5 text-purple-600" />}
                title="Record Booth Expenses"
                description="Record booth expenses and operational costs"
                enabled={permissions.recordExpenses}
                onToggle={() => togglePermission('recordExpenses')}
              />

              {/* Item 4: View Sales Log & Gross Stats */}
              <PermissionToggleRow
                icon={<History className="w-5 h-5 text-purple-600" />}
                title="View Sales Log & Gross Stats"
                description="Access transaction history, undo sales, and total stats"
                enabled={permissions.viewSalesLog}
                onToggle={() => togglePermission('viewSalesLog')}
              />

              {/* Item 5: Manage & Grant Permissions */}
              <PermissionToggleRow
                icon={<Shield className="w-5 h-5 text-purple-600" />}
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
            className="w-full sm:w-auto px-5 py-2.5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
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
        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-slate-900 text-xs tracking-tight">
              {title}
            </h3>
            {badgeText && (
              <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-purple-100 text-purple-600 uppercase tracking-wider">
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
          enabled ? 'bg-purple-600' : 'bg-slate-200'
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
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
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
              className="bg-purple-50/40 border border-purple-100/80 rounded-2xl p-3.5 flex items-center space-x-3 cursor-pointer hover:bg-purple-50/70 transition-colors select-none"
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                  isConfirmed ? 'bg-purple-600 text-white' : 'border border-slate-300 bg-white'
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