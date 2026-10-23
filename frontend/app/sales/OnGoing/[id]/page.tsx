
"use client";

import { useMemo, useState } from "react";
import {
  Store, UserRound, Package, Wallet, History, ArrowLeft,
  Users, Plus, Minus, Trash2, Save, Undo2, Lock,
  ReceiptText, X, Copy, Sun, Moon, Check,
} from "lucide-react";

type Supplier = "host" | "kaimook" | "japan";

type Product = {
  id: number;
  name: string;
  supplier: Supplier;
  stock: number;
  sold: number;
  price: number;
};

const initialProducts: Product[] = [
  { id: 1, name: "Green Horned Frog", supplier: "host", stock: 0, sold: 10, price: 150 },
  { id: 2, name: "Yellow Horned Frog", supplier: "host", stock: 1, sold: 9, price: 150 },
  { id: 3, name: "Brown Horned Frog", supplier: "host", stock: 6, sold: 4, price: 150 },
  { id: 4, name: "Japanese turtle (Big)", supplier: "kaimook", stock: 3, sold: 5, price: 250 },
  { id: 5, name: "Japanese turtle (Small)", supplier: "kaimook", stock: 10, sold: 7, price: 100 },
  { id: 6, name: "Turtle food 500g", supplier: "kaimook", stock: 40, sold: 22, price: 80 },
  { id: 7, name: "Aquarium Moss Ball (Medium)", supplier: "japan", stock: 8, sold: 7, price: 60 },
  { id: 8, name: "Mini Terrarium Starter Glass", supplier: "japan", stock: 3, sold: 3, price: 190 },
];

const suppliers: { id: Supplier; name: string; color: string }[] = [
  { id: "host", name: "My Products (Host)", color: "bg-primary-500" },
  { id: "kaimook", name: "P' Kaimook", color: "bg-pink-500" },
  { id: "japan", name: "Nong' Japan", color: "bg-amber-500" },
];

