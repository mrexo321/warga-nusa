import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";

const NewsCard = ({ title, excerpt, date, image, category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden h-52">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {category}
          </span>
          <span className="text-gray-500 text-sm">{date}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        <button className="text-yellow-600 hover:text-yellow-700 font-semibold transition-all flex items-center group">
          Baca Selengkapnya
          <svg
            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

const News = () => {
  const newsItems = [
    {
      title: "Pelatihan Keamanan Cyber Terbaru untuk Era Digital",
      excerpt:
        "WargaNusa meluncurkan program pelatihan keamanan cyber yang komprehensif untuk menghadapi ancaman digital terkini. Program ini dirancang khusus untuk profesional keamanan modern.",
      date: "15 Des 2024",
      category: "Pelatihan",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop",
    },
    {
      title: "Sertifikasi Internasional untuk Instruktur WargaNusa",
      excerpt:
        "Tim instruktur WargaNusa berhasil meraih sertifikasi internasional dari International Security Training Institute, meningkatkan kualitas pelatihan yang diberikan.",
      date: "10 Des 2024",
      category: "Sertifikasi",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
    },
    {
      title: "Kerjasama dengan Perusahaan Multinasional",
      excerpt:
        "WargaNusa menandatangani MOU dengan beberapa perusahaan multinasional untuk penyediaan jasa keamanan dan pelatihan security berkelanjutan sepanjang tahun 2024.",
      date: "8 Des 2024",
      category: "Kerjasama",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&h=300&fit=crop",
    },
    {
      title: "Workshop Manajemen Krisis dan Tanggap Darurat",
      excerpt:
        "Menghadirkan workshop khusus tentang manajemen krisis dan prosedur tanggap darurat yang akan dilaksanakan setiap bulan untuk meningkatkan kesiapan tim security.",
      date: "5 Des 2024",
      category: "Workshop",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    },
  ];

  return (
    <Section
      id="news"
      className="bg-gradient-to-b from-yellow-50 via-white to-yellow-100 py-20"
    >
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
        >
          Berita Terkini
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-700 max-w-2xl mx-auto"
        >
          Update terbaru dan informasi penting dari{" "}
          <span className="font-semibold text-yellow-600">WargaNusa</span>
        </motion.p>
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {newsItems.map((news, index) => (
          <NewsCard key={index} {...news} index={index} />
        ))}
      </div>

      {/* See All News Button */}
      <div className="text-center mt-16">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="relative bg-black text-yellow-400 font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg overflow-hidden group transition-all"
        >
          <span className="relative z-10">Lihat Semua Berita</span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-700 animate-shine"></div>
        </motion.button>
      </div>
    </Section>
  );
};

export default News;
