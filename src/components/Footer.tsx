import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Wajrasena Garda Nusantara
            </h3>
            <p className="text-gray-400 mb-4">
              Pelatihan keamanan profesional dengan standar internasional untuk
              membangun SDM keamanan yang kompeten.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Program
                </a>
              </li>
              <li>
                <a
                  href="#news"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Berita
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tentang
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <div className="text-gray-400 space-y-2">
              <p>📧 info@warganusa.com</p>
              <p>📞 +62 21 1234 5678</p>
              <p>📍 Jakarta, Indonesia</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Wajrasena Garda Nusantara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
