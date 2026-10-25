"use client";
import Navbar from '@/app/components/navbar';
import Link from "next/link";
import { useState, type FormEvent ,Suspense} from "react";
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

const inputClass ="min-w-0 rounded-lg border  bg-white px-2 py-1.5 text-[8px] text-[#111747] outline-none transition  placeholder:text-[#8b90a2]";
const inputClass2 = 'border-[#e7e9f1] focus:border-[#a28aff] focus:ring-2 focus:ring-[#7957ff]/10';

export default function CreateSalesRun() {
  const [sections, setSections] = useState<SupplierSection[]>(initialSections);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  // State for run name and Form for send to backend
  const [runName, setRunName] = useState<string>("");
  const [runDate, setRunDate] = useState<string>("");
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
    // const Response = await fetch("http://localhost:3000/api/salesRun",{
    //   method: "POST",
    //   headers: {"Content-Type": "application/json"},
    //   body: JSON.stringify({
    //     runName: runName,
    //     runDate: runDate,
    //     runLocation: runLocation,
    //     ownerProduct: ownerProducts
    //   })
    // })
    if(!runName || !runDate || !runLocation ){
      if(!runName) setRunNameError(true);
      if (runName) setRunNameError(false);
      if(!runDate) setRunDateError(true);
      if (runDate) setRunDateError(false);
      if(!runLocation) setRunLocationError(true);
      if (runLocation) setRunLocationError(false);
      setError("Please fill in all required fields");
      return;
    }
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

  return (
    <div className="min-h-screen bg-[#f7f8fc] pb-20 font-sans text-[#111747]">
      
      
      <Suspense fallback={<div>Loading...</div>}>
       <Navbar />
      </Suspense>
      
      <main className="mx-auto max-w-[1280px] px-[18px] pt-5">
        

        <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-[147px_minmax(0,1fr)] mt-15 " >
          <aside className="space-y-2 sm:sticky sm:top-[54px]">
            <div className="rounded-xl border border-[#e6e9f2] bg-white p-2 shadow-[0_2px_8px_rgba(17,23,71,0.025)]">
              <h2 className="mb-1 px-1 text-[7px] font-bold uppercase tracking-wide text-[#858ba0]">Sections &amp; Inventory</h2>
              <div className="space-y-0.5">
                <a href="#run-details" className="flex items-center gap-1.5 rounded-lg border border-[#ded3ff] bg-[#f1edff] px-1.5 py-1.5 text-[8px] font-semibold text-[#111747]">
                  <Store className="h-2.5 w-2.5 text-[#7957ff]" /> Run Details
                </a>
                {sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className="flex items-center gap-1.5 rounded-lg px-1.5 py-1.5 text-[8px] text-[#4c526a] hover:bg-[#f7f5ff]">
                    {section.id === "host"
                      ? <UserRound className="h-2.5 w-2.5 text-[#7957ff]" />
                      : <span className={`h-2 w-2 rounded-full ${accentStyles[section.accent].dot}`} />}
                    <span className="truncate">{section.name}{section.id === "host" ? " (Host)" : ""}</span>
                  </a>
                ))}
                {supplierFormOpen ? (
                  <form
                    className="flex gap-1 pt-1"
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
                    <button type="submit" aria-label="Add supplier" className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg bg-[#7957ff] text-white hover:bg-[#6642ed]">
                      <Plus className="h-3 w-3" />
                    </button>
                  </form>
                ) : (
                  <button type="button" onClick={() => setSupplierFormOpen(true)} className="mt-1 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e4dcff] bg-[#f4f0ff] px-2 py-1.5 text-[8px] font-medium text-[#7957ff] hover:bg-[#ebe4ff]">
                    <UsersRound className="h-2.5 w-2.5" /> + Add Supplier
                  </button>
                )}
              </div>
              <div className="mt-1.5 border-t border-[#eff0f5] pt-1.5">
                <a href="#booth-expenses" className="flex items-center justify-between rounded-lg bg-[#fff4ef] px-1.5 py-1.5 text-[8px] font-semibold text-[#111747]">
                  <span className="flex items-center gap-1.5"><Receipt className="h-2.5 w-2.5 text-[#f15a24]" /> Booth Expenses</span>
                  <ChevronRight className="h-2.5 w-2.5 text-[#858ba0]" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-1.5 rounded-xl border border-[#e6e9f2] bg-white p-2 shadow-[0_2px_8px_rgba(17,23,71,0.025)]">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#fff8e5] text-[#edae35]">
                <Lightbulb className="h-3 w-3" />
              </span>
              <div>
                <h3 className="text-[8px] font-bold">Quick Tip</h3>
                <p className="mt-0.5 text-[7px] leading-[1.45] text-[#858ba0]">Click supplier tab to jump directly to items. Click action button to register immediate sales.</p>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-3">
            <section id="run-details" className="overflow-hidden rounded-xl border border-[#d9ceff] bg-white shadow-[0_2px_8px_rgba(17,23,71,0.025)]">
              <div className="h-[3px] bg-gradient-to-r from-[#7957ff] via-[#ed72bd] to-[#ffb84d]" />
              <div className="p-2.5">
                <h2 className="rounded-md bg-gradient-to-r from-[#ffdb9c] via-[#f5b4cc] to-[#efa2dc] px-2.5 py-1 text-[14px] font-bold leading-tight">Run’s Information</h2>
                <div className="mt-2.5 space-y-2.5">
                  <label className="block text-[7px] font-bold">
                    Run Name <span className="text-[#f15a24]">*</span>
                    <span className="relative mt-1 block">
                      <Store className={`absolute left-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 ${runNameError ? 'text-[#f15a24]':' text-[#7957ff]'}`} />
                      <input required placeholder="Enter run name Ex: MFU Outside Night Market (MON14)" onChange={(e) => setRunName(e.target.value)} className={`${inputClass} ${runNameError ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' : `${inputClass2}`} w-full pl-6 font-semibold`} />
                    </span>
                  </label>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <label className="block text-[7px] font-bold">
                      Run Date / Period
                      <span className="relative mt-1 block">
                        <CalendarDays className={`absolute left-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 ${runDateError ? 'text-[#f15a24]' : 'text-[#858ba0]'}`} />
                        <input type="date" onChange={(e)=>setRunDate(e.target.value)} className={`${inputClass} ${runDateError ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' : `${inputClass2}`} w-full pl-6`} />
                      </span>
                    </label>
                    <label className="block text-[7px] font-bold">
                      Booth Location
                      <span className="relative mt-1 block">
                        <MapPin className={`absolute left-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 ${runLocationError ? 'text-[#f15a24]' : 'text-[#858ba0]'}`} />
                        <input placeholder="Mae Fah Luang University" onChange={(e) => setRunLocation(e.target.value)} className={`${inputClass} ${runLocationError ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' : `${inputClass2}`} w-full pl-6`} />
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
              />
            ))}

            <section id="booth-expenses" className="overflow-hidden rounded-xl border border-[#f5ded7] bg-[#fff5f1]">
              <div className="flex items-center justify-between gap-2 px-2.5 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-md bg-[#f15a24] text-white"><Receipt className="h-2.5 w-2.5" /></span>
                  <div>
                    <h2 className="text-[10px] font-bold">Booth Expenses</h2>
                    <p className="text-[7px] text-[#858ba0]">Shared expenses</p>
                  </div>
                </div>
                <span className="rounded-full border border-[#ffd3c5] bg-[#ffe7dc] px-2 py-1 text-[7px] text-[#e34d1b]">
                  Total Overhead: <strong className="ml-1">฿{totalExpenses.toLocaleString()}</strong>
                </span>
              </div>
              <div className="mx-2.5 overflow-x-auto rounded-lg border border-[#e7e9f1] bg-white">
                <table className="w-full min-w-[360px] text-left">
                  <thead className="bg-[#f7f8fc] text-[7px] font-bold uppercase text-[#111747]">
                    <tr>
                      <th className="px-2 py-1.5">Expense Item</th>
                      <th className="px-2 py-1.5">Category</th>
                      <th className="px-2 py-1.5 text-right">Cost (฿)</th>
                      <th className="w-8 px-2 py-1.5 text-center">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eff0f5]">
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="text-[8px] hover:bg-[#fffaf8]">
                        <td className="px-2 py-2 font-medium">{expense.name}</td>
                        <td className="px-2 py-2 text-[7px] text-[#858ba0]">{expense.category}</td>
                        <td className="px-2 py-2 text-right font-semibold text-[#f15a24]">฿{expense.amount.toLocaleString()}</td>
                        <td className="px-2 py-2 text-center">
                          <button type="button" aria-label={`Remove ${expense.name}`} onClick={() => setExpenses((current) => current.filter((item) => item.id !== expense.id))} className="text-[#a3a8b6] hover:text-[#e34d1b]">
                            <Trash2 className="inline h-2.5 w-2.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {expenses.length === 0 && (
                      <tr><td colSpan={4} className="px-2 py-3 text-center text-[8px] text-[#858ba0]">No expenses added yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <form onSubmit={addExpense} className="m-2.5 flex flex-wrap gap-1.5 rounded-lg border border-[#f0e7e4] bg-white p-1.5">
                <input required value={newExpense.name} onChange={(event) => setNewExpense({ ...newExpense, name: event.target.value })} placeholder="Expense description (e.g. Folding Table Rental)" className={`${inputClass} ${inputClass2} flex-[2_1_130px]`} />
                <select value={newExpense.category} onChange={(event) => setNewExpense({ ...newExpense, category: event.target.value })} className={`${inputClass} ${inputClass2} flex-[1_1_75px]`}>
                  <option>Booth Fee</option>
                  <option>Stall Supplies</option>
                  <option>Travel</option>
                </select>
                <input required min="0.01" step="0.01" type="number" value={newExpense.amount} onChange={(event) => setNewExpense({ ...newExpense, amount: event.target.value })} placeholder="Amount ฿" className={`${inputClass} ${inputClass2} flex-[1_1_55px]`} />
                <button type="submit" className="flex items-center justify-center gap-1 rounded-lg bg-[#f15a24] px-2.5 py-1.5 text-[8px] font-semibold text-white transition hover:bg-[#df4e1c]">
                  <Plus className="h-2.5 w-2.5" /> Add Expense
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-[#e9ebf3] bg-white shadow-[0_-3px_12px_rgba(17,23,71,0.04)]">
        <div className="mx-auto flex min-h-[38px] max-w-[1280px] items-center justify-between gap-2 px-[18px] py-1.5">
          <div className="flex min-w-0 items-center gap-2 text-[7px]">
            <span className="flex shrink-0 items-center gap-1 font-semibold text-[#7957ff]">
              <Check className="h-2.5 w-2.5" /> All changes saved
            </span>
            <span className="text-[#d5d7df]">•</span>
            <span className="hidden truncate text-[#858ba0] sm:inline">Ready for sales at MFU Outside Night Market</span>
            {launched && <span role="status" className="truncate font-semibold text-[#159a68]">Run launched</span>}
          </div>
          <div className="flex shrink-0 gap-1.5">
            <button type="button" className="rounded-lg border border-[#ffd5d5] bg-[#fff5f5] px-3 py-1.5 text-[8px] font-semibold text-[#e34d55] hover:bg-[#ffebeb]">Cancel</button>
            <button type="button" onClick={() => hamdleSubmit()} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#ffb84d] to-[#ff9c22] px-3 py-1.5 text-[8px] font-bold text-[#111747] shadow-sm hover:brightness-105">
              <Rocket className="h-2.5 w-2.5" /> {launched ? "Launched" : "Launch Run"}
            </button>
          </div>
        </div>
      </div>

      <footer className="mx-auto max-w-[1280px] px-[18px] pb-1 pt-3 text-[7px] text-[#858ba0]">
        © 2025 ConsignDesk POS • Artisanal Market System
      </footer>
    </div>
  );
}

