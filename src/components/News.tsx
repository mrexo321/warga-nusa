import React from "react";
import { motion } from "framer-motion";
import { useSuspenseQuery } from "@tanstack/react-query";
import { newsService } from "../services/newsService";
import environment from "../config/environment";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NewsCard = ({ id, title, content, thumbnail, author_id, index }) => {
  const navigate = useNavigate();
  const { t } = useTranslation("news");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/news/${id}`)}
      className="relative bg-gradient-to-b from-[#1E1E1E]/90 via-[#141414]/90 to-black/95
             border border-amber-500/20 rounded-2xl shadow-md
             hover:shadow-amber-400/40 overflow-hidden
             group transition-all duration-500 hover:-translate-y-2 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={environment.IMAGE_URL + thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Konten */}
      <div className="p-6 flex flex-col justify-between h-full text-slate-100">
        <div>
          <h3
            className="text-lg font-semibold text-white mb-2 line-clamp-2
                     group-hover:text-amber-400 transition-colors duration-300"
          >
            {title}
          </h3>
          <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
            {content}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto text-sm text-slate-400">
          <span>
            {t("by")}:{" "}
            <span className="font-semibold text-slate-200">{author_id}</span>
          </span>
        </div>
      </div>

      {/* Efek ring hover */}
      <div
        className="absolute inset-0 rounded-2xl ring-1 ring-amber-400/0
                  group-hover:ring-amber-400/30 transition-all duration-700"
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

  return (
    <section
      id="news"
      className="relative bg-transparent text-white py-24 overflow-hidden"
    >
      {/* Header */}
      <div className="relative text-center mb-16 z-10 px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          {t("description", { brand: "Wajrasena Garda Nusantara" })}
        </motion.p>
      </div>

      {/* Grid Berita - dibungkus container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.map((data, index) => (
            <NewsCard key={index} {...data} index={index} />
          ))}
        </div>
      </div>

      {/* Tombol */}
      <div className="text-center mt-16 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="relative bg-yellow-500 text-black font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-yellow-400/40 overflow-hidden group transition-all"
        >
          <span className="relative z-10">{t("button")}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
        </motion.button>
      </div>
    </section>
  );
};

export default News;
