import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { useSuspenseQuery } from "@tanstack/react-query";
import { newsService } from "../services/newsService";
import environment from "../config/environment";
import { useNavigate } from "react-router-dom";

const NewsCard = ({ id, title, content, thumbnail, author_id, index }) => {
  const navigate = useNavigate();

  const handleViewNews = () => {
    navigate(`/news/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/news/${id}`)}
      className="relative bg-gradient-to-b from-zinc-900/80 via-slate-900/80 to-black/90 border border-slate-800/70 rounded-2xl shadow-md hover:shadow-yellow-400/30 overflow-hidden group transition-all duration-500 hover:-translate-y-2"
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
      <div className="p-6 flex flex-col justify-between h-full text-slate-200">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
            {content}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto text-sm text-slate-400">
          <span>
            Oleh:{" "}
            <span className="font-semibold text-slate-200">{author_id}</span>
          </span>
        </div>
      </div>

      {/* Efek ring hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-yellow-400/0 group-hover:ring-yellow-400/20 transition-all duration-700" />
    </motion.div>
  );
};

const News = () => {
  const { data: news } = useSuspenseQuery({
    queryFn: newsService.getAll,
    queryKey: ["news"],
  });

  return (
    <section
      id="news"
      className="relative bg-transparent text-white py-24 overflow-hidden"
    >
      {/* Cahaya Ambient */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-400/10 blur-[120px]" />
      </div> */}

      {/* Header */}
      <div className="relative text-center mb-16 z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4"
        >
          Berita Terkini
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          Dapatkan update terbaru dan informasi menarik dari{" "}
          <span className="text-yellow-400 font-semibold">
            Wajrasena Garda Nusantara
          </span>
          .
        </motion.p>
      </div>

      {/* Grid Berita */}
      <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-10 z-10">
        {news.map((data, index) => (
          <NewsCard key={index} {...data} index={index} />
        ))}
      </div>

      {/* Tombol */}
      <div className="text-center mt-16 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="relative bg-yellow-500 text-black font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-yellow-400/40 overflow-hidden group transition-all"
        >
          <span className="relative z-10">Lihat Semua Berita</span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
        </motion.button>
      </div>

      {/* Partikel Cahaya */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute bg-yellow-400/25 rounded-full"
            style={{
              width: Math.random() * 6 + 4,
              height: Math.random() * 6 + 4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3],
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
