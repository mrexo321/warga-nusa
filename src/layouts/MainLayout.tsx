import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className="relative min-h-screen flex flex-col md:flex-row overflow-hidden
      bg-gradient-to-b from-[#0d1117] via-[#0a0e14] to-[#05070a] text-white"
    >
      {/* ✨ Cahaya lembut background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,0,0.05)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(30,144,255,0.07)_0%,transparent_70%)] pointer-events-none"></div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Konten utama */}
      <div
        className="flex-1 flex flex-col transition-all duration-500 ease-in-out
        md:ml-64 relative z-10"
      >
        {/* Header Mobile */}
        <header
          className="md:hidden sticky top-0 z-30 flex items-center justify-between
          bg-[#0d1117]/90 backdrop-blur-lg border-b border-yellow-400/10 px-4 py-3"
        >
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-yellow-400 hover:scale-110 transition-transform"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-yellow-400 font-semibold text-lg">Dashboard</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0a0e14]/70 border border-yellow-400/10 rounded-2xl
            shadow-[0_0_20px_rgba(255,215,0,0.05)] backdrop-blur-xl
            p-6 md:p-8 transition-all duration-300 hover:shadow-yellow-400/10"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* 🌌 Efek dekoratif halus */}
      <div className="absolute -bottom-40 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[200px] rounded-full"></div>
      <div className="absolute -top-40 left-0 w-[500px] h-[500px] bg-yellow-500/10 blur-[200px] rounded-full"></div>
    </div>
  );
};

export default MainLayout;
