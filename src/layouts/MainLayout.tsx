import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-900 to-black overflow-x-auto">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Konten utama */}
      <div className="flex-1 flex flex-col md:ml-32 transition-all duration-300">
        {/* Tombol menu di mobile */}
        <header className="p-4 md:hidden flex items-center justify-between bg-slate-900/50 backdrop-blur-lg border-b border-slate-700/50 z-30 relative">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-slate-300 hover:text-white"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-white font-semibold text-lg">Dashboard</h1>
        </header>

        {/* ✅ Hanya main yang bisa scroll horizontal */}
        <main className="flex-1 p-6 md:p-8 z-10 relative overflow-x-auto">
          <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-2xl p-6 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
