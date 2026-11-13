"use client";
import Navbar from '@/app/components/navbar';
import Link from "next/link";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Footer from "@/app/components/footer";
import { useState, type FormEvent,useEffect } from "react";
import {
  CalendarDays,
  Check,
  ChevronRight,
  FileDown,
  Lightbulb,
  MapPin,
  Plus,
  Receipt,
  Rocket,
  Store,
  Trash2,
  UserRound,
  UsersRound,
} from "lucide-react";  

type Product = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  owner :string;
};

type SupplierSection = {
  id: string;
  name: string;
  role: string;
  accent: "purple" | "pink" | "orange";
  placeholder: string;
  products: Product[];
};

type Expense = {
  id: number;
  name: string;
  category: string;
  amount: number;
};

const initialSections: SupplierSection[] = [
  {
    id: "host-8466468345",
    name: "My Products",
    role: "Host's inventory",
    accent: "purple",
    placeholder: "Item Name (e.g. Linen Coaster Set)",
    products: [
      
    ],
  },
  
];

const initialExpenses: Expense[] = [
  // { id: 1, name: "Weekend Market Stall Rent", category: "Booth Fee", amount: 700 },
  // { id: 2, name: "Ice bucket, string bags & packaging tape", category: "Stall Supplies", amount: 150 },
];

const accentStyles = {
  purple: {
    dot: "bg-[#7957ff]",
    badge: "bg-[#f2edff] text-[#7957ff]",
    number: "bg-[#7957ff]",
  },
  pink: {
    dot: "bg-[#ed62bd]",
    badge: "bg-[#fff0f8] text-[#d94aa5]",
    number: "bg-[#ed62bd]",
  },
  orange: {
    dot: "bg-[#ffad45]",
    badge: "bg-[#fff4e6] text-[#e89125]",
    number: "bg-[#ffad45]",
  },
};

const inputClass ="min-h-11 min-w-0 rounded-lg border bg-white px-2.5 py-2 text-sm text-[#111747] outline-none transition placeholder:text-[#8b90a2] sm:min-h-0";
const inputClass2 = 'border-[#e7e9f1] focus:border-[#a28aff] focus:ring-2 focus:ring-[#7957ff]/10';

function getTodayDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function getLocalDateTime() {
    const date = new Date();

    const pad = (num: number) => String(num).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
export default function CreateSalesRun() {
  //token 
  const [token, setToken] = useState<string | null>(null);
  // State for manage sections and expenses
  const [language, setLanguage] = useState<'EN' | 'TH'>('EN');

  const [sections, setSections] = useState<SupplierSection[]>(initialSections);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  // State for run name and Form for send to backend
  const [runName, setRunName] = useState<string>("");
  const [runDate, setRunDate] = useState<string>(getTodayDate()); // Default to today's date
  const [runLocation, setRunLocation] = useState<string>("");
  const [ownerProducts, setOwnerProducts] = useState<Product[]>();
  //State for manage blank and error form
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [runNameError, setRunNameError] = useState<boolean>(false);
  const [runDateError, setRunDateError] = useState<boolean>(false);
  const [runLocationError, setRunLocationError] = useState<boolean>(false);

  //
  const [newSupplierName, setNewSupplierName] = useState("");
  const [supplierFormOpen, setSupplierFormOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({ name: "", category: "Booth Fee", amount: "" });
  const [launched, setLaunched] = useState(false);

  const updateSection = (sectionId: string, update: (section: SupplierSection) => SupplierSection) => {
    setSections((current) => current.map((section) => section.id === sectionId ? update(section) : section));
  };

  //Not real Function for send to backend, just for test
  async function hamdleSubmit(){
   
    if(!runName ){
      if(!runName) setRunNameError(true);
      if (runName) setRunNameError(false);
      // if(!runDate) setRunDateError(true);
      // if (runDate) setRunDateError(false);
      // if(!runLocation) setRunLocationError(true);
      // if (runLocation) setRunLocationError(false);
      setError("Please fill in all required fields");
      return;
    }
     const Response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/backend/sale-runs/create",{
      method: "POST",
      headers: {"Content-Type": "application/json",
        "Authorization": `Bearer ${token}`

      },
      body: JSON.stringify({
        runName: runName,
        runDate: getLocalDateTime(),
        runLocation: runLocation,
        runOwnerId:getAuth().currentUser?.uid,
        runOwnerName:getAuth().currentUser?.displayName,
        runSections: sections,
        runExpenses: expenses
      })
    })
    console.log(Response.text());
    // const saleList = 
    // [{
    //   accent: "purple",
    //   id: "host-8466468345",
    //   name: "My Products",
    //   placeholder: "Item Name (e.g. Linen Coaster Set)",
    //   products: [
    //     {
    //       id: 1791050351463,
    //       name: "Linen Coaster Set",
    //       owner :'',
    //       price:100,
    //       quantity:85
    //     }
    //   ],
    //   role:'Host'
    // }];
    // const expenseLog = [{
    //   amount:120,
    //   category:""
    // }]

    
    setRunNameError(false);
    setRunDateError(false);
    setRunLocationError(false);
    setLaunched(true);
    //Data to send to API backend
    //Setions is the data supplier and Owner Products for send to backend 
    console.log(sections);
    //Expenses is the data for send to backend
    console.log(expenses);
    console.log("Run Name:", runName);
    console.log("Run Date:", runDate);
    console.log("Run Location:", runLocation);
  }

  const addSupplier = () => {
    const name = newSupplierName.trim();
    if (!name) return;
    setSections((current) => [
      ...current,
      {
        id: `supplier-${Date.now()}`,
        name,
        role: "Supplier",
        accent: "pink",
        placeholder: "Item Name",
        products: [],
      },
    ]);
    setNewSupplierName("");
    setSupplierFormOpen(false);
  };

  const addExpense = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = Number(newExpense.amount);
    if (!newExpense.name.trim() || !Number.isFinite(amount) || amount <= 0) return;
    setExpenses((current) => [...current, {
      id: Date.now(),
      name: newExpense.name.trim(),
      category: newExpense.category,
      amount,
    }]);
    setNewExpense({ name: "", category: "Booth Fee", amount: "" });
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  useEffect(() => {
    console.log(getLocalDateTime());
    const auth = getAuth();
  setLanguage(localStorage.getItem('language') === 'EN' ? 'EN' : 'TH');
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if(user){
    const emailName = user?.email?.split('@')[0];
    const idToken = await user?.getIdToken();
    setToken(idToken ?? null);
    }
    
  })
  return unsubscribe;
},[]);
  return (
    <div className="min-h-screen bg-[#f7f8fc] pb-32 font-sans text-[#111747] sm:pb-20">
      
      
      <Navbar />
      
      <main className="mx-auto w-full max-w-[1280px] px-3 pt-[72px] sm:px-6 sm:pt-[84px] md:w-[85%] lg:px-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#111747]">{language === 'EN' ? 'Create Sales Run' : 'สร้างรายการขาย'}</h1>
          <span className="rounded-full border border-[#ded3ff] bg-[#f1edff] px-3 py-1.5 text-sm font-semibold text-[#7957ff]">
             {language === 'EN' ? 'Step by step' : 'ขั้นตอนโดยขั้นตอน'}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 items-start gap-3 sm:grid-cols-[170px_minmax(0,1fr)]">
          <aside className="mb-6 flex flex-col gap-2 sm:mb-0 sm:sticky sm:top-[54px] sm:gap-0 sm:space-y-2">
            <div className="mx-auto min-w-0 w-[92%] rounded-xl border border-[#e6e9f2] bg-white p-3 shadow-[0_2px_8px_rgba(17,23,71,0.025)] sm:mx-0 sm:w-auto sm:p-2">
              <h2 className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-[#858ba0]"> {language === 'EN' ? 'Catalog Index' : 'ดัชนีแคตตาล็อก'}</h2>
              <div className="flex flex-col gap-1 sm:block sm:space-y-0.5">
                <a href="#run-details" className="flex min-h-11 w-full items-center gap-1.5 rounded-lg border border-[#ded3ff] bg-[#f1edff] px-3 py-1.5 text-xs font-semibold text-[#111747] touch-manipulation sm:min-h-0 sm:px-1.5">
                  <Store className="h-2.5 w-2.5 text-[#7957ff]" />  {language === 'EN' ? 'Run Details' : 'รายละเอียด'}
                </a>
                {sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className="flex min-h-11 w-full items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-[#4c526a] touch-manipulation hover:bg-[#f7f5ff] sm:min-h-0 sm:px-1.5">
                    {section.id === "host"
                      ? <UserRound className="h-2.5 w-2.5 text-[#7957ff]" />
                      : <span className={`h-2 w-2 rounded-full ${accentStyles[section.accent].dot}`} />}
                    <span className="truncate">{section.name}{section.id === "host" ? " (Host)" : ""}</span>
                  </a>
                ))}
                {supplierFormOpen ? (
                  <form
                    className="flex w-full gap-1 pt-1"
                    onSubmit={(event) => {
                      event.preventDefault();
                      addSupplier();
                    }}
                  >
                    <input
                      autoFocus
                      required
                      value={newSupplierName}
                      onChange={(event) => setNewSupplierName(event.target.value)}
                      aria-label="New supplier name"
                      placeholder="Supplier name"
                      className={`${inputClass} ${inputClass2} flex-1`}
                    />
                    <button type="submit" aria-label="Add supplier" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#7957ff] text-white hover:bg-[#6642ed] sm:h-[26px] sm:w-[26px]">
                      <Plus className="h-3 w-3" />
                    </button>
                  </form>
                ) : (
                  <button type="button" onClick={() => setSupplierFormOpen(true)} className="mt-1 flex min-h-11 w-full items-center justify-center gap-1 rounded-lg border border-[#e4dcff] bg-[#f4f0ff] px-3 py-1.5 text-xs font-medium text-[#7957ff] touch-manipulation hover:bg-[#ebe4ff] sm:min-h-0 sm:px-2">
                    <UsersRound className="h-2.5 w-2.5" /> + {language === 'EN' ? 'Add Supplier' : 'เพิ่มซัพพลายเออร์'}
                  </button>
                )}
              </div>
              <div className="mt-1.5 border-t border-[#eff0f5] pt-1.5">
                <a href="#booth-expenses" className="flex min-h-11 w-full items-center justify-between rounded-lg bg-[#fff4ef] px-3 py-1.5 text-xs font-semibold text-[#111747] touch-manipulation sm:min-h-0 sm:px-1.5">
                  <span className="flex items-center gap-1.5"><Receipt className="h-2.5 w-2.5 text-[#f15a24]" /> {language === 'EN' ? 'Booth Expenses' : 'ค่าใช้จ่าย'}</span>
                  <ChevronRight className="h-2.5 w-2.5 text-[#858ba0]" />
                </a>
              </div>
            </div>

            <div className="mx-auto flex w-[92%] items-start gap-2 rounded-xl border border-[#e6e9f2] bg-white p-3 shadow-[0_2px_8px_rgba(17,23,71,0.025)] sm:mx-0 sm:w-auto sm:gap-1.5 sm:p-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#fff8e5] text-[#edae35]">
                <Lightbulb className="h-3 w-3" />
              </span>
              <div>
                <h3 className="text-xs font-bold">{language === 'EN' ? 'Quick Tip' : 'คำแนะนำ'}</h3>
                <p className="mt-0.5 text-xs leading-[1.45] text-[#858ba0]">{language === 'EN' ? 'Click supplier tab to jump directly to items. Click action button to register immediate sales.' : 'คลิกแท็บซัพพลายเออร์เพื่อไปยังรายการโดยตรง คลิกปุ่มดำเนินการเพื่อลงทะเบียนการขายทันที.'}</p>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-3">
            <section id="run-details" className="scroll-mt-16 overflow-hidden rounded-xl border border-[#d9ceff] bg-white shadow-[0_2px_8px_rgba(17,23,71,0.025)] sm:scroll-mt-0">
              <div className="h-[3px] bg-gradient-to-r from-[#7957ff] via-[#ed72bd] to-[#ffb84d]" />
              <div className="p-2.5">
                <h2 className="rounded-md bg-gradient-to-r from-[#ffdb9c] via-[#f5b4cc] to-[#efa2dc] px-3 py-1.5 text-lg font-extrabold leading-tight"> {language === 'EN' ? 'Run’s Information' : 'ข้อมูลรายการขาย'}</h2>
                <div className="mt-2.5 space-y-2.5">
                  <label className="block text-xs font-bold">
                     {language === 'EN' ? 'Run Name' : 'ชื่อรายการขาย'} <span className="text-[#f15a24]">*</span>
                    <span className="relative mt-1 block">
                      <Store className={`absolute left-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 ${runNameError ? 'text-[#f15a24]':' text-[#7957ff]'}`} />
                      <input required placeholder={language === 'EN' ? 'Enter run name Ex: MFU Outside Night Market (MON14)' : 'ป้อนชื่อรายการขาย Ex: MFU Outside Night Market (MON14)'} onChange={(e) => setRunName(e.target.value)} className={`${inputClass} ${runNameError ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' : `${inputClass2}`} w-full pl-6 font-semibold`} />
                    </span>
                  </label>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <label className="block text-xs font-bold">
                      {language === 'EN' ? 'Run Date' : 'วันที่รายการ'} / {language === 'EN' ? 'Period' : 'ระยะเวลา'}
                      <span className="relative mt-1 block">
                        <CalendarDays className={`absolute left-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 ${runDateError ? 'text-[#f15a24]' : 'text-[#858ba0]'}`} />
                        <input type="date" value={runDate} onChange={(e)=>setRunDate(e.target.value)} className={`${inputClass} ${runDateError ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' : `${inputClass2}`} w-full pl-6`} />
                      </span>
                    </label>
                    <label className="block text-xs font-bold">
                       {language === 'EN' ? 'Booth Location' : 'สถานที่'}
                      <span className="relative mt-1 block">
                        <MapPin className={`absolute left-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 ${runLocationError ? 'text-[#f15a24]' : 'text-[#858ba0]'}`} />
                        <input placeholder={language === 'EN' ? 'Mae Fah Luang University' : 'มหาวิทยาลัยแม่ฟ้าหลวง'} onChange={(e) => setRunLocation(e.target.value)} className={`${inputClass} ${runLocationError ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' : `${inputClass2}`} w-full pl-6`} />
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {sections.map((section, index) => (
              <ProductSection
                key={section.id}
                section={section}
                index={index + 1}
                onAdd={(product) => updateSection(section.id, (current) => ({
                  ...current,
                  products: [...current.products, { ...product, id: Date.now() }],
                }))}
                onRemove={(productId) => updateSection(section.id, (current) => ({
                  ...current,
                  products: current.products.filter((product) => product.id !== productId),
                }))}
                language={language}
              />
            ))}

            <section id="booth-expenses" className="scroll-mt-16 overflow-hidden rounded-xl border border-[#f5ded7] bg-[#fff5f1] sm:scroll-mt-0">
              <div className="flex flex-col items-start justify-between gap-2 px-3 py-3 sm:flex-row sm:items-center sm:px-2.5 sm:py-2">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-md bg-[#f15a24] text-white"><Receipt className="h-2.5 w-2.5" /></span>
                  <div>
                    <h2 className="text-base font-bold">{language === 'EN' ? 'Booth Expenses' : 'ค่าใช้จ่าย'}</h2>
                    <p className="text-xs text-[#858ba0]"> {language === 'EN' ? 'Shared expenses' : 'ค่าใช้จ่ายที่แบ่งปัน'}</p>
                  </div>
                </div>
                <span className="max-w-full rounded-full border border-[#ffd3c5] bg-[#ffe7dc] px-2 py-1 text-xs text-[#e34d1b]">
                  {language === 'EN' ? 'Total Overhead' : 'ค่าใช้จ่ายรวม'}: <strong className="ml-1">฿{totalExpenses.toLocaleString()}</strong>
                </span>
              </div>
              <div className="mx-2.5 overflow-x-auto rounded-lg border border-[#e7e9f1] bg-white">
                <table className="w-full min-w-[360px] text-left">
                  <thead className="bg-[#f7f8fc] text-xs font-bold uppercase text-[#111747]">
                    <tr>
                      <th className="px-2 py-1.5">{language === 'EN' ? 'Expense Item' : 'รายการค่าใช้จ่าย'}</th>
                      <th className="px-2 py-1.5">{language === 'EN' ? 'Category' : 'หมวดหมู่'}</th>
                      <th className="px-2 py-1.5 text-right">{language === 'EN' ? 'Cost (฿)' : 'ค่าใช้จ่าย (฿)'}</th>
                      <th className="w-8 px-2 py-1.5 text-center">{language === 'EN' ? 'Remove' : 'ลบ'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eff0f5]">
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="text-sm hover:bg-[#fffaf8]">
                        <td className="break-words px-2 py-2 font-medium">{expense.name}</td>
                        <td className="px-2 py-2 text-xs text-[#858ba0]">{expense.category}</td>
                        <td className="px-2 py-2 text-right font-semibold text-[#f15a24]">฿{expense.amount.toLocaleString()}</td>
                        <td className="px-2 py-2 text-center">
                          <button type="button" aria-label={`Remove ${expense.name}`} onClick={() => setExpenses((current) => current.filter((item) => item.id !== expense.id))} className="inline-flex h-11 w-11 touch-manipulation items-center justify-center text-[#a3a8b6] hover:text-[#e34d1b] sm:h-auto sm:w-auto">
                            <Trash2 className="inline h-2.5 w-2.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {expenses.length === 0 && (
                      <tr><td colSpan={4} className="px-2 py-3 text-center text-sm text-[#858ba0]"> {language === 'EN' ? 'No expenses added yet' : 'ยังไม่มีค่าใช้จ่ายที่เพิ่มเข้ามา'}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <form onSubmit={addExpense} className="m-2.5 flex flex-wrap gap-1.5 rounded-lg border border-[#f0e7e4] bg-white p-1.5">
                <input required value={newExpense.name} onChange={(event) => setNewExpense({ ...newExpense, name: event.target.value })} placeholder={language === 'EN' ? 'Expense description (e.g. Folding Table Rental)' : 'รายละเอียดค่าใช้จ่าย (เช่น ค่าเช่าโต๊ะพกพา)'} className={`${inputClass} ${inputClass2} flex-[2_1_130px]`} />
                <select value={newExpense.category} onChange={(event) => setNewExpense({ ...newExpense, category: event.target.value })} className={`${inputClass} ${inputClass2} flex-[1_1_75px]`}>
                  <option>{language === 'EN' ? 'Booth Fee' : 'ค่าเช่า Booth'}</option>
                  <option>{language === 'EN' ? 'Stall Supplies' : 'อุปกรณ์สต๊อก'}</option>
                  <option>{language === 'EN' ? 'Travel' : 'การเดินทาง'}</option>
                </select>
                <input required min="0.01" step="0.01" type="number" value={newExpense.amount} onChange={(event) => setNewExpense({ ...newExpense, amount: event.target.value })} placeholder={language === 'EN' ? 'Amount ฿' : 'จำนวน ฿'} className={`${inputClass} ${inputClass2} flex-[1_1_55px]`} />
                <button type="submit" className="flex min-h-11 flex-1 items-center justify-center gap-1 rounded-lg bg-[#f15a24] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#df4e1c] sm:min-h-0 sm:flex-none">
                  <Plus className="h-2.5 w-2.5" /> {language === 'EN' ? 'Add Expense' : 'เพิ่มค่าใช้จ่าย'}
                </button>
              </form>
            </section>
          </div>
        </div>
        
      </main>


      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-[#e9ebf3] bg-white shadow-[0_-3px_12px_rgba(17,23,71,0.04)]">
        
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-stretch justify-between gap-2 px-3 py-2 sm:min-h-[38px] sm:flex-row sm:items-center sm:gap-2 sm:px-[18px] sm:py-1.5 md:w-[85%]">
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-xs">
            <span className="flex shrink-0 items-center gap-1 font-semibold text-[#7957ff]">
              <Check className="h-2.5 w-2.5" /> {language === 'EN' ? 'All changes saved' : 'บันทึกการเปลี่ยนแปลงแล้ว'}
            </span>
            <span className="text-[#d5d7df]">•</span>
            <span className="hidden truncate text-[#858ba0] sm:inline">{language === 'EN' ? 'Ready for sales at MFU Outside Night Market' : 'พร้อมสำหรับการขายที่ตลาดกลางคืน MFU'}</span>
            {launched && <span role="status" className="truncate font-semibold text-[#159a68]">{language === 'EN' ? 'Run launched' : 'เริ่มต้นแล้ว'}</span>}
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" className="min-h-11 flex-1 rounded-lg border border-[#ffd5d5] bg-[#fff5f5] px-3 py-1.5 text-xs font-semibold text-[#e34d55] touch-manipulation hover:bg-[#ffebeb] sm:min-h-0 sm:flex-none sm:text-[10px]">{language === 'EN' ? 'Cancel' : 'ยกเลิก'}</button>
            <button type="button" onClick={() => hamdleSubmit()} className="flex min-h-11 flex-1 items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-[#ffb84d] to-[#ff9c22] px-3 py-2 text-xs font-bold text-[#111747] shadow-sm touch-manipulation hover:brightness-105 sm:min-h-0 sm:flex-none">
              <Rocket className="h-2.5 w-2.5" /> {launched ? language === 'EN' ? 'Launched' : 'เริ่มต้นแล้ว' : language === 'EN' ? 'Launch Run' : 'เริ่มต้นการขาย'}
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
}

function ProductSection({
  section,
  index,
  onAdd,
  onRemove,
  language
}: {
  section: SupplierSection;
  index: number;
  onAdd: (product: Omit<Product, "id">) => void;
  onRemove: (productId: number) => void;
  language: 'EN' | 'TH';
}) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const accent = accentStyles[section.accent];
  const [ownerP,setOwnerP] = useState<string>("");
  const addProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(price);
    if (!name.trim() || !Number.isFinite(parsedQuantity) || parsedQuantity <= 0 || !Number.isFinite(parsedPrice) || parsedPrice < 0) return;
    onAdd({ name: name.trim(), quantity: parsedQuantity, price: parsedPrice, owner: ownerP });
    setName("");
    setQuantity("");
    setPrice("");
  };

  return (
    <section id={section.id} className="scroll-mt-16 overflow-hidden rounded-xl border border-[#e6e9f2] bg-white shadow-[0_2px_8px_rgba(17,23,71,0.025)] sm:scroll-mt-0">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-3 sm:flex-nowrap sm:px-2.5 sm:py-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${accent.number}`}>{index}</span>
          <h2 className="truncate text-base font-extrabold">{section.name}</h2>
          <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-xs font-medium ${accent.badge}`}>{section.role}</span>
        </div>
        <button type="button" className="flex min-h-11 shrink-0 items-center gap-1 rounded-full border border-[#e7ddff] bg-[#f7f3ff] px-3 py-1.5 text-xs font-semibold text-[#7957ff] touch-manipulation hover:bg-[#eee7ff] sm:min-h-0 sm:px-2">
          <FileDown className="h-2 w-2" /> Import CSV
        </button>
      </div>
      <div className="mx-2.5 overflow-x-auto rounded-lg border border-[#e7e9f1]">
        <table className="w-full min-w-[360px] text-left">
          <thead className="bg-[#f7f8fc] text-xs font-bold uppercase text-[#111747]">
            <tr>
              <th className="px-2 py-1.5">{language === 'EN' ? 'Product Name' : 'ชื่อสินค้า'}</th>
              <th className="w-[13%] px-2 py-1.5 text-center">{language === 'EN' ? 'Qty' : 'จำนวน'}</th>
              <th className="w-[19%] px-2 py-1.5 text-right"> {language === 'EN' ? 'Price (฿)' : 'ราคา (฿)'}</th>
              <th className="w-[12%] px-2 py-1.5 text-center">{language === 'EN' ? 'Remove' : 'ลบ'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eff0f5]">
            {section.products.map((product) => (
              <tr key={product.id} className="text-sm hover:bg-[#fcfbff]">
                <td className="px-2 py-2">
                  <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                  <span className="break-words font-medium">{product.name}</span>
                </td>
                <td className="px-2 py-2 text-center">
                  <span className={`rounded px-1.5 py-0.5 text-xs font-bold ${accent.badge}`}>{product.quantity}</span>
                </td>
                <td className="px-2 py-2 text-right font-semibold">฿{product.price.toLocaleString()}</td>
                <td className="px-2 py-2 text-center">
                  <button type="button" aria-label={`Remove ${product.name}`} onClick={() => onRemove(product.id)} className="inline-flex h-11 w-11 touch-manipulation items-center justify-center text-[#a3a8b6] transition hover:text-[#e34d55] sm:h-auto sm:w-auto">
                    <Trash2 className="inline h-2.5 w-2.5" />
                  </button>
                </td>
              </tr>
            ))}
            {section.products.length === 0 && (
              <tr><td colSpan={4} className="px-2 py-3 text-center text-sm text-[#858ba0]"> {language === 'EN' ? 'Add some products to get started' : 'เพิ่มสินค้าเพื่อเริ่มต้น'}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <form onSubmit={addProduct} className="m-2.5 flex flex-wrap gap-1.5 rounded-lg border border-[#eff0f5] bg-[#fafbfe] p-1.5">
        <input required value={name} onChange={(event) => setName(event.target.value)} placeholder={language === 'EN' ? 'Item Name (e.g. Linen Coaster Set)' : 'ชื่อสินค้า (เช่น ชุดโต๊ะกินข้าว)'} className={`${inputClass} ${inputClass2} flex-[2_1_120px]`} />
        <input required min="1" step="1" type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder={language === 'EN' ? 'Qty' : 'จำนวน'} className={`${inputClass} ${inputClass2} flex-[1_1_42px]`} />
        <input required min="0" step="0.01" type="number" value={price} onChange={(event) => setPrice(event.target.value)} placeholder={language === 'EN' ? 'Price ฿' : 'ราคา (฿)'} className={`${inputClass} ${inputClass2} flex-[1_1_52px]`} />
        <input hidden value={section.id} onChange={(e)=>setOwnerP(e.target.value)}/>
        <button type="submit" className="flex min-h-11 flex-1 items-center justify-center gap-1 rounded-lg bg-[#7957ff] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#6642ed] sm:min-h-0 sm:flex-none">
          <Plus className="h-2.5 w-2.5" /> {language === 'EN' ? 'Add Product' : 'เพิ่มสินค้า'}
        </button>
      </form>
    </section>
  );
}
