import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation("header");
  const userSelector = useSelector((state: RootState) => state.user.token);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Efek scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load bahasa dari localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "id";
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  // Saklar bahasa
  const toggleLanguage = () => {
    const newLang = i18n.language === "id" ? "en" : "id";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.about"), path: "/homeabout" },
    { label: t("nav.client"), path: "/client-porto" },
    { label: t("nav.career"), path: "/karir" },
    { label: t("nav.contact"), path: "/contact-us" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-gradient-to-r from-[#0f0f0f]/90 via-[#1a1a1a]/80 to-[#2a2a2a]/90 backdrop-blur-md border-b border-yellow-400/30 shadow-[0_4px_25px_rgba(250,204,21,0.08)]"
          : "bg-transparent border-b border-yellow-400/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        {/* === LOGO === */}
        <motion.img
          src="/assets/logo1.png"
          alt={t("logoAlt")}
          className="h-10 w-auto object-contain"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* === NAV DESKTOP === */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
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
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-full bg-yellow-400"
                        : "w-0 bg-yellow-400 group-hover:w-full"
                    }`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* === LANGUAGE SWITCH + USER === */}
        <div className="hidden md:flex items-center space-x-5">
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
              className="text-gray-200 border border-yellow-400/60 px-4 py-1.5 rounded-lg hover:bg-yellow-400 hover:text-black transition"
            >
              {t("nav.login")}
            </Link>
          )}
        </div>

        {/* === MENU BUTTON MOBILE === */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 hover:text-yellow-400 transition"
        >
          {menuOpen ? (
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* === MENU MOBILE === */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-gradient-to-b from-[#141414] via-[#1a1a1a] to-[#202020] border-t border-yellow-400/10 overflow-hidden"
          >
            <nav className="flex flex-col items-center py-6 space-y-4 text-base">
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={i}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`transition-colors ${
                      isActive
                        ? "text-yellow-400 font-semibold"
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Saklar Bahasa (mobile) */}
              <div
                className="relative w-16 h-8 bg-gray-600 rounded-full cursor-pointer border border-yellow-400/40 flex items-center mt-4"
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

              {userSelector ? (
                <Link
                  to="/dashboard"
                  className="border border-yellow-400 bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg hover:bg-yellow-500 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("nav.dashboard")}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-200 border border-yellow-400/60 px-5 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("nav.login")}
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
