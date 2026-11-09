import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  BadgeDollarSign,
  Boxes,
  Check,
  CircleHelp,
  Clock3,
  Fish,
  House,
  Leaf,
  Mail,
  Monitor,
  Palette,
  Play,
  Rabbit,
  Radio,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
  UserRound,
  Video,
  X,
  Zap,
} from "lucide-react";

const products = [
  { name: "Green Horned Frog Figure", start: "Start: 10", stock: "15 in stock", price: "฿150", sold: "Sold: 10", icon: "frog", color: "text-amber-500" },
  { name: "Fish Sculpture", start: "Start: 10", stock: "11 in stock", price: "฿150", sold: "Sold: 14", icon: "fish", color: "text-amber-500" },
  { name: "Golden KeyChain", start: "Start: 10", stock: "8 in stock", price: "฿250", sold: "Sold: 2", icon: "key", color: "text-pink-500" },
  { name: "Silver Memorial Locket", start: "Start: 10", stock: "0 remaining", price: "฿300", sold: "Sold: 10", icon: "locket", color: "text-pink-500" },
];

const stats = [
  { label: "Gross Intake", value: "฿8,490.00", detail: "+18.4% pace" },
  { label: "Items Sold", value: "66", detail: "/ 88 items" },
  { label: "Items Left", value: "22", detail: "remaining" },
  { label: "Latest Sale Logged", value: "1x Silver Memorial Locket (฿300)", detail: "Undo" },
];

const categories = [
  { name: "All Products", icon: Boxes, active: true },
  { name: "My Products (Host)", icon: Users },
  { name: "P’ Kaimook", icon: Store },
  { name: "Booth Expenses", icon: ReceiptText, expense: true },
];

const metrics = [
  { value: "7 days", label: "Up to 7 days run duration", color: "text-[#6039f5]" },
  { value: "6 runs", label: "Up to 6 active runs", color: "text-[#6039f5]" },
  { value: "<5s", label: "Summary calculation speed", color: "text-[#ffab46]" },
  { value: "0", label: "Spreadsheets Needed", color: "text-[#6039f5]" },
];

const markets = [
  { name: "MFU Night Market", icon: ShoppingBag },
  { name: "Nimman Art Walk", icon: Palette },
  { name: "Baan Kang Wat Collective", icon: House },
  { name: "Sunday Craft Fair", icon: Store },
];

const manualProblems = [
  { title: "Lost Post-it Notes:", text: "Assistant scribbles “฿120 earnings” without tagging which artist made them.", icon: ReceiptText },
  { title: "Inventory Count Disputes:", text: "Makers claim they gave you 10 ceramic cups, but only 7 are in stock and 2 logged sold.", icon: Boxes },
  { title: "2:00 AM Spreadsheet Reconciliations:", text: "Exhausted after packing down the booth, typing receipts into Excel formulas.", icon: Clock3 },
  { title: "Expense Tension:", text: "Awkward manual division of booth rent, ice bags, and change drawer shortages.", icon: Zap },
];

const consignDeskBenefits = [
  { title: "Instant 1-Tap Checkout:", text: "Quick and easy 1 tap on supplier item badge, instant sale logged.", icon: Users },
  { title: "Instant Assistant Sync via 6-Digit PIN:", text: "Invite market friends to ring up sales securely without account passwords.", icon: Sparkles },
  { title: "Auto-Deducted Expenses:", text: "Log booth rent (฿700) or lighting packs; splits proportionally and silently across consignors.", icon: ReceiptText },
  { title: "1-Click PDF/Excel Payout Statements:", text: "Send makers clean, itemized breakdown slips right as you pack down the tent.", icon: Play },
];

const features = [
  {
    title: "Robust Sales Terminal",
    description: "Designed for high-tempo pop-ups and multi-day markets. Streamline booth operations with dynamic inventory tracking, instant assistant collaboration, real-time sales logging, and automated supplier revenue splitting.",
    icon: Boxes,
    wide: true,
    footer: "Inventory & Sales Sync",
  },
  {
    title: "Instant Assistant Management",
    description: "Step away from your booth with total peace of mind. Easily generate invitation links with tailored access levels—allowing team members to log transactions while keeping sensitive revenue and supplier payouts secure.",
    icon: ShieldCheck,
    small: true,
    footer: "Zero App Install Required for Assistants",
  },
  {
    title: "Live Sales Activity Stream Board",
    description: "Send consignors a private web link. They can sit at home or in another city and watch their items sell off the shelf in real-time, removing 100% of anxiety and text check-ins.",
    icon: Radio,
    small: true,
    footer: "Live Real-Time sync Sales Activity Board",
  },
  {
    title: "Automated Shared Expense Deductions",
    description: "Log your total event expenses in one place. The system automatically divides the costs equally across all active suppliers, deducting each share from gross sales to yield accurate net payouts—zero manual math required.",
    icon: Calculator,
    wide: true,
  },
];

