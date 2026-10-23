
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Animated / Glowing 404 Text */} 
        <div className="relative">
          <h1 className="text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse">
            40404
          </h1>
          <div className="bg-indigo-600 text-xs px-2 py-1 rounded rotate-12 absolute top-10 left-1/2 -translate-x-1/2 shadow-lg">
            Page Not Found
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ไม่พบหน้าเว็บที่คุณต้องการ
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            ขออภัย หน้าที่คุณกำลังมองหาอาจถูกย้าย ลบออก หรือ URL อาจไม่ถูกต้อง
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 shadow-lg shadow-indigo-500/30"
          >
            กลับสู่หน้าหลัก
          </Link>
          {/* <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-slate-700 text-base font-medium rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
          >
            ย้อนกลับ
          </button> */}
        </div>

      </div>
    </div>
  );
}
