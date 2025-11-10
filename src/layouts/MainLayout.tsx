import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Home,
  Calendar,
  Users,
  Settings,
  MoreHorizontal,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData } from "../store/userSlice";
import type { RootState } from "../store/store";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const adminTabs = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/users", label: "Pengguna", icon: Users },
    { path: "/shift", label: "Shift", icon: Calendar },
    { path: "/shift-assignment", label: "Penugasan", icon: Calendar },
    { path: "/attendance", label: "Kehadiran", icon: Calendar },
    { path: "/courses", label: "Pelatihan", icon: Users },
    { path: "/news", label: "Berita", icon: Calendar },
    { path: "/gallery", label: "Galeri", icon: Users },
    { path: "/task-report", label: "Laporan Penugasan", icon: Users },
  ];

  const userTabs = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/shift-kehadiran", label: "Shift", icon: Calendar },
    { path: "/course-satpam", label: "Kursus", icon: Users },
  ];

  const tabs = user.role === "admin" ? adminTabs : userTabs;
  const visibleTabs = tabs.slice(0, 4);
  const extraTabs = tabs.slice(4);

  const handleLogout = () => {
    dispatch(clearUserData());
    navigate("/login");
  };

  return (
    <div
      className="relative min-h-screen flex flex-col md:flex-row overflow-hidden
      bg-gradient-to-b from-[#0d1117] via-[#0a0e14] to-[#05070a] text-white"
    >
      {/* ✨ Background efek */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,0,0.05)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(30,144,255,0.07)_0%,transparent_70%)] pointer-events-none"></div>

      {/* Sidebar (desktop only) */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Konten utama */}
      <div
        className="flex-1 flex flex-col transition-all duration-500 ease-in-out
        md:ml-64 relative z-10 pb-20 md:pb-0"
      >
        {/* Header Mobile - tanpa hamburger menu */}
        <header
          className="md:hidden sticky top-0 z-30 flex items-center justify-center
          bg-[#0d1117]/90 backdrop-blur-lg border-b border-yellow-400/10 px-4 py-3"
        >
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

        {/* 🌟 Bottom Navigation (Mobile) */}
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d1117]/90 backdrop-blur-lg border-t border-yellow-400/10
          flex justify-around items-center py-2"
        >
          {visibleTabs.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center gap-1 transition-all ${
                  isActive
                    ? "text-yellow-400 scale-110"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
              >
                <Icon size={22} />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}

          {/* Tombol Menu Lainnya */}
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`flex flex-col items-center justify-center gap-1 transition-all ${
              isMoreOpen
                ? "text-yellow-400 scale-110"
                : "text-gray-400 hover:text-yellow-300"
            }`}
          >
            <MoreHorizontal size={22} />
            <span className="text-[10px]">Menu</span>
          </button>
        </nav>

        {/* Dropdown Menu Tambahan */}
        <AnimatePresence>
          {isMoreOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed bottom-16 left-0 right-0 mx-auto w-[90%]
              bg-[#0d1117]/95 backdrop-blur-xl border border-yellow-400/20 rounded-2xl shadow-lg
              p-3 flex flex-col gap-2 z-50"
            >
              {extraTabs.map((tab) => (
                <button
                  key={tab.path}
                  onClick={() => {
                    navigate(tab.path);
                    setIsMoreOpen(false);
                  }}
                  className={`w-full py-2 text-sm rounded-lg ${
                    location.pathname === tab.path
                      ? "bg-yellow-500/80 text-slate-900 font-semibold"
                      : "text-gray-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              {/* Logout di dropdown */}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMoreOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2 mt-2 border-t border-slate-700 text-red-400 hover:text-red-300 transition-all"
              >
                <LogOut size={16} /> Keluar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Efek cahaya */}
      <div className="absolute -bottom-40 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[200px] rounded-full"></div>
      <div className="absolute -top-40 left-0 w-[500px] h-[500px] bg-yellow-500/10 blur-[200px] rounded-full"></div>
    </div>
  );
};

export default MainLayout;
