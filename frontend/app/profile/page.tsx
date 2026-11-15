'use client';
import Navbar from '@/app/components/navbar';
import Image from 'next/image';
import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { Store, User, CheckCircle2, Info, Save, SlidersHorizontal, LogOut } from 'lucide-react';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const getLanguage = (): 'EN' | 'TH' =>
  localStorage.getItem('language') === 'TH' ? 'TH' : 'EN';

const subscribeToLanguage = (onChange: () => void) => {
  window.addEventListener('storage', onChange);
  window.addEventListener('languagechange', onChange);

  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener('languagechange', onChange);
  };
};

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Completed');
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguage,
    () => 'EN'
  );
  const [currency, setCurrency] = useState('THB');
  const [currencySymbol, setCurrencySymbol] = useState('฿');
  const [username, setUsername] = useState('Alex Chen');
  const [stallAlias, setStallAlias] = useState('alexchen');
  const [email, setEmail] = useState('alex.chen@artmarket.io');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isInfoToast, setIsInfoToast] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  async function handleChange(){
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      try{
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/users/display-name', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`},
        body: JSON.stringify({
          uid: user.uid,
          displayName: stallAlias,
        })
      });
      console.log('Profile updated:', response);
    } catch (error) {
      console.error('Error updating profile:', error);
    }}
   
  }

  async function saveDisplayName() {
    const user = auth.currentUser;
    const displayName = stallAlias.trim();

    if (!user || !displayName) {
      throw new Error('Display name is required');
    }

    const token = await user.getIdToken();
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/users/display-name', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ uid: user.uid, displayName }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update display name: ${response.status}`);
    }

    await updateProfile(user, { displayName });
    setStallAlias(displayName);
    setUsername(displayName);
  }

  function handleLanguageChange(lang: 'EN' | 'TH') {
    localStorage.setItem('language', lang);
    window.dispatchEvent(new Event('languagechange'));
  }

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCurrency(val);
    const symbols: Record<string, string> = { THB: '฿', USD: '$', EUR: '€', JPY: '¥' };
    setCurrencySymbol(symbols[val] || '฿');
    localStorage.setItem('Currency', currency.toString());
  };

  const handleSave = async () => {
    try {
      await saveDisplayName();
      setToastMessage(language === 'EN' ? 'Changes saved successfully!' : 'บันทึกการเปลี่ยนแปลงสำเร็จแล้ว!');
      setIsInfoToast(false);
    } catch (error) {
      console.error('Error updating display name:', error);
      setToastMessage(language === 'EN' ? 'Could not save display name.' : 'ไม่สามารถบันทึกชื่อที่แสดงได้');
      setIsInfoToast(true);
    }
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 3000);
  };

  const notifyFieldCannotChange = () => {
    setToastMessage(language === 'EN' ? 'Username and email cannot be changed.' : 'ไม่สามารถเปลี่ยนชื่อผู้ใช้และอีเมลได้');
    setIsInfoToast(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  async function fetchUserDisplayName(uid: string,token:string) {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/backend/users/profile/${uid}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch display name: ${response.status}`);
      }

      const data: { displayName?: string } = await response.json();
      return data.displayName;
    }catch(err){
      console.error('Error fetching display name:', err);
    }
  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        const backendDisplayName = await fetchUserDisplayName(user.uid, idToken);
        const displayName = backendDisplayName || user.displayName || user.email?.split('@')[0] || '';
        setUsername(displayName);
        setStallAlias(displayName);
        setEmail(user.email || '');
        setProfileImage(user.photoURL || null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div className="relative isolate min-h-screen flex flex-col bg-[#f7f8fc] text-[#0B0F4F] font-sans antialiased">
      <div role="status" className={`fixed bottom-4 left-3 right-3 z-50 flex items-center gap-3 rounded-2xl border border-[#0B0F4F]/80 bg-[#0B0F4F] px-4 py-3 text-white shadow-2xl transition-all duration-300 sm:bottom-5 sm:left-5 sm:right-auto sm:px-5 sm:py-3.5 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        {isInfoToast ? <Info className="h-5 w-5 text-sky-300" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
        <span className="text-sm font-semibold" suppressHydrationWarning>
          {toastMessage}
        </span>
      </div>

      <Navbar/>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 top-[82px] z-0 overflow-hidden">
        <div className="absolute -left-40 top-[4%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(240,98,192,0.22)_0%,rgba(240,98,192,0.1)_42%,transparent_72%)] blur-3xl" />
        <div className="absolute -right-36 top-[30%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.2)_0%,rgba(124,92,255,0.09)_46%,transparent_74%)] blur-3xl" />
        <div className="absolute left-[28%] top-[62%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,178,76,0.2)_0%,rgba(255,178,76,0.09)_46%,transparent_74%)] blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto mt-10 w-full max-w-4xl min-w-0 flex-1 overflow-x-clip px-3 py-6 sm:px-4 sm:py-8">
         <h1 className="mb-5 break-words text-2xl font-extrabold tracking-tight text-[#0B0F4F] sm:mb-6 sm:text-3xl">
        {(language === 'EN' ? 'User Profile' : 'โปรไฟล์ผู้ใช้')}
      </h1>
        <div className="min-w-0 space-y-4 sm:space-y-6">
          <div className="min-w-0 rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm sm:p-6 md:p-8">
            <div className="flex min-w-0 flex-col items-start gap-4 rounded-2xl border border-[#7C5CFF]/15 bg-gradient-to-r from-[#7C5CFF]/5 to-[#7C5CFF]/[0.02] p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#7C5CFF]/25 bg-[#7C5CFF]/15 text-2xl font-bold text-[#7C5CFF] sm:h-20 sm:w-20">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={`${username}'s profile`}
                  width={80}
                  height={80}
                  unoptimized
                  onError={() => setProfileImage(null)}
                  className="h-full w-full object-cover"
                />
              ) : (
                'AC'
              )}
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="break-words text-xl font-bold text-[#0B0F4F]">{username}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#7C5CFF]/10 text-[#7C5CFF] border border-[#7C5CFF]/20">@{stallAlias}</span>
              </div>
              <p className="break-all text-sm font-medium text-slate-500">{email}</p>
              <div className="mt-2 flex max-w-full items-start gap-2 break-words rounded-full border border-[#7C5CFF]/15 bg-[#7C5CFF]/5 px-3 py-1 text-xs font-medium text-[#7C5CFF] sm:w-fit sm:items-center">
                <span className="w-2 h-2 rounded-full bg-[#7C5CFF] animate-pulse"></span>
                { (language === 'EN' ? 'Active Host: MFU Night Market (MON 14)' : 'เจ้าของร้านที่กำลังใช้งาน: MFU Night Market (จันทร์ที่ 14)')}
              </div>
            </div>
            </div>
          </div>

          <div className="min-w-0 space-y-5 rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm sm:p-6 md:p-8">
            <div className="border-b border-slate-100 pb-3"><h3 className="text-lg font-bold text-[#0B0F4F]">{ (language === 'EN' ? 'Personal information' : 'ข้อมูลส่วนตัว')}</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{language === 'EN' ? 'Username' : 'ชื่อผู้ใช้'}</label>
                <input type="text" value={username} readOnly onClick={notifyFieldCannotChange} className="min-h-11 w-full min-w-0 cursor-pointer rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{language === 'EN' ? 'Display Name' : 'ชื่อที่แสดง'}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">@</span>
                  <input type="text" value={stallAlias} onChange={(e) => setStallAlias(e.target.value)} className="min-h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 py-3 pl-8 pr-4 text-sm font-medium text-[#0B0F4F] outline-none focus:border-[#7C5CFF] focus:bg-white" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</label>
                <input type="email" value={email} readOnly onClick={notifyFieldCannotChange} className="min-h-11 w-full min-w-0 cursor-pointer rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-500 outline-none" />
              </div>
            </div>

          <div className="border-t border-slate-100 pt-6 space-y-6">
            <div className="flex flex-col items-start justify-between gap-3 border-b border-slate-200/60 pb-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#7C5CFF]/10 text-[#7C5CFF] rounded-lg"><SlidersHorizontal className="w-4 h-4" /></div>
                <h3 className="break-words text-base font-bold text-[#0B0F4F]">{language === 'EN' ? 'App Preferences & Language' : 'การตั้งค่าแอปและภาษา'}</h3>
              </div>
              <span className="flex min-h-9 items-center gap-1.5 rounded-full border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-3 py-1 text-xs font-medium text-[#7C5CFF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFF]"></span>{language === 'EN' ? 'Auto-saved' : 'บันทึกอัตโนมัติ'}
              </span>
            </div>
            <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{language === 'EN' ? 'Display Language' : 'ภาษาที่แสดงผล'}</label>
                <div className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm sm:flex-row">
                  <button type="button" aria-pressed={language === 'EN'} onClick={() => handleLanguageChange('EN')} className={`min-h-11 flex-1 rounded-lg px-3 py-2 text-xs font-bold ${language === 'EN' ? 'bg-[#7C5CFF] text-white' : 'text-slate-500'}`}>✓ English (EN)</button>
                  <button type="button" aria-pressed={language === 'TH'} onClick={() => handleLanguageChange('TH')} className={`min-h-11 flex-1 rounded-lg px-3 py-2 text-xs font-bold ${language === 'TH' ? 'bg-[#7C5CFF] text-white' : 'text-slate-500'}`}>ภาษาไทย (TH)</button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{language === 'EN' ? 'Currency Configuration' : 'การตั้งค่าสกุลเงิน'}</label>
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <select value={currency} onChange={handleCurrencyChange} className="min-h-11 w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none cursor-pointer shadow-sm">
                      <option value="THB">฿ {language === 'EN' ? 'Thai Baht' : 'บาทไทย'} (THB)</option>
                      <option value="USD">$ {language === 'EN' ? 'US Dollar' : 'ดอลลาร์สหรัฐ'} (USD)</option>
                      <option value="EUR">€ {language === 'EN' ? 'Euro' : 'ยูโร'} (EUR)</option>
                      <option value="JPY">¥ {language === 'EN' ? 'Japanese Yen' : 'เยนญี่ปุ่น'} (JPY)</option>
                    </select>
                  </div>
                  <div className="rounded-xl border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-4 py-2 text-center sm:min-w-[100px] sm:py-1.5">
                    <div className="text-[10px] font-bold text-[#7C5CFF] uppercase">{language === 'EN' ? 'Preview:' : 'ตัวอย่าง:'}</div>
                    <div className="text-xs font-black text-[#7C5CFF]">{currencySymbol}150.00</div>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-slate-400 mt-1">{language === 'EN' ? 'Acts as display suffix/prefix across terminal and receipts.' : 'ใช้เป็นสัญลักษณ์นำหน้าหรือต่อท้ายในระบบและใบเสร็จ'}</p>
              </div>
            </div>
          </div>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
            <button type="button" onClick={handleLogout} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 font-bold text-red-600 transition-colors hover:bg-red-100 sm:w-auto">
              <LogOut className="h-4 w-4" />
              {language === 'EN' ? 'Log Out' : 'ออกจากระบบ'}
            </button>
            <button type="button" onClick={handleSave} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#FFB24C] px-7 py-3 font-bold text-[#0B0F4F] shadow-lg transition-all hover:bg-[#F4A62F] sm:w-auto">
              <Save className="w-4 h-4" />{language === 'EN' ? 'Save Changes' : 'บันทึกการเปลี่ยนแปลง'}
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200/60 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs font-medium text-slate-400">
          © 2025 ConsignDesk POS • {language === 'EN' ? 'Artisanal Market System' : 'ระบบตลาดงานฝีมือ'}
        </div>
      </footer>
    </div>
  );
}