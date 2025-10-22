import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../layouts/HomeLayout";
import Logo from "../../public/logo.png"; // pastikan logo sudah di folder public

const Hero = () => {
  const { t } = useTranslation("hero");
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <section
      className={`relative flex flex-col lg:flex-row items-center justify-between min-h-[90vh] overflow-hidden px-8 md:px-26 py-24 transition-colors duration-700`}
    >
      {/* Efek Cahaya Latar */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-30 ${
            isDark ? "bg-yellow-400/20" : "bg-yellow-300/30"
          }`}
        />
      </div>

      {/* Kiri - Teks dan Logo */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-2xl text-center lg:text-left space-y-8"
      >
        {/* Logo */}
        <div className="flex justify-center lg:justify-start mb-4">
          <motion.img
            src={Logo}
            alt="Logo Wajrasena"
            className="h-20 w-auto object-contain drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          />
        </div>

        {/* Judul */}
        <h1
          className={`text-4xl md:text-6xl font-extrabold leading-tight tracking-tight transition-colors duration-700 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Wajrasena Garda{" "}
          <span
            className={`${
              isDark ? "text-yellow-400" : "text-yellow-600"
            } drop-shadow-md`}
          >
            {t("highlight")}
          </span>
        </h1>

        {/* Subjudul */}
        <p
          className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {t("subtitle")}
        </p>

        {/* Tombol */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 ${
              isDark
                ? "bg-yellow-400 text-black hover:bg-yellow-300"
                : "bg-yellow-500 text-white hover:bg-yellow-400"
            }`}
          >
            {t("buttons.programs")}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`px-6 py-3 rounded-lg font-semibold border transition-all duration-300 ${
              isDark
                ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                : "border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white"
            }`}
          >
            {t("buttons.about")}
          </motion.button>
        </div>
      </motion.div>

      {/* Kanan - Gambar Hero */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mt-16 lg:mt-0 flex justify-center"
      >
        <div
          className={`relative w-[320px] md:w-[420px] lg:w-[480px] aspect-square overflow-hidden rounded-[2rem] shadow-2xl border transition-colors duration-700 ${
            isDark ? "border-yellow-400/20" : "border-yellow-500/20"
          }`}
        >
          <img
            src="https://images.pexels.com/photos/8613848/pexels-photo-8613848.jpeg"
            alt={t("image_alt")}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />

          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-t from-black/70 to-transparent"
                : "bg-gradient-to-t from-white/60 to-transparent"
            }`}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
