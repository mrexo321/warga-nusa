import React from "react";
import MainLayout from "../../../layouts/MainLayout";
import { Clock, Star, CheckCircle2, PlayCircle } from "lucide-react";

const DetailCourse = () => {
  const course = {
    title: "Pelatihan Dasar Satpam",
    duration: "5 Hari",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
    status: "Sedang Berlangsung",
    description: `
      Pelatihan Dasar Satpam merupakan program pelatihan wajib bagi anggota satuan pengamanan
      yang bertujuan untuk membekali peserta dengan kemampuan dasar dalam menjaga keamanan
      dan ketertiban di lingkungan kerja.
      Peserta akan mempelajari berbagai hal mulai dari kedisiplinan, teknik pengawasan,
      hingga penanganan keadaan darurat.
    `,
    progress: 60,
    modules: [
      { title: "Pengenalan Profesi Satpam", completed: true },
      { title: "Etika dan Kedisiplinan", completed: true },
      { title: "Teknik Patroli dan Pengawasan", completed: false },
      { title: "Penanganan Keadaan Darurat", completed: false },
      { title: "Ujian Akhir dan Evaluasi", completed: false },
    ],
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        {/* Banner */}
        <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
          <div className="absolute bottom-4 left-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
              {course.title}
            </h1>
            <div className="flex items-center text-slate-300 text-sm space-x-4 mt-2">
              <span className="flex items-center">
                <Clock size={15} className="mr-1 text-amber-400" />{" "}
                {course.duration}
              </span>
              <span className="flex items-center">
                <Star size={15} className="mr-1 text-yellow-400" />{" "}
                {course.rating}
              </span>
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-medium ${
                  course.status === "Sedang Berlangsung"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-slate-500/20 text-slate-300"
                }`}
              >
                {course.status}
              </span>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-2">
            Deskripsi Kursus
          </h2>
          <p className="text-slate-300 leading-relaxed whitespace-pre-line">
            {course.description}
          </p>
        </div>

        {/* Progress */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-2">
            Progress Belajar
          </h2>

          <div className="space-y-3">
            <div className="w-full bg-slate-700/40 rounded-full h-3 overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <span className="text-slate-400 text-sm">
              {course.progress}% Selesai
            </span>
          </div>

          {/* Modul */}
          <ul className="mt-4 space-y-3">
            {course.modules.map((mod, i) => (
              <li
                key={i}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  mod.completed
                    ? "border-green-500/30 bg-green-500/10"
                    : "border-slate-700/50 bg-slate-700/20"
                }`}
              >
                <span
                  className={`text-sm ${
                    mod.completed ? "text-green-400" : "text-slate-300"
                  }`}
                >
                  {mod.title}
                </span>
                {mod.completed ? (
                  <CheckCircle2 className="text-green-400" size={18} />
                ) : (
                  <PlayCircle className="text-amber-400" size={18} />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-amber-500 text-slate-900 font-semibold rounded-xl shadow-md hover:bg-amber-400 transition-all duration-200 flex items-center space-x-2">
            <PlayCircle size={18} />
            <span>
              {course.progress < 100 ? "Lanjutkan Kursus" : "Lihat Sertifikat"}
            </span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default DetailCourse;
