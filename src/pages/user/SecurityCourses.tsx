import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { BookOpen, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const allCourses = [
  {
    id: 1,
    title: "Pelatihan Dasar Satpam",
    duration: "5 Hari",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=60",
    status: "Sedang Berlangsung",
  },
  {
    id: 2,
    title: "Pelatihan Pengamanan Gedung",
    duration: "3 Hari",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=60",
    status: "Selesai",
  },
  {
    id: 3,
    title: "Pelatihan Penanganan Keadaan Darurat",
    duration: "4 Hari",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=60",
    status: "Belum Dimulai",
  },
  {
    id: 4,
    title: "Pelatihan Etika dan Komunikasi Satpam",
    duration: "2 Hari",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=60",
    status: "Belum Dimulai",
  },
];

const myCourses = allCourses.filter(
  (course) =>
    course.status === "Sedang Berlangsung" || course.status === "Selesai"
);

const SecurityCourses = () => {
  const [activeTab, setActiveTab] = useState<"my" | "all">("my");

  const courses = activeTab === "my" ? myCourses : allCourses;

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

        {/* Grid List */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-white line-clamp-1">
                  {course.title}
                </h3>
                <div className="flex items-center text-slate-400 text-sm space-x-3">
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1 text-amber-400" />
                    {course.duration}
                  </span>
                  <span className="flex items-center">
                    <Star size={14} className="mr-1 text-yellow-400" />
                    {course.rating}
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
                  {course.status}
                </span>

                <Link to={"/course-satpam/detail"}>
                  <button className="mt-3 w-full py-2 bg-amber-500/20 text-amber-400 border border-amber-400/40 rounded-lg hover:bg-amber-500/40 transition-all text-sm font-semibold">
                    <BookOpen size={16} className="inline mr-1" /> Lihat Detail
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <p className="text-center text-slate-400 text-sm mt-10">
            Tidak ada kursus yang tersedia untuk saat ini.
          </p>
        )}
      </div>
    </MainLayout>
  );
};

export default SecurityCourses;
