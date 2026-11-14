"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {getAuth , onAuthStateChanged} from "firebase/auth"; 
import {Suspense} from 'react';
import { useParams } from "next/navigation";

import {
  ChevronRight,
  Store,
  ShieldAlert,
  ChevronDown,
  Calculator,
  Edit3,
  LayoutGrid,
  User,
  Plus,
  AlertTriangle,
  Lock,
  Trash2,
  Undo2,
  ShoppingBag,
  History,
  Lightbulb,
  Receipt,
  UserPlus,
  X,
  PlusCircle,
  Leaf,
  Sun,
  Mountain,
  Rabbit,
  Fish,
  Grid,
  Droplets,
  Package,
  Wallet,
  Pencil,
  Copy,
  QrCode,
  Shield,
  UsersRound,
  ShieldCheck,
  RotateCcw,
  Check,
  Minus,
  Image as ImageIcon,
  Upload,
  type LucideIcon
} from 'lucide-react';
import Navbar from '@/app/components/navbar';

type InventoryProduct = {
  Product_Id?: string;
  Product_Name?: string;
  Start_Stock?: number;
  Current_Stock?: number;
  Product_Unit_Price?: number;
  Supplier_Id?: string;
  Image_url?: string;
  Supplier_Name?: string;
  id: string;
  name: string;
  start: number;
  stock: number;
  price: number;
  sold: number;
  icon: LucideIcon;
  iconBg: string;
  supplierId: string;
  supplierName: string;
  imageUrl?: string;
};

type Supplier = {
  id: string;
  name: string;
  role: string;
  accent: string;
  category: string;
  placeholder: string;
  products: InventoryProduct[];
};
//เพิ่ม Type สำหรับระบบตะกร้า (Cart)
type CartItem = {
  supplierId: string;
  supplierName: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};
type ProductFixStock = {
  id:string;
  name:string;
  stock:number;
  price:number;
  supplierId:string;
  supplierName:string;
  productId:string;
  AssistantName:string;

}
type ProductAdd = {
  id:string;
  stock:number;
  image_url?:string;
  productname:string;
  productprice:number;
  supplierId:string;
}
type ProductDelete = {
  id: string;
  productId: string;
  productname: string;
  supplierId: string;
  supplierName: string;
  AssistantName: string;
}

type dataFetch ={
  Gross_sales:number;
  Join_code:string;
  Run_Assistant_Name:{
    can_manage_permission:boolean;
    can_manage_stock:boolean;
    can_record_expenses:boolean;
    can_sell:boolean;
    can_view_log:boolean;
    display_name:string;
    run_assistance_id:string;
  }[];
  Sale_run_Id:string;
  Sale_run_Name:string;
  Supplier:{
    Category:string;
    Host_user_Id:string;
    Supplier_Id:string;
    Supplier_Name:string;
    products:{
      Current_Stock:number;
      Image_url?:string;
      Product_Id:string;
      Product_Name:string;
      Product_Unit_Price:number;
      Start_Stock:number;
      Supplier_Id:string; 
      Supplier_Name:string;
    }[];
  }[];
  Supplier_Name:string[];
  Total_Sales:number;
  Total_Stock:number;
}
type ExpenseDTO ={
  Amount:number;
  Category:string;
  Description:string;
  Expense_id:string;
  Paid_by_User_Name:string;
  Sale_run_id:string;
  id:string;
  new: boolean;
  timestamp: string;
}
export default function SalesRunDetail() {
  return (
   
    
      <SalesRunDetailContent />
   
  );
}

function SalesRunDetailContent() {
  const { id } = useParams<{ id: string }>();
  const [AssistantName, setAsistantName] = useState<string>('');
  const [expenses, setExpenses] = useState<ExpenseDTO[]>([]);
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [dataFetched, setDataFetched] = useState<dataFetch | null>(null);
  const [products, setProducts] = useState<Supplier[]>([]);
  async function fetchSalesRunData(saleRunId: string, idToken: string) {
    // setProducts([]);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/backend/ongoing-list/${saleRunId}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },


    }
  );
    if (!response.ok) {
      throw new Error(`Failed to load sale run: ${response.status}`);
    }

    const data = await response.json();
    const normalizedSuppliers: Supplier[] = data.Supplier.map((supplier: dataFetch['Supplier'][number]) => ({
      id: supplier.Supplier_Id,
      name: supplier.Supplier_Name,
      role: supplier.Supplier_Name === 'My Products' ? "Host's inventory" : "Supplier inventory",
      accent: supplier.Supplier_Name === 'My Products' ? 'purple' : 'pink',
      category: supplier.Supplier_Name === 'My Products' ? 'host' : 'supplier',
      placeholder: 'Item Name (e.g. Linen Coaster Set)',
      products: supplier.products.map((product) => ({
          ...product,
          id: product.Product_Id,
          name: product.Product_Name,
          start: product.Start_Stock,
          stock: product.Current_Stock,
          price: product.Product_Unit_Price,
          sold: product.Start_Stock - product.Current_Stock,
          icon: Package,
          iconBg: supplier.Supplier_Name === 'My Products'
            ? 'bg-[#7C5CFF]/10 text-[#7C5CFF]'
            : 'bg-[#F062C0]/10 text-[#F062C0]',
          supplierId: product.Supplier_Id,
          supplierName: product.Supplier_Name,
          imageUrl: product.Image_url,
        })),
    }));
    setDataFetched(data);
    setProducts(normalizedSuppliers);
    let totalProduct = 0;
    for (const supplier of data.Supplier) {
      totalProduct += supplier.products.length;
    }
    setTotalProduct(totalProduct);
    
    console.log("Fetched Sales Run Data:", data);
  }
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(user){
        const idToken = await user?.getIdToken();
        const AssistantName = user?.displayName || '';
        setAsistantName(AssistantName);
        fetchSalesRunData(id, idToken);
      }
    });
    return () => unsubscribe();
  }, [id]);
  // const Suppliers: Supplier[] = [
  //   {
  //   id: "supplier0-up73mVrzGH6Lfm7-20261113094945",
  //   name: "My Products",
  //   role: "Host's inventory",
  //   accent: "purple",
  //   category: "host",
  //   placeholder: "Item Name (e.g. Linen Coaster Set)",

  //   products: [
  //     {
  //     id: "product-0-20261113094945-up73mVrzGH6Lfm7-20261113094945-0",
  //     name: 'Green Horned Frog',
  //     start: 13,
  //     stock: 3,
  //     price: 150,
  //     sold: 10,
  //     icon: Leaf,
  //     iconBg: 'bg-[#7C5CFF]/10 text-[#7C5CFF]',
  //     supplierId: "supplier0-up73mVrzGH6Lfm7-20261113094945",
  //     supplierName:"My Products"
  //   },
  //   {
  //     id: '2',
  //     name: 'Yellow Horned Frog',
  //     start: 10,
  //     stock: 1,
  //     price: 150,
  //     sold: 9,
  //     icon: Sun,
  //     iconBg: 'bg-[#7C5CFF]/10 text-[#7C5CFF]',
  //     supplierId: "supplier0-qx4hjObfR9rBeyY-20261109115632",
  //     supplierName:"My Products"
  //   },
  //   {
  //     id: '3',
  //     name: 'Brown Horned Frog',
  //     start: 10,
  //     stock: 6,
  //     price: 150,
  //     sold: 4,
  //     icon: Mountain,
  //     iconBg: 'bg-[#7C5CFF]/10 text-[#7C5CFF]',
  //     supplierId: "supplier0-qx4hjObfR9rBeyY-20261109115632",
  //     supplierName:"My Products"
     
  //   },
  //   ],
  // },
  //  {
  //   id: "supplier1-up73mVrzGH6Lfm7-20261113094945",
  //   name: "P Kaimook",
  //   role: "Host's inventory",
  //   accent: "purple",
  //   placeholder: "Item Name (e.g. Linen Coaster Set)",
  //   category: "supplier",
  //   products: [
  //     {
  //     id: "product-1-20261113094945-up73mVrzGH6Lfm7-20261113094945-0",
  //     name: 'Green Horned Frog',
  //     start: 13,
  //     stock: 3,
  //     price: 150,
  //     sold: 10,
  //     icon: Leaf,
  //     iconBg: 'bg-[#F062C0]/10 text-[#F062C0]',
  //     supplierId: "supplier1-up73mVrzGH6Lfm7-20261113094945",
  //     supplierName:"P Kaimook"
     
  //   },
  //   {
  //     id: '2',
  //     name: 'Yellow Horned Frog',
  //     start: 10,
  //     stock: 1,
  //     price: 150,
  //     sold: 9,
  //     icon: Sun,
  //     iconBg: 'bg-[#F062C0]/10 text-[#F062C0]',
  //     supplierId: "kaimook-8466468345",
  //     supplierName:"P Kaimook"
     
  //   },
  //   {
  //     id: '3',
  //     name: 'Brown Horned Frog',
  //     start: 10,
  //     stock: 6,
  //     price: 150,
  //     sold: 4,
  //     icon: Mountain,
  //     iconBg: 'bg-[#F062C0]/10 text-[#F062C0]',
  //     supplierId: "kaimook-8466468345",
  //     supplierName:"P Kaimook"
  //   },
  //   ],
  // },
  // {
  //   id: "supplier2-up73mVrzGH6Lfm7-20261113094945",
  //   name: "Nong' Japan",
  //   role: "Supplier inventory",
  //   accent: "yellow",
  //   placeholder: "Item Name (e.g. Linen Coaster Set)",
  //   category: "supplier",
  //   products: [
  //     {
  //       id: "product-2-20261113094945-up73mVrzGH6Lfm7-20261113094945-0",
  //       name: 'Aquarium Moss Ball (Medium)',
  //       start: 15,
  //       stock: 8,
  //       price: 60,
  //       sold: 7,
  //       icon: Package,
  //       iconBg: 'bg-[#FFB24C]/15 text-[#FFB24C]',
  //       supplierId: "supplier2-up73mVrzGH6Lfm7-20261113094945",
  //       supplierName:"Nong' Japan"
  //     },
  //     {
  //       id: 'nong-japan-2',
  //       name: 'Mini Terrarium Starter Glass',
  //       start: 6,
  //       stock: 3,
  //       price: 190,
  //       sold: 3,
  //       icon: Droplets,
  //       iconBg: 'bg-[#FFB24C]/15 text-[#FFB24C]',
  //       supplierId: "nong-japan-8466468345",
  //       supplierName:"Nong' Japan"
  //     },
  //     {
  //       id: 'nong-japan-3',
  //       name: 'Terrarium Pebble Pack',
  //       start: 12,
  //       stock: 9,
  //       price: 45,
  //       sold: 3,
  //       icon: Grid,
  //       iconBg: 'bg-[#FFB24C]/15 text-[#FFB24C]',
  //       supplierId: "nong-japan-8466468345",
  //       supplierName:"Nong' Japan"
  //     },
  //   ],
  // },
  // ];
  // const assistants = [
  //   {
  //     id:'1',
  //     name: 'Alex Chen',
  //     status: true,
  //     avatar: '/path/to/alex_chen.jpg',
  //     permission:{
  //       Sell:true,
  //       Crud:true,
  //       Record:true,
  //       ViewLog:true,
  //       ManagePermission:true
  //     }
  //   },
  
  // ];
 
  // const expensesList = [
  //   {
  //     id: '01',
  //     timestamp: '14/9/26 12:43:05',
  //     detail: 'Weekend Market Stall Rent',
  //     dotColor: 'bg-[#FFB24C]',
  //     category: 'Booth Fee',
  //     categoryBg: 'bg-[#FFB24C]/10 text-[#FFB24C] border-[#FFB24C]/20',
  //     loggedBy: 'Alex Chen',
  //     role: '(Host)',
  //     amount: '฿700.00'
  //   },
  //   {
  //     id: '02',
  //     timestamp: '14/9/26 15:10:20',
  //     detail: 'Ice bucket, string bags & tape',
  //     dotColor: 'bg-[#7C5CFF]',
  //     category: 'Stall expense',
  //     categoryBg: 'bg-[#FFB24C]/10 text-[#FFB24C] border-[#FFB24C]/20',
  //     loggedBy: 'Alex Chen',
  //     role: '(Host)',
  //     amount: '฿150.00'
  //   }
  // ];
  // const StockList = [
  //   {
  //     id,
  //     name:"MFU outside night market (MON 14)",
  //     totalsoldMax:85,
  //     totalsold:66,
  //     grossIntake:8490,
  //   }
  // ];
  const [ProductsFixStock, setProductsFixStock] = useState<ProductFixStock[]>([]);
  const [ProductsAdd, setProductsAdd] = useState<ProductAdd[]>([]);
  const [ProductsDelete, setProductsDelete] = useState<ProductDelete[]>([]);
  const [activeNav, setActiveNav] = useState('Ongoing');
  const [activeCatalog, setActiveCatalog] = useState('all');
  const [language, setLanguage] = useState<'EN' | 'TH'>('TH');
  //State สำหรับ Toggle Sales Mode / Edit Mode
  const [stepMode, setStepMode] = useState("sales");
  // State สำหรับฟอร์ม Fast Log Shared Expense
  const [expenseTitle, setExpenseTitle] = useState('');
  const [category, setCategory] = useState('Stall Supplies');
  const [amount, setAmount] = useState('70');
  //INVITE MODAL
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageProduct, setImageProduct] = useState<{
    supplierId: string;
    productId: string;
    name: string;
    imageUrl?: string;
  } | null>(null);
  const [previousActions, setPreviousActions] = useState<{supplierId: string; productId: string; productName: string; quantity: number; time:string }[]>([]);
  // End Sales Run Modal
  const [isEndRunOpen, setIsEndRunOpen] = useState(false);
  const [isFinalEndRunOpen, setIsFinalEndRunOpen] = useState(false);
  const [isEndRunConfirmed, setIsEndRunConfirmed] = useState(false);
  const inviteUrl = 'https://consigndesk.app/join/MFU-M...';
  const joinPin = '88X2-901';
  // Toggle Switches State
  const [activeTab, setActiveTab] = useState<'global' | 'may' | 'tanawat'>('global');
  const [isPermissionEnabled, setIsPermissionEnabled] = useState(false);
  const [permissions, setPermissions] = useState({
    registerSales: true,
    issueDiscounts: false,
    voidTransaction: true,
    viewInventory: true,
    restockQuantities: true,
    addNewProducts: false
  });

  //เพิ่ม State สำหรับระบบตะกร้า (Cart)
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mobileBanking' | 'cash'>('mobileBanking');
  const [showUndoNotification, setShowUndoNotification] = useState(false);


