"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Footer from "@/app/components/footer";
import QRCode from "qrcode";
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

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
const subscribeToOrigin = () => () => undefined;
const getOrigin = () => window.location.origin;
const getServerOrigin = () => "";

async function copyTextToClipboard(text: string) {
  let clipboardError: unknown;

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (error) {
      clipboardError = error;
    }
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  let copied = false;
  try {
    textArea.select();
    textArea.setSelectionRange(0, text.length);
    copied = document.execCommand("copy");
  } finally {
    textArea.remove();
  }

  if (!copied) {
    throw new Error("Unable to copy the viewer link.", { cause: clipboardError });
  }
}

function QrCodeDialog({
  url,
  language,
  onClose,
}: {
  url: string;
  language: "EN" | "TH";
  onClose: () => void;
}) {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    let cancelled = false;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);

    QRCode.toDataURL(url, { width: 256, margin: 1, errorCorrectionLevel: "H" })
      .then((dataUrl) => {
        if (!cancelled) setQrCode(dataUrl);
      })
      .catch((error: unknown) => {
        console.error("QR code generation failed:", error);
        if (!cancelled) setHasError(true);
      });

    return () => {
      cancelled = true;
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, url]);
 



  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0B0F4F]/45 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="viewer-qr-title"
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-5 text-center shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={language === "EN" ? "Close QR code" : "ปิดรหัส QR"}
          autoFocus
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-xl text-[#858ba0] hover:bg-[#f5f2fc] focus-visible:outline-2 focus-visible:outline-[#7957ff]"
        >
          ×
        </button>
        <h2 id="viewer-qr-title" className="pr-10 text-base font-bold">
          {language === "EN" ? "Scan to view live sales" : "สแกนเพื่อดูยอดขายแบบเรียลไทม์"}
        </h2>
        <p className="mt-1 break-all text-xs text-[#858ba0]">{url}</p>
        <div className="mx-auto mt-4 flex min-h-64 w-full max-w-64 items-center justify-center rounded-xl border border-[#eeeafd] bg-white p-3">
          {qrCode ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qrCode} alt={language === "EN" ? "QR code for the public sales viewer" : "QR code สำหรับหน้าดูยอดขาย"} className="h-full w-full" />
          ) : hasError ? (
            <p role="alert" className="text-sm text-red-600">
              {language === "EN" ? "Could not generate the QR code." : "ไม่สามารถสร้าง QR code ได้"}
            </p>
          ) : (
            <p role="status" className="text-sm text-[#858ba0]">
              {language === "EN" ? "Generating QR code…" : "กำลังสร้าง QR code…"}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

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
interface SensorData {
  deviceId: string;
  temperature: number;
  humidity: number;
  status: string;
  timestamp: string;
}
export default function ConsignDesk() {
  const { id } = useParams<{ id: string }>();
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const origin = useSyncExternalStore(subscribeToOrigin, getOrigin, getServerOrigin);
  const viewerUrl = origin
    ? new URL(`/ViewUser/${encodeURIComponent(id)}`, origin).toString()
    : "";
  const [language] = useState<"EN" | "TH">(() =>
    typeof window !== "undefined" && localStorage.getItem("language") === "EN" ? "EN" : "TH"
  );
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");
  const qrButtonRef = useRef<HTMLButtonElement>(null);

  const closeQrDialog = useCallback(() => {
    setIsQrDialogOpen(false);
    requestAnimationFrame(() => qrButtonRef.current?.focus());
  }, []);

  async function handleCopyLink() {
    try {
      await copyTextToClipboard(viewerUrl);
      setCopyStatus("success");
    } catch (error) {
      console.error("Copy viewer link failed:", error);
      setCopyStatus("error");
    }
  }

  useEffect(() => {
    // 1. สร้าง STOMP Client โดยชี้ไปที่ Endpoint /ws ของ Spring Boot
    const client = new Client({
      webSocketFactory: () => new SockJS(process.env.NEXT_PUBLIC_API_URL + "/ws"),
      reconnectDelay: 5000, // ถ้าหลุดให้ต่อใหม่ทุก 5 วินาทีอัตโนมัติ
      onConnect: () => {
        setIsConnected(true);
        console.log("Connected to WebSocket!");

        // 2. Subscribe เฉพาะ Topic ของ Parameter (deviceId) นี้
        client.subscribe(`/viewLive/${id}`, (message) => {
          if (message.body) {
            console.log("Received message:", message.body);
            const parsedObject: SensorData = JSON.parse(message.body);
            setSensorData(parsedObject); // อัปเดต State ทันทีเมื่อมีข้อมูลใหม่
            console.log("Received sensor data:", parsedObject);
          }
        });
      },
      onDisconnect: () => {
        setIsConnected(false);
        console.log("Disconnected");
      },
    });

    // เริ่มการเชื่อมต่อ
    client.activate();

    // 3. Cleanup: ตัดการเชื่อมต่อเมื่อเปลี่ยนหน้าหรือเปลี่ยน deviceId
    return () => {
      client.deactivate();
    };
  }, [id]); // ถ้า deviceId เปลี่ยน จะตัดสายเก่าแล้วต่อสาย topic ใหม่ให้อัตโนมัติ

 
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8fc] font-sans text-[#111747]">
      <nav className="flex h-14 shrink-0 items-center justify-between border-b border-[#eeeafc] bg-white px-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-4 md:gap-8">
          <Link href="/" className="flex shrink-0 items-center gap-2 text-[17px] font-extrabold tracking-tight">
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

      <main className="mx-auto w-full max-w-[1440px] min-w-0 flex-1 space-y-4 overflow-x-clip px-3 py-3 sm:px-5">
        <section className="flex min-w-0 flex-col items-stretch justify-between gap-3 rounded-2xl border border-[#eeeafd] bg-[radial-gradient(ellipse_at_40%_100%,#fff0f8,transparent_36%),linear-gradient(105deg,#fff_0%,#fff_60%,#f3efff_100%)] px-3 py-3 shadow-[0_4px_16px_rgba(93,76,166,0.04)] sm:min-h-[96px] sm:flex-row sm:items-center sm:gap-4 sm:px-5">
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
            <h1 className="break-words text-xl font-black leading-tight tracking-tight sm:text-2xl">
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

        <section className="flex min-w-0 flex-col items-stretch justify-between gap-3 rounded-xl border border-[#eeeafd] bg-white px-3 py-3 shadow-[0_3px_12px_rgba(93,76,166,0.03)] sm:min-h-12 sm:flex-row sm:items-center sm:gap-3 sm:py-2 sm:px-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f0eaff] text-[#7957ff]">
              <Share2 className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <div className="text-[8px] font-bold uppercase tracking-wide text-[#858ba0]">
                {language === "EN" ? "Public Real-Time Viewer URL" : "URL สำหรับดูแบบเรียลไทม์"}
              </div>
              <a href={viewerUrl || undefined} aria-disabled={!viewerUrl} className="flex min-w-0 items-center gap-1 truncate font-mono text-[10px] font-medium text-[#7957ff] hover:underline">
                <span aria-hidden="true">↗</span>{viewerUrl}
              </a>
            </div>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:gap-1.5">
            <button
              type="button"
              onClick={handleCopyLink}
              disabled={!viewerUrl}
              className="flex min-h-11 items-center justify-center gap-1 rounded-lg bg-[#f0eaff] px-2.5 py-1.5 text-[9px] font-semibold text-[#7957ff] transition-colors hover:bg-[#e7ddff] disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 sm:px-3"
            >
              <Copy className="h-3 w-3" />
              <span>{copyStatus === "success" ? (language === "EN" ? "Copied!" : "คัดลอกแล้ว") : language === "EN" ? "Copy Link" : "คัดลอกลิงก์"}</span>
            </button>
            <button
              ref={qrButtonRef}
              type="button"
              onClick={() => setIsQrDialogOpen(true)}
              disabled={!viewerUrl}
              className="flex min-h-11 items-center justify-center gap-1 rounded-lg bg-[#f0eaff] px-2.5 py-1.5 text-[9px] font-semibold text-[#7957ff] transition-colors hover:bg-[#e7ddff] disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 sm:px-3"
            >
              <QrCode className="h-3 w-3" />
              <span>{language === "EN" ? "QR View" : "ดูด้วย QR"}</span>
            </button>
          </div>
        </section>
        <p aria-live="polite" className={`text-xs ${copyStatus === "error" ? "text-red-600" : "sr-only"}`}>
          {copyStatus === "success"
            ? language === "EN" ? "Viewer link copied to clipboard." : "คัดลอกลิงก์แล้ว"
            : copyStatus === "error"
              ? language === "EN" ? "Could not copy the viewer link. Please copy the URL above." : "คัดลอกลิงก์ไม่สำเร็จ กรุณาคัดลอก URL ด้านบน"
              : ""}
        </p>

        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[1.42fr_1fr]">
          <section className="space-y-2.5">
            <div className="flex min-h-6 flex-col items-start justify-between gap-1 sm:flex-row sm:items-center sm:gap-2">
              <h2 className="flex items-start text-sm font-bold tracking-tight sm:items-center">
                <span className="mr-1.5 flex h-5 w-5 items-center justify-center rounded-md bg-[#fff0e5] text-[#ff9f55]">
                  <Activity className="h-3.5 w-3.5" />
                </span>
                {language === "EN" ? "Supplier Performance & Remaining Stock" : "ประสิทธิภาพซัพพลายเออร์และสต็อกคงเหลือ"}
              </h2>
              <span className="text-[9px] text-[#858ba0] sm:shrink-0">
                {language === "EN" ? "3 Registered Consignors" : "ผู้ฝากขายที่ลงทะเบียน 3 ราย"}
              </span>
            </div>

            {suppliers.map((supplier) => {
              const Icon = supplier.icon;
              const themeClasses = supplierThemes[supplier.theme];

              return (
                <article key={supplier.name} className="min-w-0 rounded-2xl border border-[#eeeafd] bg-white px-3.5 py-3 shadow-[0_4px_14px_rgba(93,76,166,0.035)] sm:px-4">
                  <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap sm:gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${themeClasses.icon}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="break-words text-[11px] font-bold leading-tight">{supplier.name}</h3>
                        <span className={`rounded-full border px-2 py-0.5 text-[8px] font-semibold ${themeClasses.badge}`}>
                          {language === "EN" ? supplier.kind : supplier.kind === "Host" ? "เจ้าของร้าน" : "ซัพพลายเออร์"}
                        </span>
                      </div>
                    </div>
                    <div className="ml-auto shrink-0 text-right">
                      <div className="text-[8px] font-semibold uppercase tracking-wide text-[#858ba0]">
                        {language === "EN" ? "Intake Value" : "มูลค่ารับเข้า"}
                      </div>
                      <div className="text-sm font-extrabold leading-tight">{supplier.intake}</div>
                    </div>
                  </div>
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-[9px] font-medium text-[#858ba0] sm:flex-nowrap">
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
      {isQrDialogOpen && viewerUrl && (
        <QrCodeDialog url={viewerUrl} language={language} onClose={closeQrDialog} />
      )}
    </div>
  );
}
