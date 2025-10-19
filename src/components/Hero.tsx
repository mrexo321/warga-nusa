import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex flex-col lg:flex-row items-center justify-center relative bg-transparent text-white py-24 overflow-hidden px-6">
      {/* Cahaya dekoratif background */}
      {/* <div className="absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-yellow-400/10 rounded-full blur-[100px]" />
      </div> */}

      {/* Kolom Kiri (Teks Utama) */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl text-center lg:text-left space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Wajrasena Garda <span className="text-yellow-400">Nusantara</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
          Media Pelatihan dan Pengembangan SDM Keamanan Berbasis Teknologi.
          <br className="hidden md:block" />
          Membangun profesionalisme dengan dedikasi dan disiplin tinggi.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button
            variant="primary"
            size="lg"
            className="bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors duration-300"
          >
            Lihat Program
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold transition-all duration-300"
          >
            Tentang Kami
          </Button>
        </div>

        {/* Logo / Ikon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex justify-center lg:justify-start"
        >
          <div className="bg-yellow-400/10 p-6 rounded-2xl border border-yellow-400/30">
            <img
              src="/logo1.png"
              alt="Logo Wajrasena"
              className="h-16 w-auto object-contain"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Kolom Kanan (Gambar Hero) */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mt-10 lg:mt-0 lg:ml-12"
      >
        <div className="relative w-[300px] md:w-[400px] lg:w-[450px] aspect-square overflow-hidden rounded-3xl shadow-2xl border border-yellow-400/20">
          <img
            src="https://images.unsplash.com/photo-1601049541289-9a12b56b34d2?auto=format&fit=crop&w=900&q=80"
            alt="Pelatihan Satpam"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Label kecil di bawah gambar */}
        <p className="text-center lg:text-left text-sm text-gray-400 mt-4">
          Profesionalisme & Etika — Garda Keamanan Terlatih
        </p>
      </motion.div>

      {/* Lapisan partikel cahaya kecil */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute bg-yellow-400/30 rounded-full"
            style={{
              width: Math.random() * 6 + 3,
              height: Math.random() * 6 + 3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