async function getExpenses(){
  setStepMode("expense");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/backend/ongoing/${id}/expenses-list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await getAuth().currentUser?.getIdToken()}`,
    },

  });
  const data = await response.json();
  setExpenses(data);
  let total = 0;
  for (const expense of data) {
    expense.Amount = Number(expense.Amount);
    total += expense.Amount;
  }
  setTotalExpenses(total);
  console.log("Fetched Expenses Data:", data);
}
  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const handleSaveProductImage = (imageUrl: string) => {
    if (!imageProduct) return;

    setProducts((prev) =>
      prev.map((supplier) =>
        supplier.id !== imageProduct.supplierId
          ? supplier
          : {
              ...supplier,
              products: supplier.products.map((product) =>
                product.id === imageProduct.productId
                  ? { ...product, imageUrl }
                  : product,
              ),
            },
      ),
    );
    setImageProduct(null);
  };
  
 
  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ฟังก์ชันสำหรับแปลง timestamp เป็นข้อความเวลาแบบ "x นาทีที่แล้ว" หรือ "x ชั่วโมงที่แล้ว"
  const formatTimeAgo = (timestamp: number) => {
  const secondsAgo = Math.floor((Date.now() - timestamp) / 1000);

  if (secondsAgo < 5) return 'เมื่อสักครู่';
  if (secondsAgo < 60) return `${secondsAgo} วินาทีที่แล้ว`;
  
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return `${minutesAgo} นาทีที่แล้ว`;
  
  const hoursAgo = Math.floor(minutesAgo / 60);
  return `${hoursAgo} ชั่วโมงที่แล้ว`;
};


// Component สำหรับแสดงเวลาที่ผ่านมาแบบเรียลไทม์

const ActionTimeAgo = ({ createdAt }: { createdAt: number }) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    // ตั้งค่าภาษาเริ่มต้น
    setLanguage(localStorage.getItem('language') === 'EN' ? 'EN' : 'TH');
    // ให้ Re-render ตัวเองทุกๆ 1 วินาที เพื่ออัปเดตเวลาที่นับผ่านไป
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);
    

    return () => clearInterval(interval);
  }, []);

  return <span>{formatTimeAgo(createdAt)}</span>; 
};
const handleUndo = () => {
  if (previousActions.length === 0) return;

  const lastAction = previousActions[previousActions.length - 1];

  // 1. คืน Stock และ Sold ของสินค้าที่ขายล่าสุด
  setProducts((prev) =>
    prev.map((supplier) => {
      // ค้นหา Supplier ที่ตรงกัน
      if (supplier.id !== lastAction.supplierId) {
        return supplier;
      }

      return {
        ...supplier,
        products: (supplier.products ?? []).map((item) => {
          // ค้นหาสินค้าที่ต้องการ Undo
          if (item.id !== lastAction.productId) {
            return item;
          }

          return {
            ...item,
            stock: item.stock + lastAction.quantity,
            sold: item.sold - lastAction.quantity,
          };
        }),
      };
    })
  );

  // 2. ลบ Action ล่าสุดออกจากประวัติ
  setPreviousActions((prev) => prev.slice(0, -1));
};


const handleSell = (id: string) => {
  const productToSell = products
    .flatMap((supplier) => supplier.products ?? [])
    .find((item) => item.id === id);

  if (!productToSell || productToSell.stock <= 0) return;

  setCart((prev) => {
    const existing = prev.find((item) => item.productId === id);
    if (existing) {
      if (existing.quantity >= productToSell.stock) return prev;
      return prev.map((item) =>
        item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    return [
      ...prev,
      {
        supplierId: productToSell.supplierId,
        productId: id,
        name: productToSell.name,
        price: productToSell.price,
        quantity: 1,
        stock: productToSell.stock,
        supplierName: productToSell.supplierName
      },
    ];
  });
};

const updateCartQuantity = (productId: string, change: number) => {
  setCart((prev) =>
    prev.flatMap((item) => {
      if (item.productId !== productId) return [item];

      const quantity = item.quantity + change;
      if (quantity <= 0) return [];
      if (quantity > item.stock) return [item];
      return [{ ...item, quantity }];
    })
  );
};

//เพิ่มฟังก์ชัน handleConfirmSale สำหรับกดยืนยันจาก Sidebar วางฟังก์ชันนี้ไว้ใต้ handleSell เพื่อทำหน้าที่หักสต็อกจริงและจับเวลา Undo 10 วินาที

const handleConfirmSale = async () => {
  if (cart.length === 0) return;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/backend/confirm-sale`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
    },
    body: JSON.stringify(
      {
        saleRunId: id,
        assistanceName: AssistantName,
        paymentMethod: paymentMethod === 'cash' ? 'CASH' : 'MOBILE_BANKING',
        cart:cart
      }
    ),
  });
  if (!response.ok) {
    throw new Error(`Sale confirmation failed: ${await response.text()}`);
  }
  console.log("Confirming sale for items:", await response.text());

// 1. หักสต็อกและเพิ่มยอดขายสำหรับสินค้าทุกตัวในตะกร้า
  setProducts((prev) =>
    prev.map((supplier) => {
      const cartItemsForSupplier = cart.filter(c => c.supplierId === supplier.id);
      if (cartItemsForSupplier.length === 0) return supplier;

      return {
        ...supplier,
        products: (supplier.products ?? []).map((product) => {
          const cartItem = cartItemsForSupplier.find(c => c.productId === product.id);
          if (cartItem) {
            return {
              ...product,
              stock: product.stock - cartItem.quantity,
              sold: product.sold + cartItem.quantity,
              supplierName: cartItem.supplierName,
            };
          }
          return product;
        }),
      };
    })
  );

// 2. บันทึกประวัติเพื่อใช้สำหรับปุ่ม Undo
  cart.forEach(item => {
    setPreviousActions((prev) => [
      ...prev,
      {
        supplierId: item.supplierId,
        productId: item.productId,
        productName: item.name,
        quantity: item.quantity,
        supplierName: item.supplierName,
        time: Date.now().toString(),
      },
    ]);
  });
// 3. เคลียร์ตะกร้าและปิด Sidebar
  setCart([]);
  setIsCartOpen(false);
  // 4. โชว์ Notification 10 วินาที
  setShowUndoNotification(true);
  setTimeout(() => setShowUndoNotification(false), 10000);
};


async function handleSaveChanges(){
  if (ProductsFixStock.length === 0 && ProductsAdd.length === 0 && ProductsDelete.length === 0) return;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/backend/ongoing/save-changes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
    },
    body: JSON.stringify({
      saleRunId: id,
      assistanceName: AssistantName,
      fixStock: ProductsFixStock,
      add: ProductsAdd,
      delete: ProductsDelete,
    }),
  });

  if (!response.ok) {
    console.error("Error saving changes");
    return;
  }
  console.log(ProductsFixStock, ProductsAdd, ProductsDelete);
  // Clear the arrays after successful save
  setProductsFixStock([]);
  setProductsAdd([]);
  setProductsDelete([]);
}
 async function handleAddExpense() {
   
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/backend/ongoing/${id}/add-expense`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAuth().currentUser?.getIdToken()}`,
      },
      body: JSON.stringify({
        Expense_id: `expense-${Date.now()}`,
        Sale_run_id: id,
        Paid_by_User_Name: AssistantName,
        Time_Stamp: new Date().toISOString(),
        Description: expenseTitle,
        Category: category,
        Amount: parseFloat(amount),

      })
    });
    if (!response.ok) {
      console.error("Error adding expense");
      return;
    }
    setExpenseTitle('');
    setCategory('Stall Supplies');
    setAmount('70');
    console.log("Adding expense:", await response.text());
  }
