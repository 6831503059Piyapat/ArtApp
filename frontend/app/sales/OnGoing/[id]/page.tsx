"use client";
import React, { useState } from 'react';
import {
  Store,
  LayoutGrid,
  User,
  Plus,
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
  Minus
} from 'lucide-react';
import Navbar from '@/app/components/navbar';

export default function SalesRunDetail() {
  // ตัวอย่าง State สำหรับจัดการจำนวนสต็อก/สินค้า
  const [activeNav, setActiveNav] = useState('Ongoing');
  const [activeCatalog, setActiveCatalog] = useState('all');

  return (
    <div className="min-h-screen bg-[#f8f9fe] text-slate-800 font-sans pb-20">
      {/* 1. TOP NAVBAR */}
      <header className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
       <Navbar />
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
                  <button className="hover:underline font-semibold">+ Invite</button>
                </div>
              </div>
            </div>

            {/* Top Right Mode Toggle Buttons */}
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
              <button className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 rounded-lg">
                <ShoppingBag className="w-3.5 h-3.5" /> Sales Mode
              </button>
              <button className="px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 rounded-lg shadow-sm flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5" /> Edit Mode
              </button>
              <button className="px-3.5 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1.5 border border-rose-100">
                <X className="w-3.5 h-3.5" /> End Run
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
                    <span>P' Kaimook</span>
                  </div>
                </button>

                <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-medium transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Store className="w-4 h-4 text-amber-400" />
                    <span>Nong' Japan</span>
                  </div>
                </button>
              </nav>

              <button className="w-full py-2 px-3 bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-200/60 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5" /> + Add Supplier
              </button>

              <button className="w-full py-2.5 px-3 bg-rose-50/60 hover:bg-rose-50 text-rose-600 rounded-xl font-semibold text-xs transition-colors flex items-center justify-between border border-rose-100">
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
          <div className="lg:col-span-3 space-y-6">
            
            {/* 1. SECTION: MY PRODUCTS */}
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

            {/* 2. SECTION: P' KAIMOOK */}
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

            {/* 3. SECTION: NONG' JAPAN */}
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

            {/* ADD NEW SUPPLIER BOTTOM CARD */}
            <div className="bg-slate-50/80 border-2 border-dashed border-slate-200 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                  <UserPlus className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-800 text-sm">Add New Supplier</span>
              </div>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Add Supplier
              </button>
            </div>

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