import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Header = () => {
  const userSelector = useSelector((state: RootState) => state.user.token);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black border-b border-yellow-400 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        {/* Logo kiri */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo1.png"
            alt="Logo CSSL"
            className="h-10 w-auto object-contain"
          />
          <img
            src="/logo2.png"
            alt="Logo Kemdikbud"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Navigasi tengah */}
        <nav className="hidden md:flex space-x-8 text-base font-medium">
          <Link
            to="/"
            className="text-gray-300 hover:text-yellow-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="#"
            className="text-gray-300 hover:text-yellow-400 transition-colors"
          >
            About us
          </Link>
          <Link
            to="#"
            className="text-gray-300 hover:text-yellow-400 transition-colors"
          >
            Klien & Portfolio
          </Link>
          <Link
            to="#"
            className="text-gray-300 hover:text-yellow-400 transition-colors"
          >
            Karir
          </Link>
          <Link
            to="#"
            className="text-gray-300 hover:text-yellow-400 transition-colors"
          >
            Kontak Kami
          </Link>
        </nav>

        {/* Tombol kanan */}
        <div className="hidden md:flex items-center space-x-3">
          {userSelector ? (
            <Link
              to="/dashboard"
              className="border border-yellow-400 bg-yellow-400 text-black font-semibold px-4 py-1.5 rounded-md hover:bg-yellow-500 transition"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 border border-yellow-400 px-4 py-1.5 rounded-md hover:bg-yellow-400 hover:text-black transition"
              >
                Log in
              </Link>
            </>
          )}
        </div>

        {/* Tombol menu mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 hover:text-yellow-400 focus:outline-none transition"
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-yellow-400 py-4">
          <nav className="flex flex-col items-center space-y-4 text-base">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              Home
            </Link>
            <Link
              to="#"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              About us
            </Link>
            <Link
              to="#"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              Klien & Portfolio
            </Link>
            <Link
              to="#"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              Karir
            </Link>
            <Link
              to="#"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              Kontak Kami
            </Link>

            {/* Login/Register di mobile */}
            {userSelector ? (
              <Link
                to="/dashboard"
                className="border border-yellow-400 bg-yellow-400 text-black font-semibold px-4 py-1.5 rounded-md hover:bg-yellow-500 transition"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 border border-yellow-400 px-4 py-1.5 rounded-md hover:bg-yellow-400 hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Log in
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
