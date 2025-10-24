import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import HomeLayout, { ThemeContext } from "../../../layouts/HomeLayout";
import { Navigate, useNavigate } from "react-router-dom";

const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, delay },
  },
});

const ClientAndPorto = () => {
  const { isDark } = useContext(ThemeContext);
  const { t } = useTranslation("clientAndPorto");

  const navigate = useNavigate();

  // Daftar gambar security dari Pexels
  const portfolioImages = [
    {
      src: "https://images.pexels.com/photos/8613848/pexels-photo-8613848.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "Security Guard On Duty",
      desc: "Petugas keamanan sedang berjaga, menunjukkan profesionalisme dan kesiapsiagaan.",
    },
    {
      src: "https://images.pexels.com/photos/8613871/pexels-photo-8613871.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "Briefing Tim Keamanan",
      desc: "Tim keamanan berkoordinasi sebelum patroli, menggambarkan kerja sama dan disiplin.",
    },
    {
      src: "https://images.pexels.com/photos/8613853/pexels-photo-8613853.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "Patroli Malam Profesional",
      desc: "Petugas keamanan melakukan patroli malam, menegaskan ketangguhan dan tanggung jawab.",
    },
  ];

  return (
    <HomeLayout>
      <section className="relative min-h-screen pt-24 pb-32 overflow-hidden transition-colors duration-700">
        {/* Judul Halaman */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          className="relative max-w-6xl mx-auto text-center px-6"
        >
          <h1
            className={`text-4xl md:text-6xl font-extrabold mb-5 ${
              isDark ? "text-yellow-400" : "text-yellow-600"
            }`}
          >
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        {/* Klien */}
        <div className="max-w-6xl mx-auto mt-20 px-6">
          <motion.h2
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`text-3xl font-bold text-center mb-12 ${
              isDark ? "text-yellow-400" : "text-yellow-600"
            }`}
          >
            {t("clientsTitle")}
          </motion.h2>

          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 justify-items-center"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className={`p-4 rounded-xl backdrop-blur-md shadow-md flex flex-col items-center justify-center transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900/60 border border-yellow-400/10 hover:border-yellow-400/40"
                    : "bg-white border border-yellow-300/40 hover:border-yellow-500/50 shadow-lg"
                }`}
              >
                <img
                  src={t(`client${i}_logo`)}
                  alt={t(`client${i}_name`)}
                  className={`w-24 h-12 object-contain ${
                    isDark ? "opacity-80 hover:opacity-100" : "opacity-90"
                  }`}
                />
                <p
                  className={`text-xs mt-2 text-center ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {t(`client${i}_name`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Portofolio */}
        <div className="max-w-6xl mx-auto mt-28 px-6">
          <motion.h2
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`text-3xl font-bold text-center mb-12 ${
              isDark ? "text-yellow-400" : "text-yellow-600"
            }`}
          >
            {t("portfolioTitle")}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {portfolioImages.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className={`relative group overflow-hidden rounded-2xl transition border shadow-lg ${
                  isDark
                    ? "border-yellow-400/10 hover:border-yellow-400/30"
                    : "border-yellow-300/30 hover:border-yellow-600/40 bg-white"
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                <div
                  className={`absolute inset-0 transition-opacity duration-500 flex flex-col justify-end p-6 ${
                    isDark
                      ? "bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100"
                      : "bg-gradient-to-t from-white/80 via-white/40 to-transparent opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <h3
                    className={`text-xl font-semibold ${
                      isDark ? "text-yellow-400" : "text-yellow-700"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm mt-1 ${
                      isDark ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true }}
          className={`max-w-4xl mx-auto mt-28 text-center rounded-2xl p-10 backdrop-blur-sm transition ${
            isDark
              ? "bg-gradient-to-r from-yellow-400/10 via-yellow-400/5 to-transparent border border-yellow-400/20 text-white"
              : "bg-gradient-to-r from-yellow-100 via-yellow-50 to-white border border-yellow-300 text-gray-800"
          }`}
        >
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDark ? "text-yellow-400" : "text-yellow-700"
            }`}
          >
            {t("cta_title")}
          </h2>
          <p
            className={`mb-6 max-w-2xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t("cta_text")}
          </p>
          <motion.button
            onClick={() => navigate("/contact-us")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`font-semibold px-8 py-3 rounded-xl shadow-lg inline-flex items-center gap-2 transition ${
              isDark
                ? "bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                : "bg-gradient-to-r from-yellow-300 to-yellow-500 text-white hover:shadow-[0_0_15px_rgba(250,204,21,0.5)]"
            }`}
          >
            {t("cta_button")} <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </section>
    </HomeLayout>
  );
};

export default ClientAndPorto;
