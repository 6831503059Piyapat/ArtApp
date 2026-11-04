import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  Banknote,
  Boxes,
  Check,
  CircleHelp,
  Clock3,
  Fish,
  House,
  KeyRound,
  Leaf,
  Mail,
  Monitor,
  Palette,
  Play,
  Rabbit,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";

const products = [
  { name: "Green Horned Frog Figure", start: "Start: 10", stock: "15 in stock", price: "฿150", sold: "Sold: 10", icon: "frog", color: "text-amber-500" },
  { name: "Fish Sculpture", start: "Start: 10", stock: "11 in stock", price: "฿150", sold: "Sold: 14", icon: "fish", color: "text-orange-500" },
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
  { name: "P’ Kaimook", icon: Palette },
  { name: "Nong’ Japan", icon: Sparkles },
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
    icon: Banknote,
    wide: true,
    footer: "Inventory & Sales Sync",
  },
  {
    title: "Instant Assistant Management",
    description: "Step away from your booth with total peace of mind. Easily generate invitation links with tailored access levels—allowing team members to log transactions while keeping sensitive revenue and supplier payouts secure.",
    icon: Users,
    small: true,
    footer: "Zero App Install Required for Assistants",
  },
  {
    title: "Live Sales Activity Stream Board",
    description: "Send consignors a private web link. They can sit at home or in another city and watch their items sell off the shelf in real-time, removing 100% of anxiety and text check-ins.",
    icon: Sparkles,
    small: true,
    footer: "Live Webhook & LINE Push Ready",
  },
  {
    title: "Automated Shared Expense Deductions",
    description: "Log your total event expenses in one place. The system automatically divides the costs equally across all active suppliers, deducting each share from gross sales to yield accurate net payouts—zero manual math required.",
    icon: Banknote,
    wide: true,
  },
];

