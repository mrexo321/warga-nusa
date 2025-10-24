import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../layouts/HomeLayout";
import {
  Sun,
  Moon,
  Home,
  Users,
  Briefcase,
  Phone,
  MoreHorizontal,
  X,
  User,
  User2,
} from "lucide-react";
import Logo from "../../public/logo.png";

const Header = () => {
  const { t, i18n } = useTranslation("header");
  const userSelector = useSelector((state: RootState) => state.user.token);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "id";
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "id" ? "en" : "id";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  const navItems = [
    { label: t("nav.home"), path: "/", icon: <Home size={20} /> },
    { label: t("nav.about"), path: "/homeabout", icon: <Users size={20} /> },
    {
      label: t("nav.client"),
      path: "/client-porto",
      icon: <Briefcase size={20} />,
    },
    {
      label: t("nav.contact"),
      path: "/contact-us",
      icon: <User2 size={20} />,
    },
  ];

  return (
    <>
      {/* === HEADER (DESKTOP) === */}
      {/* ... Bagian desktop tidak berubah ... */}

      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled
            ? theme === "dark"
              ? "bg-gradient-to-r from-[#0f0f0f]/90 via-[#1a1a1a]/80 to-[#2a2a2a]/90 backdrop-blur-md border-b border-yellow-400/30 shadow-[0_4px_25px_rgba(250,204,21,0.08)]"
              : "bg-gradient-to-r from-white/80 via-gray-100/70 to-gray-200/80 backdrop-blur-md border-b border-yellow-400/30 shadow-[0_4px_25px_rgba(250,204,21,0.08)]"
            : theme === "dark"
            ? "bg-transparent border-b border-yellow-400/10"
            : "bg-transparent border-b border-yellow-400/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-3 relative">
          {/* === LOGO === */}
          <motion.img
            src={Logo}
            alt={t("logoAlt")}
            className={`h-10 w-auto object-contain transition-all duration-500 ${
              theme === "dark"
                ? "mix-blend-screen brightness-125"
                : "mix-blend-multiply brightness-100"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* === NAV MENU DESKTOP === */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-8 text-sm font-medium">
            {navItems.map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={item.path}
                    className={`relative transition-all duration-300 ${
                      isActive
                        ? "text-yellow-400"
                        : theme === "dark"
                        ? "text-gray-300 hover:text-yellow-400"
                        : "text-gray-700 hover:text-yellow-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* === KANAN: THEME & LANG & LOGIN === */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.08 }}
              className={`relative w-14 h-8 flex items-center rounded-full border transition-all duration-500 overflow-hidden
              ${
                theme === "dark"
                  ? "bg-gradient-to-r from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a] border-yellow-400/40 shadow-[0_0_15px_rgba(250,204,21,0.15)]"
                  : "bg-gradient-to-r from-yellow-100 via-yellow-200 to-amber-100 border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]"
              }`}
              title="Ganti Tema"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`absolute w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-all duration-500
                  ${
                    theme === "dark"
                      ? "bg-yellow-400 text-slate-900 left-[5px]"
                      : "bg-yellow-500 text-white right-[5px]"
                  }`}
              >
                {theme === "dark" ? (
                  <Sun size={14} className="animate-pulse" />
                ) : (
                  <Moon size={14} className="animate-pulse" />
                )}
              </motion.div>
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className={`relative w-20 h-9 rounded-full overflow-hidden border transition-all duration-500 flex items-center justify-between px-2
              ${
                theme === "dark"
                  ? "bg-gradient-to-r from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a] border-yellow-400/40"
                  : "bg-gradient-to-r from-yellow-100 via-yellow-50 to-amber-100 border-yellow-400/30"
              }`}
              title="Ganti Bahasa"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center font-semibold text-[10px] shadow-md z-10
                  ${
                    i18n.language === "id"
                      ? "left-[3px] bg-yellow-400 text-slate-900"
                      : "right-[3px] bg-yellow-500 text-white"
                  }`}
              >
                {i18n.language === "id" ? "ID" : "EN"}
              </motion.div>
              <span className="absolute left-3 text-[11px] font-bold">ID</span>
              <span className="absolute right-3 text-[11px] font-bold">EN</span>
            </motion.button>

            {/* 🔹 Tambahan LOGIN/DASHBOARD Button */}
            {userSelector ? (
              <Link
                to="/dashboard"
                className="border border-yellow-400 bg-yellow-400 text-black font-semibold px-4 py-1.5 rounded-lg hover:bg-yellow-500 transition"
              >
                {t("nav.dashboard")}
              </Link>
            ) : (
              <Link
                to="/login"
                className={`border border-yellow-400/60 px-4 py-1.5 rounded-lg hover:bg-yellow-400 transition ${
                  theme === "dark"
                    ? "text-gray-200 hover:text-black"
                    : "text-gray-800 hover:text-black"
                }`}
              >
                {t("nav.login")}
              </Link>
            )}
          </div>
        </div>
      </motion.header>

      {/* === BOTTOM NAVBAR (MOBILE) === */}
      <div
        className={`md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-2 border-t z-50 backdrop-blur-md
        ${
          theme === "dark"
            ? "bg-[#0f0f0f]/95 border-yellow-400/20 text-gray-200"
            : "bg-white/90 border-yellow-400/30 text-gray-800"
        }`}
      >
        {/* Hanya tampilkan 3 nav utama */}
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={i}
              to={item.path}
              className={`flex flex-col items-center text-xs font-medium transition-all ${
                isActive
                  ? "text-yellow-400"
                  : theme === "dark"
                  ? "hover:text-yellow-400"
                  : "hover:text-yellow-600"
              }`}
            >
              {item.icon}
              <span className="mt-0.5">{item.label}</span>
            </Link>
          );
        })}

        {/* Login / Dashboard */}
        {userSelector ? (
          <Link
            to="/dashboard"
            className="flex flex-col items-center text-xs font-semibold text-yellow-400"
          >
            <Briefcase size={20} />
            <span className="mt-0.5">{t("nav.dashboard")}</span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="flex flex-col items-center text-xs font-semibold text-yellow-400"
          >
            <Users size={20} />
            <span className="mt-0.5">{t("nav.login")}</span>
          </Link>
        )}

        {/* Tombol More */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex flex-col items-center text-xs font-medium hover:text-yellow-400 transition"
        >
          {showMore ? <X size={20} /> : <MoreHorizontal size={20} />}
          <span className="mt-0.5">{t("nav.more") || "More"}</span>
        </button>
      </div>

      {/* === FLOATING MENU (More Options) === */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-14 left-0 w-full z-40 px-4 pb-4 backdrop-blur-lg rounded-t-2xl shadow-lg
              ${
                theme === "dark"
                  ? "bg-[#0f0f0f]/90 border-t border-yellow-400/20 text-gray-200"
                  : "bg-white/95 border-t border-yellow-400/30 text-gray-800"
              }`}
          >
            <div className="max-w-md mx-auto flex flex-col space-y-3 mt-3">
              <Link
                to="/contact-us"
                onClick={() => setShowMore(false)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-yellow-400/10 transition"
              >
                <Phone size={18} />
                <span>{t("nav.contact")}</span>
              </Link>

              <button
                onClick={() => {
                  toggleTheme();
                  setShowMore(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-yellow-400/10 transition"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                <span>{theme === "dark" ? t("nav.light") : t("nav.dark")}</span>
              </button>

              <button
                onClick={() => {
                  toggleLanguage();
                  setShowMore(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-yellow-400/10 transition"
              >
                <span className="font-semibold text-sm">
                  {i18n.language === "id" ? "EN" : "ID"}
                </span>
                <span>
                  {i18n.language === "id"
                    ? t("nav.switchToEn")
                    : t("nav.switchToId")}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