const money = (value: number) =>
  `฿${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function OngoingPage() {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState<"all" | Supplier>("all");
  const [gross, setGross] = useState(8490);
  const [unitsSold, setUnitsSold] = useState(66);
  const [lastAction, setLastAction] = useState<{
    productId: number;
    qty: number;
    amount: number;
    name: string;
  } | null>(null);

  const [dark, setDark] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [newSupplier, setNewSupplier] = useState("");
  const [newName, setNewName] = useState("");
  const [newQty, setNewQty] = useState("1");
  const [newPrice, setNewPrice] = useState("1");
  const [addTo, setAddTo] = useState<Supplier>("host");
  const [message, setMessage] = useState("Sold 5x Turtle food 500g");
  const [saved, setSaved] = useState(true);

  const filteredProducts = useMemo(
    () => filter === "all"
      ? products
      : products.filter((p) => p.supplier === filter),
    [products, filter]
  );

  const updateProduct = (id: number, changes: Partial<Product>) => {
    setProducts((current) =>
      current.map((p) => p.id === id ? { ...p, ...changes } : p)
    );
    setSaved(false);
  };

  const changeStock = (id: number, amount: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const next = product.stock + amount;
    if (next < 0) return;
    updateProduct(id, { stock: next });
  };

  const recordSale = (id: number, qty: number) => {
    const product = products.find((p) => p.id === id);
    if (!product || qty <= 0) return;

    if (product.stock < qty) {
      window.alert("Not enough inventory remaining for this item!");
      return;
    }

    const amount = product.price * qty;

    setProducts((current) => current.map((p) =>
      p.id === id
        ? { ...p, stock: p.stock - qty, sold: p.sold + qty }
        : p
    ));

    setGross((current) => current + amount);
    setUnitsSold((current) => current + qty);
    setLastAction({ productId: id, qty, amount, name: product.name });
    setMessage(`Sold ${qty}x ${product.name} (${money(amount)})`);
    setSaved(false);
  };

  const undoSale = () => {
    if (!lastAction) return;

    const action = lastAction;

    setProducts((current) => current.map((p) =>
      p.id === action.productId
        ? {
            ...p,
            stock: p.stock + action.qty,
            sold: Math.max(0, p.sold - action.qty),
          }
        : p
    ));

    setGross((current) => current - action.amount);
    setUnitsSold((current) => Math.max(0, current - action.qty));
    setMessage(`Reverted ${action.qty}x ${action.name}`);
    setLastAction(null);
    setSaved(false);
  };

  const addProduct = (supplier: Supplier) => {
    const qty = Number(newQty);
    const price = Number(newPrice);

    if (!newName.trim() || !Number.isInteger(qty) || qty < 1 ||
        !Number.isFinite(price) || price < 0) {
      window.alert("Please enter a product name, valid quantity, and price.");
      return;
    }

    setProducts((current) => [
      ...current,
      {
        id: Math.max(0, ...current.map((p) => p.id)) + 1,
        name: newName.trim(),
        supplier,
        stock: qty,
        sold: 0,
        price,
      },
    ]);

    setNewName("");
    setNewQty("1");
    setNewPrice("1");
    setSaved(false);
  };

  const removeProduct = (id: number) => {
    if (!window.confirm("Delete this product?")) return;
    setProducts((current) => current.filter((p) => p.id !== id));
    setSaved(false);
  };

  const applyChanges = () => {
    // Demo only: connect this handler to your API to persist changes.
    setSaved(true);
    window.alert("Changes applied in this demo. Connect an API to save permanently.");
  };

  const discardChanges = () => {
    if (!window.confirm("Discard all edits and restore the initial data?")) return;
    setProducts(initialProducts);
    setGross(8490);
    setUnitsSold(66);
    setLastAction(null);
    setMessage("Changes discarded");
    setSaved(true);
  };

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText(
        "https://consigndesk.app/join/MFU-MON14-88X2"
      );
      window.alert("Invite link copied!");
    } catch {
      window.alert("Unable to copy. Please copy the link manually.");
    }
  };

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen bg-[#F8F8FC] pb-32 font-sans text-[#25213B] dark:bg-slate-950 dark:text-white">
        {/* Navigation */}
        <header className="sticky top-0 z-40 border-b border-[#EAE7F5] bg-white/95 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95">
          <div className="mx-auto flex min-h-20 max-w-[1800px] items-center justify-between gap-4 px-4 py-3 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-500 via-pink-500 to-amber-400 text-white">
                <Store size={22} />
              </div>
              <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
                ConsignDesk
              </span>

              <nav className="ml-4 hidden items-center gap-1 rounded-xl bg-primary-50 p-1 lg:flex">
                {["Dashboard", "Sales Runs", "Ongoing", "Completed"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                      item === "Ongoing"
                        ? "bg-white text-primary-700 shadow-sm"
                        : "text-[#716D85] hover:bg-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Toggle theme"
                onClick={() => setDark(!dark)}
                className="rounded-xl border border-primary-100 bg-primary-50 p-2.5 text-primary-600"
              >
                {dark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold">Alex Chen</p>
                <p className="text-xs text-[#716D85]">Host</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-primary-500 to-pink-500 text-white">
                <UserRound size={21} />
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1800px] px-4 py-6 lg:px-8">
          {/* Run heading */}
          <section className="mb-6 rounded-2xl border border-[#EAE7F5] bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-col justify-between gap-5 border-b border-[#EAE7F5] pb-5 lg:flex-row lg:items-center">
              <div>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="mb-3 flex items-center gap-2 text-sm text-[#716D85] hover:text-primary-600"
                >
                  <ArrowLeft size={18} /> Back
                </button>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl font-extrabold sm:text-2xl">
                    MFU outside night market (MON 14)
                  </h1>
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                    EDIT MODE ACTIVE
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowInvite(true)}
                    className="flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-bold text-primary-700"
                  >
                    <Users size={16} /> 1 Assistant · + Invite
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white"
                >
                  Edit Mode
                </button>
                <button
                  type="button"
                  onClick={() => window.alert("Connect your API to end this run.")}
                  className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-600"
                >
                  <Lock size={16} /> End Run
                </button>
              </div>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-1 gap-4 pt-5 sm:grid-cols-2 xl:grid-cols-4">
              <Kpi title="Gross Intake" value={money(gross)} icon={<Wallet size={22} />} />
              <Kpi title="Total Sold Units" value={String(unitsSold)} icon={<Package size={22} />} subtitle="/ 88 starting" />
              <div className="rounded-xl border border-primary-100 bg-primary-50/70 p-4 sm:col-span-2">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#716D85]">
                  <History size={18} /> Latest Action
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{message}</p>
                  <button
                    type="button"
                    onClick={undoSale}
                    disabled={!lastAction}
                    className="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Undo2 size={16} /> Undo
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar and products */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:col-span-3">
              <div className="rounded-2xl border border-[#EAE7F5] bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <p className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-[#716D85]">
                  Catalog Index
                </p>

                <FilterButton
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                  icon={<Package size={19} />}
                  label="All Products"
                  count={products.length}
                />

                {suppliers.map((supplier) => (
                  <FilterButton
                    key={supplier.id}
                    active={filter === supplier.id}
                    onClick={() => setFilter(supplier.id)}
                    icon={<Store size={19} />}
                    label={supplier.name}
                    count={products.filter((p) => p.supplier === supplier.id).length}
                  />
                ))}

                <button
                  type="button"
                  onClick={() => setShowAddSupplier(true)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-primary-200 bg-primary-50 p-3 text-sm font-bold text-primary-700 hover:bg-primary-100"
                >
                  <Users size={18} /> Add Supplier
                </button>

                <div className="my-4 border-t border-[#EAE7F5]" />

                <div className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold">
                  <ReceiptText size={19} className="text-amber-500" />
                  Stall Expenses
                </div>
              </div>

              <div className="rounded-2xl border border-primary-100 bg-primary-50 p-4">
                <p className="mb-1 text-sm font-bold">💡 Quick Tip</p>
                <p className="text-xs leading-5 text-[#716D85]">
                  Choose a supplier to filter products. Edit quantities and prices,
                  then apply changes to the run.
                </p>
              </div>
            </aside>

            <div className="flex min-w-0 flex-col gap-6 lg:col-span-9">
              {suppliers
                .filter((s) => filter === "all" || filter === s.id)
                .map((supplier) => (
                  <section key={supplier.id} className="min-w-0">
                    <div className="mb-3 flex items-center justify-between rounded-2xl border border-[#EAE7F5] bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                      <div className="flex items-center gap-3">
                        <span className={`h-3 w-3 rounded-full ${supplier.color}`} />
                        <h2 className="font-extrabold">{supplier.name}</h2>
                      </div>
                      <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
                        {products.filter((p) => p.supplier === supplier.id).length} Items
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-[#EAE7F5] bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                      <table className="w-full min-w-[760px] text-left text-sm">
                        <thead className="bg-primary-50 text-xs uppercase tracking-wider">
                          <tr>
                            <th className="p-4">Product Name</th>
                            <th className="p-4 text-center">Stock / Qty</th>
                            <th className="p-4 text-right">Price (฿)</th>
                            <th className="p-4 text-center">Sold</th>
                            <th className="p-4 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAE7F5]">
                          {products
                            .filter((p) => p.supplier === supplier.id)
                            .map((product) => (
                              <tr key={product.id} className="hover:bg-primary-50/40">
                                <td className="p-3">
                                  <div className="flex items-center gap-2">
                                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${supplier.color}`} />
                                    <input
                                      aria-label="Product name"
                                      value={product.name}
                                      onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                                      className="w-full min-w-40 rounded-lg border border-[#EAE7F5] bg-[#F8F8FC] px-3 py-2 font-bold outline-none focus:border-primary-500"
                                    />
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center justify-center gap-2">
                                    <button
                                      type="button"
                                      aria-label="Decrease stock"
                                      onClick={() => changeStock(product.id, -1)}
                                      className="rounded-md border border-primary-100 p-1.5 hover:bg-primary-50"
                                    >
                                      <Minus size={14} />
                                    </button>
                                    <input
                                      aria-label="Stock quantity"
                                      type="number"
                                      min="0"
                                      value={product.stock}
                                      onChange={(e) => {
                                        const n = Number(e.target.value);
                                        if (Number.isInteger(n) && n >= 0) {
                                          updateProduct(product.id, { stock: n });
                                        }
                                      }}
                                      className="w-14 rounded-lg bg-primary-50 p-2 text-center font-extrabold text-primary-700 outline-none"
                                    />
                                    <button
                                      type="button"
                                      aria-label="Increase stock"
                                      onClick={() => changeStock(product.id, 1)}
                                      className="rounded-md border border-primary-100 p-1.5 hover:bg-primary-50"
                                    >
                                      <Plus size={14} />
                                    </button>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center justify-end gap-1">
                                    <span className="font-bold text-amber-500">฿</span>
                                    <input
                                      aria-label="Product price"
                                      type="number"
                                      min="0"
                                      value={product.price}
                                      onChange={(e) => {
                                        const n = Number(e.target.value);
                                        if (Number.isFinite(n) && n >= 0) {
                                          updateProduct(product.id, { price: n });
                                        }
                                      }}
                                      className="w-24 rounded-lg border border-[#EAE7F5] bg-[#F8F8FC] px-2 py-2 text-right font-bold outline-none focus:border-primary-500"
                                    />
                                  </div>
                                </td>
                                <td className="p-3 text-center font-extrabold text-[#716D85]">
                                  {product.sold}
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center justify-center gap-1">
                                    <button
                                      type="button"
                                      title="Record one sale"
                                      onClick={() => recordSale(product.id, 1)}
                                      className="rounded-lg bg-primary-100 px-2 py-2 text-xs font-bold text-primary-700 hover:bg-primary-200"
                                    >
                                      Sell 1
                                    </button>
                                    <button
                                      type="button"
                                      aria-label="Delete product"
                                      title="Delete product"
                                      onClick={() => removeProduct(product.id)}
                                      className="rounded-lg p-2 text-[#9A96AA] hover:bg-rose-50 hover:text-rose-500"
                                    >
                                      <Trash2 size={17} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Add product */}
                    <form
                      className="mt-3 flex flex-col gap-3 rounded-2xl border border-primary-100 bg-primary-50/70 p-4 md:flex-row"
                      onSubmit={(e) => {
                        e.preventDefault();
                        addProduct(supplier.id);
                      }}
                    >
                      <input
                        required
                        value={addTo === supplier.id ? newName : ""}
                        onFocus={() => setAddTo(supplier.id)}
                        onChange={(e) => {
                          setAddTo(supplier.id);
                          setNewName(e.target.value);
                        }}
                        placeholder="Item name"
                        className="min-w-0 flex-1 rounded-xl border border-[#EAE7F5] bg-white px-4 py-3 text-sm outline-none focus:border-primary-500"
                      />
                      <input
                        required
                        type="number"
                        min="1"
                        value={addTo === supplier.id ? newQty : "1"}
                        onFocus={() => setAddTo(supplier.id)}
                        onChange={(e) => {
                          setAddTo(supplier.id);
                          setNewQty(e.target.value);
                        }}
                        aria-label="New product quantity"
                        placeholder="Qty"
                        className="w-full rounded-xl border border-[#EAE7F5] bg-white px-4 py-3 text-sm outline-none focus:border-primary-500 md:w-24"
                      />
                      <input
                        required
                        type="number"
                        min="0"
                        step="0.01"
                        value={addTo === supplier.id ? newPrice : "1"}
                        onFocus={() => setAddTo(supplier.id)}
                        onChange={(e) => {
                          setAddTo(supplier.id);
                          setNewPrice(e.target.value);
                        }}
                        aria-label="New product price"
                        placeholder="Price ฿"
                        className="w-full rounded-xl border border-[#EAE7F5] bg-white px-4 py-3 text-sm outline-none focus:border-primary-500 md:w-28"
                      />
                      <button
                        type="submit"
                        className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-bold text-white hover:bg-primary-700"
                      >
                        <Plus size={17} /> Add Product
                      </button>
                    </form>
                  </section>
                ))}

              <button
                type="button"
                onClick={() => setShowAddSupplier(true)}
                className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-primary-300 bg-white p-5 text-left hover:bg-primary-50"
              >
                <span>
                  <span className="block font-bold">Add New Consignor / Supplier</span>
                  <span className="mt-1 block text-xs text-[#716D85]">
                    Add suppliers and configure their product catalogs.
                  </span>
                </span>
                <Plus size={22} className="text-primary-600" />
              </button>
            </div>
          </div>
        </main>

        {/* Fixed bottom action bar */}
        <footer className="fixed bottom-0 z-40 w-full border-t border-primary-100 bg-white/95 px-4 py-3 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95">
          <div className="mx-auto flex max-w-[1800px] flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-primary-700">
                <span className={`h-2.5 w-2.5 rounded-full ${saved ? "bg-emerald-500" : "animate-pulse bg-primary-500"}`} />
                {saved ? "All changes applied" : "Unsaved modifications"}
              </p>
              <p className="mt-1 hidden text-xs text-[#716D85] md:block">
                Apply your edits when you're ready.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={discardChanges}
                className="flex-1 rounded-xl border border-[#EAE7F5] px-5 py-3 text-sm font-bold hover:bg-[#F8F8FC] sm:flex-none"
              >
                Discard Changes
              </button>
              <button
                type="button"
                onClick={applyChanges}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white hover:bg-primary-700 sm:flex-none"
              >
                <Save size={17} /> Apply to Run
              </button>
            </div>
          </div>
        </footer>

        {/* Invite assistant modal */}
        {showInvite && (
          <Modal title="Invite Run Assistants" onClose={() => setShowInvite(false)}>
            <p className="text-sm text-[#716D85]">
              Assistants can record sales and look up stock. Inventory editing
              should be restricted by your backend permissions.
            </p>
            <label className="text-xs font-bold uppercase text-[#716D85]">
              Shareable invite link
            </label>
            <div className="flex gap-2">
              <input
                readOnly
                value="https://consigndesk.app/join/MFU-MON14-88X2"
                className="min-w-0 flex-1 rounded-xl border border-[#EAE7F5] bg-[#F8F8FC] px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={copyInvite}
                className="flex items-center gap-2 rounded-xl bg-primary-600 px-3 py-2 text-sm font-bold text-white"
              >
                <Copy size={16} /> Copy
              </button>
            </div>
            <div className="rounded-xl bg-primary-50 p-4 text-center">
              <p className="text-xs font-bold text-[#716D85]">Pairing code</p>
              <p className="my-2 text-3xl font-extrabold tracking-widest text-primary-700">
                884 921
              </p>
              <p className="text-xs text-[#716D85]">Demo code only</p>
            </div>
            <button
              type="button"
              onClick={() => setShowInvite(false)}
              className="w-full rounded-xl bg-primary-600 p-3 font-bold text-white"
            >
              Done
            </button>
          </Modal>
        )}

        {/* Add supplier modal */}
        {showAddSupplier && (
          <Modal title="Add Supplier" onClose={() => setShowAddSupplier(false)}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newSupplier.trim()) return;
                window.alert(
                  `Supplier "${newSupplier.trim()}" entered. Add a supplier ID and API integration to save it permanently.`
                );
                setNewSupplier("");
                setShowAddSupplier(false);
              }}
            >
              <label className="mb-2 block text-sm font-bold">Supplier name</label>
              <input
                required
                autoFocus
                value={newSupplier}
                onChange={(e) => setNewSupplier(e.target.value)}
                placeholder="Enter supplier name"
                className="mb-4 w-full rounded-xl border border-[#EAE7F5] px-4 py-3 outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-primary-600 p-3 font-bold text-white"
              >
                <Plus size={17} className="mr-1 inline" /> Add Supplier
              </button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}

function Kpi({
  title,
  value,
  icon,
  subtitle,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-primary-100 bg-primary-50/70 p-4">
      <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#716D85]">
        {title}
        <span className="text-primary-600">{icon}</span>
      </div>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-2xl font-extrabold tracking-tight text-[#25213B]">
          {value}
        </span>
        {subtitle && <span className="text-xs font-semibold text-[#716D85]">{subtitle}</span>}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mb-1 flex w-full items-center justify-between gap-2 rounded-xl border px-3 py-3 text-left text-sm font-bold transition-colors ${
        active
          ? "border-primary-200 bg-primary-100 text-primary-700"
          : "border-transparent text-[#716D85] hover:bg-primary-50"
      }`}
    >
      <span className="flex min-w-0 items-center gap-2">
        {icon}
        <span className="truncate">{label}</span>
      </span>
      {count !== undefined && (
        <span className="rounded-full bg-white px-2 py-0.5 text-xs">
          {count}
        </span>
      )}
    </button>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 text-slate-900 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-[#716D85] hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
