import Link from 'next/link';

export default function Navbar() {


  return (
   <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-creatory-border shadow-[0_2px_12px_rgba(11,15,79,0.04)]">
        <div className="h-12 max-w-[1280px] mx-auto px-[22px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-creatory-navy hover:text-primary transition-colors group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary via-creatory-pink to-creatory-orange flex items-center justify-center text-white shadow-sm shadow-primary/30">
                <span className="material-symbols-outlined text-[17px]">storefront</span>
              </div>
              <span className="font-bold text-base tracking-tight">
                Consign<span className="text-primary">Desk</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-0.5 rounded-xl border border-primary/10 bg-creatory-lavender/70 p-0.5">
              <Link href="#" className="px-3 py-1.5 rounded-lg text-[10px] font-medium text-creatory-gray hover:bg-white hover:text-creatory-navy transition-colors">Dashboard</Link>
              <Link href="#" className="px-3 py-1.5 rounded-lg text-[10px] font-medium text-creatory-gray hover:bg-white hover:text-creatory-navy transition-colors">Sales Runs</Link>
              <Link href="#" className="px-3 py-1.5 rounded-lg text-[10px] font-medium text-creatory-gray hover:bg-white hover:text-creatory-navy transition-colors">Ongoing</Link>
              <Link href="#" aria-current="page" className="px-3 py-1.5 text-[10px] transition-colors bg-white text-primary font-semibold rounded-lg shadow-sm">Completed</Link>
            </nav>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold">Alex Chen</span>
            <button aria-label="Alex Chen profile" className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary via-creatory-pink to-creatory-orange flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[15px]">person</span>
            </button>
          </div>
        </div>
      </header>
  );
}


