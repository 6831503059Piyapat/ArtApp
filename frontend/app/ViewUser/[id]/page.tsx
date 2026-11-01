"use client";

import Link from "next/link";
import Footer from "@/app/components/footer";
import {
  Activity,
  Bug,
  Copy,
  Droplet,
  QrCode,
  RefreshCcw,
  Share2,
  Star,
  Store,
  Zap,
} from "lucide-react";

import { useEffect, useState } from "react";

const viewerUrl = "https://consigndesk.app/ActBoard/2026";

const BoothSyncTime = ({ language }: { language: "EN" | "TH" }) => {
  const [time, setTime] = useState("00:00:00");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval= setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div className="shrink-0 rounded-xl border border-[#eeeafd] bg-white/80 px-3 py-2 shadow-[0_3px_12px_rgba(93,76,166,0.04)] sm:px-4">
        <div className="mb-0.5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-[#858ba0]">
          <span className="h-2 w-2 rounded-full bg-[#8a68ff]" />
          {language === "EN" ? "Booth Sync Time" : "เวลาซิงค์บูธ"}
        </div>
        <div className="flex items-baseline gap-1">
          {/* นำ State ของเวลามาแสดงตรงนี้ */}
          <span className="text-2xl font-black leading-none tracking-tight sm:text-[26px]">
            {time}
          </span>
          <span className="rounded bg-[#f2edff] px-1 py-0.5 text-[8px] font-bold text-[#7957ff]">
            ICT
          </span>
        </div>
      </div>
    </section>
  );
};
async function fetchData(){
  // const response = await fetch("https://api.example.com/data",{
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   method: "GET",
  // });
  // console.log(response);
}
const suppliers = [
  {
    name: "My awesome amazing products",
    kind: "Host",
    stock: 29,
    sold: 1,
    total: 30,
    soldLabel: "3.3%",
    intake: "฿150.00",
    icon: Star,
    theme: "orange",
    progress: "3.3%",
  },
  {
    name: "P' Kaimook",
    kind: "Supplier",
    stock: 53,
    sold: 4,
    total: 57,
    soldLabel: "7.0%",
    intake: "฿850.00",
    icon: Bug,
    theme: "purple",
    progress: "7%",
  },
  {
    name: "Nong' Japan",
    kind: "Supplier",
    stock: 15,
    sold: 1,
    total: 16,
    soldLabel: "6.25%",
    intake: "฿350.00",
    icon: Droplet,
    theme: "pink",
    progress: "6.25%",
  },
] as const;

const supplierThemes = {
  orange: { icon: "bg-[#fff5e5] text-[#ffad3f] border-[#ffe1b0]", badge: "bg-[#fff7ed] text-[#f29a39] border-[#ffe4c3]" },
  purple: { icon: "bg-[#f4f0ff] text-[#7957ff] border-[#e3d9ff]", badge: "bg-[#f1edff] text-[#7957ff] border-[#dcd0ff]" },
  pink: { icon: "bg-[#fff0f7] text-[#ed72bd] border-[#ffd4e9]", badge: "bg-[#f1edff] text-[#7957ff] border-[#dcd0ff]" },
} as const;

const sales = [
  { number: "05", name: "Rare Betta (Sunset)", seller: "Nong' Japan", price: "฿350", quantity: 1, time: "20:44:31", latest: true },
  { number: "04", name: "Turtle food 500g", seller: "P' Kaimook", price: "฿80", quantity: 1, time: "17:02:32" },
  { number: "03", name: "Japanese turtle (big)", seller: "P' Kaimook", price: "฿250", quantity: 1, time: "17:01:14" },
  { number: "02", name: "Green Horned Frog", seller: "Head Sale", price: "฿150", quantity: 1, time: "13:59:56" },
  { number: "01", name: "Japanese turtle (small)", seller: "P' Kaimook", price: "฿200 total", quantity: 2, time: "13:20:12" },
];

const splitAllocation = [
  { label: "P' Kaimook", amount: "฿680.00", color: "bg-[#7957ff]" },
  { label: "Nong' Japan", amount: "฿297.50", color: "bg-[#ed72bd]" },
  { label: "Host Cut", amount: "฿150.00", color: "bg-[#ffb84d]" },
];

