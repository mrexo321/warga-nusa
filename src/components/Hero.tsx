import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation("hero");

  return (
    <section className="min-h-[90vh] flex flex-col lg:flex-row items-center justify-center relative bg-transparent text-white py-24 overflow-hidden px-6">
      {/* Kolom Kiri (Teks Utama) */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl text-center lg:text-left space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Wajrasena Garda{" "}
          <span className="text-yellow-400">{t("highlight")}</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          {/* Tombol 1 */}
          <button className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors duration-300">
            {t("buttons.programs")}
          </button>

          {/* Tombol 2 */}
          <button className="px-6 py-3 rounded-lg border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold transition-all duration-300">
            {t("buttons.about")}
          </button>
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
              src="#"
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
            src="#"
            alt={t("image_alt")}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <p className="text-center lg:text-left text-sm text-gray-400 mt-4">
          {t("tagline")}
        </p>
      </motion.div>

      {/* Efek Partikel Cahaya */}
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
