'use client';

import { useState } from 'react';
import { Creepster, Poppins } from 'next/font/google';

// ตั้งค่า Google Fonts ผ่าน Next.js
const creepster = Creepster({ weight: '400', subsets: ['latin'] });
const poppins = Poppins({ weight: ['300', '400', '600'], subsets: ['latin'] });

export default function HalloweenLogin() {
  const [isBoo, setIsBoo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    setIsBoo(true); // เปลี่ยนสถานะปุ่มเป็นผีหลอก
    
    setTimeout(() => {
      alert("Happy Halloween! You have successfully logged into the haunted realm. 🎃");
      setIsBoo(false); // รีเซ็ตปุ่มกลับ
    }, 500);
  };

  return (
    <div className={`m-0 p-0 h-screen flex justify-center items-center bg-[radial-gradient(circle_at_center,#4a0072,#12001b)] overflow-hidden relative ${poppins.className}`}>
      
      {/* Background Decorations */}
      <div className="absolute text-5xl opacity-30 animate-float top-[10%] left-[15%]">🦇</div>
      <div className="absolute text-6xl opacity-30 animate-float top-[20%] right-[20%] delay-200">👻</div>
      <div className="absolute text-3xl opacity-30 animate-float bottom-[15%] left-[25%] delay-500">🦇</div>

      {/* Login Container */}
      <div className="bg-black/70 p-10 rounded-2xl border-2 border-[#ff6600] shadow-[0_0_20px_#ff6600,inset_0_0_15px_#ff6600] w-full max-w-[350px] text-center z-10 backdrop-blur-sm">
        
        <h2 className={`text-[#ff6600] text-5xl mt-0 mb-6 drop-shadow-[2px_2px_4px_rgba(0,0,0,1)] tracking-widest ${creepster.className}`}>
          Trick or Treat
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-5 text-left">
            <label htmlFor="username" className="block text-gray-300 mb-1 text-sm">Username / Soul ID</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Enter your name..." 
              required 
              className="w-full p-3 bg-white/10 border border-[#4a0072] rounded-lg text-white text-base outline-none transition-all duration-300 focus:border-[#ff6600] focus:shadow-[0_0_10px_#ff6600]"
            />
          </div>
          
          {/* Password Input */}
          <div className="mb-5 text-left">
            <label htmlFor="password" className="block text-gray-300 mb-1 text-sm">Secret Spell (Password)</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your spell..." 
              required 
              className="w-full p-3 bg-white/10 border border-[#4a0072] rounded-lg text-white text-base outline-none transition-all duration-300 focus:border-[#ff6600] focus:shadow-[0_0_10px_#ff6600]"
            />
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            className={`w-full p-3 border-none rounded-lg text-xl tracking-widest cursor-pointer transition-all duration-300 shadow-[0_4px_6px_rgba(0,0,0,0.3)] hover:scale-105 ${creepster.className} ${
              isBoo 
                ? 'bg-[#4a0072] text-white' 
                : 'bg-[#ff6600] text-black hover:bg-[#39ff14] hover:shadow-[0_0_15px_#39ff14]'
            }`}
          >
            {isBoo ? 'BOO! 👻' : 'ENTER IF YOU DARE'}
          </button>
          
          {/* Forgot Password */}
          <a href="#" className="block mt-4 text-gray-400 no-underline text-xs transition-colors duration-300 hover:text-[#ff6600]">
            Forgot your spell?
          </a>
        </form>
      </div>
    </div>
  );
}