export default function ConsignDesk() {
  const [language] = useState<"EN" | "TH">(() =>
    typeof window !== "undefined" && localStorage.getItem("language") === "EN" ? "EN" : "TH"
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8fc] font-sans text-[#111747]">
      <nav className="flex h-14 shrink-0 items-center justify-between border-b border-[#eeeafc] bg-white px-5">
        <div className="flex min-w-0 items-center gap-4 md:gap-8">
          <Link href="#" className="flex shrink-0 items-center gap-2 text-[17px] font-extrabold tracking-tight">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff91b8] to-[#7957ff] text-white shadow-sm">
              <Store className="h-3.5 w-3.5" />
            </span>
            ConsignDesk
            <span className="flex items-center gap-1 rounded-full bg-[#fff0f4] px-1.5 py-0.5 text-[9px] text-[#ed72a8]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff7c9e]" />
                {language === "EN" ? "Live" : "กำลังใช้งาน"}
              </span>
          </Link>
          
        </div>
       
      </nav>

      <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-4 px-5 py-3">
        <section className="flex min-h-[96px] items-center justify-between gap-4 rounded-2xl border border-[#eeeafd] bg-[radial-gradient(ellipse_at_40%_100%,#fff0f8,transparent_36%),linear-gradient(105deg,#fff_0%,#fff_60%,#f3efff_100%)] px-4 py-3 shadow-[0_4px_16px_rgba(93,76,166,0.04)] sm:px-5">
          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="flex items-center gap-1.5 rounded-full bg-[#f0eaff] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#7957ff]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7957ff]" />
                {language === "EN" ? "Live Sales Run Active" : "กำลังเปิดการขาย"}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-medium text-[#111747]">
                <Store className="h-3 w-3 text-[#7957ff]" />
                MFU Outside Night Market (Mon 14)
              </span>
            </div>
            <h1 className="text-xl font-black leading-tight tracking-tight sm:text-2xl">
              {language === "EN" ? "SALES STATS MONDAY 14" : "สถิติการขาย วันจันทร์ที่ 14"}
            </h1>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[9px] text-[#858ba0]">
              <span className="flex items-center gap-1">
                <RefreshCcw className="h-2.5 w-2.5" />
                {language === "EN" ? "Run created:" : "สร้างการขายเมื่อ:"} <strong className="font-semibold text-[#111747]">14/9/26 11:48:30</strong>
              </span>
              <span className="flex items-center gap-1">
                <Activity className="h-2.5 w-2.5" />
                {language === "EN" ? "Auto-refresh:" : "รีเฟรชอัตโนมัติ:"} <strong className="font-semibold text-[#7957ff]">3s polling</strong>
              </span>
            </div>
          </div>
          <BoothSyncTime language={language} />
        </section>

        <section className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-[#eeeafd] bg-white px-3 py-2 shadow-[0_3px_12px_rgba(93,76,166,0.03)] sm:px-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f0eaff] text-[#7957ff]">
              <Share2 className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <div className="text-[8px] font-bold uppercase tracking-wide text-[#858ba0]">
                {language === "EN" ? "Public Real-Time Viewer URL" : "URL สำหรับดูแบบเรียลไทม์"}
              </div>
              <a href={viewerUrl} className="flex items-center gap-1 truncate font-mono text-[10px] font-medium text-[#7957ff] hover:underline">
                <span aria-hidden="true">↗</span>{viewerUrl}
              </a>
            </div>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <button type="button" className="flex items-center gap-1 rounded-lg bg-[#f0eaff] px-2.5 py-1.5 text-[9px] font-semibold text-[#7957ff] transition-colors hover:bg-[#e7ddff] sm:px-3">
              <Copy className="h-3 w-3" />
              <span>{language === "EN" ? "Copy Link" : "คัดลอกลิงก์"}</span>
            </button>
            <button type="button" className="flex items-center gap-1 rounded-lg bg-[#f0eaff] px-2.5 py-1.5 text-[9px] font-semibold text-[#7957ff] transition-colors hover:bg-[#e7ddff] sm:px-3">
              <QrCode className="h-3 w-3" />
              <span>{language === "EN" ? "QR View" : "ดูด้วย QR"}</span>
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[1.42fr_1fr]">
          <section className="space-y-2.5">
            <div className="flex min-h-6 items-center justify-between gap-2">
              <h2 className="flex items-center text-sm font-bold tracking-tight">
                <span className="mr-1.5 flex h-5 w-5 items-center justify-center rounded-md bg-[#fff0e5] text-[#ff9f55]">
                  <Activity className="h-3.5 w-3.5" />
                </span>
                {language === "EN" ? "Supplier Performance & Remaining Stock" : "ประสิทธิภาพซัพพลายเออร์และสต็อกคงเหลือ"}
              </h2>
              <span className="shrink-0 text-[9px] text-[#858ba0]">
                {language === "EN" ? "3 Registered Consignors" : "ผู้ฝากขายที่ลงทะเบียน 3 ราย"}
              </span>
            </div>

            {suppliers.map((supplier) => {
              const Icon = supplier.icon;
              const themeClasses = supplierThemes[supplier.theme];

              return (
                <article key={supplier.name} className="rounded-2xl border border-[#eeeafd] bg-white px-3.5 py-3 shadow-[0_4px_14px_rgba(93,76,166,0.035)] sm:px-4">
                  <div className="mb-2.5 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${themeClasses.icon}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="text-[11px] font-bold leading-tight">{supplier.name}</h3>
                        <span className={`rounded-full border px-2 py-0.5 text-[8px] font-semibold ${themeClasses.badge}`}>
                          {language === "EN" ? supplier.kind : supplier.kind === "Host" ? "เจ้าของร้าน" : "ซัพพลายเออร์"}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-[8px] font-semibold uppercase tracking-wide text-[#858ba0]">
                        {language === "EN" ? "Intake Value" : "มูลค่ารับเข้า"}
                      </div>
                      <div className="text-sm font-extrabold leading-tight">{supplier.intake}</div>
                    </div>
                  </div>
                  <div className="mb-1 flex items-center justify-between gap-2 text-[9px] font-medium text-[#858ba0]">
                    <span className="flex min-w-0 items-center gap-1">
                      <Store className="h-2.5 w-2.5 shrink-0 text-[#7957ff]" />
                      <span className="truncate">
                        <strong className="text-[#111747]">{language === "EN" ? "REMAINING STOCK" : "สต็อกคงเหลือ"}</strong>
                        {" • "}
                        {supplier.stock} {language === "EN" ? "in booth storage" : "ในพื้นที่บูธ"}
                      </span>
                    </span>
                    <span className="shrink-0 text-[8px]">
                      <strong className="text-[11px] font-bold text-[#7957ff]">{supplier.sold}/{supplier.total}</strong>
                      {" "}
                      {language === "EN" ? "SOLD" : "ขายแล้ว"} ({supplier.soldLabel})
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#eee9ff]">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#7957ff] to-[#ff9f55]" style={{ width: supplier.progress }} />
                  </div>
                </article>
              );
            })}
          </section>

          <section className="space-y-2.5">
            <div className="flex min-h-6 items-center">
              <h2 className="flex items-center text-sm font-bold tracking-tight">
                <span className="mr-1.5 flex h-5 w-5 items-center justify-center rounded-md bg-[#f0eaff] text-[#a35de0]">
                  <Activity className="h-3.5 w-3.5" />
                </span>
                {language === "EN" ? "Live Activity Stream" : "กิจกรรมการขายแบบเรียลไทม์"}
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#eeeafd] bg-white shadow-[0_4px_14px_rgba(93,76,166,0.035)]">
              <div className="flex items-center justify-between gap-2 border-b border-[#f0eef7] bg-[#f8f6ff] px-3 py-2">
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#7957ff]">
                  <Zap className="h-3 w-3" />
                  <span>{language === "EN" ? "Latest Checkout (Sale #05)" : "การชำระเงินล่าสุด (รายการขาย #05)"}</span>
                </div>
                <span className="rounded-full border border-[#f0eaff] bg-white px-2 py-0.5 text-[8px] font-medium text-[#7957ff]">
                  {language === "EN" ? "1 min ago" : "1 นาทีที่แล้ว"}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[360px] table-fixed text-left">
                  <thead className="border-b border-[#f0eef7] bg-[#fbfaff] text-[8px] font-bold uppercase tracking-wide text-[#858ba0]">
                    <tr>
                      <th scope="col" className="w-[14%] px-2.5 py-1.5">{language === "EN" ? "No." : "ลำดับ"}</th>
                      <th scope="col" className="w-[42%] px-1.5 py-1.5">{language === "EN" ? "Product Name" : "ชื่อสินค้า"}</th>
                      <th scope="col" className="w-[15%] px-1.5 py-1.5 text-center">{language === "EN" ? "Sold" : "ขายแล้ว"}</th>
                      <th scope="col" className="w-[29%] px-2.5 py-1.5 text-right">{language === "EN" ? "Time Sold" : "เวลาขาย"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4f2f8]">
                    {sales.map((sale) => (
                      <tr key={sale.number} className={sale.latest ? "bg-[#fcfaff]" : "hover:bg-[#fcfbff]"}>
                        <td className={`px-2.5 py-2 text-[8px] font-semibold ${sale.latest ? "text-[#7957ff]" : "text-[#858ba0]"}`}>
                          {sale.latest && <span className="mr-1 inline-block h-1 w-1 rounded-full bg-[#7957ff] align-middle" />}
                          {sale.number}
                        </td>
                        <td className="px-1.5 py-2">
                          <div className="truncate text-[9px] font-bold text-[#111747]">{sale.name}</div>
                          <div className="truncate text-[8px] text-[#858ba0]">{sale.seller} • {sale.price}</div>
                        </td>
                        <td className="px-1.5 py-2 text-center">
                          <span className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold ${sale.latest ? "bg-[#ed72bd] text-white" : "bg-[#f0eaff] text-[#7957ff]"}`}>
                            {sale.quantity}
                          </span>
                        </td>
                        <td className="px-2.5 py-2 text-right">
                          <span className={`rounded-full px-1.5 py-1 font-mono text-[7px] ${sale.latest ? "bg-[#f0eaff] font-bold text-[#111747]" : "bg-[#f5f4f9] text-[#858ba0]"}`}>
                            {sale.time}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-[#f0eef7] bg-[#faf9fd] px-3 py-2 text-[9px] font-medium text-[#858ba0]">
                {language === "EN" ? "Total Sold This Session:" : "ยอดขายรวมในรอบนี้:"}{" "}
                <strong className="font-bold text-[#111747]">6 {language === "EN" ? "Units" : "ชิ้น"}</strong>
              </div>
            </div>

            <div className="rounded-2xl border border-[#eeeafd] bg-white px-3.5 py-3 shadow-[0_4px_14px_rgba(93,76,166,0.035)]">
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-[9px] font-bold">{language === "EN" ? "Current Split Allocation" : "สัดส่วนการแบ่งเงินปัจจุบัน"}</h3>
                <span className="text-[8px] text-[#858ba0]">{language === "EN" ? "Calculated at 20:45" : "คำนวณเมื่อ 20:45"}</span>
              </div>
              <div className="mb-2 flex h-2 w-full overflow-hidden rounded-full">
                <div className="h-full bg-[#7957ff]" style={{ width: "60%" }} />
                <div className="h-full bg-[#ed72bd]" style={{ width: "25%" }} />
                <div className="h-full bg-[#ffb84d]" style={{ width: "15%" }} />
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[8px]">
                {splitAllocation.map((split) => (
                  <div key={split.label} className="flex items-center gap-1">
                    <span className={`h-1.5 w-1.5 rounded-full ${split.color}`} />
                    <span className="text-[#858ba0]">{split.label}: <strong className="font-semibold text-[#111747]">{split.amount}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer/>
    </div>
  );
}
