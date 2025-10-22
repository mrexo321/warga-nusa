import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../layouts/HomeLayout";
import { Sun, Moon } from "lucide-react";
import Logo from "../../public/logo.png";

const Header = () => {
  const { t, i18n } = useTranslation("header");
  const userSelector = useSelector((state: RootState) => state.user.token);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    { label: t("nav.home"), path: "/" },
    { label: t("nav.about"), path: "/homeabout" },
    { label: t("nav.client"), path: "/client-porto" },
    { label: t("nav.contact"), path: "/contact-us" },
  ];

  return (
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
        {/* === KIRI: LOGO === */}
        <div className="flex items-center">
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
        </div>

        {/* === TENGAH: NAV MENU === */}
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

        {/* === KANAN: TOGGLES & LOGIN === */}
        <div className="hidden md:flex items-center space-x-5">
          {/* Saklar Tema */}
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
                    ? "bg-yellow-400 text-slate-900 left-[5px] shadow-[0_0_10px_rgba(250,204,21,0.4)]"
                    : "bg-yellow-500 text-white right-[5px] shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                }`}
            >
              {theme === "dark" ? (
                <Sun size={14} className="animate-pulse" />
              ) : (
                <Moon size={14} className="animate-pulse" />
              )}
            </motion.div>
            <div
              className={`absolute inset-0 transition-all duration-700 blur-md opacity-30
                ${theme === "dark" ? "bg-yellow-400/20" : "bg-yellow-300/50"}`}
            />
          </motion.button>

          {/* Saklar Bahasa */}
          <div
            className="relative w-16 h-8 bg-gray-600 rounded-full cursor-pointer border border-yellow-400/40 flex items-center"
            onClick={toggleLanguage}
          >
            <motion.div
              layout
              className={`absolute w-7 h-7 rounded-full bg-yellow-400 shadow-md ${
                i18n.language === "id" ? "left-1" : "right-1"
              }`}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
            <span className="absolute left-2 text-xs text-black font-bold">
              ID
            </span>
            <span className="absolute right-2 text-xs text-black font-bold">
              EN
            </span>
          </div>

          {/* Login / Dashboard */}
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

        {/* === MENU MOBILE === */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden transition ${
            theme === "dark"
              ? "text-gray-300 hover:text-yellow-400"
              : "text-gray-800 hover:text-yellow-600"
          }`}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
