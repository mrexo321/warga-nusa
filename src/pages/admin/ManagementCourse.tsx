import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Plus, Edit3, Eye, Trash2, Search, AlertTriangle } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import environment from "../../config/environment";

const ManagementCourse = () => {
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<null | {
    id: string;
    name: string;
  }>(null);
  const navigate = useNavigate();

  // Ambil semua Pelatihan
  const {
    data: courses = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: courseService.getAll,
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Gagal memuat data Pelatihan"
      );
    },
  });

  // Hapus Pelatihan
  const deleteMutation = useMutation({
    mutationFn: (id: string) => courseService.delete(id),
    onSuccess: () => {
      toast.success("Pelatihan berhasil dihapus");
      setConfirmDelete(null);
      refetch();
    },
    onError: () => {
      toast.error("Gagal menghapus Pelatihan");
    },
  });

  const filteredCourses = courses.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-6 space-y-8 text-slate-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold tracking-wide text-cyan-400">
            📚 Manajemen Pelatihan
          </h1>

          <button
            onClick={() => navigate("/courses/add")}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200"
          >
            <Plus size={18} /> Tambah Pelatihan
          </button>
        </div>

        {/* Pencarian */}
        <div className="relative w-full sm:w-1/3">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Cari Pelatihan..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-3 py-2 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* State Loading / Error */}
        {isLoading && (
          <p className="text-center text-slate-400 animate-pulse">
            Memuat daftar Pelatihan...
          </p>
        )}
        {isError && (
          <p className="text-center text-red-400">
            Gagal memuat data Pelatihan.
          </p>
        )}

        {/* Grid Card */}
        {!isLoading && filteredCourses.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course: any) => (
              <div
                key={course.id}
                className="group bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-amber-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                  <img
                    src={
                      course.thumbnail
                        ? `${environment.IMAGE_URL}${course.thumbnail}`
                        : "/placeholder.jpg"
                    }
                    alt={course.name}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                    {course.code}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-semibold text-white line-clamp-1">
                    {course.name}
                  </h3>

                  <p className="text-slate-400 text-sm line-clamp-2">
                    {course.description || "Tidak ada deskripsi."}
                  </p>

                  {/* Aksi */}
                  <div className="flex justify-between items-center pt-3 border-t border-slate-700/50">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/courses/edit/${course.id}`)}
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition"
                      >
                        <Edit3 size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/courses/preview/${course.id}`)
                        }
                        className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition"
                      >
                        <Eye size={16} />
                        <span>Preview</span>
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        setConfirmDelete({ id: course.id, name: course.name })
                      }
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredCourses.length === 0 && (
          <p className="text-center text-slate-400 text-sm mt-10">
            Tidak ada Pelatihan ditemukan.
          </p>
        )}
      </div>

      {/* === MODAL KONFIRMASI HAPUS === */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-lg p-8 w-[90%] max-w-md relative">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-amber-400" size={28} />
              <h2 className="text-xl font-semibold text-white">
                Konfirmasi Hapus
              </h2>
            </div>

            <p className="text-slate-400 mb-6">
              Apakah kamu yakin ingin menghapus pelatihan{" "}
              <span className="text-white font-semibold">
                “{confirmDelete.name}”
              </span>
              ?<br />
              Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition"
              >
                Batal
              </button>
              <button
                onClick={() => deleteMutation.mutate(confirmDelete.id)}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ManagementCourse;
