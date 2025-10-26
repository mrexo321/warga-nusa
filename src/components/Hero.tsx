import React, { useContext, memo } from "react";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../layouts/HomeLayout";
import Logo from "../../public/logo.png";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Hero = memo(() => {
  const { t } = useTranslation("hero");
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <LazyMotion features={domAnimation}>
      <section
        className={`relative flex flex-col lg:flex-row items-center justify-between min-h-[90vh] overflow-hidden px-6 md:px-28 py-20 transition-colors duration-700 will-change-transform`}
      >
        {/* 🌕 Cahaya background ringan */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full blur-[100px] opacity-25 ${
              isDark ? "bg-yellow-400/15" : "bg-yellow-300/20"
            }`}
          />
        </div>

        {/* 🟡 Kiri - Teks & Logo */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="z-10 max-w-2xl text-center lg:text-left space-y-8 transform-gpu"
        >
          {/* Logo */}
          <div className="flex justify-center lg:justify-start mb-2">
            <img
              src={Logo}
              alt="Logo Wajrasena"
              className="h-16 w-auto object-contain drop-shadow-md select-none translate-z-0"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Judul */}
          <h1
            className={`text-4xl md:text-6xl font-extrabold leading-tight tracking-tight ${
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
            className={`text-lg md:text-xl leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("subtitle")}
          </p>

          {/* Tombol */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
              className={`px-6 py-3 rounded-lg font-semibold shadow-md transform-gpu ${
                isDark
                  ? "bg-yellow-400 text-black hover:bg-yellow-300"
                  : "bg-yellow-500 text-white hover:bg-yellow-400"
              }`}
            >
              {t("buttons.programs")}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
              className={`px-6 py-3 rounded-lg font-semibold border transform-gpu ${
                isDark
                  ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  : "border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white"
              }`}
            >
              {t("buttons.about")}
            </motion.button>
          </div>
        </motion.div>

        {/* 🖼️ Kanan - Gambar Hero */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mt-14 lg:mt-0 flex justify-center transform-gpu"
        >
          <div
            className={`relative w-[280px] md:w-[400px] lg:w-[440px] aspect-square overflow-hidden rounded-[2rem] shadow-2xl border translate-z-0 ${
              isDark ? "border-yellow-400/20" : "border-yellow-500/20"
            }`}
          >
            <img
              src={Logo}
              alt={t("image_alt")}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-[1.05] will-change-transform"
            />
            <div
              className={`absolute inset-0 ${
                isDark
                  ? "bg-gradient-to-t from-black/50 to-transparent"
                  : "bg-gradient-to-t from-white/50 to-transparent"
              }`}
            />
          </div>
        </motion.div>
      </section>
    </LazyMotion>
  );
});

export default Hero;
