import Link from 'next/link';
import { useState } from 'react'; 
const poppins = 'font-sans';
const creepster = 'font-[cursive]';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Spells', path: '/spells' },
    { name: 'Potions', path: '/potions' },
    { name: 'Graveyard', path: '/graveyard' },
  ];

  return (
    <nav className={`fixed w-full z-50 top-0 start-0 border-b border-[#ff6600]/50 bg-[#12001b]/80 backdrop-blur-md shadow-[0_0_15px_rgba(255,102,0,0.3)] ${poppins}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
          <span className="text-3xl">🎃</span>
          <span className={`self-center text-3xl whitespace-nowrap text-[#ff6600] tracking-wider transition-all duration-300 group-hover:text-[#39ff14] group-hover:drop-shadow-[0_0_10px_#39ff14] ${creepster}`}>
            SpookyWeb
          </span>
        </Link>

        {/* Right Side Buttons (Desktop) */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link href="/login">
            <button type="button" className={`text-black bg-[#ff6600] hover:bg-[#39ff14] hover:shadow-[0_0_15px_#39ff14] transition-all duration-300 font-medium rounded-lg text-lg px-5 py-2 text-center tracking-widest hover:scale-105 ${creepster}`}>
              LOGIN
            </button>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#ff6600] rounded-lg md:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`${isOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-[#4a0072] rounded-lg bg-[#12001b]/90 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.path} 
                  className="block py-2 px-3 text-gray-300 rounded hover:bg-[#4a0072] md:hover:bg-transparent md:hover:text-[#ff6600] md:p-0 transition-colors duration-300 hover:drop-shadow-[0_0_5px_#ff6600]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </nav>
  );
}


