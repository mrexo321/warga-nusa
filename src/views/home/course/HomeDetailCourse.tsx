import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, PlayCircle, Clock, Layers, Star } from "lucide-react";
import { courseService } from "../../../services/courseService";
import environment from "../../../config/environment";
import HomeLayout, { ThemeContext } from "../../../layouts/HomeLayout";

const HomeDetailCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Ambil data kursus
  const { data: course } = useSuspenseQuery({
    queryKey: ["course", id],
    queryFn: () => courseService.getById(id),
  });

  if (!course)
    return (
      <div className={`flex justify-center items-center min-h-screen `}>
        Memuat data Pelatihan...
      </div>
    );

  // Warna dinamis
  const bgGradient = isDark
    ? "bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#1a1a1a] text-white"
    : "bg-gradient-to-b from-[#fdfdfd] via-[#f6f6f6] to-[#ededed] text-[#1a1a1a]";

  const cardBg = isDark
    ? "bg-black/50 border border-yellow-400/10"
    : "bg-white/60 border border-yellow-400/10";
  const cardText = isDark ? "text-gray-300" : "text-gray-800";
  const highlight = isDark ? "text-yellow-400" : "text-yellow-600";

  return (
    <HomeLayout>
      <section className={`min-h-screen relative overflow-hidden pt-24 pb-16`}>
        {/* Overlay grid & efek cahaya */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.05)_1px,transparent_1px)] bg-[length:28px_28px] opacity-10 pointer-events-none" />

        <div
          className={`relative max-w-6xl mx-auto backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden`}
        >
          {/* Header image */}
          <div className="relative h-[400px] overflow-hidden rounded-t-3xl">
            <img
              src={environment.IMAGE_URL + course.thumbnail}
              alt={course.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 md:left-10">
              <h1
                className={`text-4xl md:text-5xl font-extrabold drop-shadow-lg ${highlight}`}
              >
                {course.name}
              </h1>
              <p className={`text-sm mt-2 tracking-wide text-white`}>
                {course.category ?? "Pelatihan Umum"}
              </p>
            </div>
          </div>

          {/* Konten */}
          <div className="p-8 md:p-12 space-y-10">
            {/* Meta Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
              <div className="flex items-center gap-4 flex-wrap">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold  bg-yellow-400/10 border border-yellow-400/20`}
                >
                  {course.category}
                </span>
                {course.duration && (
                  <div className={`flex items-center gap-2 `}>
                    <Clock size={16} />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                )}
                {course.level && (
                  <div className={`flex items-center gap-2 `}>
                    <Layers size={16} />
                    <span className="text-sm capitalize">{course.level}</span>
                  </div>
                )}
                {course.rating && (
                  <div className={`flex items-center gap-2 `}>
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm">{course.rating}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate(-1)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors`}
              >
                <ArrowLeft size={16} />
                Kembali
              </button>
            </div>

            {/* Deskripsi */}
            <div className={`p-6 rounded-2xl shadow-inner`}>
              <h2 className={`text-2xl font-semibold mb-3 `}>
                Deskripsi Pelatihan
              </h2>
              <p className={`leading-relaxed `}>{course.description}</p>
            </div>

            {/* Outcomes */}
            {course.outcomes?.length > 0 && (
              <div>
                <h2 className={`text-2xl font-semibold mb-3`}>
                  Apa yang Akan Kamu Pelajari
                </h2>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {course.outcomes.map((item, i) => (
                    <li
                      key={i}
                      className={`group p-4 rounded-xl border hover:shadow-lg transition-all`}
                    >
                      <span className={`mr-2`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tombol aksi */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate("/dashboard")}
                className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold bg-yellow-400 hover:bg-yellow-300 transition shadow-md w-full sm:w-auto`}
              >
                <PlayCircle size={22} />
                Mulai Belajar
              </button>
              <button
                onClick={() => navigate("/")}
                className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold border transition border-yellow-400/40 hover:bg-yellow-400/10`}
              >
                Lihat Pelatihan Lainnya
              </button>
            </div>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
};

export default HomeDetailCourse;
