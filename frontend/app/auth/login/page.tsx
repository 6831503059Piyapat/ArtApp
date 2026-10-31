'use client';

import { useState, type FormEvent,useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AtSign, Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react';
import {auth, googleProvider} from '@/lib/firebase';
import {
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
type AuthTab = 'sign-in' | 'create-account';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AuthTab>('sign-in');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  const isCreatingAccount = activeTab === 'create-account';
 
const LoginWithGoogle = async () => {
  try {
    setIsLoading(true);
    setFormMessage('');

    const result = await signInWithPopup(auth, googleProvider);

    console.log('Google Login Success:', result.user.uid);
    console.log('Email:', result.user.email);

  } catch (error) {
    console.error('Google Login Error:', error);
    setFormMessage(
      error instanceof Error
        ? error.message
        : 'Google Login failed'
    );
  } finally {
    setIsLoading(false);
  }
};

  // ขั้นตอนต่อไป ทำfirebase email password register และ Login  จากนั้นทำ ตัวเช็คว่า register ไปแล้วรึยัง
  //(ต้องทำปุ่ม Logout ด้วย) และทำการเช็คว่า login แล้วรึยัง ถ้า login แล้วให้ไปหน้า dashboard
  //อย่าลืมเตือนทีมงานว่าให้ทำ landing page และ แปลภาษาหน้าเว็ปด้วย
  const handleSubmit = async  (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(isCreatingAccount){

    }
    setFormMessage('');
    setIsLoading(true);

    window.setTimeout(() => {
      setIsLoading(false);
      setFormMessage('Authentication is not connected yet. Connect an auth provider to continue.');
    }, 800);
  };



useEffect(() => {
  let cancelled = false;

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    console.log('Firebase user:', user);
    console.log('UID:', user?.uid);

    if (!user) {
      console.log('ยังไม่ได้ Login');
      return;
    }

    try {
      const token = await user.getIdToken();

      if (cancelled) return;

      const response = await fetch(
        'http://localhost:8081/api/protected-data',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(
          `API Error ${response.status}: ${message}`
        );
      }

      const data = await response.json();

      console.log('Backend response:', data);

      if (!cancelled) {
        router.replace('/dashboard');
      }
    } catch (error) {
      if (!cancelled) {
        console.error('Authentication/API Error:', error);
        setFormMessage(
          error instanceof Error
            ? error.message
            : 'Unable to verify account'
        );
      }
    }
  });

  return () => {
    cancelled = true;
    unsubscribe();
  };
}, [router]);


  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f8fc] px-4 py-8 text-[#0B0F4F]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[4%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(240,98,192,0.22)_0%,rgba(240,98,192,0.1)_42%,transparent_72%)] blur-3xl" />
        <div className="absolute right-[5%] top-[30%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.2)_0%,rgba(124,92,255,0.09)_46%,transparent_74%)] blur-3xl" />
        <div className="absolute bottom-[-10%] left-[28%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,178,76,0.2)_0%,rgba(255,178,76,0.09)_46%,transparent_74%)] blur-3xl" />
      </div>
      <section className="relative z-10 w-full max-w-[360px] rounded-3xl border border-[#e8e4f6] bg-white px-6 py-6 shadow-[0_18px_55px_rgba(124,92,255,0.12)] sm:px-6">
        <header className="mb-4 text-center">
          <div className={`relative mx-auto mb-3 flex h-[42px] w-[42px] items-center justify-center rounded-xl text-white shadow-sm ${isCreatingAccount ? 'bg-[linear-gradient(35deg,#7C5CFF_0%,#C45BE8_38%,#F062C0_100%)] shadow-[#7C5CFF]/30' : 'bg-gradient-to-tr from-primary via-creatory-pink to-creatory-orange shadow-primary/30'}`}>
            <span className="material-symbols-outlined text-[23px]">storefront</span>
          </div>
          <h1 className="font-sans text-lg font-bold tracking-tight text-[#0B0F4F]">
            Consign<span className="text-primary">Desk</span>
          </h1>
          <p className="mx-auto mt-1 max-w-[280px] text-xs leading-5 text-slate-500">
            Art booths and pop-up market consignment
          </p>
        </header>

        <div className="mb-4 grid grid-cols-2 rounded-xl border border-[#7C5CFF]/10 bg-[#7C5CFF]/5 p-1" role="tablist" aria-label="Account access">
          <button
            id="sign-in-tab"
            type="button"
            role="tab"
            aria-selected={!isCreatingAccount}
            aria-controls="auth-panel"
            onClick={() => setActiveTab('sign-in')}
            className={`rounded-lg px-3 py-1.5 text-[10px] font-extrabold transition ${
              !isCreatingAccount
                ? 'bg-white text-[#0B0F4F] shadow-sm'
                : 'text-slate-500 hover:text-[#0B0F4F]'
            }`}
          >
            Sign In
          </button>
          <button
            id="create-account-tab"
            type="button"
            role="tab"
            aria-selected={isCreatingAccount}
            aria-controls="auth-panel"
            onClick={() => setActiveTab('create-account')}
            className={`rounded-lg px-3 py-1.5 text-[10px] font-extrabold transition ${
              isCreatingAccount
                ? 'bg-white text-[#0B0F4F] shadow-sm'
                : 'text-slate-500 hover:text-[#0B0F4F]'
            }`}
          >
            Create Account
          </button>
        </div>

        <div
          id="auth-panel"
          role="tabpanel"
          aria-labelledby={isCreatingAccount ? 'create-account-tab' : 'sign-in-tab'}
        >
          <form onSubmit={handleSubmit} className="space-y-3">
            {isCreatingAccount && (
              <div>
                <label htmlFor="username" className="mb-1 block text-xs font-semibold text-[#0B0F4F]">
                  Username
                </label>
                <div className="relative">
                  <UserRound size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    required
                    placeholder="Your booth or artist name"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-xs text-[#0B0F4F] outline-none transition placeholder:text-slate-400 focus:border-[#7C5CFF]/60 focus:ring-4 focus:ring-[#7C5CFF]/10"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <label htmlFor="email" className="text-xs font-semibold text-[#0B0F4F]">
                  {isCreatingAccount ? 'Email' : 'Username or Email'}
                </label>
              </div>
              <div className="relative">
                <AtSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type={isCreatingAccount ? 'email' : 'text'}
                  autoComplete={isCreatingAccount ? 'email' : 'username'}
                  required
                  placeholder={isCreatingAccount ? 'you@example.com' : 'name@studio.art'}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-xs text-[#0B0F4F] outline-none transition placeholder:text-slate-400 focus:border-[#7C5CFF]/60 focus:ring-4 focus:ring-[#7C5CFF]/10"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-semibold text-[#0B0F4F]">
                  Password
                </label>
                {!isCreatingAccount && (
                  <Link href="/forgot-password" className="text-xs font-bold text-[#7C5CFF] hover:text-[#6847E8]">
                    Forgot?
                  </Link>
                )}
              </div>
              <div className="relative">
                <LockKeyhole size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isCreatingAccount ? 'new-password' : 'current-password'}
                  minLength={isCreatingAccount ? 8 : undefined}
                  required
                  placeholder={isCreatingAccount ? 'At least 8 characters' : 'Enter your password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-11 text-xs text-[#0B0F4F] outline-none transition placeholder:text-slate-400 focus:border-[#7C5CFF]/60 focus:ring-4 focus:ring-[#7C5CFF]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#0B0F4F]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {!isCreatingAccount && (
              <div className="flex items-center pt-0.5">
                <label className="flex cursor-pointer items-center gap-2 text-[10px] font-medium text-slate-600">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded accent-[#7C5CFF] focus:ring-[#7C5CFF]"
                  />
                  Remember booth on this device
                </label>
              </div>
            )}

            <button
              type="button"
              onClick={() => router.replace('/dashboard')}
              disabled={isLoading}
              className="flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-[#FFB24C] px-4 text-xs font-bold text-[#0B0F4F] shadow-[0_4px_10px_rgba(255,178,76,0.25)] transition hover:bg-[#F4A62F] focus:outline-none focus:ring-4 focus:ring-[#FFB24C]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? (isCreatingAccount ? 'Creating account...' : 'Signing in...')
                : (isCreatingAccount ? 'Create Account' : 'Sign In')}
            </button>
            <p role="status" aria-live="polite" className="sr-only">
              {formMessage}
            </p>
          </form>

          <div className="my-3 flex items-center gap-2">
            <span className="h-px flex-1 bg-slate-100" />
            <span className="text-[9px] font-semibold tracking-wide text-slate-500">
              {isCreatingAccount ? 'OR SIGN UP WITH' : 'OR SIGN IN WITH'}
            </span>
            <span className="h-px flex-1 bg-slate-100" />
          </div>

          <button
            type="button"
            onClick={()=>LoginWithGoogle()}
            className="flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 text-xs font-bold text-[#0B0F4F] transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-[#7C5CFF]/10"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18A11 11 0 001 12c0 1.78.43 3.45 1.18 4.94l2.85-2.22z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continue with Google
          </button>
        </div>

        <footer className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-slate-100 pt-3 text-[9px] text-slate-400">
          <span>ConsignDesk Market v2.4</span>
          <nav className="flex items-center gap-2.5">
            <Link href="/privacy" className="hover:text-[#0B0F4F]">Privacy</Link>
            <span aria-hidden="true">•</span>
            <Link href="/help" className="hover:text-[#0B0F4F]">Help Desk</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
