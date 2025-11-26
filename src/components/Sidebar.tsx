// Updated Sidebar with Minimize/Expand functionality
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../store/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import type { RootState } from "../store/store";
import { X, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import Logo from "../../public/logo.png";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const [isMinimized, setIsMinimized] = useState(false);

  const adminTabs = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/users", label: "Manajemen Pengguna", icon: "👥" },
    { path: "/shift", label: "Manajemen Shift", icon: "⏱️" },
    { path: "/shift-assignment", label: "Penugasan Shift", icon: "🧾" },
    { path: "/attendance", label: "Kehadiran", icon: "🗓️" },
    { path: "/courses", label: "Manajemen Pelatihan", icon: "🎓" },
    { path: "/news", label: "Manajemen Berita", icon: "📰" },
    { path: "/gallery", label: "Manajemen Galeri", icon: "🖼️" },
    { path: "/patrol", label: "Patroli", icon: "🚓" },
    { path: "/task-report", label: "Laporan Penugasan", icon: "📌" },
  ];

  const userTabs = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/shift-kehadiran", label: "Shift & Kehadiran", icon: "⏱️" },
    { path: "/course-satpam", label: "Pelatihan", icon: "🎓" },
    { path: "/user-patrol", label: "Patroli", icon: "🚓" },
  ];

  const tabs = user.role === "admin" ? adminTabs : userTabs;

  const handleLogout = () => {
    dispatch(clearUserData());
    navigate("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen
        ${isMinimized ? "w-20" : "w-64"}
        bg-gradient-to-b from-[#0d1117] via-[#0a0e14] to-[#05070a]
        border-r border-slate-800/50 shadow-lg flex flex-col
        transform transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900`}
      >
        <div className="p-6 border-b border-slate-700/40 flex items-center justify-between sticky top-0 bg-[#0d1117] z-10">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-2 rounded-lg shadow-lg flex items-center justify-center">
              <img
                src={Logo}
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            {!isMinimized && (
              <h1 className="text-lg font-semibold text-white tracking-wide">
                WajraSena
              </h1>
            )}
          </div>

          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-slate-400 hover:text-white transition hidden md:block"
          >
            {isMinimized ? (
              <ChevronRight size={22} />
            ) : (
              <ChevronLeft size={22} />
            )}
          </button>

          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-white transition"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => {
            const isActive =
              location.pathname === tab.path ||
              location.pathname.startsWith(tab.path + "/");

            return (
              <button
                key={tab.path}
                onClick={() => {
                  navigate(tab.path);
                  if (onClose) onClose?.();
                }}
                className={`w-full flex items-center gap-3 cursor-pointer text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group
                ${
                  isActive
                    ? "bg-amber-500/80 text-slate-900 shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {!isMinimized && tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700/40 bg-slate-900/40 backdrop-blur-sm sticky bottom-0">
          {!isMinimized && (
            <div className="text-slate-400 text-sm mb-3">
              Halo,{" "}
              <span className="text-amber-400">
                {user.username || "Pengguna"}
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 border border-slate-700 rounded-lg
            hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-500 hover:text-slate-900 transition-all duration-300 shadow-md"
          >
            <LogOut size={16} />
            {!isMinimized && "Keluar"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
