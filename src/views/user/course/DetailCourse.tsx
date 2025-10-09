import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import MainLayout from "../../../layouts/MainLayout";
import { Clock, Star, CheckCircle2, PlayCircle } from "lucide-react";
import { courseService } from "../../../services/courseService";
import { toast } from "sonner";
import environment from "../../../config/environment";

const DetailCourse = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  // Fetch detail course
  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: () => courseService.getById(id!),
    enabled: !!id,
    select: (res) => res.data,
  });

  // Mutation untuk apply course
  const applyMutation = useMutation({
    mutationFn: () => courseService.applyCourse(id!),
    onSuccess: () => {
      toast.success("Berhasil mendaftar ke kursus ini!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Gagal mendaftar kursus");
    },
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="p-6 text-slate-300">Memuat data kursus...</div>
      </MainLayout>
    );
  }

  if (isError || !course) {
    return (
      <MainLayout>
        <div className="p-6 text-red-400">Gagal memuat detail kursus</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        {/* Banner */}
        <div className="relative w-full h-112 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={`${environment.IMAGE_URL + course.thumbnail}`}
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

        {/* Download Files */}
        <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 shadow-lg hover:shadow-slate-700/40 transition-all duration-300">
          <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-3 mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            File Materi
          </h2>

          <div className="flex items-center justify-between bg-slate-900/40 border border-slate-700/40 rounded-xl p-4 hover:bg-slate-800/60 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v12m0 0l3.5-3.5M12 16l-3.5-3.5M4 20h16"
                />
              </svg>
              <div>
                <p className="text-sm text-slate-400">Klik untuk mengunduh</p>
                <p className="text-base font-medium text-white">
                  {course.file ? course.file.split("/").pop() : "File Materi"}
                </p>
              </div>
            </div>

            {course.file ? (
              <a
                href={environment.IMAGE_URL + course.file}
                target="_blank"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 active:bg-blue-700 transition-all duration-200"
              >
                Download
              </a>
            ) : (
              <span className="text-slate-400 italic text-sm">
                Belum ada file
              </span>
            )}
          </div>
        </div>

        {/* Progress & Modul */}
        {course.modules && course.modules.length > 0 && (
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-2">
              Progress Belajar
            </h2>

            <div className="space-y-3">
              <div className="w-full bg-slate-700/40 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-amber-400 h-full transition-all"
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>
              <span className="text-slate-400 text-sm">
                {course.progress || 0}% Selesai
              </span>
            </div>

            <ul className="mt-4 space-y-3">
              {course.modules.map((mod: any, i: number) => (
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
        )}

        {/* Tombol Aksi */}
        <div className="flex justify-between gap-3">
          <button
            onClick={() => navigate("/course-satpam")}
            className="cursor-pointer px-6 py-3 bg-sky-300 text-sky-800 font-semibold rounded-xl shadow-md hover:bg-sky-400 transition-all duration-200 disabled:opacity-60"
          >
            Kembali
          </button>
          <div className="flex items-center space-x-4">
            {/* Tombol Apply */}
            <button
              onClick={() => applyMutation.mutate()}
              disabled={applyMutation.isPending}
              className="px-6 py-3 cursor-pointer bg-emerald-500 text-slate-900 font-semibold rounded-xl shadow-md hover:bg-emerald-400 transition-all duration-200 disabled:opacity-60"
            >
              {applyMutation.isPending ? "Mendaftar..." : "Apply Course"}
            </button>

            {/* Tombol Lanjutkan */}
            <button className="px-6 py-3 cursor-pointer bg-amber-500 text-slate-900 font-semibold rounded-xl shadow-md hover:bg-amber-400 transition-all duration-200 flex items-center space-x-2">
              <PlayCircle size={18} />
              <span>
                {course.progress < 100
                  ? "Lanjutkan Kursus"
                  : "Lihat Sertifikat"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DetailCourse;
