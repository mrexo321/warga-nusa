import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";

const Header = () => {
  const userSelector = useSelector((state: RootState) => state.user.token);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black border-b border-yellow-400 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-yellow-400 tracking-wide">
              Wajrasena<span className="text-white"> Garda Nusantara</span>
            </div>
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden md:flex space-x-8 text-lg items-center">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              Beranda
            </Link>
            <Link
              to={"/homeprogram"}
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              Program
            </Link>
            <Link
              to={"/homenews"}
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              Berita
            </Link>
            <Link
              to={"/tentang"}
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              Tentang
            </Link>
            <Link
              to={"/kontak"}
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              Kontak
            </Link>

            {/* Ganti tombol berdasarkan login */}
            <Link
              to={userSelector ? "/dashboard" : "/login"}
              className="border border-yellow-400 bg-yellow-400 text-black font-semibold px-4 py-1.5 rounded-md hover:bg-yellow-500 transition-all duration-200"
            >
              {userSelector ? "Dashboard" : "Masuk"}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300 hover:text-yellow-400 focus:outline-none transition-colors"
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

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden bg-black border-t border-yellow-400 py-4 animate-fade-in-down">
            <nav className="flex flex-col space-y-4 text-center">
              <Link
                to={"/"}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                to={"/homeprogram"}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Program
              </Link>
              <Link
                to={"/homenews"}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Berita
              </Link>
              <Link
                to={"/tentang"}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Tentang
              </Link>
              <Link
                to={"/kontak"}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Kontak
              </Link>

              {/* Ganti tombol login jadi dashboard juga di mobile */}
              <Link
                to={userSelector ? "/dashboard" : "/login"}
                className="mx-auto border border-yellow-400 bg-yellow-400 text-black font-semibold px-4 py-1.5 rounded-md hover:bg-yellow-500 transition-all duration-200 w-fit"
                onClick={() => setMenuOpen(false)}
              >
                {userSelector ? "Dashboard" : "Masuk"}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