function Logo() {
  return (
    <span className="flex items-center gap-1.5 text-[13px] font-bold tracking-tight text-creatory-navy sm:gap-2 sm:text-base">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-primary via-creatory-pink to-creatory-orange text-white shadow-sm shadow-primary/30 sm:h-8 sm:w-8">
        <span className="material-symbols-outlined text-[15px] sm:text-[17px]">storefront</span>
      </span>
      <span>Consign<span className="text-primary">Desk</span></span>
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8ff] font-sans text-[#0B0F4F]">
      <header className="sticky top-0 z-10 border-b border-[#ebe8f6] bg-white/95">
        <div className="flex h-16 w-full items-center justify-between gap-1 px-2 sm:h-[72px] sm:gap-4 sm:px-12">
          <Link href="/" aria-label="ConsignDesk home"><Logo /></Link>
          <nav className="flex shrink-0 items-center gap-1 text-[10px] sm:gap-4 sm:text-[12px]">
            <Link href="/auth/login" className="hidden whitespace-nowrap font-medium text-[#0B0F4F] hover:text-[#6547e9] min-[240px]:inline">Sign In</Link>
            <Link href="/sales/OnGoing" className="whitespace-nowrap rounded-full bg-[#ffb84e] px-2.5 py-1.5 font-bold text-[#0B0F4F] shadow-[0_3px_9px_rgba(255,172,61,0.28)] hover:bg-[#ffad36] sm:px-3.5">
              <span className="sm:hidden">Launch</span>
              <span className="hidden sm:inline">Launch Free Run</span>
            </Link>
            <span className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-primary via-creatory-pink to-creatory-orange text-white shadow-sm sm:flex sm:h-8 sm:w-8">
              <UserRound size={16} />
            </span>
          </nav>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#faf8ff] px-4 pb-14 pt-8 sm:px-8 sm:pb-24 sm:pt-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-40 -top-[20%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.2)_0%,rgba(124,92,255,0.09)_46%,transparent_74%)] blur-3xl" />
          <div className="absolute -right-36 top-[16%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(255,178,76,0.2)_0%,rgba(255,178,76,0.09)_46%,transparent_74%)] blur-3xl" />
          <div className="absolute left-[8%] top-[68%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(240,98,192,0.22)_0%,rgba(240,98,192,0.1)_42%,transparent_72%)] blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] text-center">
          <div className="mx-auto mb-5 inline-flex max-w-full items-center gap-1 rounded-full bg-[#eeebff] px-2 py-1 text-center text-[8px] font-bold leading-none text-[#644ce8] sm:gap-1.5 sm:px-3 sm:text-[11px] sm:leading-relaxed">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffb747]" />
            <span className="whitespace-nowrap">The #1 Multi-Artist Booth Management & Consignment System</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#8b69ff]" />
          </div>
          <h1 className="mx-auto max-w-[1000px] text-[clamp(30px,8vw,48px)] font-bold leading-[1.03] tracking-[-0.045em] sm:text-[clamp(18px,5.1vw,56px)]">
            <span className="sm:whitespace-nowrap">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #F062C0 6%, #FFB24C 79%)" }}
              >
                Never Split Spreadsheets
              </span>{" "}
              <span className="text-[#0B0F4F]">After a</span>
            </span>
            <br />
            <span className="text-[#0B0F4F]">10-Hour Market Again.</span>
          </h1>
          <p className="mx-auto mt-5 w-full max-w-[561px] text-[14px] font-medium leading-[1.7] text-[#64677d] sm:mt-5 sm:w-[clamp(180px,51vw,561px)] sm:text-[14px]">
            <span>ConsignDesk gives pop-up hosts, craft collectives, and artisan stalls an instant live terminal. Track shared inventory, invite cashier assistants via QR code, log booth expenses, and generate automated supplier payouts in seconds.</span>
          </p>
          <div className="mx-auto mt-6 flex w-full max-w-[320px] flex-col justify-center gap-2 sm:w-fit sm:max-w-full sm:flex-row">
            <Link href="/sales/OnGoing" className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#ffb84f] px-5 text-[13px] font-bold text-[#0B0F4F] shadow-[0_5px_12px_rgba(252,177,70,0.28)] hover:bg-[#ffad36] sm:h-[34px] sm:text-[12px]">
              Start Sales Run <ArrowRight size={14} />
            </Link>
            <a href="#features" className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#eeebff] px-5 text-[13px] font-bold text-[#5f3fec] hover:bg-[#e7e1ff] sm:h-[34px] sm:text-[12px]">
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#6744f5] text-white"><Play size={7} fill="currentColor" /></span>
              Watch ConsignedDesk Demo
            </a>
          </div>
          <div className="mx-auto mt-5 flex w-full max-w-[520px] flex-wrap justify-center gap-x-3 gap-y-2 px-1 text-[10px] font-semibold text-[#0B0F4F] sm:w-fit sm:text-[9px]">
            <span className="inline-flex items-center gap-1"><Monitor size={10} className="shrink-0 text-[#6b4af3]" /> Instant room code PIN</span>
            <span className="inline-flex items-center gap-1"><Monitor size={10} className="shrink-0 text-[#6b4af3]" /> Works on iPad & Mobile</span>
            <span className="inline-flex items-center gap-1"><BadgeDollarSign size={10} className="shrink-0 text-[#6b4af3]" /> Automatic Revenue Calculation</span>
          </div>

          {/* Section 1: live sales run dashboard preview. */}
          <div className="relative mx-auto mt-12 hidden w-full rounded-[18px] border border-[#f1eff8] bg-white p-2 text-left shadow-[0_12px_22px_rgba(38,39,75,0.13)] sm:block sm:w-[min(82vw,920px)] sm:rounded-[22px] sm:p-2.5">
            <p className="absolute bottom-full left-0 right-0 mb-1 text-left text-[11px] font-semibold text-[#0B0F4F]">A snippet of ConsignedDesk</p>
            <div className="flex items-center justify-between gap-2 border-b border-[#e8eaf5] pb-2 text-[8px] text-[#656984] sm:gap-3 sm:pb-2.5 sm:text-[10px]">
              <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                <span className="flex shrink-0 gap-1.5">
                  <i className="h-2 w-2 rounded-full bg-[#8058f8] sm:h-2.5 sm:w-2.5" />
                  <i className="h-2 w-2 rounded-full bg-[#ffb844] sm:h-2.5 sm:w-2.5" />
                  <i className="h-2 w-2 rounded-full bg-[#f07ebd] sm:h-2.5 sm:w-2.5" />
                </span>
                <div className="flex min-w-0 items-center gap-1.5 rounded-full bg-[#f0edff] px-2.5 py-1.5 font-semibold text-[#684dec] sm:gap-2 sm:px-3 sm:py-1.5">
                  <span className="shrink-0 font-bold text-[#684dec]">LIVE RUN</span>
                  <span className="truncate text-[#0B0F4F]">Sales Terminal Demo</span>
                  <span className="hidden shrink-0 rounded-full bg-[#e6e1ff] px-2 py-1 sm:inline">PIN: 8X2-901</span>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f0edff] px-2 py-1.5 font-semibold text-[#684dec] sm:gap-1.5 sm:px-3 sm:py-1.5">
                <Users size={12} />
                <span>2 Assistants Active</span>
                <span className="hidden font-normal text-[#656984] xl:inline">(Alex Chen, @may_craft, @tanawat.b)</span>
              </span>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-1.5 sm:mt-2.5 sm:grid-cols-3 sm:gap-2">
              <div className="flex min-w-0 items-center justify-between gap-2 rounded-[12px] bg-[#f2f2ff] px-2.5 py-1.5 sm:px-2.5 sm:py-1.5">
                <div className="min-w-0">
                  <div className="text-[9px] font-medium text-[#626783] sm:text-[10px]">{stats[0].label}</div>
                  <strong className="mt-0.5 block truncate text-[15px] font-bold leading-tight text-[#6a4af0] sm:text-[17px]">{stats[0].value}</strong>
                </div>
                <span className="shrink-0 rounded-full bg-[#e6e1ff] px-2 py-1 text-[8px] font-semibold text-[#0B0F4F] sm:text-[9px]">{stats[0].detail}</span>
              </div>
              <div className="flex min-w-0 items-center justify-between gap-2 rounded-[12px] bg-[#f2f2ff] px-2.5 py-1.5 sm:px-2.5 sm:py-1.5">
                <div className="min-w-0">
                  <div className="text-[9px] font-medium text-[#626783] sm:text-[10px]">{stats[1].label}</div>
                  <div className="mt-0.5 flex items-baseline gap-1.5">
                    <strong className="text-[16px] font-bold leading-tight text-[#0B0F4F] sm:text-[18px]">{stats[1].value}</strong>
                    <span className="text-[9px] text-[#626783] sm:text-[10px]">{stats[1].detail}</span>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-[#e6e1ff] px-2 py-1 text-[8px] font-semibold text-[#0B0F4F] sm:text-[9px]">{stats[2].value} {stats[2].detail}</span>
              </div>
              <div className="flex min-w-0 items-center justify-between gap-2 rounded-[12px] bg-[#f2f2ff] px-2.5 py-1.5 sm:px-2.5 sm:py-1.5">
                <div className="min-w-0">
                  <div className="text-[9px] font-medium text-[#626783] sm:text-[10px]">{stats[3].label}</div>
                  <strong className="mt-0.5 block truncate text-[10px] font-bold text-[#0B0F4F] sm:text-[11px]">{stats[3].value}</strong>
                </div>
                <button className="shrink-0 rounded-full bg-gradient-to-r from-[#ffb24c] to-[#f062c0] px-2 py-1 text-[9px] font-semibold text-white sm:px-2.5 sm:text-[10px]">{stats[3].detail}</button>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-1 border-t border-[#e8eaf5] pt-2 sm:mt-2.5 sm:grid-cols-[minmax(136px,0.27fr)_minmax(0,1fr)] sm:gap-2 sm:pt-2.5">
              <aside className="hidden self-start rounded-[12px] border border-[#e4e9f4] bg-white p-1.5 shadow-[0_2px_4px_rgba(38,39,75,0.06)] sm:block sm:p-2">
                <div className="mb-1.5 px-1 text-[7px] font-semibold uppercase tracking-wide text-[#858ba0] sm:mb-2 sm:px-1.5 sm:text-[9px]">Catalog Index</div>
                <div className="space-y-0.5 sm:space-y-1">
                  {categories.map(({ name, icon: Icon, active, expense }) => (
                    <div key={name} className={`flex items-center gap-1 rounded-full px-1 py-0.5 text-[6px] font-semibold sm:gap-1.5 sm:px-1.5 sm:py-1 sm:text-[9px] ${active ? "bg-[#eeeaff] text-[#0B0F4F]" : expense ? "mt-1.5 border-t border-[#e4e9f4] bg-[#fff3ef] pt-1.5 text-[#a94e37]" : "text-[#55596c]"}`}>
                      <Icon size={8} className={`shrink-0 sm:h-3 sm:w-3 ${expense ? "text-[#f06339]" : name === "My Products (Host)" ? "text-[#ffb24c]" : name === "P’ Kaimook" ? "text-[#f062c0]" : "text-[#8058f8]"}`} />
                      <span className="truncate">{name}</span>
                      {active && <span className="ml-auto rounded-full bg-white px-1 py-0.5 text-[6px] text-[#8058f8] sm:px-1.5 sm:text-[8px]">8</span>}
                    </div>
                  ))}
                </div>
              </aside>
              <div className="min-w-0">
                <div className="mb-1 flex items-center justify-between rounded-full border border-[#e4e9f4] px-2 py-1 text-[8px] shadow-[0_2px_4px_rgba(38,39,75,0.05)] sm:mb-1.5 sm:px-2.5 sm:py-1.5 sm:text-[14px]">
                  <div className="flex items-center gap-1.5 font-extrabold tracking-tight text-[#0B0F4F] sm:gap-2"><span className="text-[10px] text-[#ffb24c] sm:text-[11px]">●</span> My Products <span className="text-[7px] font-bold text-[#ff9d35] sm:text-[10px]">Host</span></div>
                  <span className="rounded-full bg-[#eeeaff] px-1.5 py-0.5 text-[7px] font-semibold text-[#714aff] sm:px-2 sm:py-0.5 sm:text-[9px]">2 items</span>
                </div>
                {products.slice(0, 2).map((product) => (
                  <div key={product.name} className="mb-0.5 flex min-w-0 items-center gap-1.5 rounded-[10px] border border-[#e4e9f4] bg-white px-1.5 py-0.5 sm:mb-1 sm:gap-2 sm:rounded-[12px] sm:px-2.5 sm:py-1">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] bg-[#fffaf0] sm:h-7 sm:w-7 sm:rounded-[9px] ${product.color}`}>
                      {product.icon === "frog" ? <Leaf size={13} className="sm:h-4 sm:w-4" /> : <Fish size={13} className="sm:h-4 sm:w-4" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[8px] font-bold text-[#0B0F4F] sm:text-[12px]">{product.name}</div>
                      <div className="mt-0.5 text-[6px] text-[#858ba0] sm:text-[8px]">{product.start}<span className="mx-1">•</span><span className={product.stock.includes("0 ") ? "font-semibold text-[#f06339]" : "font-semibold text-[#8058f8]"}>{product.stock}</span></div>
                    </div>
                    <div className="w-9 shrink-0 text-right sm:w-[50px]">
                      <div className="text-[9px] font-bold text-[#0B0F4F] sm:text-[15px]">{product.price}</div>
                      <div className="text-[6px] text-[#858ba0] sm:text-[8px]">{product.sold}</div>
                    </div>
                    <button className="w-[42px] shrink-0 rounded-[8px] bg-[#8058f8] py-1 text-[6px] font-semibold text-white sm:w-[76px] sm:rounded-[10px] sm:py-1.5 sm:text-[9px]">Sell -1</button>
                  </div>
                ))}
                <div className="mb-1 mt-1.5 flex items-center justify-between rounded-full border border-[#e4e9f4] px-2 py-1 text-[8px] shadow-[0_2px_4px_rgba(38,39,75,0.05)] sm:mb-1.5 sm:mt-2 sm:px-2.5 sm:py-1.5 sm:text-[13px]">
                  <span className="flex items-center gap-1.5 text-[8px] font-extrabold tracking-tight text-[#0B0F4F] sm:gap-2 sm:text-[14px]"><span className="text-[10px] text-[#f062c0] sm:text-[11px]">●</span>P’ Kaimook <span className="ml-1 text-[7px] font-bold text-[#7558f8] sm:text-[10px]">Supplier</span></span>
                  <span className="rounded-full bg-[#fff0f8] px-1.5 py-0.5 text-[7px] font-semibold text-[#ed63ad] sm:px-2 sm:py-0.5 sm:text-[9px]">3 items</span>
                </div>
                {products.slice(2).map((product) => (
                  <div key={product.name} className="mb-0.5 flex min-w-0 items-center gap-1.5 rounded-[10px] border border-[#e4e9f4] bg-white px-1.5 py-0.5 sm:mb-1 sm:gap-2 sm:rounded-[12px] sm:px-2.5 sm:py-1">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] bg-[#fff0f8] sm:h-7 sm:w-7 sm:rounded-[9px] ${product.color}`}>
                      {product.icon === "key" ? <Sparkles size={13} className="sm:h-4 sm:w-4" /> : <Rabbit size={13} className="sm:h-4 sm:w-4" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[8px] font-bold text-[#0B0F4F] sm:text-[12px]">{product.name}</div>
                      <div className="mt-0.5 text-[6px] text-[#858ba0] sm:text-[8px]">{product.start}<span className="mx-1">•</span><span className={product.stock.includes("0 ") ? "font-semibold text-[#f06339]" : "font-semibold text-[#8058f8]"}>{product.stock}</span></div>
                    </div>
                    <div className="w-9 shrink-0 text-right sm:w-[50px]">
                      <div className="text-[9px] font-bold text-[#0B0F4F] sm:text-[15px]">{product.price}</div>
                      <div className="text-[6px] text-[#858ba0] sm:text-[8px]">{product.sold}</div>
                    </div>
                    <button className="w-[42px] shrink-0 rounded-[8px] bg-[#8058f8] py-1 text-[6px] font-semibold text-white sm:w-[76px] sm:rounded-[10px] sm:py-1.5 sm:text-[9px]">Sell -1</button>
                  </div>
                ))}
            </div>
            <div className="mt-1.5 flex items-center gap-2 rounded-[12px] bg-[#e9eaff] px-2.5 py-1.5 text-[8px] font-semibold text-[#0B0F4F] sm:mt-1.5 sm:gap-2 sm:rounded-[14px] sm:px-3 sm:py-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6446f1] text-white sm:h-6 sm:w-6"><Check size={12} /></span>
              Sale Logged #142: 1x Green Horned Frog ฿150
            </div>
            </div>
          </div>
          <div className="relative mx-auto mt-14 w-full sm:mt-8 sm:hidden">
            <p className="absolute bottom-full left-0 right-0 mb-1 text-left text-[11px] font-semibold text-[#0B0F4F]">A snippet of ConsignedDesk</p>
            <div className="w-full overflow-x-auto overscroll-x-contain rounded-2xl border border-[#f1eff8] bg-white text-left shadow-[0_12px_22px_rgba(38,39,75,0.13)]">
            <div className="min-w-[460px] p-2.5">
              <div className="flex items-center justify-between gap-2 border-b border-[#e8eaf5] pb-2.5">
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#f0edff] px-2 py-1 text-[9px] font-bold text-[#684dec]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ffb844]" />
                    LIVE RUN
                  </span>
                  <p className="mt-1 truncate text-[11px] font-bold text-[#0B0F4F]">Sales Terminal Demo</p>
                </div>
                <span className="shrink-0 rounded-full bg-[#f0edff] px-2 py-1 text-[9px] font-semibold text-[#684dec]">2 Assistants</span>
              </div>
              <div className="my-2.5 grid grid-cols-2 gap-1.5">
                <div className="rounded-xl bg-[#f2f2ff] p-2">
                  <p className="text-[9px] font-medium text-[#626783]">Gross Intake</p>
                  <p className="mt-0.5 text-[15px] font-bold text-[#6a4af0]">฿8,490.00</p>
                </div>
                <div className="rounded-xl bg-[#f2f2ff] p-2">
                  <p className="text-[9px] font-medium text-[#626783]">Items Sold</p>
                  <p className="mt-0.5 text-[15px] font-bold text-[#0B0F4F]">66 <span className="text-[9px] font-medium text-[#626783]">/ 88</span></p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <aside className="w-[120px] shrink-0 rounded-xl border border-[#e4e9f4] bg-white p-1.5 shadow-[0_2px_4px_rgba(38,39,75,0.06)]">
                  <p className="mb-1.5 px-1 text-[8px] font-semibold uppercase tracking-wide text-[#858ba0]">Catalog Index</p>
                  <div className="space-y-0.5">
                    {categories.map(({ name, icon: Icon, active, expense }) => (
                      <div key={name} className={`flex items-center gap-1 rounded-full px-1 py-1 text-[7px] font-semibold ${active ? "bg-[#eeeaff] text-[#0B0F4F]" : expense ? "mt-1 border-t border-[#e4e9f4] bg-[#fff3ef] pt-1 text-[#a94e37]" : "text-[#55596c]"}`}>
                        <Icon size={9} className={`shrink-0 ${expense ? "text-[#f06339]" : name === "My Products (Host)" ? "text-[#ffb24c]" : name === "P’ Kaimook" ? "text-[#f062c0]" : "text-[#8058f8]"}`} />
                        <span className="truncate">{name}</span>
                        {active && <span className="ml-auto rounded-full bg-white px-1 py-0.5 text-[7px] text-[#8058f8]">8</span>}
                      </div>
                    ))}
                  </div>
                </aside>
                <div className="w-[300px] shrink-0">
                  <div className="mb-1.5 flex items-center justify-between px-1">
                    <h2 className="text-[11px] font-extrabold text-[#0B0F4F]">Products</h2>
                    <span className="text-[9px] font-semibold text-[#8058f8]">5 items</span>
                  </div>
                  <div className="space-y-1">
                    {products.map((product) => (
                      <div key={product.name} className="flex min-w-0 items-center gap-1.5 rounded-xl border border-[#e4e9f4] bg-white p-1.5">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fffaf0] ${product.color}`}>
                          {product.icon === 'frog' ? <Leaf size={15} /> : product.icon === 'fish' ? <Fish size={15} /> : product.icon === 'key' ? <Sparkles size={15} /> : <Rabbit size={15} />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[10px] font-bold text-[#0B0F4F]">{product.name}</p>
                          <p className="mt-0.5 text-[9px] font-semibold text-[#8058f8]">{product.stock}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-[11px] font-bold text-[#0B0F4F]">{product.price}</p>
                          <p className="text-[8px] text-[#858ba0]">{product.sold}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5 rounded-xl bg-[#e9eaff] px-2 py-1.5 text-[9px] font-semibold text-[#0B0F4F]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6446f1] text-white"><Check size={10} /></span>
                    Sale logged: 1x Green Horned Frog • ฿150
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Section 2: sales-run metrics and featured market list. */}
      <section className="bg-[#f1f2ff] px-4 py-12 sm:px-8 sm:pt-16 sm:pb-16">
        <div className="mx-auto w-full sm:w-[min(82vw,920px)]">
          <div className="mb-6 text-center">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#7755f4] sm:text-[12px]">Streamlined Sales Runs for High-Tempo Markets</p>
            <h2 className="mt-2 text-[20px] font-bold leading-tight text-[#0B0F4F]">Built for high-tempo pop-ups, multi-day markets, and zero<br className="hidden sm:block" /> spreadsheet hassle</h2>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex min-h-[60px] flex-col items-center justify-center rounded-[9px] bg-white px-2 py-2 shadow-[0_2px_8px_rgba(43,48,94,0.025)] sm:min-h-[90px]">
                <strong className={`text-[22px] font-bold leading-none tracking-[-0.045em] sm:text-[34px] ${metric.color}`}>{metric.value}</strong>
                <span className="mt-1 text-center text-[8px] font-semibold text-[#0B0F4F] sm:text-[11px]">{metric.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:mt-9 sm:gap-x-9">
            {markets.map(({ name, icon: Icon }) => (
              <span key={name} className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#4e5068] sm:text-[10px]"><Icon size={11} className="text-[#7050f1]" />{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: manual booth challenges versus the ConsignDesk flow. */}
      <section className="relative isolate overflow-hidden bg-[#faf8ff] px-7 pt-16 pb-16 sm:px-8 sm:py-[72px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -right-40 -top-[10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(230,232,255,0.8)_0%,rgba(230,232,255,0.35)_46%,transparent_74%)] blur-3xl" />
          <div className="absolute -left-60 -bottom-[10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(248,113,113,0.16)_0%,rgba(248,113,113,0.07)_46%,transparent_74%)] blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1120px]">
          <div className="mb-9 text-center sm:mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7652f1] sm:text-[13px]">The Contrast</p>
            <h2 className="mt-2 text-[22px] font-bold leading-[1.12] tracking-[-0.035em] text-[#0B0F4F] sm:text-[34px]">The 2 AM Settlement Nightmare vs. The<br className="hidden sm:block" /> ConsignDesk Way</h2>
            <p className="mt-3 text-[11px] text-[#686a7c] sm:text-[14px]">Why top booth managers retired sticky notes and chaotic LINE group reconciliations.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
            <article className="rounded-[12px] bg-[#fdebed] p-4 sm:rounded-[16px] sm:p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9272c] text-white"><X size={16} /></span>
                <div><h3 className="text-[15px] font-bold text-[#b7252b] sm:text-[19px]">The Manual Booth Headache</h3><p className="text-[9px] text-[#76565c] sm:text-[12px]">Pen, Paper, & Post-it-Event Exhaustion</p></div>
              </div>
              <ul className="space-y-4">
                {manualProblems.map(({ title, text, icon: Icon }) => (
                  <li key={title} className="flex gap-2 text-[12px] leading-[1.55] text-[#0B0F4F] sm:text-[13px]">
                    <Icon size={14} className="mt-0.5 shrink-0 text-[#cf3337]" />
                    <span><strong className="font-bold">{title}</strong> {text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-[#f4d0d4] pt-3 text-[9px] font-semibold leading-relaxed text-[#c22d32] sm:text-[12px]">Result: Burnt out booth hosts and friction with artisan friends.</p>
            </article>
            <article className="rounded-[12px] bg-[#e6e8ff] p-4 shadow-[0_5px_10px_rgba(76,75,148,0.12)] sm:rounded-[16px] sm:p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#603fe8] text-white"><Check size={16} /></span>
                <div><h3 className="text-[15px] font-bold text-[#5638df] sm:text-[19px]">The ConsignDesk Flow</h3><p className="text-[9px] text-[#5c5b82] sm:text-[12px]">Effortless, Transparent, Instant</p></div>
              </div>
              <ul className="space-y-4">
                {consignDeskBenefits.map(({ title, text, icon: Icon }) => (
                  <li key={title} className="flex gap-2 text-[12px] leading-[1.55] text-[#0B0F4F] sm:text-[13px]">
                    <Icon size={14} className="mt-0.5 shrink-0 text-[#5c42e8]" />
                    <span><strong className="font-bold">{title}</strong> {text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-[#d1d4fb] pt-3 text-[9px] font-semibold leading-relaxed text-[#5438dc] sm:text-[12px]">Result: Settled in 60 seconds. Grab celebratory iced lattes instead of doing accounting.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Section 4: feature details for real pop-up logistics. */}
      <section id="features" className="bg-[#f1f2ff] px-4 pt-14 pb-16 sm:px-8 sm:pt-16 sm:pb-[72px]">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-9 sm:mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7150ed] sm:text-[13px]">Built for Real Pop-Up Logistics</p>
            <h2 className="mt-2 text-[22px] font-bold leading-[1.15] tracking-[-0.035em] text-[#0B0F4F] sm:text-[34px]">Every feature designed for sticky, fast,<br className="hidden sm:block" /> chaotic market days.</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {features.map(({ title, description, icon: Icon, wide, small, footer }) => (
              <article key={title} className={`relative flex flex-col rounded-[12px] bg-white px-4 py-4 sm:rounded-[16px] sm:px-5 sm:py-5 ${wide ? "sm:col-span-2" : ""}`}>
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-bold leading-tight text-[#0B0F4F] ${title.startsWith("Robust") ? "text-[17px] sm:text-[22px]" : "text-[15px] sm:text-[19px]"}`}>{title === "Live Sales Activity Stream Board" ? <>Live Sales Activity<br />Stream Board</> : title}</h3>
                    <p className={`mt-1.5 font-semibold leading-[1.5] text-[#66687a] sm:mt-2 ${title.startsWith("Robust") ? "text-[11px] sm:text-[15px]" : "text-[10px] sm:text-[13px]"}`}>{description}</p>
                  </div>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] sm:h-11 sm:w-11 ${title.startsWith("Live") ? "bg-[#fff0f8] text-[#ef5caf]" : title.startsWith("Automated") ? "bg-[#fff1ec] text-[#ef6b43]" : "bg-[#efedff] text-[#654bf0]"}`}><Icon size={24} strokeWidth={2.75} /></span>
                </div>
                {footer && <div className={`mt-auto ${small ? "pt-3" : "pt-4"}`}>
                  <div className={`flex items-center justify-between rounded-[7px] px-2 py-2 text-[8px] font-bold sm:py-2.5 sm:text-[11px] ${title.startsWith("Live") ? "bg-[#fff0f8] text-[#0B0F4F]" : title.startsWith("Robust") ? "bg-[#ededff] text-[#0B0F4F]" : "bg-[#f2efff] text-[#5f42e8]"}`}>
                    <span className="flex items-center gap-1.5">{title.startsWith("Live") && <span className="h-2 w-2 rounded-full bg-[#ef68b7]" />}{footer}</span>
                    {title.startsWith("Robust") && <strong className="text-[9px] text-[#643ff0] sm:text-[12px]">100% Real-Time</strong>}
                    {title.startsWith("Instant") && <ShieldCheck size={13} />}
                  </div>
                </div>}
                {title.startsWith("Automated") && <div className="mt-auto pt-4">
                  <div className="flex items-center justify-center gap-1 whitespace-nowrap rounded-[8px] bg-[#fff2f2] px-1.5 py-3 text-[7px] font-semibold sm:gap-3 sm:px-4 sm:py-3.5 sm:text-[11px]">
                    <strong className="inline-flex min-w-[38px] flex-col items-center rounded-full bg-white px-1.5 py-1 text-center leading-tight text-[#00a879] sm:min-w-0 sm:px-2.5 sm:leading-normal">
                      <span className="sm:hidden">Gross<br />Sales</span>
                      <span className="hidden sm:inline">Gross Sales</span>
                    </strong>
                    <span className="font-extrabold text-[#0B0F4F]">−</span>
                    <span className="flex flex-col items-center rounded-full bg-white px-1.5 py-2 text-center leading-tight text-[#ed694f] sm:px-3 sm:text-[11px] sm:leading-normal">
                      <span>Total Shared Expenses</span>
                      <span className="mt-1 w-full border-t border-[#0B0F4F] pt-1 text-[#7C5CFF]">Total Supplier Payouts</span>
                    </span>
                    <span className="font-extrabold text-[#0B0F4F]">=</span>
                    <strong className="inline-flex min-w-[38px] flex-col items-center rounded-full bg-white px-1.5 py-1 text-center leading-tight text-[#7C5CFF] sm:min-w-0 sm:px-2.5 sm:leading-normal">
                      <span className="sm:hidden">Net<br />Payout</span>
                      <span className="hidden sm:inline">Net Payout</span>
                    </strong>
                  </div>
                </div>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: final ConsignDesk call to action. */}
      <section className="relative isolate overflow-hidden bg-[#faf8ff] px-4 py-14 sm:px-8 sm:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -right-36 -top-32 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.3)_0%,rgba(124,92,255,0.14)_48%,transparent_74%)] blur-3xl" />
          <div className="absolute left-[38%] -bottom-48 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,178,76,0.34)_0%,rgba(255,178,76,0.14)_46%,transparent_74%)] blur-3xl" />
          <div className="absolute -left-44 top-[24%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(240,98,192,0.3)_0%,rgba(240,98,192,0.13)_46%,transparent_74%)] blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-[960px] rounded-[15px] bg-[radial-gradient(ellipse_at_0%_100%,#7554ff_0%,transparent_43%),radial-gradient(ellipse_at_100%_0%,#ffae46_0%,transparent_45%),linear-gradient(115deg,#eb55c0_0%,#e753c1_55%,#f36cb6_100%)] px-4 py-6 text-center text-white shadow-[0_10px_18px_rgba(59,50,91,0.22)] sm:rounded-[20px] sm:px-8 sm:py-8">
          <h2 className="text-[20px] font-bold leading-[1.15] tracking-[-0.035em] sm:text-[31px]">Take ConsignDesk to your next market<br className="hidden sm:block" /> this weekend.</h2>
          <p className="mx-auto mt-2 max-w-[500px] text-[11px] font-semibold leading-relaxed text-white/90 sm:text-[14px]">Set up your first shared inventory run in less than 2 minutes. No app downloads or card credentials needed.</p>
          <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row sm:gap-3">
            <Link href="/sales/OnGoing" className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#ffb84f] px-6 text-[13px] font-extrabold text-[#0B0F4F] shadow-md hover:bg-[#ffad36] sm:h-[40px] sm:px-7 sm:text-[14px]">Launch First Run Now <ArrowRight size={14} /></Link>
            <a href="#features" className="inline-flex h-11 items-center justify-center rounded-full bg-white/20 px-6 text-[13px] font-bold text-white hover:bg-white/30 sm:h-[40px] sm:px-7 sm:text-[14px]">Watch Demo</a>
          </div>
        </div>
      </section>

      <footer className="bg-white px-5 py-4 sm:px-8">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <Logo />
              <p className="mt-1 max-w-[420px] text-[10px] font-semibold leading-relaxed text-[#66687a] sm:text-[12px]">The collaborative consignment point-of-sale and inventory platform tailored for collective craft galleries, maker spaces, and indie retail shops.</p>
            </div>
            <div className="flex gap-2 text-[#777b9c]">
              {[CircleHelp, Video, Monitor, Mail].map((Icon, index) => <a key={index} href="#features" aria-label={["Help", "Video", "Platform", "Email"][index]} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0fb] hover:bg-[#e8e4ff] sm:h-9 sm:w-9"><Icon size={16} /></a>)}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between gap-2 border-t border-[#f0eff6] pt-2 text-[9px] font-semibold text-[#76788a] sm:text-[11px]">
            <span>© 2025 ConsignDesk Inc. Crafted for independent maker collectives.</span>
            <span className="font-semibold text-[#0B0F4F]">All transactions encrypted & ledger-backed</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
