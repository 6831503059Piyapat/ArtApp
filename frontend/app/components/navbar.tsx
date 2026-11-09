'use client';

import Link from 'next/link';
import {useState,useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import { usePathname,useRouter } from 'next/navigation';
import {signOut} from "firebase/auth";
import { auth } from '@/lib/firebase';
import { CircleHelp, LogOut, MessageCircle, UserRound, X } from 'lucide-react';
export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname()
  ;
  const [DisplayName, setDisplayName] = useState<string>('');
  const [ProfileImage, setProfileImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    if (user) {
      setDisplayName(user.displayName || '');
      setProfileImage(user.photoURL || null);
    // User is signed in, you can access user information here
    }
    else{
      router.replace('/auth/login');
    }
  });
  }, []);
  
async function logout() {
  try {
    await signOut(auth);

    // กลับไปหน้า Login
    window.location.href = "/auth/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
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
            <button
              type="button"
              onClick={() => setIsNavDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isNavDrawerOpen}
              className="group flex items-center gap-2 text-creatory-navy"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary via-creatory-pink to-creatory-orange text-white shadow-sm shadow-primary/30 transition-all duration-200 group-hover:shadow-[0_0_14px_rgba(124,92,255,0.65)] group-hover:brightness-110">
                <span className="material-symbols-outlined text-[17px]">storefront</span>
              </div>
              <span className="font-bold text-base tracking-tight transition-all duration-200 group-hover:drop-shadow-[0_0_8px_rgba(124,92,255,0.4)]">
                Consign<span className="text-primary">Desk</span>
              </span>
            </button>
            <nav className="hidden md:flex items-center gap-1 rounded-xl border border-primary/10 bg-creatory-lavender/70 py-0.5 px-0.5 w-fit">
              <Link href="/dashboard" className={linkClass('/dashboard')} aria-current={isActive('/dashboard') ? 'page' : undefined}>Dashboard</Link>
              <Link href="/SaleRun" className={linkClass('/SaleRun')} aria-current={isActive('/SaleRun') ? 'page' : undefined}>Sales Runs</Link>
              <Link href="/sales/OnGoing" scroll={true} className={linkClass('/sales/OnGoing')} aria-current={isActive('/sales/OnGoing') ? 'page' : undefined}>Ongoing</Link>
              <Link href="/sales/completed" className={linkClass('/sales/completed')} aria-current={isActive('/sales/completed') ? 'page' : undefined}>Completed</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-semibold">{DisplayName}</span>
            <div className="group relative">
              <button
                type="button"
                onClick={() => router.push('/profile')}
                aria-label="Go to user profile"
                aria-haspopup="true"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-creatory-lavender/70 focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr from-primary via-creatory-pink to-creatory-orange text-white shadow-sm"
                >
                  {ProfileImage && !imageError ? (
                    <img
                      src={ProfileImage}
                      alt=""
                      onError={() => setImageError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound size={17} />
                  )}
                </span>
              </button>
              <div className="invisible absolute right-0 top-full z-50 mt-2 w-36 translate-y-1 rounded-xl border border-creatory-border bg-white p-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-creatory-navy transition-colors hover:bg-creatory-lavender/70"
                >
                  <UserRound className="h-4 w-4" />
                  User Profile
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
        {isNavDrawerOpen && (
          <div className="fixed inset-0 z-[60]">
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setIsNavDrawerOpen(false)}
              className="absolute inset-0 h-full w-full bg-[#0B0F4F]/30 backdrop-blur-[2px]"
            />
            <aside
              aria-label="Main navigation"
              className="absolute left-0 top-0 flex h-full w-[min(280px,85vw)] flex-col border-r border-creatory-border bg-white shadow-2xl animate-in slide-in-from-left duration-200"
            >
              <div className="flex h-14 items-center justify-between border-b border-creatory-border px-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary via-creatory-pink to-creatory-orange text-white shadow-sm shadow-primary/30">
                    <span className="material-symbols-outlined text-[17px]">storefront</span>
                  </div>
                  <span className="font-bold text-base tracking-tight text-creatory-navy">
                    Consign<span className="text-primary">Desk</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNavDrawerOpen(false)}
                  aria-label="Close navigation menu"
                  className="rounded-lg p-2 text-creatory-gray transition-colors hover:bg-creatory-lavender/70 hover:text-creatory-navy"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-3">
                <Link href="/dashboard" onClick={() => setIsNavDrawerOpen(false)} className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive('/dashboard') ? 'bg-creatory-lavender text-primary' : 'text-creatory-gray hover:bg-creatory-lavender/70 hover:text-creatory-navy'}`}>Dashboard</Link>
                <Link href="/SaleRun" onClick={() => setIsNavDrawerOpen(false)} className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive('/SaleRun') ? 'bg-creatory-lavender text-primary' : 'text-creatory-gray hover:bg-creatory-lavender/70 hover:text-creatory-navy'}`}>Sales Runs</Link>
                <Link href="/sales/OnGoing" scroll={true} onClick={() => setIsNavDrawerOpen(false)} className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive('/sales/OnGoing') ? 'bg-creatory-lavender text-primary' : 'text-creatory-gray hover:bg-creatory-lavender/70 hover:text-creatory-navy'}`}>Ongoing</Link>
                <Link href="/sales/completed" onClick={() => setIsNavDrawerOpen(false)} className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive('/sales/completed') ? 'bg-creatory-lavender text-primary' : 'text-creatory-gray hover:bg-creatory-lavender/70 hover:text-creatory-navy'}`}>Completed</Link>
              </nav>
              <div className="mt-auto border-t border-creatory-border p-3">
                <div className="flex flex-col gap-1">
                  <Link
                    href="/profile"
                    onClick={() => setIsNavDrawerOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-creatory-navy transition-colors hover:bg-creatory-lavender/70"
                  >
                    <UserRound className="h-4 w-4" />
                    User Profile
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 px-4 pt-3 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="h-3.5 w-3.5" />
                    Contact Us
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CircleHelp className="h-3.5 w-3.5" />
                    Help
                  </span>
                </div>
              </div>
            </aside>
          </div>
        )}
        </header>
  );
}
