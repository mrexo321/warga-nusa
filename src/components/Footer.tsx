import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-transparent text-white py-24 overflow-hidden">
      {/* Ambient Glow Background */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/10 blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-400/5 blur-[120px]" />
      </div> */}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-10 border-b border-slate-800 pb-10">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">
              Wajrasena Garda Nusantara
            </h3>
            <p className="text-gray-400 leading-relaxed mb-5">
              Lembaga pelatihan dan pengembangan SDM keamanan berbasis
              teknologi. Kami membangun profesionalisme dengan disiplin dan
              dedikasi tinggi.
            </p>

            {/* Logo Placeholder */}
            <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-4 py-2 w-fit">
              <img
                src="/logo1.png"
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
              <span className="text-yellow-400 font-semibold">
                Wajrasena Garda Nusantara
              </span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">
              Navigasi
            </h4>
            <ul className="space-y-3 text-gray-400">
              {[
                { label: "Beranda", href: "#home" },
                { label: "Program", href: "#programs" },
                { label: "Berita", href: "#news" },
                { label: "Tentang", href: "#about" },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    className="hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-400/60 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">
              Kontak Kami
            </h4>
            <div className="text-gray-400 space-y-3">
              <p className="flex items-center gap-2 hover:text-yellow-400 transition">
                <Mail size={16} className="text-yellow-400" />
                info@warganusa.com
              </p>
              <p className="flex items-center gap-2 hover:text-yellow-400 transition">
                <Phone size={16} className="text-yellow-400" /> +62 21 1234 5678
              </p>
              <p className="flex items-center gap-2 hover:text-yellow-400 transition">
                <MapPin size={16} className="text-yellow-400" /> Jakarta,
                Indonesia
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-yellow-400 font-semibold">
              Wajrasena Garda Nusantara
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {["facebook", "twitter", "instagram"].map((social, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                <i className={`ri-${social}-fill text-xl`} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Animated dots / particles for depth */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute bg-yellow-400/20 rounded-full"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
