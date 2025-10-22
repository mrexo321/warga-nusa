import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { courseService } from "../../../services/courseService";
import { ArrowLeft, PlayCircle, Clock, Layers, Star } from "lucide-react";
import environment from "../../../config/environment";
import HomeLayout from "../../../layouts/HomeLayout";

const HomeDetailCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Ambil data
  const { data: course } = useSuspenseQuery({
    queryKey: ["course", id],
    queryFn: () => courseService.getById(id),
  });

  if (!course)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Memuat data kursus...
      </div>
    );

  return (
    <HomeLayout>
      {/* ======== SECTION BACKGROUND ======== */}
      <section className="min-h-screen relative overflow-hidden pt-24 pb-16 text-white">
        {/* Background Gradient dengan efek glowing */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#1a1a1a]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.06)_1px,transparent_1px)] bg-[length:28px_28px] opacity-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-gradient-to-r from-yellow-400/10 via-yellow-300/5 to-transparent blur-3xl opacity-50 animate-pulse-slow" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-6xl mx-auto bg-black/50 border border-yellow-400/10 backdrop-blur-2xl rounded-3xl shadow-[0_0_25px_rgba(255,215,0,0.05)] overflow-hidden"
        >
          {/* ======== HEADER IMAGE ======== */}
          <div className="relative h-[400px] overflow-hidden group">
            <img
              src={environment.IMAGE_URL + course.thumbnail}
              alt={course.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 md:left-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]">
                {course.name}
              </h1>
              <p className="text-sm text-gray-300 mt-2 tracking-wide">
                {course.category ?? "Kursus Umum"}
              </p>
            </div>
          </div>

          {/* ======== CONTENT ======== */}
          <div className="p-8 md:p-12 space-y-10">
            {/* === META INFO === */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 px-4 py-1 rounded-full text-sm font-semibold">
                  {course.category}
                </span>
                {course.duration && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock size={16} />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                )}
                {course.level && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Layers size={16} />
                    <span className="text-sm capitalize">{course.level}</span>
                  </div>
                )}
                {course.rating && (
                  <div className="flex items-center gap-2 text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm">{course.rating}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition text-sm"
              >
                <ArrowLeft size={16} />
                Kembali
              </button>
            </div>

            {/* === DESKRIPSI === */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-black/30 border border-yellow-400/10 rounded-2xl p-6 shadow-inner"
            >
              <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
                Deskripsi Pelatihan
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {course.description}
              </p>
            </motion.div>

            {/* === OUTCOMES === */}
            {course.outcomes?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
                  Apa yang Akan Kamu Pelajari
                </h2>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {course.outcomes.map((item, i) => (
                    <li
                      key={i}
                      className="group bg-black/40 border border-yellow-400/10 rounded-xl p-4 hover:border-yellow-400/40 hover:shadow-[0_0_15px_rgba(250,204,21,0.1)] transition-all duration-300"
                    >
                      <span className="text-yellow-400/80 group-hover:text-yellow-400 transition">
                        •
                      </span>{" "}
                      <span className="text-gray-300 group-hover:text-white transition">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* === TOMBOL AKSI === */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="pt-4 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => navigate("/dashboard")}
                className="flex cursor-pointer items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3 rounded-xl shadow-[0_4px_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] transition-all w-full sm:w-auto"
              >
                <PlayCircle size={22} />
                Mulai Belajar
              </button>

              <button
                onClick={() => navigate("/program")}
                className="bg-transparent border border-yellow-400/40 text-yellow-300 hover:bg-yellow-400/10 hover:border-yellow-400/60 font-semibold px-8 py-3 rounded-xl transition-all w-full sm:w-auto"
              >
                Lihat Pelatihan Lainnya
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </HomeLayout>
  );
};

export default HomeDetailCourse;
