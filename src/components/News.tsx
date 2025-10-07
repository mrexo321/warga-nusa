import React from "react";
import Section from "./Section";

const NewsCard = ({ title, excerpt, date, image, category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-t-4 border-yellow-400">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {category}
          </span>
          <span className="text-gray-500 text-sm">{date}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

        <button className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors flex items-center">
          Baca Selengkapnya
          <svg
            className="w-4 h-4 ml-1"
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
    </div>
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
    <Section background="yellow" id="news">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Berita Terkini
        </h2>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Update terbaru dan informasi penting dari WargaNusa
        </p>
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {newsItems.map((news, index) => (
          <NewsCard
            key={index}
            title={news.title}
            excerpt={news.excerpt}
            date={news.date}
            category={news.category}
            image={news.image}
          />
        ))}
      </div>

      {/* See All News Button */}
      <div className="text-center mt-12">
        <button className="bg-black hover:bg-gray-800 text-yellow-400 font-medium px-8 py-3 rounded-lg transition-colors">
          Lihat Semua Berita
        </button>
      </div>
    </Section>
  );
};

export default News;