function ProductSection({
  section,
  index,
  onAdd,
  onRemove,
}: {
  section: SupplierSection;
  index: number;
  onAdd: (product: Omit<Product, "id">) => void;
  onRemove: (productId: number) => void;
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
    <section id={section.id} className="overflow-hidden rounded-xl border border-[#e6e9f2] bg-white shadow-[0_2px_8px_rgba(17,23,71,0.025)]">
      <div className="flex items-center justify-between gap-2 px-2.5 py-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white ${accent.number}`}>{index}</span>
          <h2 className="truncate text-[10px] font-bold">{section.name}</h2>
          <span className={`shrink-0 rounded-full px-1 py-0.5 text-[7px] font-medium ${accent.badge}`}>{section.role}</span>
        </div>
        <button type="button" className="flex shrink-0 items-center gap-1 rounded-full border border-[#e7ddff] bg-[#f7f3ff] px-1.5 py-1 text-[7px] font-medium text-[#7957ff] hover:bg-[#eee7ff]">
          <FileDown className="h-2 w-2" /> Import CSV
        </button>
      </div>
      <div className="mx-2.5 overflow-x-auto rounded-lg border border-[#e7e9f1]">
        <table className="w-full min-w-[360px] text-left">
          <thead className="bg-[#f7f8fc] text-[7px] font-bold uppercase text-[#111747]">
            <tr>
              <th className="px-2 py-1.5">Product Name</th>
              <th className="w-[13%] px-2 py-1.5 text-center">Qty</th>
              <th className="w-[19%] px-2 py-1.5 text-right">Price (฿)</th>
              <th className="w-[12%] px-2 py-1.5 text-center">Remove</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eff0f5]">
            {section.products.map((product) => (
              <tr key={product.id} className="text-[8px] hover:bg-[#fcfbff]">
                <td className="px-2 py-2">
                  <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                  <span className="font-medium">{product.name}</span>
                </td>
                <td className="px-2 py-2 text-center">
                  <span className={`rounded px-1.5 py-0.5 text-[7px] font-bold ${accent.badge}`}>{product.quantity}</span>
                </td>
                <td className="px-2 py-2 text-right font-semibold">฿{product.price.toLocaleString()}</td>
                <td className="px-2 py-2 text-center">
                  <button type="button" aria-label={`Remove ${product.name}`} onClick={() => onRemove(product.id)} className="text-[#a3a8b6] transition hover:text-[#e34d55]">
                    <Trash2 className="inline h-2.5 w-2.5" />
                  </button>
                </td>
              </tr>
            ))}
            {section.products.length === 0 && (
              <tr><td colSpan={4} className="px-2 py-3 text-center text-[8px] text-[#858ba0]">No products added yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <form onSubmit={addProduct} className="m-2.5 flex flex-wrap gap-1.5 rounded-lg border border-[#eff0f5] bg-[#fafbfe] p-1.5">
        <input required value={name} onChange={(event) => setName(event.target.value)} placeholder={section.placeholder} className={`${inputClass} ${inputClass2} flex-[2_1_120px]`} />
        <input required min="1" step="1" type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="Qty" className={`${inputClass} ${inputClass2} flex-[1_1_42px]`} />
        <input required min="0" step="0.01" type="number" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Price ฿" className={`${inputClass} ${inputClass2} flex-[1_1_52px]`} />
        <input hidden value={section.id} onChange={(e)=>setOwnerP(e.target.value)}/>
        <button type="submit" className="flex items-center justify-center gap-1 rounded-lg bg-[#7957ff] px-2.5 py-1.5 text-[7px] font-semibold text-white transition hover:bg-[#6642ed]">
          <Plus className="h-2.5 w-2.5" /> Add Product
        </button>
      </form>
    </section>
  );
}
