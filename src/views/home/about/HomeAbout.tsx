import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Target, Award, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import HomeLayout, { ThemeContext } from "../../../layouts/HomeLayout";

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

const HomeAbout = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const { t } = useTranslation("homeAbout");

  return (
    <HomeLayout>
      <section className="relative min-h-screen pt-24 pb-32 overflow-hidden transition-colors duration-700">
        {/* Efek Cahaya Halus */}
        <div className="absolute inset-0 pointer-events-none">
          {isDark ? (
            <>
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[160px]" />
              <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-[100px]" />
            </>
          ) : (
            <>
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-300/30 rounded-full blur-[160px]" />
              <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-yellow-200/30 rounded-full blur-[100px]" />
            </>
          )}
        </div>

        {/* Hero Section */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          className="relative max-w-6xl mx-auto text-center px-6"
        >
          <h1
            className={`text-4xl md:text-6xl font-extrabold mb-5 tracking-wide ${
              isDark ? "text-yellow-400" : "text-yellow-700"
            }`}
          >
            {t("title")}
          </h1>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed`}>
            {t("description.part1")}{" "}
            <span
              className={`font-semibold ${
                isDark ? "text-yellow-400" : "text-yellow-600"
              }`}
            >
              {t("description.highlight")}
            </span>{" "}
            {t("description.part2")}
          </p>

          <motion.img
            src={t("image.src")}
            alt={t("image.alt")}
            className={`mt-10 rounded-3xl shadow-lg border mx-auto object-cover w-full max-w-4xl h-[350px] md:h-[450px] transition ${
              isDark
                ? "border-yellow-400/20 shadow-yellow-400/10"
                : "border-yellow-300/40 shadow-yellow-500/20"
            }`}
            whileHover={{ scale: 1.02 }}
          />
        </motion.div>

        {/* Visi & Misi */}
        <div className="max-w-6xl mx-auto px-6 mt-24 grid md:grid-cols-2 gap-12">
          {/* Visi */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            whileInView="show"
            initial="hidden"
            viewport={{ once: true }}
          >
            <h2
              className={`text-3xl font-bold mb-4 ${
                isDark ? "text-yellow-400" : "text-yellow-700"
              }`}
            >
              {t("vision.title")}
            </h2>
            <p className={`leading-relaxed `}>{t("vision.text")}</p>
          </motion.div>

          {/* Misi */}
          <motion.div
            variants={fadeIn("left", 0.2)}
            whileInView="show"
            initial="hidden"
            viewport={{ once: true }}
          >
            <h2
              className={`text-3xl font-bold mb-4 ${
                isDark ? "text-yellow-400" : "text-yellow-700"
              }`}
            >
              {t("mission.title")}
            </h2>
            <ul className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className={`flex items-start gap-2 `}>
                  <span className="text-yellow-500">✅</span>{" "}
                  {t(`mission.item${i}`)}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Nilai-Nilai Utama */}
        <div className="max-w-6xl mx-auto px-6 mt-28">
          <h2
            className={`text-3xl font-bold text-center mb-12 ${
              isDark ? "text-yellow-400" : "text-yellow-700"
            }`}
          >
            {t("values.title")}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <ShieldCheck size={40} />, key: "discipline" },
              { icon: <Users size={40} />, key: "solidarity" },
              { icon: <Target size={40} />, key: "dedication" },
              { icon: <Award size={40} />, key: "integrity" },
            ].map((val, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`group rounded-2xl p-6 text-center shadow-md border transition-all duration-300 `}
              >
                <div
                  className={`mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    isDark ? "text-yellow-400" : "text-yellow-600"
                  }`}
                >
                  {val.icon}
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    isDark ? "text-yellow-400" : "text-yellow-700"
                  }`}
                >
                  {t(`values.${val.key}.title`)}
                </h3>
                <p className={`text-sm leading-relaxed `}>
                  {t(`values.${val.key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </HomeLayout>
  );
};

export default HomeAbout;
