import React, { useContext, Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import { useSuspenseQuery } from "@tanstack/react-query";
import { newsService } from "../services/newsService";
import environment from "../config/environment";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../layouts/HomeLayout";

/* ===================== 🔹 Skeleton Card (Optimized) ===================== */
const NewsSkeleton = React.memo(({ isDark }: { isDark: boolean }) => (
  <div
    className={`rounded-2xl border shadow-sm animate-pulse overflow-hidden h-[300px] ${
      isDark
        ? "bg-[#1E1E1E]/80 border-amber-500/10"
        : "bg-white border-yellow-500/10"
    }`}
  >
    <div className="h-40 bg-gray-400/20" />
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-500/20 w-3/4 rounded" />
      <div className="h-4 bg-gray-500/20 w-full rounded" />
      <div className="h-4 bg-gray-500/20 w-5/6 rounded" />
    </div>
  </div>
));

/* ===================== 🔹 News Card (Optimized + Memoized) ===================== */
const NewsCard = React.memo(
  ({ id, title, content, thumbnail, author_id, isDark }: any) => {
    const navigate = useNavigate();
    const { t } = useTranslation("news");

    return (
      <div
        onClick={() => navigate(`/news/${id}`)}
        className={`rounded-2xl overflow-hidden cursor-pointer border shadow-sm transition-all duration-300 hover:-translate-y-1 ${
          isDark
            ? "bg-[#121212]/90 border-amber-500/20 hover:shadow-amber-300/30"
            : "bg-white border-yellow-500/20 hover:shadow-yellow-400/20"
        }`}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={environment.IMAGE_URL + thumbnail}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className={`p-5 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
          <h3
            className={`text-lg font-semibold mb-2 line-clamp-2 ${
              isDark ? "text-white" : "text-gray-900"
            } hover:text-yellow-500 transition-colors`}
          >
            {title}
          </h3>
          <p
            className={`text-sm mb-3 line-clamp-3 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {content}
          </p>
          <p
            className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}
          >
            {t("by")}:{" "}
            <span
              className={`font-semibold ${
                isDark ? "text-yellow-400" : "text-yellow-600"
              }`}
            >
              {author_id}
            </span>
          </p>
        </div>
      </div>
    );
  }
);

/* ===================== 🔹 Main Content ===================== */
const NewsContent = React.memo(({ isDark }: { isDark: boolean }) => {
  const { data: news } = useSuspenseQuery({
    queryFn: newsService.getAll,
    queryKey: ["news"],
  });

  const { t } = useTranslation("news");

  const renderedNews = useMemo(
    () =>
      news.map((item: any, index: number) => (
        <NewsCard key={item.id || index} {...item} isDark={isDark} />
      )),
    [news, isDark]
  );

  return (
    <>
      <div className="text-center mb-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-bold mb-3 ${
            isDark ? "text-yellow-400" : "text-yellow-600"
          }`}
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className={`max-w-2xl mx-auto text-lg leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {t("description", { brand: "Wajrasena Garda Nusantara" })}
        </motion.p>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.08 }}
      >
        {renderedNews}
      </motion.div>
    </>
  );
});

/* ===================== 🔹 Wrapper ===================== */
const News = () => {
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
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <NewsSkeleton key={i} isDark={isDark} />
            ))}
          </div>
        }
      >
        <NewsContent isDark={isDark} />
      </Suspense>

      {/* Tombol View All */}
      <div className="text-center mt-16">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 250 }}
          className={`relative font-semibold px-8 py-3 rounded-xl shadow-md overflow-hidden group border ${
            isDark
              ? "bg-yellow-500 text-black hover:bg-yellow-400 border-yellow-400/30"
              : "bg-yellow-500 text-white hover:bg-yellow-400 border-yellow-500/30"
          }`}
        >
          <span className="relative z-10">{t("button")}</span>
        </motion.button>
      </div>

      {/* Partikel Cahaya — versi ringan */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-full ${
              isDark ? "bg-yellow-400/25" : "bg-yellow-500/30"
            }`}
            style={{
              width: Math.random() * 8 + 3,
              height: Math.random() * 8 + 3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: "translateZ(0)", // GPU acceleration
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
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