async function endRunSendRequest() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/backend/sale-runs/end`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await getAuth().currentUser?.getIdToken()}`,
    },
    body: JSON.stringify({
      saleRunId: id,
      assistanceName: AssistantName,
    }),
  });

  if (!response.ok) {
    console.error("Error ending sales run");
    return;
  }
  console.log("Ending sales run:", await response.text());
}
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fe] font-sans text-[#0B0F4F]">
      <Suspense fallback="Loading...">
          <Navbar />
      </Suspense>
      <main className={`mx-auto w-full max-w-[1280px] min-w-0 flex-1 space-y-5 overflow-x-clip px-3 pt-16 sm:px-6 ${stepMode === "edit" ? "pb-32 sm:pb-24" : "pb-6"}`}>
        
        {/* TOP HEADER SECTION CARD */}
        <div className="min-w-0 space-y-3 rounded-2xl border border-[#7C5CFF]/15 bg-white px-3 py-3 shadow-sm sm:px-5 sm:py-4">
          <div className="flex flex-col gap-3 min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between">
            <div className="flex min-w-0 flex-col gap-2">
              <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1.5">
                <h1 className="min-w-0 break-words text-2xl font-extrabold leading-tight tracking-tight text-[#0B0F4F] sm:text-3xl">
                  {dataFetched?.Sale_run_Name || 'Loading...'}
                </h1>
                {stepMode === "edit" ? (
                  <span className="flex items-center gap-1.5 rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-1 text-[10px] font-bold text-[#B45309]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FFB24C]"></span>
                    {language === 'EN' ? 'Edit Mode' : 'โหมดแก้ไข'}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    {language === 'EN' ? 'LIVE' : 'ไลฟ์'}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex min-h-11 w-fit max-w-full items-center gap-1.5 rounded-full border border-[#DDD6FE] bg-[#EEE9FF] px-3 py-1 text-xs font-bold text-[#0B0F4F] shadow-sm transition-colors hover:bg-[#E8E1FF] sm:min-h-0"
              >
                
                <UsersRound className="h-4 w-4 text-[#7C5CFF]" />
                <span>{dataFetched?.Run_Assistant_Name.length} {language === 'EN'?'Assistant':'ผู้ช่วย'}</span>
                <span className="text-slate-500">•</span>
                <span className="text-[#7C5CFF]">+ {language === 'EN'?'Invite':'เชิญ'}</span>
              </button>
            </div>

            <div className="flex w-full min-w-0 flex-wrap items-center gap-2 min-[600px]:w-auto min-[600px]:shrink-0 min-[600px]:self-center">
              <div
                className="flex min-h-11 flex-1 items-center gap-0.5 rounded-lg border border-[#7C5CFF]/20 bg-[#7C5CFF]/5 p-0.5 min-[600px]:min-h-0 min-[600px]:flex-none"
                role="group"
                aria-label="Run mode"
              >
                <button
                  type="button"
                  onClick={() => setStepMode("sales")}
                  aria-pressed={stepMode === "sales"}
                  className={`flex min-h-10 flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-bold transition-colors min-[600px]:min-h-0 min-[600px]:flex-none min-[600px]:gap-1.5 min-[600px]:px-2.5 ${
                    stepMode === "sales"
                      ? "bg-[#7C5CFF] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <ShoppingBag className="h-3.5 w-3.5" /> {language === 'EN' ? 'Sales Mode' : 'โหมดขาย'}
                </button>
                <button
                  type="button"
                  onClick={() => setStepMode("edit")}
                  aria-pressed={stepMode === "edit"}
                  className={`flex min-h-10 flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-bold transition-colors min-[600px]:min-h-0 min-[600px]:flex-none min-[600px]:gap-1.5 min-[600px]:px-2.5 ${
                    stepMode === "edit"
                      ? "bg-[#FFB24C] text-[#0B0F4F] shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Receipt className="h-3.5 w-3.5" />  {language === 'EN' ? 'Edit Mode' : 'โหมดแก้ไข'}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEndRunConfirmed(false);
                  setIsEndRunOpen(true);
                }}
                className="flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-500/15 min-[600px]:min-h-0"
              >
                <X className="h-3.5 w-3.5" /> {language === 'EN' ? 'End Run' : 'จบกิจกรรม'}
              </button>
            </div>
          </div>

          {/* Key Stat Cards Grid */}
          <div className="grid min-w-0 grid-cols-1 gap-3 rounded-2xl bg-[#7C5CFF]/5 p-3 sm:p-4 min-[600px]:grid-cols-[1.2fr_1fr_1fr]">
            {/* Gross Intake */}
            <div className="relative flex min-h-[76px] min-w-0 items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2.5 shadow-sm">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400"> {language === 'EN' ? 'Gross Intake' : 'รายได้รวม'}</p>
                <p className="mt-0.5 text-lg font-extrabold text-[#0B0F4F]">฿{dataFetched?.Gross_sales.toLocaleString('en-US') || 0}.00</p>
              </div>
              <div className="absolute right-3 top-3 rounded-md bg-[#7C5CFF]/10 p-2 text-[#7C5CFF]">
                <Receipt className="h-4 w-4" />
              </div>
            </div>

            {/* Total Sold Units */}
            <div className="relative flex min-h-[76px] min-w-0 items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2.5 shadow-sm">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400"> {language === 'EN' ? 'Total Sold Units' : 'หน่วยที่ขายได้ทั้งหมด'}</p>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="text-lg font-extrabold text-[#0B0F4F]">{dataFetched?.Total_Sales || 0}</span>
                  <span className="text-xs font-medium text-slate-400">/ {dataFetched?.Total_Stock || 0} {language === 'EN' ? 'starting' : 'เริ่มต้น'}</span>
                </div>
              </div>
              <div className="absolute right-3 top-3 rounded-md bg-[#FFB24C]/15 p-2 text-[#FFB24C]">
                <ShoppingBag className="h-4 w-4" />
              </div>
            </div>

            {/* Remaining Stock */}
            <div className="relative flex min-h-[76px] min-w-0 items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2.5 shadow-sm">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  {language === 'EN' ? 'Remaining Stock' : 'สินค้าคงเหลือ'}
                </p>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="text-lg font-extrabold text-[#0B0F4F]">
                    {dataFetched?.Supplier.reduce((total, supplier) => total + supplier.products.reduce((supplierTotal, product) => supplierTotal + product.Current_Stock, 0), 0)}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    / {dataFetched?.Supplier.reduce((total, supplier) => total + supplier.products.reduce((supplierTotal, product) => supplierTotal + product.Start_Stock, 0), 0)} {language === 'EN' ? 'starting' : 'เริ่มต้น'}
                  </span>
                </div>
              </div>
              <div className="absolute right-3 top-3 rounded-md bg-emerald-500/10 p-2 text-emerald-600">
                <Package className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT SECTION: SIDEBAR + MAIN TABLES */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-[210px_minmax(0,1fr)] sm:gap-y-5">
          
          {/* LEFT SIDEBAR / CATALOG INDEX */}
          <div className="min-w-0 space-y-4">
            <div className="mx-auto w-[92%] rounded-xl border border-[#e6e9f2] bg-white p-2 shadow-[0_2px_8px_rgba(11,15,79,0.025)] sm:mx-0 sm:w-auto">
              <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-[#858ba0]">
                 {language === 'EN' ? 'Catalog Index' : 'ดัชนีแคตตาล็อก'}
              </h3>
              
              <nav className="space-y-0.5">
                <button className="flex min-h-11 w-full items-center justify-between gap-1.5 rounded-lg border border-[#7C5CFF]/20 bg-[#7C5CFF]/10 px-2 text-left text-xs font-semibold text-[#0B0F4F] sm:min-h-0 sm:px-1.5 sm:py-1.5">
                  <div className="flex items-center gap-1.5">
                    <LayoutGrid className="h-2.5 w-2.5 shrink-0 text-[#7C5CFF]" />
                    <span>{language === 'EN' ? 'All Products' : 'ผลิตภัณฑ์ทั้งหมด'}</span>
                  </div>
                  <span className="rounded-full bg-[#7C5CFF]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#7C5CFF]">{totalProduct}</span>
                </button>
                {dataFetched?.Supplier && dataFetched.Supplier.map((supplier, index) => (
                  <button key={index} className="flex min-h-11 w-full items-center gap-1.5 rounded-lg px-2 text-left text-xs text-[#4c526a] transition-colors hover:bg-[#f7f5ff] sm:min-h-0 sm:px-1.5 sm:py-1.5">
                    <div className="flex items-center gap-1.5">
                      
                      {supplier.Supplier_Name === "My Products" ? (
                        <>
                        <User className="h-2.5 w-2.5 shrink-0 text-[#7C5CFF]" />
                          <span>{supplier.Supplier_Name} ({language === 'EN' ? 'Host' : 'เจ้าของ'})</span>
                        </>
                      ) : (
                        <>
                        <Store className="h-2.5 w-2.5 shrink-0 text-[#7C5CFF]" />
                        <span>{supplier.Supplier_Name}</span>
                        </>

                      )}
                    </div>
                  </button>
                ))}
              
              </nav>

              <div className="mt-1.5 border-t border-[#eff0f5] pt-1.5">
                <button onClick={()=>getExpenses()} className="flex min-h-11 w-full items-center justify-between rounded-lg bg-[#FFB24C]/10 px-2 text-xs font-semibold text-[#0B0F4F] transition-colors hover:bg-[#FFB24C]/20 sm:min-h-0 sm:px-1.5 sm:py-1.5">
                  <div className="flex items-center gap-1.5">
                    <Receipt className="h-2.5 w-2.5 text-[#FFB24C]" />
                    <span>{language === 'EN' ? 'Booth Expenses' : 'ค่าใช้จ่ายของบูธ'}</span>
                  </div>
                  <ChevronDown className="h-2.5 w-2.5 -rotate-90 text-[#858ba0]" />
                </button>
              </div>
            </div>

            <div className="mx-auto w-[92%] rounded-xl border border-slate-100 bg-white p-2 shadow-sm sm:mx-0 sm:w-auto">
              <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs font-bold text-[#0B0F4F]">
                <span className="flex items-center gap-1.5"><UsersRound className="h-3.5 w-3.5 text-[#7C5CFF]" />  {language === 'EN' ? 'Assistants' : 'ผู้ช่วย'}</span>
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-600">• {dataFetched?.Run_Assistant_Name.length} {language === 'EN' ? 'Active' : 'ใช้งาน'}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-1.5 rounded-lg bg-slate-50 px-1.5 py-1.5">
                <div className="flex min-w-0 items-center gap-1.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7C5CFF] text-xs font-bold text-white">P</span>
                  <div>
                    <p className="text-xs font-bold leading-4 text-slate-700">{dataFetched?.Run_Assistant_Name.at(0)?.display_name}</p>
                    {/* <p className="text-[10px] leading-3.5 text-slate-400">{dataFetched?.Run_Assistant_Name.at(0)?.}</p> */}
                  </div>
                </div>
                <span className="shrink-0 text-[10px] font-semibold text-emerald-600">• {language === 'EN' ? 'Online' : 'ออนไลน์'}</span>
              </div>
              <button onClick={() => setIsOpen(true)} className="mt-2 flex min-h-11 w-full items-center justify-center gap-1 rounded-lg bg-[#FFB24C] px-1.5 py-1.5 text-[10px] font-bold text-[#0B0F4F] hover:bg-[#f5a733] sm:min-h-0">
                <UserPlus className="h-3 w-3 shrink-0" /> + {language === 'EN' ? 'Invite Assistant' : 'เชิญผู้ช่วย'}
              </button>
              <button onClick={() => setIsPermissionEnabled(true)} className="mt-2 flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-[#7C5CFF]/20 bg-[#7C5CFF]/5 px-2 py-2 text-[11px] font-bold text-[#7C5CFF] hover:bg-[#7C5CFF]/10 sm:min-h-0">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />{language === 'EN' ? 'Manage Permissions' : 'จัดการสิทธิ์'}
              </button>
            </div>

            {/* Quick Tip Box */}
            <div className="mx-auto flex w-[92%] gap-1.5 rounded-xl border border-slate-100 bg-white p-2 shadow-sm sm:mx-0 sm:w-auto">
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFB24C]" />
              <div className="min-w-0 space-y-1 text-xs">
                <p className="font-bold text-[#0B0F4F]">{language === 'EN' ? 'Quick Tip' : 'คำแนะนำ'}</p>
                <p className="leading-snug text-slate-400">
                  {language === 'EN' ? 'Click supplier tab to jump directly to items. Click action button to register immediate sales.' : 'คลิกแท็บผู้จัดหาเพื่อไปยังรายการโดยตรง คลิกปุ่มดำเนินการเพื่อลงทะเบียนการขายทันที'}
                </p>
              </div>
            </div>

            <Link href="/ViewUser/1" className="mx-auto flex min-h-11 w-[92%] items-center justify-between gap-1 rounded-lg bg-gradient-to-r from-[#7C5CFF] to-[#F062C0] px-2 py-1.5 text-white shadow-sm sm:mx-0 sm:min-h-0 sm:w-auto sm:px-1.5">
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="shrink-0 rounded bg-white/20 p-1"><History className="h-3 w-3" /></span>
                <span className="min-w-0 flex-1"><span className="block text-[10px] font-bold leading-3.5"> {language === 'EN' ? 'Sales Activity Board' : 'บอร์ดกิจกรรมการขาย'}</span><span className="block text-[9px] leading-3 text-white/80"> {language === 'EN' ? 'Enter live sales feed & telemetry' : 'เข้าสู่กระแสการขายสดและข้อมูล telemetry'}</span></span>
              </span>
              <ChevronRight className="h-3 w-3 shrink-0" />
            </Link>
          </div>

          {/* RIGHT PRODUCT LIST TABLES */}
          {/* Product cards for each supplier  Edit Mode*/}
          <div className="min-w-0 space-y-10 sm:space-y-5">
            
            {/* 1. SECTION: MY PRODUCTS */}
            {stepMode === "edit" && (
                <>

{products.map((items) => {
  const accent = getSupplierAccent(items.id);
  return (
    <ProductGroupSection
      key={items.id}
      title={items.name}
      badgeText={items.category}
      badgeColor={accent.badge}
      countColor={accent.count}
      itemCount={items.products?.length ?? 0}
      dotColor={accent.dot}
      items={items.products ?? []}
      placeholderText="Item Name (e.g. Linen Coaster Set)"
      onProductChange={(productId: string, changes: Partial<Pick<InventoryProduct, 'name' | 'stock' | 'price'>>) => {
        const product = items.products.find((currentProduct) => currentProduct.id === productId);
        if (!product) return;

        const updatedProduct = { ...product, ...changes };
        setProducts((currentProducts) =>
          currentProducts.map((supplier) =>
            supplier.id !== items.id
              ? supplier
              : {
                  ...supplier,
                  products: supplier.products.map((currentProduct) =>
                    currentProduct.id === productId ? { ...currentProduct, ...changes } : currentProduct
                  ),
                }
          )
        );
        if (ProductsAdd.some((addedProduct) => addedProduct.supplierId === items.id && addedProduct.id === productId)) {
          setProductsAdd((currentProductsAdd) =>
            currentProductsAdd.map((addedProduct) =>
              addedProduct.supplierId === items.id && addedProduct.id === productId
                ? {
                    ...addedProduct,
                    stock: updatedProduct.stock,
                    productname: updatedProduct.name,
                    productprice: updatedProduct.price,
                  }
                : addedProduct
            )
          );
        } else {
          setProductsFixStock((currentFixes) => {
            const updatedFix = {
              id: updatedProduct.id,
              name: updatedProduct.name,
              stock: updatedProduct.stock,
              price: updatedProduct.price,
              supplierId: items.id,
              supplierName: items.name,
              productId,
              AssistantName,
            };
            const existingFix = currentFixes.find(
              (fix) => fix.supplierId === items.id && fix.productId === productId
            );
            return existingFix
              ? currentFixes.map((fix) =>
                  fix.supplierId === items.id && fix.productId === productId ? updatedFix : fix
                )
              : [...currentFixes, updatedFix];
          });
        }
      }}
      onAddProduct={(product: Omit<InventoryProduct, 'id' | 'supplierId' | 'supplierName'>) => {
        const productId = `product-${Date.now()}`;
        const newProduct = {
          ...product,
          id: productId,
          supplierId: items.id,
          supplierName: items.name,
        };
        setProducts((currentProducts) =>
          currentProducts.map((supplier) =>
            supplier.id !== items.id
              ? supplier
              : {
                  ...supplier,
                  products: [
                    ...supplier.products,
                    newProduct,
                  ],
                }
          )
        );
        setProductsAdd((currentProductsAdd) => [
          ...currentProductsAdd,
          {
            id: productId,
            stock: product.stock,
            productname: product.name,
            productprice: product.price,
            supplierId: items.id,
          },
        ]);
      }}
      onDeleteProduct={(productId: string) => {
        const product = items.products.find((currentProduct) => currentProduct.id === productId);
        if (!product) return;

        const isAddedProduct = ProductsAdd.some(
          (addedProduct) => addedProduct.supplierId === items.id && addedProduct.id === productId
        );
        if (!isAddedProduct) {
          setProductsDelete((currentDeletes) => {
            const deletedProduct = {
              id: product.id,
              productId: product.id,
              productname: product.name,
              supplierId: items.id,
              supplierName: items.name,
              AssistantName,
            };
            const alreadyDeleted = currentDeletes.some(
              (deleted) => deleted.supplierId === items.id && deleted.productId === productId
            );
            return alreadyDeleted
              ? currentDeletes.map((deleted) =>
                  deleted.supplierId === items.id && deleted.productId === productId
                    ? deletedProduct
                    : deleted
                )
              : [...currentDeletes, deletedProduct];
          });
        }
        setProducts((currentProducts) =>
          currentProducts.map((supplier) =>
            supplier.id !== items.id
              ? supplier
              : { ...supplier, products: supplier.products.filter((product) => product.id !== productId) }
          )
        );
        setProductsAdd((currentProductsAdd) =>
          currentProductsAdd.filter(
            (product) => !(product.supplierId === items.id && product.id === productId)
          )
        );
        setProductsFixStock((currentFixes) =>
          currentFixes.filter(
            (fix) => !(fix.supplierId === items.id && fix.productId === productId)
          )
        );
      }}
      onImageClick={(product: any) => setImageProduct({ supplierId: items.id, productId: product.id, name: product.name, imageUrl: product.imageUrl })}
      language={language}
    />
  );
})}

            

            </>
)}
               {/* Product cards for each supplier  Sales Mode*/}
               
{stepMode === "sales" && (
  <div className="w-full space-y-10 sm:space-y-5">

    {/* 1. HOST PRODUCTS */}
   {products.map((supplier) => (
   <SaleSection key={supplier.id} products={supplier.products} handleSell={handleSell} Name={supplier.name} Role={supplier.name === "My Products"? "host" : "Supplier"} id={supplier.id} language={language} />
   ))}

  </div>
)}

               {stepMode === "expense" && (
                <div className="min-h-screen bg-[#f8f9fe] p-4 md:p-8 text-[#0B0F4F] font-sans max-w-5xl mx-auto space-y-5">
      
      {/* 1. HEADER CARD: Booth's Operating Expenses */}
      <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-2xs sm:flex-row sm:items-center sm:p-5">
        <div className="flex min-w-0 items-center space-x-3 sm:space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFB24C]/15 text-[#FFB24C] flex items-center justify-center shrink-0">
            <Wallet className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h1 className="break-words text-xl font-bold tracking-tight text-[#0B0F4F]">
              {language === 'EN' ? 'Booth’s Operating Expenses' : 'ค่าใช้จ่ายในการดำเนินงานของบูธ'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
               {language === 'EN' ? 'Track and split operational costs for this sales run' : 'ติดตามและแบ่งค่าใช้จ่ายในการดำเนินงานสำหรับรอบการขายนี้'}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex max-w-full items-center gap-2 rounded-full border border-[#7C5CFF]/20 bg-[#7C5CFF]/5 px-3 py-1.5 text-xs font-semibold text-[#7C5CFF]">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span> {language === 'EN' ? 'Synchronized Ledger' : 'บันทึกการเงินที่ซิงโครไนซ์'}</span>
        </div>
      </div>







      {/* 2. FAST LOG SHARED EXPENSE CARD */}
      <div className="min-w-0 space-y-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-2xs sm:p-6">
        {/* Section Title */}
        <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
          <PlusCircle className="w-4 h-4 text-[#FFB24C]" />
          <span>{language === 'EN' ? 'Fast Log Shared Expense' : 'บันทึกค่าใช้จ่ายที่แบ่งปันอย่างรวดเร็ว'}</span>
        </div>

        {/* Input Form Grid */}
        <div className="grid min-w-0 grid-cols-1 items-end gap-4 md:grid-cols-12">
          
          {/* Expense Title Input */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              {language === 'EN' ? 'Expense Title' : 'ชื่อค่าใช้จ่าย'}
            </label>
            <div className="relative flex items-center">
              <Pencil className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={expenseTitle}
                placeholder={language === 'EN' ? 'e.g. Stall Supplies' : 'อุปกรณ์บูธ'}
                onChange={(e) => setExpenseTitle(e.target.value)}
                className="min-h-11 w-full min-w-0 rounded-xl border border-slate-200/80 bg-slate-50 py-2.5 pl-9 pr-3 text-xs font-semibold text-slate-800 transition-colors focus:bg-white focus:outline-[#7C5CFF]"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              {language === 'EN' ? 'Category' : 'หมวดหมู่'}
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="min-h-11 w-full min-w-0 cursor-pointer appearance-none rounded-xl border border-slate-200/80 bg-slate-50 py-2.5 pl-3 pr-8 text-xs font-semibold text-slate-800 transition-colors focus:bg-white focus:outline-[#7C5CFF]"
              >
                <option value="Stall Supplies"> {language === 'EN' ? 'Stall Supplies' : 'อุปกรณ์บูธ'}</option>
                <option value="Booth Fee">{language === 'EN' ? 'Booth Fee' : 'ค่าใช้จ่ายบูธ'}</option>
                <option value="Travel">{language === 'EN' ? 'Travel' : 'การเดินทาง'}</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Amount (฿) Input */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              {language === 'EN' ? 'Amount (฿)' : 'จำนวน (฿)'}
            </label>
            <div className="relative flex items-center">
              <span className="text-xs font-semibold text-slate-400 absolute left-3.5">
                ฿
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="min-h-11 w-full min-w-0 rounded-xl border border-slate-200/80 bg-slate-50 py-2.5 pl-8 pr-3 text-right text-xs font-bold text-slate-800 transition-colors focus:bg-white focus:outline-[#7C5CFF]"
              />
            </div>
          </div>

          {/* Record Button */}
          <div className="md:col-span-2">
            <button onClick={()=>handleAddExpense()} className="min-h-11 w-full rounded-xl bg-[#FFB24C] py-2.5 text-xs font-bold text-[#0B0F4F] shadow-xs transition-colors hover:bg-[#f5a733] active:bg-[#e99a2e] flex items-center justify-center gap-1">
              <Plus className="w-4 h-4 stroke-[3]" />{language === 'EN' ? 'Record' : 'บันทึก'}
            </button>
          </div>

        </div>
      </div>

      {/* 3. RECORDED EXPENSES CARD */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
        {/* Card Header */}
        <div className="flex flex-col items-start justify-between gap-2 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="flex items-center space-x-2 text-base font-bold text-[#0B0F4F]">
            <Receipt className="w-5 h-5 text-[#FFB24C]" />
            <span> {language === 'EN' ? 'Recorded Expenses' : 'ที่บันทึกแล้ว'}</span>
          </div>
          <span className="max-w-full break-words rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
            {language === 'EN' ? 'Active Read-Only Ledger' : 'เล่มบันทึกอ่านได้เฉพาะ'}
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-5 w-12">#</th>
                <th className="py-3 px-4">{language === 'EN' ? 'Timestamp':'วันที่'}</th>
                <th className="py-3 px-4">{language === 'EN' ? 'Expense Detail' : 'รายละเอียดค่าใช้จ่าย'}</th>
                <th className="py-3 px-4 text-center">{language === 'EN' ? 'Category' : 'ประเภท'}</th>
                <th className="py-3 px-4 text-center">{language === 'EN' ? 'Logged By' : 'บันทึกโดย'}</th>
                <th className="py-3 px-5 text-right">{language === 'EN' ? 'Amount' : 'จำนวน'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {expenses.map((item,index) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-5 font-bold text-[#0B0F4F]">{index + 1}</td>
                  <td className="py-4 px-4 text-slate-400 text-[11px]">{item.timestamp}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full bg-yellow-500`}></span>
                      <span className="font-bold text-slate-800">{item.Description}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border bg-yellow-500`}>
                      {item.Category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-semibold text-slate-700">{item.Paid_by_User_Name} </span>
                    <span className="text-[#FFB24C] font-bold text-[11px]">{item.new}</span>
                  </td>
                  <td className="py-4 px-5 text-right font-black text-[#0B0F4F] text-sm">
                    {item.Amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Summary */}
        <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 p-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span className="text-slate-400 font-medium">
            {language === 'EN' ? 'Showing' : 'แสดง'} {expenses.length}  {language === 'EN' ? 'settled market expenses' : 'ค่าใช้จ่ายตลาด'}
          </span>
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 font-medium"> {language === 'EN' ? 'Subtotal Logged' : 'รวม'}:</span>
            <span className="font-black text-[#FFB24C] text-sm">฿{totalExpenses}</span>
          </div>
        </div>
      </div>

    </div>
               )}
            {/* ADD NEW SUPPLIER BOTTOM CARD */}
            {stepMode === "edit" &&(
            <div className="flex flex-col items-stretch justify-between gap-3 rounded-2xl border-2 border-dashed border-[#DDD6FE] bg-[#EEEEFE] p-4 sm:flex-row sm:items-center sm:p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#6366F1]/10 p-2 text-[#6366F1]">
                  <UserPlus className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-800 text-sm">{language === 'EN' ? 'Add New Supplier' : 'เพิ่มซัพพลายเออร์ใหม่'}</span>
              </div>
              <button className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[#6366F1] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#5558E8]">
                <Plus className="w-4 h-4" /> {language === 'EN' ? 'Add Supplier' : 'เพิ่มซัพพลายเออร์'}
              </button>
            </div>
            )}
          </div>
       
            
        </div>
      </main>

      {/* ---------------- UI: 10s Undo Notification ---------------- */}
{showUndoNotification && (
  <div className="fixed left-3 right-3 top-20 z-50 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3 py-3 shadow-lg animate-in fade-in slide-in-from-top-4 sm:left-1/2 sm:right-auto sm:top-24 sm:-translate-x-1/2 sm:gap-4 sm:rounded-full sm:px-5">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs shrink-0">
      <Check className="h-4 w-4" />
    </div>
    <div className="text-sm">
      <p className="font-bold text-[#0B0F4F]">Sale Confirmed Successfully!</p>
      <p className="text-slate-400 text-xs">Registered items. Stock reserved.</p>
    </div>
    <button 
      onClick={() => {
        handleUndo();
        setShowUndoNotification(false);
      }} 
      className="ml-auto flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-[#FFB24C]/10 px-4 py-1.5 text-sm font-bold text-[#FFB24C] hover:bg-[#FFB24C]/20"
    >
      <Undo2 className="h-4 w-4" /> Undo
    </button>
  </div>
)}

{/* ---------------- UI: Bottom Cart Bar (Current Sales Cart) ---------------- */}
{cart.length > 0 && (
  <div className="fixed bottom-3 left-3 right-3 z-40 flex items-center justify-between gap-3 rounded-2xl bg-[#0B0F4F] px-3 py-3 text-white shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:justify-start sm:gap-6 sm:px-5">
    <div className="flex items-center gap-3">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C5CFF]/20 text-[#7C5CFF]">
        <ShoppingBag className="h-5 w-5" />
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </div>
      <div>
        <p className="text-xs font-bold text-white sm:text-sm">Current Sales Cart •</p>
        <p className="text-[10px] text-slate-300 sm:text-xs">
          ฿{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('en-US')} • {cart.length} items ready
        </p>
      </div>
    </div>
    <button 
      onClick={() => setIsCartOpen(true)}
      className="flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#F062C0] px-3 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-110 active:scale-95 sm:gap-2 sm:px-6 sm:text-sm"
    >
      View Cart <ChevronRight className="h-4 w-4" />
    </button>
  </div>
)}

{/* ---------------- UI: Sidebar Checkout ---------------- */}
{isCartOpen && (
  <div className="fixed inset-0 z-50 flex justify-end">
    {/* Overlay */}
    <div 
      className="absolute inset-0 bg-[#0B0F4F]/20 backdrop-blur-sm"
      onClick={() => setIsCartOpen(false)}
    />
    
    {/* Sidebar Panel */}
    <div className="relative flex h-[100dvh] w-full max-w-[440px] flex-col bg-white shadow-2xl animate-in slide-in-from-right-full">
      <div className="flex items-center justify-between gap-3 border-b border-[#E8E2FF] bg-[#F8F6FF] p-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7C5CFF] text-white shadow-sm">
            <ShoppingBag className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-lg font-extrabold tracking-tight text-[#0B0F4F]">Current Sales Cart</h2>
              <span className="shrink-0 rounded-full bg-[#EEE9FF] px-2 py-0.5 text-[10px] font-bold text-[#7C5CFF]">{cart.length} items</span>
            </div>
            <p className="mt-0.5 truncate text-xs font-medium text-slate-500">In-Cart Checkout</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setCart([])}
          className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
        >
          Clear Cart <X className="h-3.5 w-3.5" />
        </button>
      </div>
      
      {/* Cart Items */}
      <div className="flex-1 space-y-2.5 overflow-y-auto p-4">
        {cart.map((item) => {
          const supplier = products.find((entry) => entry.id === item.supplierId);
          const product = supplier?.products.find((entry) => entry.id === item.productId);
          const ProductIcon = product?.icon ?? Package;
          const supplierBadge = supplier?.category === 'host'
            ? 'bg-[#EEE9FF] text-[#7C5CFF]'
            : supplier?.id.includes('kaimook')
              ? 'bg-[#FCE7F3] text-[#DB2777]'
              : 'bg-[#FFF2DF] text-[#C66A00]';

          return (
            <div key={item.productId} className="flex min-h-[76px] flex-wrap items-center gap-2 rounded-xl bg-[#F0F1FF] px-2.5 py-2">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg ${product?.imageUrl ? 'bg-white' : product?.iconBg ?? 'bg-[#EEE9FF] text-[#7C5CFF]'}`}>
                {product?.imageUrl ? (
                  <span
                    role="img"
                    aria-label={item.name}
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${product.imageUrl}")` }}
                  />
                ) : (
                  <ProductIcon className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold leading-tight text-[#171A2E]">{item.name}</p>
                <div className="mt-1 flex min-w-0 flex-wrap items-center gap-1.5">
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold leading-none ${supplierBadge}`}>
                    {supplier?.category === 'host' ? 'Host' : supplier?.name ?? 'Supplier'}
                  </span>
                  <span className="text-[11px] text-slate-500">฿{item.price.toFixed(2)} each</span>
                </div>
              </div>
              <div className="flex w-full shrink-0 items-center justify-between gap-2 sm:w-auto sm:justify-start">
                <div className="flex h-8 items-center gap-2 rounded-full bg-white px-2.5 shadow-sm">
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(item.productId, -1)}
                    aria-label={`Decrease ${item.name} quantity`}
                    className="flex h-11 w-11 items-center justify-center text-sm font-bold text-[#0B0F4F] hover:text-[#7C5CFF]"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="min-w-3 text-center text-sm font-bold text-[#0B0F4F]">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(item.productId, 1)}
                    disabled={item.quantity >= item.stock}
                    aria-label={`Increase ${item.name} quantity`}
                    className="flex h-11 w-11 items-center justify-center text-sm font-bold text-[#0B0F4F] hover:text-[#7C5CFF] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <span className="min-w-[48px] text-right text-sm font-extrabold text-[#171A2E]">฿{item.price * item.quantity}</span>
                <button
                  type="button"
                  onClick={() => setCart((prev) => prev.filter((cartItem) => cartItem.productId !== item.productId))}
                  aria-label={`Remove ${item.name} from cart`}
                  className="flex h-11 w-11 items-center justify-center text-slate-500 transition-colors hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Bottom Total & Confirm Button */}
      <div className="space-y-3 border-t border-[#E8E2FF] bg-white px-4 pb-4 pt-3">
        <div className="space-y-1.5">
          <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-600">Payment Method</p>
          <div className="flex gap-1 rounded-full bg-[#EEEFFF] p-1" role="group" aria-label="Payment method">
            <button
              type="button"
              onClick={() => setPaymentMethod('mobileBanking')}
              aria-pressed={paymentMethod === 'mobileBanking'}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition-all ${
                paymentMethod === 'mobileBanking'
                  ? 'bg-[#8057F6] text-white shadow-[0_4px_12px_rgba(124,92,255,0.28)]'
                  : 'text-[#171A2E] hover:bg-white/60'
              }`}
            >
              <QrCode className="h-3.5 w-3.5" />
              Mobile banking
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('cash')}
              aria-pressed={paymentMethod === 'cash'}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition-all ${
                paymentMethod === 'cash'
                  ? 'bg-[#8057F6] text-white shadow-[0_4px_12px_rgba(124,92,255,0.28)]'
                  : 'text-[#171A2E] hover:bg-white/60'
              }`}
            >
              <Wallet className="h-3.5 w-3.5" />
              Cash
            </button>
          </div>
        </div>
        <div className="flex items-end justify-between border-t border-slate-100 pt-2">
          <p className="text-sm font-medium text-slate-500">Subtotal in Cart</p>
          <p className="text-xl font-extrabold leading-none text-[#171A2E] sm:text-2xl">
            ฿{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <button 
            onClick={() => setIsCartOpen(false)}
            className="min-h-11 w-full rounded-full bg-[#EEEFFF] px-5 py-2.5 text-sm font-semibold text-[#41445A] transition-colors hover:bg-[#E2E4FF] sm:w-auto"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirmSale}
            className="min-h-11 w-full rounded-full bg-gradient-to-r from-[#8057F6] to-[#E84CC5] py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-105 active:scale-[0.99] sm:flex-1"
          >
            <span className="inline-flex items-center justify-center gap-1.5">
              <Check className="h-4 w-4 rounded-full border border-white p-0.5" />
              Confirm &amp; Log Sale (฿{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('en-US', { maximumFractionDigits: 0 })})
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
)}







      {stepMode === "edit" && (
        <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-[#e9ebf3] bg-white shadow-[0_-3px_12px_rgba(17,23,71,0.04)]">
          <div className="mx-auto flex min-h-[56px] w-full max-w-[1280px] flex-col items-stretch justify-between gap-2 px-3 py-2 sm:flex-row sm:items-center sm:gap-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-2 text-xs">
              <span className="shrink-0 font-bold text-[#7C5CFF]">0  {language === 'EN' ? 'Unsaved changes' : 'การเปลี่ยนแปลงที่ไม่ได้บันทึก'}</span>
              <span className="hidden text-[#d5d7df] sm:inline">•</span>
              <span className="hidden truncate text-[11px] text-[#6F7485] sm:inline">
                 {language === 'EN' ? 'Live run updates will apply instantly to register' : 'การอัปเดตรันสดจะใช้กับเครื่องบันทึกเงินสดทันที'}.
              </span>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => setStepMode("sales")}
                className="min-h-11 flex-1 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-xs font-semibold text-[#BA1A1A] transition-colors hover:bg-[#FEE2E2] sm:min-h-0 sm:flex-none"
              >
                {language === 'EN' ? 'Discard Changes' : 'ทิ้งการเปลี่ยนแปลง'}
              </button>
              <button
                type="button"
                onClick={() => handleSaveChanges()}
                className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#ffb84d] to-[#ff9c22] px-4 py-2 text-xs font-bold text-[#111747] shadow-sm transition hover:brightness-105 sm:min-h-0 sm:flex-none"
              >
                <Check className="h-3.5 w-3.5" />  {language === 'EN' ? 'Apply to run' : 'บันทึกการเปลี่ยนแปลง'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <SupplierInviteModal
          onClose={() => setIsOpen(false)}
          copied={copied}
          onCopy={handleCopy}
          inviteUrl={inviteUrl}
          joinPin={joinPin}
          onOpenPermissions={() => {
            setIsOpen(false);
            setIsPermissionEnabled(true);
          }}
          language={language}
        />
      )}
      {isPermissionEnabled && (
       < AssistantPermissionsModal
       onClose={() => setIsPermissionEnabled(false)}
       language={language}
       />
      )}
      {isEndRunOpen && (
        <EndSalesRunModal
          isConfirmed={isEndRunConfirmed}
          onClose={() => {
            setIsEndRunOpen(false);
            setIsFinalEndRunOpen(false);
          }}
          onRequestConfirmation={() => setIsFinalEndRunOpen(true)}
          onUnconfirm={() => setIsEndRunConfirmed(false)}
          onConfirmEndRun={() => {
            endRunSendRequest();
            setIsEndRunOpen(false);
            setIsEndRunConfirmed(false);
          }}
          language={language}
        />
      )}
      {isFinalEndRunOpen && (
        <FinalEndRunModal
          onClose={() => {
            setIsFinalEndRunOpen(false);
            setIsEndRunOpen(false);
            setIsEndRunConfirmed(false);
          }}
          onCancel={() => {
            setIsFinalEndRunOpen(false);
            setIsEndRunConfirmed(false);
          }}
          onConfirm={() => {
            setIsFinalEndRunOpen(false);
            setIsEndRunConfirmed(true);
          }}
          language={language}
        />
      )}
      {imageProduct && (
        <ProductImageModal
          productName={imageProduct.name}
          imageUrl={imageProduct.imageUrl}
          language={language}
          onClose={() => setImageProduct(null)}
          onSave={handleSaveProductImage}
        />
      )}
    </div>
  );



}
type PermissionProps = {
  registerSales: boolean;
  issueDiscounts: boolean;
  voidTransaction: boolean;
  viewInventory: boolean;
  restockQuantities: boolean;
  addNewProducts: boolean;
};
type ActivePermissionTab = 'global' | 'may' | 'tanawat';
type PermissionModalProps = {
  onClose: () => void;
  activity: ActivePermissionTab;
  permission: PermissionProps;
  activitySet: React.Dispatch<React.SetStateAction<ActivePermissionTab>>;
  togglePermission: (key: keyof PermissionProps) => void;
  resetPermissions: () => void;
};
type SupplierInviteModalProps = {
  onClose: () => void;
  copied: boolean;
  onCopy: () => void;
  inviteUrl: string;
  joinPin: string;
  onOpenPermissions: () => void;
  language: 'EN' | 'TH';
};
// MODAL COMPONENT: Supplier Invite Modal
function SupplierInviteModal({ onClose, copied, onCopy, inviteUrl, joinPin, onOpenPermissions,language }: SupplierInviteModalProps) {
  return (
    <div onClick={() => onClose()} className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-3 backdrop-blur-sm transition-all animate-in fade-in duration-200 sm:items-center sm:p-4">
      
      {/* MODAL CARD */}
      <div onClick={(e) => e.stopPropagation()} className="my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-y-auto rounded-2xl border border-slate-100/80 bg-white shadow-2xl animate-in zoom-in-95 duration-200 sm:rounded-3xl">
        
        {/* 1. MODAL HEADER */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-4 pb-4 sm:p-6 sm:pb-4">
          <div className="flex min-w-0 items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#7C5CFF] to-[#F062C0] text-white flex items-center justify-center shrink-0 shadow-sm">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0B0F4F] tracking-tight leading-snug">
                {language === 'EN' ? 'Invite Run Assistants' : 'เชิญผู้ช่วยรัน'}
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5 leading-relaxed">
                {language === 'EN' ? 'Invited Assistants need permission from you to make actions' : 'ผู้ช่วยที่ได้รับเชิญต้องได้รับอนุญาตจากคุณในการดำเนินการ'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onClose()}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. MODAL BODY */}
        <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">
          
          {/* Top Section: Link/PIN (Left) + QR Code (Right) */}
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-12">
            
            {/* Left Inputs (8 cols) */}
            <div className="col-span-1 flex flex-col justify-between space-y-4 sm:col-span-7">
              
              {/* RUN INVITE LINK */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {language === 'EN' ? 'RUN INVITE LINK' : 'ลิงก์เชิญรัน'}
                </label>
                <div className="flex items-center gap-1.5">
                  <div                   className="bg-[#7C5CFF]/5 border border-[#7C5CFF]/20 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 truncate w-full">
                    {inviteUrl}
                  </div>
                  <button
                    onClick={() => onCopy()}
                    className="bg-[#FFB24C] hover:bg-[#f5a733] active:bg-[#e99a2e] text-[#0B0F4F] font-bold text-xs px-3 py-2 rounded-xl transition-colors shadow-xs flex items-center gap-1 shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* RUN JOIN CODE / PIN */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {language === 'EN' ? 'RUN JOIN CODE / PIN' : 'รหัสเข้าร่วม/พินของรัน'}
                </label>
                <div className="inline-flex w-fit min-w-[8rem] items-center justify-center whitespace-nowrap rounded-xl border border-[#7C5CFF]/20 bg-[#7C5CFF]/5 px-4 py-2.5 text-center text-base font-black tracking-wider text-[#7C5CFF]">
                  {joinPin}
                </div>
              </div>

            </div>

            {/* Right QR Box (5 cols) */}
            <div className="col-span-1 flex flex-col items-center justify-center space-y-2 rounded-2xl border border-slate-100 bg-slate-50/60 p-3 text-center sm:col-span-5">
              <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                {/* Simulated QR Code Graphic */}
                <div className="w-16 h-16 bg-white relative flex items-center justify-center">
                  <QrCode className="w-full h-full text-[#0B0F4F]" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400">
                {language === 'EN' ? 'Fast Booth Scan' : 'สแกนบูธอย่างรวดเร็ว'}
              </span>
            </div>

          </div>

          {/* ASSISTANTS JOINED (2) SECTION */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
               {language === 'EN' ? 'ASSISTANTS JOINED ' : 'ผู้ช่วยที่เข้าร่วม'} (2)
            </label>

            <div className="space-y-2">
              {/* Assistant 1: @may_craft (Active) */}
              <div className="bg-[#7C5CFF]/5 border border-[#7C5CFF]/15 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#7C5CFF] text-white font-bold text-xs flex items-center justify-center uppercase shadow-2xs">
                    MC
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    @may_craft
                  </span>
                </div>
                <span className="bg-emerald-100/80 text-emerald-700 border border-emerald-200/60 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {language === 'EN' ? 'Active' : 'ใช้งาน'}
                </span>
              </div>

              {/* Assistant 2: granawan.b (Offline) */}
              <div className="bg-[#7C5CFF]/5 border border-[#7C5CFF]/15 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center uppercase">
                    TB
                  </div>
                  <span className="text-xs font-semibold text-slate-600">
                    granawan.b
                  </span>
                </div>
                <span className="bg-slate-100 text-slate-500 border border-slate-200/60 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  {language === 'EN' ? 'Offline' : 'ออฟไลน์'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. MODAL FOOTER */}
        <div className="flex flex-col-reverse items-stretch justify-end gap-2.5 border-t border-slate-100 bg-slate-50/50 p-4 sm:flex-row sm:items-center sm:space-x-2.5">
          <button onClick={onOpenPermissions} className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#6366F1]/20 bg-white px-4 py-2 text-xs font-bold text-[#6366F1] shadow-2xs transition-colors hover:bg-slate-50">
            <Shield className="w-3.5 h-3.5 text-[#6366F1]" />
            <span>{language === 'EN' ? 'Assistant Permissions' : 'สิทธิ์ของผู้ช่วย'}</span>
          </button>
          
          <button
            onClick={() => onClose()}
            className="min-h-11 rounded-xl bg-[#6366F1] px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#5558E8]"
          >
            {language === 'EN' ? 'Done' : 'เสร็จสิ้น'}
          </button>
        </div>

      </div>
    </div>
  );
}


// COMPONENT: Product Group Section (ใช้สร้างตารางสินค้าแต่ละ Supplier)
function getSupplierAccent(id: string) {
  
  return {
    dot: "bg-[#7C5CFF]",
    badge: "text-[#6366F1]",
    count: "border-[#7C5CFF]/20 bg-[#7C5CFF]/5 text-[#7C5CFF]",
  };
}

function ProductGroupSection({ title, badgeText, badgeColor, countColor, itemCount, dotColor, items, placeholderText, language, onImageClick, onProductChange, onAddProduct, onDeleteProduct }:any) {
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  const handleAddProduct = () => {
    const trimmedName = name.trim();
    const parsedStock = Number(stock);
    const parsedPrice = Number(price);

    if (!trimmedName || stock === '' || price === '' || !Number.isInteger(parsedStock) || parsedStock < 0 || !Number.isFinite(parsedPrice) || parsedPrice < 0) {
      return;
    }

    onAddProduct({
      name: trimmedName,
      start: parsedStock,
      stock: parsedStock,
      price: parsedPrice,
      sold: 0,
      icon: Package,
      iconBg: 'bg-[#7C5CFF]/10 text-[#7C5CFF]',
    });
    setName('');
    setStock('');
    setPrice('');
  };

  return (
    <div className="space-y-3">
      {/* Group Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#EEE9FF] bg-white px-3 py-3 shadow-sm sm:flex-nowrap sm:gap-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotColor}`}></span>
          <h2 className="truncate font-bold text-[#0B0F4F] text-xl">{title}</h2>
          <span className={`flex shrink-0 items-center self-center rounded-full px-2 py-1 text-[10px] font-extrabold leading-none ${badgeColor}`}>
            {badgeText === "host" ? "Host" : "Supplier"}
          </span>
        </div>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${countColor}`}>
          {language === 'EN' ? `${itemCount} items` : `${itemCount} รายการ`}
        </span>
      </div>

      {/* Table Header */}
      <div className="overflow-hidden rounded-2xl border border-[#EEE9FF] bg-white shadow-sm">
      <div className="hidden grid-cols-12 border-b border-[#EEE9FF] bg-[#EEE9FF] px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[#0B0F4F] sm:grid">
        <div className="col-span-5">{language === 'EN' ? 'PRODUCT NAME' : ' ชื่อสินค้า'}</div>
        <div className="col-span-3 text-center">{language === 'EN' ? 'STOCK / QTY' : 'สต๊อก / ปริมาณ'}</div>
        <div className="col-span-2 text-center">{language === 'EN' ? 'PRICE (฿)' : 'ราคา (฿)'}</div>
        <div className="col-span-1 text-center">{language === 'EN' ? 'SOLD' : 'ขายแล้ว'}</div>
        <div className="col-span-1 text-center">{language === 'EN' ? 'ACTION' : 'การทำงาน'}</div>
      </div>

      {/* Product Rows */}
      <div>
        {items.map((item:any) => {
          const IconComponent = item.icon;

          return (
            <div key={item.id} className="grid grid-cols-12 items-center gap-y-2 border-b border-slate-200 px-3 py-3 text-xs font-medium transition-colors last:border-b-0 hover:bg-slate-50/70 sm:px-4">
              <div className="col-span-12 flex min-w-0 items-center gap-2.5 sm:col-span-5">
                <button
                  type="button"
                  onClick={() => onImageClick?.(item)}
                  aria-label={`Edit icon for ${item.name}`}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 shadow-2xs ${item.imageUrl ? 'bg-white' : item.iconBg}`}
                >
                  {item.imageUrl ? (
                    <span
                      role="img"
                      aria-label={item.name}
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url("${item.imageUrl}")` }}
                    />
                  ) : (
                    <IconComponent className="h-5 w-5" />
                  )}
                </button>
                <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor}`}></span>
                <input
                  type="text"
                  value={item.name}
                  onChange={(event) => onProductChange(item.id, { name: event.target.value })}
                  className="min-h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs focus:outline-[#7C5CFF] sm:min-h-0 sm:w-fit sm:min-w-[50%]"
                />
              </div>

              {/* Qty Stepper */}
              <div className="col-span-6 flex w-full items-center justify-center gap-1.5 justify-self-center rounded-lg border border-[#EEE9FF] bg-[#EEE9FF] px-1 py-1 sm:col-span-3 sm:w-fit sm:px-2">
                <span className="text-[10px] font-semibold text-slate-500 sm:hidden">{language === 'EN' ? 'Stock' : 'สต็อก'}</span>
                <button type="button" onClick={() => onProductChange(item.id, { stock: Math.max(0, item.stock - 1) })} disabled={item.stock === 0} className="flex h-11 w-11 items-center justify-center rounded-md border border-[#EEE9FF] bg-white text-[#7C5CFF] shadow-2xs hover:bg-[#F8F7FF] disabled:cursor-not-allowed disabled:opacity-40 sm:h-6 sm:w-6">
                  <Minus className="h-2.5 w-2.5" />
                </button>
                <span className="w-7 text-center text-xs font-bold text-[#7C5CFF]">{item.stock}</span>
                <button type="button" onClick={() => onProductChange(item.id, { stock: item.stock + 1 })} className="flex h-11 w-11 items-center justify-center rounded-md border border-[#EEE9FF] bg-white text-[#7C5CFF] shadow-2xs hover:bg-[#F8F7FF] sm:h-6 sm:w-6">
                  <Plus className="h-2.5 w-2.5" />
                </button>
              </div>

              {/* Price */}
              <div className="col-span-6 flex min-w-0 items-center justify-center sm:col-span-2">
                <div className="flex min-h-11 w-full min-w-0 items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 shadow-2xs sm:min-h-0 sm:w-20">
                  <span className="text-[10px] font-semibold text-slate-500 sm:hidden">{language === 'EN' ? 'Price' : 'ราคา'}</span>
                  <span className="font-bold text-[#FFB24C]">฿</span>
                  <input
                    type="text"
                    value={item.price}
                    onChange={(event) => {
                      const nextPrice = Number(event.target.value);
                      if (Number.isFinite(nextPrice) && nextPrice >= 0) {
                        onProductChange(item.id, { price: nextPrice });
                      }
                    }}
                    className="w-full bg-transparent text-center text-xs font-bold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              {/* Sold Count */}
              <div className="col-span-6 flex items-center justify-center gap-1 text-center font-bold text-slate-700 sm:col-span-1">
                <span className="text-[10px] font-semibold text-slate-500 sm:hidden">{language === 'EN' ? 'Sold' : 'ขาย'}</span>
                {item.sold}
              </div>

              {/* Delete Action */}
              <div className="col-span-6 flex items-center justify-center text-center sm:col-span-1">
                <button type="button" onClick={() => onDeleteProduct(item.id)} aria-label={`Remove ${item.name}`} className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500 sm:h-auto sm:w-auto sm:p-1.5">
                  <Trash2 className="mx-auto h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      </div>
      {/* Add Item Form Row */}
      <div className="grid grid-cols-6 items-center gap-2 rounded-2xl border border-[#EEE9FF] bg-[#EEE9FF] p-3 sm:grid-cols-12">
        <div className="col-span-6 sm:col-span-6">
          <input
            type="text"
            placeholder={language === 'EN' ? 'Items Name (e.g. T-Shirt)' : 'ชื่อสินค้า (เช่น เสื้อยืด)'}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="min-h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] transition-all placeholder:text-slate-500 focus:outline-[#6366F1]"
          />
        </div>
        <div className="col-span-3 sm:col-span-2">
          <input
            type="number"
            placeholder={language === 'EN' ? 'Qty' : 'ปริมาณ'}
            min="0"
            step="1"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            className="min-h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-[11px] transition-all placeholder:text-slate-500 focus:outline-[#6366F1]"
          />
        </div>
        <div className="col-span-3 sm:col-span-2">
          <input
            type="number"
            placeholder={language === 'EN' ? 'Price ฿' : 'ราคา (฿)'}
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="min-h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-[11px] transition-all placeholder:text-slate-500 focus:outline-[#6366F1]"
          />
        </div>
        <div className="col-span-6 sm:col-span-2">
          <button type="button" onClick={handleAddProduct} className="flex min-h-11 w-full items-center justify-center gap-1 rounded-xl bg-[#7C5CFF] py-2 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-[#6847e8]">
            <PlusCircle className="w-3.5 h-3.5" />{language === 'EN' ? 'Add Product' : 'เพิ่มสินค้า'}
          </button>
        </div>
      </div>
    </div>
  );
}
function ProductCard({ item, onSell, language }: { item: InventoryProduct; onSell: (id: string) => void; language: 'EN' | 'TH' }) {
  const IconComponent = item.icon;
  const isOutOfStock = item.stock === 0;
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="flex min-h-[88px] flex-col items-stretch justify-between gap-3 rounded-xl border border-slate-100/80 bg-white p-3 shadow-2xs transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:p-4">
      {/* Left Column: Icon + Name + Stock Info */}
      <div className="flex min-w-0 items-center gap-2">
        <div
          className="group relative shrink-0"
          onMouseMove={(event) => setTooltipPosition({ x: event.clientX, y: event.clientY })}
        >
          <div
            aria-hidden="true"
            className={`flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg ${item.imageUrl ? 'bg-white' : item.iconBg}`}
          >
            {item.imageUrl ? (
              <span
                role="img"
                aria-label={item.name}
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url("${item.imageUrl}")` }}
              />
            ) : (
              <IconComponent className="h-7 w-7" />
            )}
          </div>
          <span
            role="tooltip"
            style={{ left: tooltipPosition.x + 12, top: tooltipPosition.y + 12 }}
            className="pointer-events-none fixed z-50 w-36 rounded-lg bg-[#0B0F4F]/75 px-2 py-1.5 text-center text-[10px] font-medium leading-tight text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
          >
            Image can be changed
            <br />
            in edit mode
          </span>
        </div>

        <div className="min-w-0 space-y-0.5">
          <h3 className="truncate text-base font-bold tracking-tight text-[#0B0F4F]">
            {item.name}
          </h3>
          <div className="flex flex-wrap items-center gap-x-1.5 text-xs font-medium text-slate-400">
            <span>{language === 'EN' ? 'Start' : 'เริ่ม'}: <strong className="text-slate-700">{item.start}</strong></span>
            <span>•</span>
            <span className={isOutOfStock ? 'text-[#ED571B] font-semibold' : 'text-[#7C5CFF] font-semibold'}>
              {isOutOfStock ? (language === 'EN' ? 'Out of stock' : 'หมดสต็อก') : `${item.stock} ${language === 'EN' ? 'in stock' : 'ในสต็อก'}`}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Price + Sold Count + Sell Button */}
      <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-start">
        <div className="text-right">
          <div className="flex items-center justify-end text-lg font-black leading-none text-[#0B0F4F]">
            <span className="mr-0.5 text-sm font-extrabold">฿</span>
            {item.price}
          </div>
          <p className="mt-1 text-sm font-medium text-slate-400">
            {language === 'EN' ? 'Sold' : 'ขายแล้ว'}: <span className="font-bold text-slate-700">{item.sold}</span>
          </p>
        </div>

        {/* <button
          onClick={() => onSell(item.id)}
          disabled={isOutOfStock}
          className={`flex min-h-11 flex-1 items-center justify-center gap-1 rounded-xl px-5 text-sm font-bold text-white shadow-xs transition-all active:scale-95 sm:h-9 sm:min-h-0 sm:min-w-[112px] sm:flex-none ${
            isOutOfStock
              ? 'bg-gray-400 opacity-90 cursor-not-allowed'
              : 'bg-[#7C5CFF] hover:bg-[#6847e8] active:bg-[#5536d2]'
          }`}
        >
          {language === 'EN' ? 'Sell - 1' : 'ขาย - 1'}
        </button>
      </div> */}
      <button
    onClick={() => onSell(item.id)}
  disabled={isOutOfStock}
  className={`flex min-h-11 flex-1 items-center justify-center gap-1 rounded-xl px-5 text-sm font-bold text-white shadow-xs transition-all active:scale-95 sm:h-9 sm:min-h-0 sm:min-w-[112px] sm:flex-none ${
    isOutOfStock
      ? 'bg-gray-400 opacity-90 cursor-not-allowed'
      : 'bg-[#7C5CFF] hover:bg-[#6847e8] active:bg-[#5536d2]'
  }`}
>
  {language === 'EN' ? 'Sell - 1' : 'ขาย - 1'}
</button>
</div>
    </div>
  );
}
type AssistantPermissionsModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (permissions: Record<string, boolean>) => void;
  language?: 'EN' | 'TH';
};
function AssistantPermissionsModal({
  isOpen = true,
  onClose = () => {},
  onSave = () => {},
  language
}: AssistantPermissionsModalProps) {
  // State สำหรับเก็บสถานะสวิตช์ทั้ง 5 รายการ (ค่าเริ่มต้นปิดทั้งหมด 0/5 ตามรูป)
  const [permissions, setPermissions] = useState({
    sellProducts: false,
    editProducts: false,
    recordExpenses: false,
    viewSalesLog: false,
    managePermissions: false
  });

  // State สำหรับ Dropdown เลือก Assistant
  const [selectedAssistant, setSelectedAssistant] = useState('@ploy_w');

  // ฟังก์ชันสลับการเปิด/ปิดสวิตช์ Toggle
  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // คำนวณจำนวนรายการที่เปิดใช้งาน
  const enabledCount = Object.values(permissions).filter(Boolean).length;

  // ถ้าสั่งปิด Modal ให้คืนค่า null ไม่แสดงผล
  if (!isOpen) return null;

  return (
    // BACKDROP (ฉากหลังมืดโปร่งแสง + เบลอด้วย backdrop-blur-sm)
    <div onClick={()=>onClose()} className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-2 sm:p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-200">
      
      {/* MODAL CONTAINER */}
      <div onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-3xl max-h-[calc(100vh-1rem)] sm:max-h-[90vh] rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* 1. MODAL HEADER */}
        <div className="p-4 sm:p-6 pb-4 sm:pb-5 flex items-start justify-between gap-3 border-b border-slate-100 shrink-0">
          <div className="flex items-start gap-2.5 sm:gap-3.5 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0B0F4F] tracking-tight">
                {language === 'EN' ? 'Assistant Permissions' : 'สิทธิ์ของผู้ช่วย'}
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed max-w-xs">
                
                {language === 'EN' ? 'Default permissions for new assistants: All disabled (toggle on individually to grant access).' : 'สิทธิ์เริ่มต้นสำหรับผู้ช่วยใหม่: ปิดทั้งหมด (เปิดทีละรายการเพื่อให้สิทธิ์เข้าถึง)'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. MODAL BODY */}
        <div className="p-4 sm:p-5 space-y-3 sm:overflow-visible overflow-y-auto">
          
          {/* SELECT ASSISTANT SECTION */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
              {language === 'EN' ? <span>SELECT ASSISTANT</span> : <span>เลือกผู้ช่วย</span>}
              <span className="text-slate-400 font-semibold lowercase">3 joined {language === 'EN' ? 'joined' : 'เข้าร่วม'}</span>
            </div>

            {/* Custom Dropdown Box */}
            <div className="bg-[#6366F1]/5 border border-[#6366F1]/20 rounded-2xl p-2.5 flex items-center justify-between cursor-pointer hover:bg-[#6366F1]/10 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#6366F1] text-white font-bold text-sm flex items-center justify-center uppercase shadow-xs">
                  P
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-[#0B0F4F] text-sm">
                      {selectedAssistant}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-semibold">
                    <span className="text-[#FFB24C]">
                      {language === 'EN' ? 'Restricted (Viewer only)' : 'ถูกจำกัด (ดูเท่านั้น)'}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400 font-medium">
                      {language === 'EN' ? 'All permissions off by default' : 'สิทธิ์ทั้งหมดถูกปิดโดยค่าเริ่มต้น'}
                    </span>
                  </div>
                </div>
              </div>

              <ChevronDown className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* PERMISSIONS SECTION */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {language === 'EN' ? 'PERMISSIONS' : ' สิทธิ์'}
              </span>
              <span className={`text-[11px] sm:text-xs font-bold ${enabledCount > 0 ? "text-emerald-600" : "text-[#6366F1]"}`}>
                {language === 'EN' ? 'All permissions off by default' : 'สิทธิ์ทั้งหมดถูกปิดโดยค่าเริ่มต้น'} ({enabledCount}/5  {language === 'EN' ? 'enabled' : 'เปิดใช้งาน'})
              </span>
            </div>

            {/* LIST OF PERMISSION TOGGLES */}
            <div className="space-y-1.5">
              
              {/* Item 1: Sell Products / Cashier Mode */}
              <PermissionToggleRow
                icon={<Calculator className={`w-5 h-5 ${permissions.sellProducts ? "text-emerald-600" : "text-[#6366F1]"}`} />}
                title={language === 'EN' ? 'Sell Products / Cashier Mode' : 'ขายสินค้า / โหมดแคชเชียร์'}
                description={language === 'EN' ? 'Sell products and register sales transactions in Sales Mode' : 'ขายสินค้าและบันทึกการทำธุรกรรมการขายในโหมดการขาย'}
                enabled={permissions.sellProducts}
                onToggle={() => togglePermission('sellProducts')}
              />

              {/* Item 2: Add / Edit / Delete Products */}
              <PermissionToggleRow
                icon={<Edit3 className={`w-5 h-5 ${permissions.editProducts ? "text-emerald-600" : "text-[#6366F1]"}`} />}
                title={language === 'EN' ? 'Add / Edit / Delete Products' : 'เพิ่ม / แก้ไข / ลบสินค้า'}
                description={language === 'EN' ? 'Manage catalog items, quantities, and pricing' : 'จัดการรายการสินค้า, ปริมาณ, และราคา'}
                enabled={permissions.editProducts}
                onToggle={() => togglePermission('editProducts')}
              />

              {/* Item 3: Record Booth Expenses */}
              <PermissionToggleRow
                icon={<Receipt className={`w-5 h-5 ${permissions.recordExpenses ? "text-emerald-600" : "text-[#6366F1]"}`} />}
                title={language === 'EN' ? 'Record Booth Expenses' : 'บันทึกค่าใช้จ่ายของบูธ'}
                description={language === 'EN' ? 'Record booth expenses and operational costs' : 'บันทึกค่าใช้จ่ายของบูธและค่าใช้จ่ายในการดำเนินงาน'}
                enabled={permissions.recordExpenses}
                onToggle={() => togglePermission('recordExpenses')}
              />

              {/* Item 4: View Sales Log & Gross Stats */}
              <PermissionToggleRow
                icon={<History className={`w-5 h-5 ${permissions.viewSalesLog ? "text-emerald-600" : "text-[#6366F1]"}`} />}
                title={language === 'EN' ? 'View Sales Log & Gross Stats' : 'ดูบันทึกการขายและสถิติทั้งหมด'}
                description={language === 'EN' ? 'Access transaction history, undo sales, and total stats' : 'เข้าถึงประวัติการทำธุรกรรม, ยกเลิกการขาย, และสถิติทั้งหมด'}
                enabled={permissions.viewSalesLog}
                onToggle={() => togglePermission('viewSalesLog')}
              />

              {/* Item 5: Manage & Grant Permissions */}
              <PermissionToggleRow
                icon={<Shield className={`w-5 h-5 ${permissions.managePermissions ? "text-emerald-600" : "text-[#6366F1]"}`} />}
                title={language === 'EN' ? 'Manage & Grant Permissions' : 'จัดการและให้สิทธิ์'}
                badgeText="RESTRICTED"
                description={language === 'EN' ? 'Assign roles and grant assistant permissions' : 'กำหนดบทบาทและให้สิทธิ์แก่ผู้ช่วย'}
                enabled={permissions.managePermissions}
                onToggle={() => togglePermission('managePermissions')}
              />

            </div>
          </div>

        </div>

        {/* 3. MODAL FOOTER */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200/80 transition-colors"
          >
            {language === 'EN' ? ' Cancel' : ' ยกเลิก'}
          </button>
          
          <button
            onClick={() => onSave(permissions)}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#6366F1] hover:bg-[#5558E8] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span> {language === 'EN' ? 'Save Permissions' : 'บันทึกสิทธิ์'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

// COMPONENT ย่อยสำหรับสวิตช์แต่ละแถว
type PermissionToggleRowProps = {
  icon: React.ReactNode;
  title: string;
  badgeText?: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
};

function PermissionToggleRow({
  icon,
  title,
  badgeText,
  description,
  enabled,
  onToggle
}: PermissionToggleRowProps) {
  return (
    <div
      onClick={onToggle}
      className={`flex items-center justify-between gap-3 rounded-xl border p-2.5 shadow-2xs transition-colors cursor-pointer ${
        enabled
          ? 'border-emerald-200 bg-emerald-50/70 hover:bg-emerald-50'
          : 'border-slate-100/90 bg-white hover:bg-slate-50/60'
      }`}
    >
      <div className="flex min-w-0 items-center space-x-3 pr-2">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${enabled ? 'bg-emerald-100' : 'bg-[#6366F1]/5'}`}>
          {icon}
        </div>
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-[#0B0F4F] text-[11px] tracking-tight">
              {title}
            </h3>
            {badgeText && (
              <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-[#6366F1]/10 text-[#6366F1] uppercase tracking-wider">
                {badgeText}
              </span>
            )}
          </div>
          <p className="truncate text-[10px] text-slate-400 font-medium leading-normal">
            {description}
          </p>
        </div>
      </div>

      {/* TOGGLE SWITCH */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 focus:outline-none ${
          enabled ? 'bg-emerald-500' : 'bg-slate-200'
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-xs transform transition-transform duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
type EndSalesRunModalProps = {
  isOpen?: boolean;
  isConfirmed: boolean;
  onClose?: () => void;
  onRequestConfirmation: () => void;
  onUnconfirm: () => void;
  onConfirmEndRun?: () => void;
  language?: 'EN' | 'TH';
};
function EndSalesRunModal({
  isOpen = true,
  isConfirmed,
  onClose = () => {},
  onRequestConfirmation,
  onUnconfirm,
  onConfirmEndRun = () => {},
  language = 'EN'
}: EndSalesRunModalProps) {
  const isReadyToSubmit = isConfirmed;

  // ถ้าสั่งปิด Modal ให้คืนค่า null ไม่แสดงผล
  if (!isOpen) return null;

  return (
    // BACKDROP (ฉากหลังมืดโปร่งแสง + เบลอด้วย backdrop-blur-sm)
    <div onClick={()=>onClose()} className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-3 backdrop-blur-sm transition-all duration-200 sm:items-center sm:p-4">
      
      {/* MODAL CONTAINER */}
      <div onClick={(e) => e.stopPropagation()} className="my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-lg flex-col overflow-y-auto rounded-2xl border border-slate-100 bg-white shadow-2xl animate-in zoom-in-95 duration-200 sm:rounded-3xl">
        
        {/* 1. MODAL HEADER */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-4 pb-4 sm:p-6 sm:pb-5">
          <div className="flex min-w-0 items-start space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#BE123C]/5 border border-[#BE123C]/15 text-[#BE123C] flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#BE123C] tracking-tight">
                {language === 'EN' ? 'End Active Sales Run' : 'จบการทำงานขายที่ใช้งานอยู่'}
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5 leading-relaxed">
                {language === 'EN' ? 'Confirm to permanently close this sales session' : 'ยืนยันเพื่อปิดเซสชันการขายนี้อย่างถาวร'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. MODAL BODY */}
        <div className="space-y-5 p-4 sm:p-6">
          
          {/* STEP 1: SESSION LOCKDOWN WARNINGS BOX */}
          <div className="bg-[#BE123C]/5 border border-[#BE123C]/15 rounded-2xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-[#BE123C] font-bold text-xs">
              <Lock className="w-4 h-4 shrink-0" />
              <span>{language === 'EN' ? 'Step 1: Session Lockdown Warnings' : 'ขั้นตอนที่ 1: คำเตือนการล็อกเซสชัน'}</span>
            </div>

            <ul className="text-[11px] text-slate-500 font-medium space-y-1 pl-6 list-disc marker:text-slate-400 leading-relaxed">
              <li> {language === 'EN' ? 'Disconnects active assistants (Ploy W. and others).' : 'จะตัดการเชื่อมต่อผู้ช่วยที่ใช้งานอยู่ รวมถึง Ploy W. และอื่นๆ.'}</li>
              <li> {language === 'EN' ? 'Locks all product inventories and disables instant sales logging.' : 'จะป้องกันการบันทึกการขายใหม่ๆ.'}</li>
              <li>{language === 'EN' ? 'Calculates final supplier payouts and locks telemetry tallies.' : 'จะคำนวณการชำระเงินให้ผู้จัดหาสุดท้ายและป้องกันการบันทึกข้อมูลทางเทคนิค'}</li>
            </ul>
          </div>

          {/* STEP 2: VERIFICATION & RECONCILIATION */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-800">
              {language === 'EN' ? 'Confirmation' : 'การยืนยัน'}
            </h3>

            {/* CONFIRMATION CHECKBOX BOX */}
            <label
              onClick={() => {
                if (isConfirmed) {
                  onUnconfirm();
                } else {
                  onRequestConfirmation();
                }
              }}
              className="bg-[#EEE9FF] border border-[#E4E6F2] rounded-2xl p-3.5 flex items-center space-x-3 cursor-pointer hover:bg-[#EEE9FF]/80 transition-colors select-none"
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                  isConfirmed ? 'bg-[#7C5CFF] text-white' : 'border border-[#E4E6F2] bg-white'
                }`}
              >
                {isConfirmed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs font-bold text-[#0B0F4F]">
                {language === 'EN' ? 'I confirm that the sales session has ended.' : ' ฉันยืนยันว่าการขายได้สิ้นสุดลงแล้ว'}
              </span>
            </label>

          </div>

        </div>

        {/* 3. MODAL FOOTER */}
        <div className="flex flex-col-reverse items-stretch justify-end gap-2.5 border-t border-slate-100 bg-slate-50/50 p-4 sm:flex-row sm:items-center sm:space-x-3">
          <button
            onClick={onClose}
            className="min-h-11 rounded-xl border border-slate-200/80 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100"
          >
            {language === 'EN' ? 'Cancel' : 'ยกเลิก'}
          </button>
          
          <button
            onClick={() => {
              if (isReadyToSubmit) onConfirmEndRun();
            }}
            disabled={!isReadyToSubmit}
            className={`flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-all ${
              isReadyToSubmit
                ? 'bg-[#BE123C] hover:bg-[#9F1239] active:bg-[#881337] cursor-pointer'
                : 'bg-[#BE123C]/40 cursor-not-allowed opacity-70'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            {language === 'EN' ? <span>OK</span> : <span>ตกลง</span>}
          </button>
        </div>

      </div>
    </div>
  );
}

function FinalEndRunModal({
  onClose,
  onCancel,
  onConfirm,
  language,
}: {
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  language: 'EN' | 'TH';
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#11152E]/90 p-3 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="final-end-run-title"
        className="my-auto w-full max-w-[580px] overflow-hidden rounded-2xl bg-[#FFF2F2] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-[#0B0F4F]">
                {language === 'EN' ? 'End Active Sales Run' : 'จบการทำงานขายที่ใช้งานอยู่'}
              </h2>
              <p className="text-xs font-medium text-slate-500">
                {language === 'EN'
                  ? 'Two-step verification required to permanently close session'
                  : 'ต้องยืนยันสองขั้นตอนเพื่อปิดเซสชันอย่างถาวร'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={language === 'EN' ? 'Close' : 'ปิด'}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex min-h-[200px] flex-col items-center justify-center gap-8 px-4 py-6 sm:min-h-[235px] sm:gap-12 sm:px-6 sm:py-8">
          <h3
            id="final-end-run-title"
            className="text-4xl font-extrabold tracking-tight text-[#BE123C] sm:text-5xl"
          >
            {language === 'EN' ? 'End Run?' : 'จบการขาย?'}
          </h3>
          <div className="flex w-full max-w-[350px] items-center justify-between gap-5">
            <button
              type="button"
              onClick={onCancel}
              className="min-h-11 flex-1 rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-bold text-slate-500 transition-colors hover:bg-slate-50"
            >
              {language === 'EN' ? 'No' : 'ไม่'}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="min-h-11 flex-1 rounded-xl bg-red-600 px-5 py-3 text-base font-bold text-white transition-colors hover:bg-red-700"
            >
              {language === 'EN' ? 'Yes' : 'ใช่'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SaleSection({
  products,
  handleSell,
  Name,
  Role,
  id,
  language
}: {
  products: InventoryProduct[];
  handleSell: (id: string) => void;
  Name: string;
  Role: string;
  id: string;
  language: 'EN' | 'TH';
}) {
  const accent = getSupplierAccent(id);


  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-slate-100/80 bg-white px-4 py-3 shadow-2xs">
        <div className="flex min-w-0 items-center gap-2">
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${accent.dot}`} />

          <h2 className="truncate text-xl font-extrabold tracking-tight text-[#0B0F4F]">
            {Name}
          </h2>

          <span className={`flex shrink-0 items-center self-center rounded-full px-2.5 py-1.5 text-xs font-extrabold leading-none ${accent.badge}`}>
            {Role === "host" ? "Host" : "Supplier"}
          </span>
        </div>

        <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-bold ${accent.count}`}>
          {products.length} {language === 'EN' ? 'items' : ' รายการ'}
        </span>
      </div>

      {/* Product Cards */}
      {products.map((cardItem) => (
        <ProductCard
          key={cardItem.id}
          item={cardItem}
          onSell={handleSell}
          language={language}
        />
      ))}
    </div>
  );
}

function ProductImageModal({
  productName,
  imageUrl,
  language,
  onClose,
  onSave,
}: {
  productName: string;
  imageUrl?: string;
  language: 'EN' | 'TH';
  onClose: () => void;
  onSave: (imageUrl: string) => void;
}) {
  const [preview, setPreview] = useState(imageUrl ?? '');
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readImage = (file: File) => {
    const allowedTypes = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']);
    const allowedExtension = /\.(png|jpe?g|webp|svg)$/i.test(file.name);
    if ((!allowedTypes.has(file.type) && !(file.type === '' && allowedExtension)) || !allowedExtension) {
      setError(language === 'EN'
        ? 'Please choose a PNG, JPG, WEBP, or SVG image.'
        : 'กรุณาเลือกไฟล์ภาพ PNG, JPG, WEBP หรือ SVG');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(language === 'EN' ? 'Image must be 5 MB or smaller.' : 'ขนาดรูปภาพต้องไม่เกิน 5 MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreview(reader.result);
        setError('');
      } else {
        setError(language === 'EN' ? 'Unable to preview this image.' : 'ไม่สามารถแสดงตัวอย่างรูปภาพนี้ได้');
      }
    };
    reader.onerror = () => {
      setError(language === 'EN' ? 'Unable to read this image.' : 'ไม่สามารถอ่านไฟล์รูปภาพนี้ได้');
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) readImage(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-image-title"
        className="flex max-h-[95vh] w-full max-w-[590px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEE9FF] text-[#7C5CFF]">
              <ImageIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 id="product-image-title" className="truncate text-lg font-bold text-[#0B0F4F]">
                {productName}
              </h2>
              <p className="text-sm text-slate-500">{language === 'EN' ? 'Image / icon' : 'รูปภาพ / ไอคอน'}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label={language === 'EN' ? 'Close' : 'ปิด'} className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="space-y-5 overflow-y-auto px-5 py-6">
          <div className="flex h-[min(46vh,276px)] items-center justify-center rounded-2xl border border-[#E1E4EF] bg-[#F8F9FC] shadow-sm">
            <div className="flex h-[min(32vh,190px)] w-[min(32vh,190px)] items-center justify-center overflow-hidden rounded-xl border border-[#C7B7FF] bg-[#EEE9FF] text-[#7C5CFF] shadow-sm">
              {preview ? (
                <span
                  role="img"
                  aria-label={`${productName} preview`}
                  className="h-full w-full bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url("${preview}")` }}
                />
              ) : (
                <ImageIcon className="h-7 w-7" />
              )}
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            aria-label={language === 'EN' ? 'Choose or drop an image file' : 'เลือกหรือลากไฟล์รูปภาพมาวาง'}
            className={`flex min-h-[190px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-6 text-center transition-colors ${isDragging ? 'border-[#7C5CFF] bg-[#F5F2FF]' : 'border-[#D6C8FF] bg-[#FCFBFF] hover:bg-[#F8F6FF]'}`}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.webp,.svg,image/png,image/jpeg,image/webp,image/svg+xml"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) readImage(file);
                event.target.value = '';
              }}
            />
            <span className="mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#EEE9FF] text-[#7C5CFF]">
              <Upload className="h-6 w-6" />
            </span>
            <p className="text-sm font-bold text-[#0B0F4F]">
              {language === 'EN' ? 'Click to browse' : 'คลิกเพื่อเลือกไฟล์'}
              <span className="font-normal text-slate-500"> {language === 'EN' ? 'or drag & drop file here' : 'หรือลากไฟล์มาวางที่นี่'}</span>
            </p>
            <p className="mt-4 text-xs text-slate-500">PNG, JPG, WEBP, or SVG (Max 5MB)</p>
            {error && <p role="alert" className="mt-2 text-xs font-semibold text-rose-600">{error}</p>}
          </div>
        </div>

        <footer className="flex items-center justify-end gap-3 border-t border-slate-200 bg-[#F8F9FC] px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-200/60">
            {language === 'EN' ? 'Cancel' : 'ยกเลิก'}
          </button>
          <button
            type="button"
            disabled={!preview || Boolean(error)}
            onClick={() => onSave(preview)}
            className="flex items-center gap-2 rounded-xl bg-[#7C5CFF] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#6847e8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check className="h-4 w-4" />
            {language === 'EN' ? 'Save Image' : 'บันทึกรูปภาพ'}
          </button>
        </footer>
      </section>
    </div>
  );
}
