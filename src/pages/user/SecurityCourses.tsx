import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { BookOpen, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { courseService } from "../../services/courseService"; // pastikan path sesuai strukturmu
import { toast } from "sonner";
import environment from "../../config/environment";

const SecurityCourses = () => {
  const [activeTab, setActiveTab] = useState<"my" | "all">("my");

  // Ambil data dari API
  const {
    data: courses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: courseService.getAll,
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Gagal memuat data kursus");
    },
  });

  const myCourses = courses.filter(
    (course: any) =>
      course.status === "Sedang Berlangsung" || course.status === "Selesai"
  );

  const filteredCourses = activeTab === "my" ? myCourses : courses;

  console.log("courses", courses);

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-white">Course</h1>

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

        {/* State loading / error */}
        {isLoading && (
          <p className="text-center text-slate-400">Memuat kursus...</p>
        )}
        {isError && (
          <p className="text-center text-red-400">
            Terjadi kesalahan saat mengambil data.
          </p>
        )}

        {/* Grid List */}
        {!isLoading && filteredCourses.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course: any) => (
              <div
                key={course.id}
                className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
              >
                <img
                  src={`${environment.IMAGE_URL}${course.thumbnail}`}
                  alt={course.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold text-white line-clamp-1">
                    {course.name}
                  </h3>

                  <div className="flex items-center text-slate-400 text-sm space-x-3">
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1 text-amber-400" />
                      {course.duration || "N/A"}
                    </span>
                    <span className="flex items-center">
                      <Star size={14} className="mr-1 text-yellow-400" />
                      {course.rating ?? "4.5"}
                    </span>
                  </div>

                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                      course.status === "Sedang Berlangsung"
                        ? "bg-green-500/20 text-green-400"
                        : course.status === "Selesai"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-slate-500/20 text-slate-300"
                    }`}
                  >
                    {course.status || "Belum Dimulai"}
                  </span>

                  <Link to={`/course-satpam/detail/${course.id}`}>
                    <button className="mt-3 w-full py-2 bg-amber-500/20 text-amber-400 border border-amber-400/40 rounded-lg hover:bg-amber-500/40 transition-all text-sm font-semibold">
                      <BookOpen size={16} className="inline mr-1" /> Lihat
                      Detail
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredCourses.length === 0 && (
          <p className="text-center text-slate-400 text-sm mt-10">
            Tidak ada kursus yang tersedia.
          </p>
        )}
      </div>
    </MainLayout>
  );
};

export default SecurityCourses;
