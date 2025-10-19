import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { BookOpen, Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { toast } from "sonner";
import environment from "../../config/environment";

const SecurityCourses = () => {
  const [activeTab, setActiveTab] = useState<"my" | "all">("all");

  // ✅ Query semua kursus
  const {
    data: allCourses = [],
    isLoading: isAllLoading,
    isError: isAllError,
  } = useQuery({
    queryKey: ["courses", "all"],
    queryFn: courseService.getAll,
    enabled: activeTab === "all",
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Gagal memuat semua kursus");
    },
  });

  // ✅ Query kursus yang diambil user
  const {
    data: myCourses = [],
    isLoading: isMyLoading,
    isError: isMyError,
  } = useQuery({
    queryKey: ["courses", "my"],
    queryFn: courseService.getTakenCourse,
    enabled: activeTab === "my" || activeTab === "all", // aktif di kedua tab agar bisa tahu mana yang sudah diambil
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Gagal memuat kursus saya");
    },
  });

  // Pilih data berdasarkan tab
  const isLoading = activeTab === "my" ? isMyLoading : isAllLoading;
  const isError = activeTab === "my" ? isMyError : isAllError;
  const courses = activeTab === "my" ? myCourses : allCourses;

  // Ambil ID kursus yang sudah diambil user
  const takenCourseIds = new Set(myCourses.map((c: any) => c.id));

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            📘 Kursus Satpam
          </h1>

          <div className="flex bg-slate-800/40 border border-slate-700/50 rounded-xl p-1 w-fit">
            <button
              onClick={() => setActiveTab("my")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "my"
                  ? "bg-amber-500 text-slate-900 shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Kursus Saya
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "all"
                  ? "bg-amber-500 text-slate-900 shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Semua Kursus
            </button>
          </div>
        </div>

        {/* State Loading / Error */}
        {isLoading && (
          <p className="text-center text-slate-400 animate-pulse">
            Memuat daftar kursus...
          </p>
        )}
        {isError && (
          <p className="text-center text-red-400">
            Terjadi kesalahan saat mengambil data.
          </p>
        )}

        {/* Daftar Kursus */}
        {!isLoading && courses.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any) => {
              const isTaken = takenCourseIds.has(course.id);

              // ✅ hanya redup kalau di tab 'all' dan kursus sudah diambil
              const isDimmed = activeTab === "all" && isTaken;

              return (
                <div
                  key={course.id}
                  className={`group bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20 ${
                    isDimmed
                      ? "opacity-60 grayscale hover:opacity-80 hover:grayscale-0"
                      : "hover:border-amber-400/60"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden">
                    <img
                      src={`${environment.IMAGE_URL}${course.thumbnail}`}
                      alt={course.name}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                      {course.code}
                    </div>

                    {/* ✅ Label hanya muncul di tab 'all' */}
                    {isDimmed && (
                      <div className="absolute bottom-2 left-2 bg-slate-900/70 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full">
                        Sudah Diambil
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-semibold text-white line-clamp-1">
                      {course.name}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Layers size={15} className="text-amber-400" />
                      <span className="capitalize">
                        {course.category || "Umum"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-slate-700/50">
                      <Link
                        to={`/course-satpam/detail/${course.id}`}
                        className="inline-flex items-center gap-2 text-amber-400 font-medium hover:underline text-sm"
                      >
                        <BookOpen size={16} /> Lihat Detail
                      </Link>
                      <ArrowRight
                        size={16}
                        className="text-slate-400 group-hover:text-amber-400 transition-all"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && courses.length === 0 && (
          <p className="text-center text-slate-400 text-sm mt-10">
            Tidak ada kursus yang tersedia saat ini.
          </p>
        )}
      </div>
    </MainLayout>
  );
};

export default SecurityCourses;
