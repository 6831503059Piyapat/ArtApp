'use client';

import Link from 'next/link';
import {useState,useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import { usePathname,useRouter } from 'next/navigation';
import {signOut} from "firebase/auth";
import { auth } from '@/lib/firebase';
import { UserRound } from 'lucide-react';
export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname()
  ;
  const [DisplayName, setDisplayName] = useState<string>('');
  const [ProfileImage, setProfileImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
  if (user) {
    setDisplayName(user.displayName || '');
    setProfileImage(user.photoURL || null);
    // User is signed in, you can access user information here
    console.log("User is signed in:", user);}
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
         <div
  onClick={() => router.push('/profile')}
  className="flex items-center gap-2.5 cursor-pointer"
>
  <span className="text-[11px] font-semibold">
    {DisplayName}
  </span>
    <button onClick={()=> logout()} className="text-[11px] font-semibold text-red-500 hover:text-red-700 transition-colors">
      Logout
    </button>
  <div
    className="w-8 h-8 shrink-0 overflow-hidden rounded-full
      bg-gradient-to-tr from-primary via-creatory-pink
      to-creatory-orange flex items-center justify-center
      text-white shadow-sm"
  >
    {ProfileImage && !imageError ? (
      <img
        src={ProfileImage}
        alt="Profile"
        onError={() => setImageError(true)}
        className="h-full w-full object-cover"
      />
    ) : (
      <UserRound size={17} />
    )}
  </div>
</div>
        </div>
      </header>
  );
}


