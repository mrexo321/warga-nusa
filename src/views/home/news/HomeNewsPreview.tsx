import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeftCircle } from "lucide-react";
import environment from "../../../config/environment";
import { newsService } from "../../../services/newsService";
import HomeLayout from "../../../layouts/HomeLayout";
const HomeNewsPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: news } = useSuspenseQuery({
    queryFn: () => newsService.getById(id),
    queryKey: ["news", id],
  });
  console.log(news);

  if (!news) return null;

  return (
    <HomeLayout>
      <div className="min-h-screen relative bg-transparent from-slate-950 via-slate-900 to-black text-slate-200 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-yellow-500/10 blur-[200px]" />
        <div className="absolute bottom-[-200px] right-0 w-[600px] h-[600px] bg-yellow-400/10 blur-[150px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto px-6 py-16"
        >
          {/* Tombol kembali */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-8 transition-colors"
          >
            <ArrowLeftCircle size={22} />
            <span>Kembali</span>
          </button>

          {/* Gambar Berita */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-2xl shadow-lg border border-slate-800/70"
          >
            <img
              src={environment.IMAGE_URL + news.thumbnail}
              alt={news.title}
              className="w-full h-[400px] object-cover"
            />
          </motion.div>

          {/* Isi Berita */}
          <div className="mt-10 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-yellow-400 leading-snug"
            >
              {news.title}
            </motion.h1>

            <p className="text-slate-400 text-sm">
              Oleh{" "}
              <span className="text-slate-200 font-medium">
                {news.author_id}
              </span>{" "}
              •{" "}
              {new Date(news.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="prose prose-invert max-w-none text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />

            <div className="mt-12 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(-1)}
                className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-yellow-400/40 transition-all"
              >
                Kembali ke Berita
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </HomeLayout>
  );
};

export default HomeNewsPreview;
