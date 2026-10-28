'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const linkClass = (href: string) =>
    `px-4.5 py-1 rounded-lg text-[10px] font-medium transition-colors ${
      isActive(href)
        ? 'bg-white text-primary font-semibold shadow-sm'
        : 'text-creatory-gray hover:bg-white hover:text-creatory-navy'
    }`;

  return (
   <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-creatory-border shadow-[0_2px_12px_rgba(11,15,79,0.04)]">
        <div className="h-12.5 max-w-[1280px] mx-auto px-[22px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-creatory-navy hover:text-primary transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary via-creatory-pink to-creatory-orange flex items-center justify-center text-white shadow-sm shadow-primary/30">
                <span className="material-symbols-outlined text-[17px]">storefront</span>
              </div>
              <span className="font-bold text-base tracking-tight">
                Consign<span className="text-primary">Desk</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1 rounded-xl border border-primary/10 bg-creatory-lavender/70 py-0.5 px-0.5 w-fit">
              <Link href="/dashboard" className={linkClass('/dashboard')} aria-current={isActive('/dashboard') ? 'page' : undefined}>Dashboard</Link>
              <Link href="/SaleRun" className={linkClass('/SaleRun')} aria-current={isActive('/SaleRun') ? 'page' : undefined}>Sales Runs</Link>
              <Link href="/sales/OnGoing" scroll={true} className={linkClass('/sales/OnGoing')} aria-current={isActive('/sales/OnGoing') ? 'page' : undefined}>Ongoing</Link>
              <Link href="/sales/completed" className={linkClass('/sales/completed')} aria-current={isActive('/sales/completed') ? 'page' : undefined}>Completed</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-semibold">Alex Chen</span>
            <button aria-label="Alex Chen profile" className="w-7.5 h-7.5 rounded-full bg-gradient-to-tr from-primary via-creatory-pink to-creatory-orange flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[5px]">person</span>
            </button>
          </div>
        </div>
      </header>
  );
}


