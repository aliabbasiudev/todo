import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useApp()

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed top-4 left-4 z-50 w-10 h-10 rounded-full text-xl font-bold shadow-lg transition-colors duration-300 ${theme === 'dark' ? 'bg-[#6C63FF] text-white' : 'bg-[#6C63FF] text-white'}`}
        >
          ☰
        </button>
      )}

      <div className={`fixed top-0 left-0 h-full w-64 z-40 transform transition-transform duration-300 shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${theme === 'dark' ? 'bg-[#1A1A2E]' : 'bg-white'}`}>
        <div className="flex justify-between items-center p-6 border-b border-[#6C63FF]">
          <span className="font-bold text-[#6C63FF] text-lg">Focus Tracker</span>
          <button onClick={() => setIsOpen(false)} className="text-xl">✕</button>
        </div>

        <nav className="p-6 flex flex-col gap-4">
          <Link to="/" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${theme === 'dark' ? 'hover:bg-[#6C63FF22]' : 'hover:bg-[#6C63FF11]'}`}>
            🏠 خانه
          </Link>
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${theme === 'dark' ? 'hover:bg-[#6C63FF22]' : 'hover:bg-[#6C63FF11]'}`}>
            📊 داشبورد
          </Link>
          <Link to="/dashboard/week" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${theme === 'dark' ? 'hover:bg-[#6C63FF22]' : 'hover:bg-[#6C63FF11]'}`}>
            📅 ۷ روز اخیر
          </Link>

          <div className="mt-auto pt-6 border-t border-[#6C63FF44]">
            <button
              onClick={toggleTheme}
              className="w-full p-3 rounded-xl bg-[#6C63FF] text-white font-bold hover:bg-[#5a52e0] transition-colors"
            >
              {theme === 'dark' ? '☀️ روشن' : '🌙 تاریک'}
            </button>
          </div>
        </nav>
      </div>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-30 bg-black bg-opacity-40" />
      )}
    </>
  )
}

export default Navbar