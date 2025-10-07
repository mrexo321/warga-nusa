import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../store/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import type { RootState } from "../store/store";
import { X } from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);

  // Menu berdasarkan role
  const adminTabs = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/users", label: "Manajemen Pengguna" },
    { path: "/shift", label: "Manajemen Shift" },
    { path: "/attendance", label: "Kehadiran" },
    { path: "/courses", label: "Manajemen Pelatihan" },
    { path: "/news", label: "Manajemen Berita" },
    { path: "/gallery", label: "Manajemen Galeri" },
  ];

  const userTabs = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/shift-kehadiran", label: "Shift & Kehadiran" },
    { path: "/course-satpam", label: "Kursus" },
  ];

  const tabs = user.role === "admin" ? adminTabs : userTabs;

  const handleLogout = () => {
    dispatch(clearUserData());
    navigate("/login");
  };

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-screen md:h-auto w-64 bg-slate-900/70 backdrop-blur-md border-r border-slate-700/50 flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-2 rounded-lg shadow-lg">
              <svg
                className="w-6 h-6 text-slate-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.4 7 14.8 8.6 14.8 10V11.2C15.2 11.2 15.7 11.7 15.7 12.2V16.7C15.7 17.2 15.2 17.7 14.8 17.7H9.2C8.7 17.7 8.2 17.2 8.2 16.7V12.2C8.2 11.7 8.7 11.2 9.2 11.2V10C9.2 8.6 10.6 7 12 7ZM12 8.2C11.2 8.2 10.5 8.9 10.5 9.7V11.2H13.5V9.7C13.5 8.9 12.8 8.2 12 8.2Z" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-white">WargaNusa</h1>
          </div>

          {/* Tombol close (mobile) */}
          <button
            onClick={onClose}
            className="md:hidden text-slate-300 hover:text-white transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {tabs.map((tab) => {
            // aktifkan juga untuk child route (contoh: /course-satpam/detail/1)
            const isActive =
              location.pathname === tab.path ||
              location.pathname.startsWith(tab.path + "/");

            return (
              <button
                key={tab.path}
                onClick={() => {
                  navigate(tab.path);
                  if (onClose) onClose(); // Tutup sidebar di mobile
                }}
                className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/30"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700/50">
          <span className="block text-slate-400 text-sm mb-2">
            Halo, {user.userId || "Pengguna"}
          </span>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700/50 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          >
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
