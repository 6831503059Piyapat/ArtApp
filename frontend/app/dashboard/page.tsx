
import Link from "next/link";

const projects = [
  {
    id: "midnight-harvest",
    title: "Midnight Harvest",
    type: "Digital illustration",
    updated: "Edited 2 hours ago",
    icon: "🎃",
    background: "from-orange-500 via-amber-700 to-violet-950",
    accent: "text-orange-200",
  },
  {
    id: "moonlit-manor",
    title: "The Moonlit Manor",
    type: "Concept art",
    updated: "Edited yesterday",
    icon: "🏚️",
    background: "from-indigo-950 via-violet-900 to-fuchsia-950",
    accent: "text-violet-200",
  },
  {
    id: "night-creatures",
    title: "Little Night Creatures",
    type: "Character design",
    updated: "Edited Oct 19",
    icon: "👻",
    background: "from-emerald-950 via-teal-800 to-indigo-950",
    accent: "text-teal-200",
  },
];

const navigation = [
  { label: "Dashboard", icon: "◫", active: true },
  { label: "My artwork", icon: "▧", active: false },
  { label: "Explore", icon: "⌕", active: false },
  { label: "Community", icon: "♧", active: false },
];

function SparkleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="m12 2 1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" fill="currentColor" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#100d18] text-[#f7f2f8]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-[250px] shrink-0 flex-col border-r border-white/[0.07] bg-[#15111f] px-5 py-7 lg:flex">
          <Link href="/dashboard" className="mb-12 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff7139] text-xl shadow-lg shadow-orange-950/40">✦</span>
            <span className="text-[17px] font-semibold tracking-tight">Canvas<span className="text-[#ff8a50]">Club</span></span>
          </Link>

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#81788d]">Workspace</p>
          <nav aria-label="Main navigation" className="space-y-1">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.label === "Dashboard" ? "/dashboard" : "#"}
                aria-current={item.active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-medium transition ${
                  item.active
                    ? "bg-[#ff7139]/12 text-[#ff9b70]"
                    : "text-[#a39bab] hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span className="w-5 text-center text-lg leading-none">{item.icon}</span>
                {item.label}
                {item.label === "Community" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />}
              </a>
            ))}
          </nav>

          <div className="mt-auto">
            <div className="mb-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#282039] to-[#1b1725] p-4">
              <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff7139]/15 text-[#ff9b70]">
                <SparkleIcon />
              </span>
              <p className="text-sm font-semibold">Make a little magic</p>
              <p className="mt-1.5 text-xs leading-5 text-[#a39bab]">Your next favorite piece is one idea away.</p>
              <a href="#new-artwork" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#ff9b70]">
                Start creating <ArrowIcon />
              </a>
            </div>
            <a href="#profile" className="flex items-center gap-3 rounded-xl p-2 hover:bg-white/[0.04]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#392c49] text-sm font-semibold text-[#e7c7ff]">M</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold">Maya Chen</span>
                <span className="mt-0.5 block text-[11px] text-[#8d8499]">Free account</span>
              </span>
              <span aria-hidden="true" className="text-[#8d8499]">···</span>
            </a>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-5 pb-12 pt-6 sm:px-8 lg:px-12 lg:pt-9">
          <header className="mb-10 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2.5 lg:hidden">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff7139] text-lg">✦</span>
              <span className="text-sm font-semibold">Canvas<span className="text-[#ff8a50]">Club</span></span>
            </Link>
            <div className="ml-6 hidden items-center gap-2 text-xs text-[#938a9d] sm:flex">
              <span className="text-[#c1b9c9]">Workspace</span>
              <span>/</span>
              <span>Dashboard</span>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button type="button" aria-label="Notifications" className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] text-[#c4bdca] transition hover:bg-white/[0.05]">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
                  <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-[#ff7139]" />
              </button>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#60435c] bg-[#35263d] text-sm font-semibold text-[#f0c9ef]">M</span>
            </div>
          </header>

          <section className="mb-9">
            <p className="mb-2 text-sm font-medium text-[#ff9b70]">Friday, October 23, 2026 <span aria-hidden="true">✦</span></p>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-[38px]">Good evening, Maya <span aria-hidden="true">🌙</span></h1>
                <p className="mt-2 text-sm text-[#a59cab]">The night is young. What will you create?</p>
              </div>
              <a id="new-artwork" href="#new-artwork" className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl bg-[#ff7139] px-4 text-sm font-semibold text-[#24130d] shadow-lg shadow-orange-950/30 transition hover:bg-[#ff8959] sm:self-auto">
                <PlusIcon /> New artwork
              </a>
            </div>
          </section>

          <section aria-labelledby="featured-title" className="relative mb-10 overflow-hidden rounded-[26px] border border-[#63412d]/50 bg-[#211823]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_44%,rgba(255,111,48,0.23),transparent_37%),radial-gradient(ellipse_at_97%_15%,rgba(138,82,189,0.2),transparent_33%)]" />
            <div aria-hidden="true" className="absolute right-[3%] top-1/2 hidden -translate-y-1/2 text-[150px] leading-none opacity-90 drop-shadow-[0_18px_35px_rgba(0,0,0,0.4)] sm:block lg:right-[5%] lg:text-[180px]">🎃</div>
            <div className="relative max-w-[550px] px-6 py-8 sm:px-9 sm:py-10 lg:px-11 lg:py-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#ff9b70]/25 bg-[#ff7139]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ffb18f]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff8b51]" /> October creative prompt
              </span>
              <h2 id="featured-title" className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-[40px]">A little spooky.<br />A lot of imagination.</h2>
              <p className="mt-3 max-w-[340px] text-sm leading-6 text-[#c0b5c4]">Dream up a scene from the witching hour and share it with the community.</p>
              <a href="#explore" className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-[#f6eee8] px-4 text-xs font-semibold text-[#2a1a1c] transition hover:bg-white">
                Explore the prompt <ArrowIcon />
              </a>
              <div aria-hidden="true" className="absolute bottom-5 right-6 text-xl text-[#ffac64] opacity-50 sm:right-12">✦</div>
            </div>
          </section>

          <section aria-labelledby="projects-title">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 id="projects-title" className="text-lg font-semibold tracking-tight">Pick up where you left off</h2>
                <p className="mt-1 text-xs text-[#948b9b]">Your recent creative spells</p>
              </div>
              <a href="#all-artwork" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff9b70] transition hover:text-[#ffc0a6]">
                View all <ArrowIcon />
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <Link key={project.title} href={`/dashboard/${project.id}`} className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#191521] transition hover:-translate-y-1 hover:border-white/[0.16] hover:bg-[#1d1927]">
                  <div className={`relative flex h-[185px] items-center justify-center overflow-hidden bg-gradient-to-br ${project.background}`}>
                    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_110%,rgba(255,255,255,0.15),transparent_54%)]" />
                    <span aria-hidden="true" className={`relative text-[84px] leading-none drop-shadow-[0_12px_16px_rgba(0,0,0,0.32)] transition duration-300 group-hover:scale-110 ${project.accent}`}>{project.icon}</span>
                    <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">•••</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold">{project.title}</h3>
                        <p className="mt-1 text-xs text-[#938b9b]">{project.type}</p>
                      </div>
                      <span aria-hidden="true" className="mt-0.5 text-[#83798c] transition group-hover:translate-x-0.5 group-hover:text-[#ff9b70]">↗</span>
                    </div>
                    <p className="mt-4 border-t border-white/[0.07] pt-3 text-[11px] text-[#817889]">{project.updated}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <footer className="mt-10 flex items-center justify-between border-t border-white/[0.07] pt-5 text-[11px] text-[#726a7b]">
            <span>Made for curious minds <span aria-hidden="true" className="text-[#ff8a50]">✦</span></span>
            <a href="#help" className="transition hover:text-[#c9c0d0]">Need a hand?</a>
          </footer>
        </main>
      </div>
    </div>
  );
}
