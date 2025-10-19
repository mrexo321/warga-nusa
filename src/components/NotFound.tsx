import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2a2a2a] text-gray-100 overflow-hidden px-6">
      {/* === DEKORASI LATAR === */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-yellow-400/10 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-amber-500/10 blur-3xl rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* === ISI UTAMA === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center text-center space-y-5"
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="bg-yellow-500/10 p-6 rounded-full border border-yellow-400/40 shadow-[0_0_20px_rgba(250,204,21,0.15)]"
        >
          <AlertTriangle size={64} className="text-yellow-400 drop-shadow-md" />
        </motion.div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-extrabold text-yellow-400 tracking-widest drop-shadow-[0_0_20px_rgba(250,204,21,0.2)]">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-200">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-400 max-w-md leading-relaxed">
          Sepertinya kamu tersesat 😅. Halaman yang kamu cari tidak tersedia
          atau mungkin sudah dipindahkan.
        </p>

        {/* Tombol Kembali */}
        <motion.button
          onClick={handleBack}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 flex items-center gap-2 border border-yellow-400 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:bg-yellow-500 hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all duration-300"
        >
          <ArrowLeftCircle size={20} />
          <span>Kembali ke Halaman Sebelumnya</span>
        </motion.button>
      </motion.div>

      {/* Footer kecil */}
      <div className="absolute bottom-6 text-xs text-gray-500">
        © {new Date().getFullYear()} Warga Nusa. Semua hak dilindungi.
      </div>
    </div>
  );
};

export default NotFound;
