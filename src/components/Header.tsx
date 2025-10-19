import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const userSelector = useSelector((state: RootState) => state.user.token);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // List of navigation items
  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/homeabout" },
    { label: "Klien & Portfolio", path: "/client-porto" },
    { label: "Karir", path: "/karir" },
    { label: "Kontak Kami", path: "/contact-us" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-gradient-to-r from-[#0f0f0f]/90 via-[#1a1a1a]/80 to-[#2a2a2a]/90 backdrop-blur-md border-b border-yellow-400/30 shadow-[0_4px_25px_rgba(250,204,21,0.08)]"
          : "bg-transparent border-b border-yellow-400/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        {/* === LOGO === */}
        <div className="flex items-center gap-3">
          <motion.img
            src="https://logoipsum.com/logo/logo-7.svg"
            alt="Logo Icon"
            className="h-10 w-auto object-contain"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.img
            src="https://logoipsum.com/logo/logo-9.svg"
            alt="Logo Text"
            className="h-10 w-auto object-contain"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />
        </div>

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

        {/* === USER ACTION === */}
        <div className="hidden md:flex items-center space-x-3">
          {userSelector ? (
            <Link
              to="/dashboard"
              className="border border-yellow-400 bg-yellow-400 text-black font-semibold px-4 py-1.5 rounded-lg hover:bg-yellow-500 transition"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-gray-200 border border-yellow-400/60 px-4 py-1.5 rounded-lg hover:bg-yellow-400 hover:text-black transition"
            >
              Log in
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

              {userSelector ? (
                <Link
                  to="/dashboard"
                  className="border border-yellow-400 bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg hover:bg-yellow-500 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-200 border border-yellow-400/60 px-5 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Log in
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
