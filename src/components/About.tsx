import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import StatsCard from "./StatsCard";
import { ThemeContext } from "../layouts/HomeLayout";

const About = () => {
  const { t } = useTranslation("about");
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const stats = [
    {
      number: "15+",
      label: t("stats.experience"),
      icon: (
        <svg
          className="w-8 h-8 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      number: "10K+",
      label: t("stats.graduates"),
      icon: (
        <svg
          className="w-8 h-8 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      number: "500+",
      label: t("stats.clients"),
      icon: (
        <svg
          className="w-8 h-8 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      number: "50+",
      label: t("stats.instructors"),
      icon: (
        <svg
          className="w-8 h-8 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="about"
      className={`relative py-24 overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-transparent text-white" : "bg-transparent text-gray-900"
      }`}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className={`text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r ${
            isDark
              ? "from-yellow-400 to-amber-500"
              : "from-yellow-500 to-amber-600"
          } bg-clip-text text-transparent drop-shadow-lg`}
        >
          {t("title", { brand: "WajraSena" })}
        </h2>
        <p
          className={`text-lg max-w-3xl mx-auto leading-relaxed transition-colors duration-700 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {t("description", { brand: "Wajrasena Garda Nusantara (WajraSena)" })}
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 180 }}
            className={`relative rounded-2xl shadow-md overflow-hidden group transition-all duration-500 hover:-translate-y-2 border
              ${
                isDark
                  ? "bg-gradient-to-b from-[#1E1E1E]/90 via-[#141414]/90 to-black/95 border-slate-800/70 hover:shadow-yellow-400/30"
                  : "bg-gradient-to-b from-white via-gray-50 to-gray-100 border-gray-200 hover:shadow-yellow-500/30"
              }`}
          >
            <div className="absolute inset-0 rounded-2xl ring-1 ring-yellow-400/0 group-hover:ring-yellow-400/20 transition-all duration-700" />
            <StatsCard
              number={stat.number}
              label={stat.label}
              icon={stat.icon}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Image Section */}
      <motion.div
        className={`relative rounded-3xl overflow-hidden max-w-6xl mx-auto group shadow-[0_0_25px_rgba(255,215,0,0.05)] ${
          isDark ? "border border-slate-800/50" : "border border-gray-200/70"
        }`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <img
          src="https://images.pexels.com/photos/8613848/pexels-photo-8613848.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1"
          alt="Security Officer Training - Wajrasena Garda Nusantara"
          className="w-full object-cover h-[450px] md:h-[550px] transform group-hover:scale-110 transition-all duration-700"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            isDark
              ? "from-black/90 via-black/40 to-transparent"
              : "from-white/80 via-white/20 to-transparent"
          }`}
        />

        <motion.div
          className="absolute bottom-0 left-0 p-8 md:p-14 text-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3
            className={`text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg ${
              isDark ? "text-yellow-400" : "text-yellow-600"
            }`}
          >
            {t("imageSection.title")}
          </h3>
          <p
            className={`text-lg max-w-xl leading-relaxed transition-colors duration-700 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t("imageSection.text")}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-6 px-7 py-3 font-semibold rounded-xl shadow-lg inline-flex items-center gap-2 transition-all duration-300 border
              ${
                isDark
                  ? "bg-yellow-500/90 text-black hover:bg-yellow-400 border-yellow-400/30"
                  : "bg-yellow-500 text-white hover:bg-yellow-400 border-yellow-500/30"
              }`}
          >
            {t("imageSection.button")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Partikel Cahaya */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-full ${
              isDark ? "bg-yellow-400/30" : "bg-yellow-500/40"
            }`}
            style={{
              width: Math.random() * 6 + 4,
              height: Math.random() * 6 + 4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default About;
