import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useSuspenseQuery } from "@tanstack/react-query";
import { newsService } from "../services/newsService";
import environment from "../config/environment";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../layouts/HomeLayout";

const NewsCard = ({
  id,
  title,
  content,
  thumbnail,
  author_id,
  index,
  isDark,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation("news");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/news/${id}`)}
      className={`relative rounded-2xl overflow-hidden group transition-all duration-500 hover:-translate-y-2 cursor-pointer border shadow-md
        ${
          isDark
            ? "bg-gradient-to-b from-[#1E1E1E]/90 via-[#141414]/90 to-black/95 border-amber-500/20 hover:shadow-amber-400/40"
            : "bg-gradient-to-b from-white via-gray-50 to-gray-100 border-yellow-500/20 hover:shadow-yellow-500/30"
        }`}
    >
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={environment.IMAGE_URL + thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDark
              ? "bg-gradient-to-t from-black/70 via-black/10 to-transparent"
              : "bg-gradient-to-t from-white/50 via-white/10 to-transparent"
          }`}
        />
      </div>

      {/* Konten */}
      <div
        className={`p-6 flex flex-col justify-between h-full transition-colors duration-700 ${
          isDark ? "text-slate-200" : "text-gray-800"
        }`}
      >
        <div>
          <h3
            className={`text-lg font-semibold mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-yellow-500 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm mb-4 line-clamp-3 leading-relaxed transition-colors duration-300 ${
              isDark ? "text-slate-400" : "text-gray-600"
            }`}
          >
            {content}
          </p>
        </div>

        <div
          className={`flex items-center justify-between mt-auto text-sm transition-colors duration-300 ${
            isDark ? "text-slate-400" : "text-gray-600"
          }`}
        >
          <span>
            {t("by")}:{" "}
            <span
              className={`${
                isDark ? "text-yellow-400" : "text-yellow-600"
              } font-semibold`}
            >
              {author_id}
            </span>
          </span>
        </div>
      </div>

      {/* Efek glowing ring */}
      <div
        className={`absolute inset-0 rounded-2xl ring-1 ring-yellow-500/0 group-hover:ring-yellow-500/30 transition-all duration-700`}
      />
    </motion.div>
  );
};

const News = () => {
  const { data: news } = useSuspenseQuery({
    queryFn: newsService.getAll,
    queryKey: ["news"],
  });

  const { t } = useTranslation("news");
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <section
      id="news"
      className={`relative py-24 overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-transparent text-white" : "bg-transparent text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="relative text-center mb-16 z-10 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDark ? "text-yellow-400" : "text-yellow-600"
          }`}
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`max-w-2xl mx-auto text-lg leading-relaxed transition-colors duration-700 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {t("description", { brand: "Wajrasena Garda Nusantara" })}
        </motion.p>
      </div>

      {/* Grid News */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.map((item, index) => (
            <NewsCard key={index} {...item} index={index} isDark={isDark} />
          ))}
        </div>
      </div>

      {/* Tombol */}
      <div className="text-center mt-16 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className={`relative font-semibold px-8 py-3 rounded-xl shadow-md overflow-hidden group transition-all border
            ${
              isDark
                ? "bg-yellow-500 text-black hover:bg-yellow-400 border-yellow-400/30"
                : "bg-yellow-500 text-white hover:bg-yellow-400 border-yellow-500/30"
            }`}
        >
          <span className="relative z-10">{t("button")}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
        </motion.button>
      </div>

      {/* Partikel Cahaya */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-full transition-colors duration-700 ${
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

export default News;