function Logo() {
  return (
    <span className="flex items-center gap-2 text-[12px] font-extrabold tracking-[-0.04em] text-[#171735]">
      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[6px] bg-gradient-to-br from-[#ff6cb7] to-[#8055ff] text-[10px] text-white shadow-sm">C</span>
      <span>Consign<span className="text-[#6547e9]">Desk</span></span>
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8ff] font-sans text-[#171a36]">
      <header className="sticky top-0 z-10 border-b border-[#ebe8f6] bg-white/95">
        <div className="mx-auto flex h-[42px] max-w-[1160px] items-center justify-between px-5 sm:px-7">
          <Link href="/" aria-label="ConsignDesk home"><Logo /></Link>
          <nav className="flex items-center gap-4 text-[10px]">
            <Link href="/auth/login" className="font-medium text-[#22223a] hover:text-[#6547e9]">Sign In</Link>
            <Link href="/sales/OnGoing" className="rounded-full bg-[#ffb84e] px-3.5 py-1.5 font-bold text-[#2b2132] shadow-[0_3px_9px_rgba(255,172,61,0.28)] hover:bg-[#ffad36]">
              Launch Free Run
            </Link>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-[#ee68bd] to-[#8657f6] text-[8px] text-white">A</span>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_0%_10%,#eee8ff_0%,transparent_42%),radial-gradient(ellipse_at_100%_65%,#fff0e8_0%,transparent_34%),#faf8ff] px-5 pb-[34px] pt-6 sm:px-8 sm:pb-8">
        <div className="relative mx-auto max-w-[920px] text-center">
          <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#eeebff] px-3 py-1 text-[8px] font-semibold text-[#644ce8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffb747]" />
            The #1 Multi-Artist Booth Management & Consignment System
            <span className="h-1.5 w-1.5 rounded-full bg-[#8b69ff]" />
          </div>
          <h1 className="mx-auto max-w-[610px] text-[clamp(24px,4.5vw,56px)] font-bold leading-[1.03] tracking-[-0.045em]">
            <span className="bg-gradient-to-r from-[#f052b5] via-[#f2769d] to-[#f58b8e] bg-clip-text text-transparent">Never Split Spreadsheets</span>{" "}
            <span className="text-[#101643]">After a</span>
            <br />
            <span className="text-[#101643]">10-Hour Market Again.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[380px] text-[9px] leading-[1.65] text-[#64677d] sm:max-w-[480px] sm:text-[11px]">
            ConsignDesk gives pop-up hosts, craft collectives, and artisan stalls an instant live terminal. Track shared inventory, invite cashier assistants via QR code, log booth expenses, and generate automated supplier payouts in seconds.
          </p>
          <div className="mt-[18px] flex flex-wrap justify-center gap-2">
            <Link href="/sales/OnGoing" className="inline-flex h-[27px] items-center gap-1.5 rounded-full bg-[#ffb84f] px-4 text-[9px] font-bold text-[#2d2632] shadow-[0_5px_12px_rgba(252,177,70,0.28)] hover:bg-[#ffad36]">
              Start Sales Run <ArrowRight size={12} />
            </Link>
            <a href="#features" className="inline-flex h-[27px] items-center gap-1.5 rounded-full bg-[#eeebff] px-4 text-[9px] font-bold text-[#5f3fec] hover:bg-[#e7e1ff]">
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#6744f5] text-white"><Play size={7} fill="currentColor" /></span>
              Watch ConsignedDesk Demo
            </a>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[7px] font-medium text-[#343957]">
            <span className="inline-flex items-center gap-1"><Monitor size={8} className="text-[#6b4af3]" /> Instant room code PIN</span>
            <span className="inline-flex items-center gap-1"><Monitor size={8} className="text-[#6b4af3]" /> Works on iPad & Mobile</span>
            <span className="inline-flex items-center gap-1"><BadgeDollarSign size={8} className="text-[#6b4af3]" /> Automatic Revenue Calculation</span>
          </div>

          <div className="mx-auto mt-[29px] w-[min(100%,480px)] rounded-[15px] border border-[#f1eff8] bg-white p-2.5 text-left shadow-[0_12px_22px_rgba(38,39,75,0.13)] sm:w-[min(100%,960px)] sm:rounded-[20px] sm:p-4">
            <div className="flex items-center justify-between gap-2 text-[6px] text-[#656984] sm:text-[9px]">
              <div className="flex min-w-0 items-center gap-1.5">
                <span className="flex shrink-0 gap-1"><i className="h-1.5 w-1.5 rounded-full bg-[#a26cff]" /><i className="h-1.5 w-1.5 rounded-full bg-[#fb78bb]" /><i className="h-1.5 w-1.5 rounded-full bg-[#ffb844]" /></span>
                <span className="truncate rounded-full bg-[#f0edff] px-2 py-1 font-semibold text-[#684dec]">LIVE RUN&nbsp; MFU outside night market (MON 14)&nbsp; PIN: 8X2-901</span>
              </div>
              <span className="shrink-0 rounded-full bg-[#f0edff] px-2 py-1 font-semibold text-[#684dec]"><Users size={8} className="mr-1 inline" />2 Assistants Active</span>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1.5">
              {stats.map((stat, index) => (
                <div key={stat.label + index} className="min-w-0 rounded-[8px] bg-[#f4f4ff] px-2 py-1.5 sm:px-3 sm:py-2">
                  <div className="truncate text-[5px] font-medium text-[#626783] sm:text-[8px]">{stat.label}</div>
                  <div className="mt-0.5 flex items-center justify-between gap-1">
                    <strong className="truncate text-[7px] font-bold text-[#24264c] sm:text-[11px]">{stat.value}</strong>
                    <span className={`shrink-0 rounded-full px-1 py-0.5 text-[5px] font-semibold sm:text-[7px] ${index === 3 ? "bg-[#ff7082] text-white" : "bg-[#e6e1ff] text-[#644ce6]"}`}>{stat.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-[108px_minmax(0,1fr)] gap-2 border-t border-[#eeeefa] pt-2 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-3">
              <aside className="self-start rounded-[10px] border border-[#ececf7] bg-white p-2 sm:p-3">
                <div className="mb-1.5 px-1 text-[6px] font-medium uppercase tracking-wide text-[#8a8ca1] sm:text-[8px]">Catalog Index</div>
                <div className="space-y-1">
                  {categories.map(({ name, icon: Icon, active, expense }) => (
                    <div key={name} className={`flex items-center gap-1 rounded-full px-1.5 py-1 text-[6px] font-semibold sm:gap-2 sm:px-2 sm:text-[9px] ${active ? "bg-[#eeeaff] text-[#5d45df]" : expense ? "mt-1 bg-[#fff0ea] text-[#a94e37]" : "text-[#41435f]"}`}>
                      <Icon size={8} className={expense ? "text-[#e76c4c]" : "text-[#8058f7]"} />
                      <span className="truncate">{name}</span>
                      {active && <span className="ml-auto">8</span>}
                    </div>
                  ))}
                </div>
              </aside>
              <div className="min-w-0">
                <div className="mb-1 flex items-center justify-between rounded-t-[9px] border border-[#efeff7] px-2 py-1.5 text-[7px] sm:px-3 sm:text-[10px]">
                  <div className="flex items-center gap-1.5 font-bold text-[#292b4d]"><span className="text-[#faaf39]">✦</span> My Products <span className="text-[6px] font-medium text-[#fa8d48] sm:text-[8px]">Host</span></div>
                  <span className="rounded-full bg-[#eeeaff] px-2 py-0.5 text-[6px] font-semibold text-[#714aff] sm:text-[8px]">2 items</span>
                </div>
                {products.slice(0, 2).map((product) => (
                  <div key={product.name} className="mb-1 flex min-w-0 items-center gap-1.5 rounded-[8px] border border-[#f0eff7] bg-white px-1.5 py-[3px] sm:gap-2 sm:px-2 sm:py-1.5">
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] bg-[#fffaf2] ${product.color}`}>
                      {product.icon === "frog" ? <Leaf size={11} /> : <Fish size={11} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[6px] font-bold text-[#27294a] sm:text-[9px]">{product.name}</div>
                      <div className="text-[5px] text-[#777a91] sm:text-[7px]">{product.start}&nbsp; · &nbsp;<span className={product.stock.includes("0 ") ? "text-[#ff785d]" : "text-[#66a575"}>{product.stock}</span></div>
                    </div>
                    <div className="text-right">
                      <div className="text-[7px] font-bold text-[#282b4e] sm:text-[10px]">{product.price}</div>
                      <div className="text-[5px] text-[#85869a] sm:text-[7px]">{product.sold}</div>
                    </div>
                    <button className="w-[42px] shrink-0 rounded-full bg-[#8058f8] py-1 text-[6px] font-semibold text-white sm:w-[64px] sm:text-[8px]">Sell -1</button>
                  </div>
                ))}
                <div className="mb-1 mt-1 flex items-center justify-between rounded-full border border-[#f0eff7] px-2 py-1 text-[7px] sm:text-[9px]">
                  <span className="font-bold text-[#2c2d4d]"><span className="mr-1 text-[#f07ebd]">●</span>P’ Kaimook <span className="ml-1 text-[6px] font-medium text-[#6b69e6] sm:text-[8px]">Supplier</span></span>
                  <span className="rounded-full bg-[#fff0f8] px-2 py-0.5 text-[6px] text-[#ed63ad] sm:text-[8px]">3 items</span>
                </div>
                {products.slice(2).map((product) => (
                  <div key={product.name} className="mb-1 flex min-w-0 items-center gap-1.5 rounded-[8px] border border-[#f0eff7] bg-white px-1.5 py-[3px] sm:gap-2 sm:px-2 sm:py-1.5">
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] bg-[#fff4fb] ${product.color}`}>
                      {product.icon === "key" ? <KeyRound size={11} /> : <Rabbit size={11} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[6px] font-bold text-[#27294a] sm:text-[9px]">{product.name}</div>
                      <div className="text-[5px] text-[#777a91] sm:text-[7px]">{product.start}&nbsp; · &nbsp;<span className={product.stock.includes("0 ") ? "text-[#ff785d]" : "text-[#66a575"}>{product.stock}</span></div>
                    </div>
                    <div className="text-right">
                      <div className="text-[7px] font-bold text-[#282b4e] sm:text-[10px]">{product.price}</div>
                      <div className="text-[5px] text-[#85869a] sm:text-[7px]">{product.sold}</div>
                    </div>
                    <button className="w-[42px] shrink-0 rounded-full bg-[#8058f8] py-1 text-[6px] font-semibold text-white sm:w-[64px] sm:text-[8px]">Sell -1</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-1 flex items-center gap-1.5 rounded-b-[8px] bg-[#e9eaff] px-2 py-1.5 text-[6px] font-semibold text-[#373b79] sm:text-[8px]">
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#6446f1] text-white"><Check size={8} /></span>
              Sale Logged #142: 1x Green Horned Frog ฿150
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f1f2ff] px-7 pt-6 pb-9 sm:px-8 sm:py-9">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-4 text-center">
            <p className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#7755f4]">Streamlined Sales Runs for High-Tempo Markets</p>
            <h2 className="mt-1 text-[12px] font-bold leading-tight text-[#20233e] sm:text-[20px]">Built for high-tempo pop-ups, multi-day markets, and zero<br /> spreadsheet hassle</h2>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex min-h-[60px] flex-col items-center justify-center rounded-[9px] bg-white px-2 py-2 shadow-[0_2px_8px_rgba(43,48,94,0.025)] sm:min-h-[90px]">
                <strong className={`text-[22px] font-bold leading-none tracking-[-0.045em] sm:text-[34px] ${metric.color}`}>{metric.value}</strong>
                <span className="mt-1 text-center text-[7px] text-[#45475d] sm:text-[10px]">{metric.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:mt-6 sm:gap-x-8">
            {markets.map(({ name, icon: Icon }) => (
              <span key={name} className="inline-flex items-center gap-1 text-[7px] font-semibold text-[#4e5068] sm:text-[10px]"><Icon size={11} className="text-[#7050f1]" />{name}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#faf8ff] px-7 pt-[45px] pb-10 sm:px-8 sm:py-11">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-7 text-center sm:mb-7">
            <p className="text-[7px] font-bold uppercase tracking-[0.14em] text-[#7652f1]">The Contrast</p>
            <h2 className="mt-1.5 text-[18px] font-bold leading-[1.12] tracking-[-0.035em] text-[#202238] sm:text-[28px]">The 2 AM Settlement Nightmare vs. The<br /> ConsignDesk Way</h2>
            <p className="mt-2 text-[8px] text-[#686a7c] sm:text-[11px]">Why top booth managers retired sticky notes and chaotic LINE group reconciliations.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-4">
            <article className="rounded-[12px] bg-[#fdebed] p-4 sm:rounded-[16px] sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[#c9272c] text-white"><X size={11} /></span>
                <div><h3 className="text-[10px] font-bold text-[#b7252b] sm:text-[14px]">The Manual Booth Headache</h3><p className="text-[6px] text-[#76565c] sm:text-[8px]">Pen, Paper, & Post-it-Event Exhaustion</p></div>
              </div>
              <ul className="space-y-2.5">
                {manualProblems.map(({ title, text, icon: Icon }) => (
                  <li key={title} className="flex gap-1.5 text-[7px] leading-[1.45] text-[#343447] sm:text-[9px]">
                    <Icon size={9} className="mt-0.5 shrink-0 text-[#cf3337]" />
                    <span><strong className="font-bold">{title}</strong> {text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-[#f4d0d4] pt-2 text-[6px] font-semibold text-[#c22d32] sm:text-[8px]">Result: Burnt out booth hosts and friction with artisan friends.</p>
            </article>
            <article className="rounded-[12px] bg-[#e6e8ff] p-4 shadow-[0_5px_10px_rgba(76,75,148,0.12)] sm:rounded-[16px] sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[#603fe8] text-white"><Check size={11} /></span>
                <div><h3 className="text-[10px] font-bold text-[#5638df] sm:text-[14px]">The ConsignDesk Flow</h3><p className="text-[6px] text-[#5c5b82] sm:text-[8px]">Effortless, Transparent, Instant</p></div>
              </div>
              <ul className="space-y-2.5">
                {consignDeskBenefits.map(({ title, text, icon: Icon }) => (
                  <li key={title} className="flex gap-1.5 text-[7px] leading-[1.45] text-[#343447] sm:text-[9px]">
                    <Icon size={9} className="mt-0.5 shrink-0 text-[#5c42e8]" />
                    <span><strong className="font-bold">{title}</strong> {text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-[#d1d4fb] pt-2 text-[6px] font-semibold text-[#5438dc] sm:text-[8px]">Result: Settled in 60 seconds. Grab celebratory iced lattes instead of doing accounting.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="features" className="bg-[#f1f2ff] px-7 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-3">
            <p className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#7150ed]">Built for Real Pop-Up Logistics</p>
            <h2 className="mt-1.5 text-[17px] font-bold leading-[1.15] tracking-[-0.035em] text-[#202238] sm:text-[28px]">Every feature designed for sticky, fast,<br /> chaotic market days.</h2>
          </div>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
            {features.map(({ title, description, icon: Icon, wide, small, footer }) => (
              <article key={title} className={`flex flex-col rounded-[12px] bg-white p-3.5 sm:rounded-[16px] sm:p-5 ${wide ? "col-span-2" : ""}`}>
                <span className={`mb-2 flex h-[23px] w-[23px] items-center justify-center rounded-[7px] ${title.startsWith("Live") ? "bg-[#fff0f8] text-[#ef5caf]" : title.startsWith("Automated") ? "bg-[#fff1ec] text-[#ef6b43]" : "bg-[#efedff] text-[#654bf0]"}`}><Icon size={13} /></span>
                <h3 className="text-[13px] font-bold leading-tight text-[#202238] sm:text-[15px]">{title}</h3>
                <p className="mt-1.5 text-[7px] leading-[1.45] text-[#66687a] sm:text-[9px]">{description}</p>
                {footer && <div className={`mt-auto ${small ? "pt-3" : "pt-4"}`}>
                  <div className={`flex items-center justify-between rounded-[7px] px-2 py-2 text-[6px] font-medium sm:text-[8px] ${title.startsWith("Live") ? "bg-[#fff0f8] text-[#2b273b]" : title.startsWith("Robust") ? "bg-[#ededff] text-[#474761]" : "bg-[#f2efff] text-[#5f42e8]"}`}>
                    <span className="flex items-center gap-1">{title.startsWith("Live") && <span className="h-1.5 w-1.5 rounded-full bg-[#ef68b7]" />}{footer}</span>
                    {title.startsWith("Robust") && <strong className="text-[8px] text-[#643ff0] sm:text-[10px]">100% Real-Time</strong>}
                    {title.startsWith("Instant") && <ShieldCheck size={9} />}
                  </div>
                </div>}
                {title.startsWith("Automated") && <div className="mt-3 flex items-center justify-center gap-2 rounded-[8px] bg-[#fff2f2] px-2 py-4 text-[6px] sm:gap-3 sm:py-4 sm:text-[9px]">
                  <strong className="rounded-full bg-white px-2 py-1 text-[#00a879]">Gross Sales</strong>
                  <span className="text-[#35364d]">−</span>
                  <span className="rounded-full bg-white px-2 py-1 text-center text-[#ed694f]">Total Shared Expenses<br /><span className="text-[#8164f4]">Total Supplier Payouts</span></span>
                  <span className="text-[#35364d]">=</span>
                  <strong className="rounded-full bg-[#8655f6] px-2 py-1 text-white">Net Payout</strong>
                </div>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#faf8ff] px-9 py-7 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-[1120px] rounded-[15px] bg-[radial-gradient(ellipse_at_0%_100%,#7554ff_0%,transparent_43%),radial-gradient(ellipse_at_100%_0%,#ffae46_0%,transparent_45%),linear-gradient(115deg,#eb55c0_0%,#e753c1_55%,#f36cb6_100%)] px-4 py-9 text-center text-white shadow-[0_10px_18px_rgba(59,50,91,0.22)] sm:rounded-[20px] sm:px-8 sm:py-10">
          <h2 className="text-[20px] font-bold leading-[1.15] tracking-[-0.035em] sm:text-[31px]">Take ConsignDesk to your next market<br /> this weekend.</h2>
          <p className="mx-auto mt-2 max-w-[380px] text-[8px] leading-relaxed text-white/85 sm:text-[10px]">Set up your first shared inventory run in less than 2 minutes. No app downloads or card credentials needed.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link href="/sales/OnGoing" className="inline-flex h-[27px] items-center gap-1 rounded-full bg-[#ffb84f] px-4 text-[8px] font-bold text-[#282139] shadow-md hover:bg-[#ffad36]">Launch First Run Now <ArrowRight size={10} /></Link>
            <a href="#features" className="inline-flex h-[27px] items-center rounded-full bg-white/20 px-4 text-[8px] font-semibold text-white hover:bg-white/30">Watch Demo</a>
          </div>
        </div>
      </section>

      <footer className="bg-white px-5 py-4 sm:px-8">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <Logo />
              <p className="mt-1 max-w-[360px] text-[7px] leading-relaxed text-[#66687a] sm:text-[9px]">The collaborative consignment point-of-sale and inventory platform tailored for collective craft galleries, maker spaces, and indie retail shops.</p>
            </div>
            <div className="flex gap-1.5 text-[#777b9c]">
              {[CircleHelp, Video, Monitor, Mail].map((Icon, index) => <a key={index} href="#features" aria-label={["Help", "Video", "Platform", "Email"][index]} className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#f0f0fb] hover:bg-[#e8e4ff]"><Icon size={9} /></a>)}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between gap-2 border-t border-[#f0eff6] pt-2 text-[6px] text-[#76788a] sm:text-[7px]">
            <span>© 2025 ConsignDesk Inc. Crafted for independent maker collectives.</span>
            <span className="font-semibold text-[#45475c]">All transactions encrypted & ledger-backed</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
