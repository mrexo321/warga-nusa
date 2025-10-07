import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Plus, Edit3, Trash2, Search, X } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const courseSchema = z.object({
  name: z.string().min(3, "Nama kursus minimal 3 karakter"),
  code: z.string().min(2, "Kode kursus wajib diisi"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  file: z.any().optional(),
  thumbnail: z.any().optional(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

const ManagementCourse = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  // === Fetch Data ===
  const {
    data: courses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: courseService.getAll,
  });

  // courses selalu array, agar aman dipakai .map/.filter
  const courseList = courses ?? [];

  // Filter berdasarkan search
  const filteredCourses = courseList.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // === Mutations ===
  const addMutation = useMutation({
    mutationFn: (formData: FormData) => courseService.create(formData),
    onSuccess: () => {
      toast.success("Berhasil Menambahkan Data");
      refetch();
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; formData: FormData }) =>
      courseService.update(data.id, data.formData),
    onSuccess: () => {
      refetch();
      setIsModalOpen(false);
      setEditingCourse(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => courseService.delete(id),
    onSuccess: () => refetch(),
  });

  // === Form ===
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
  });

  const onSubmit = (values: CourseFormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("code", values.code);
    formData.append("description", values.description);

    // Hanya append file jika user pilih file baru
    if (values.file?.[0]) {
      formData.append("file", values.file[0]);
    }

    // Hanya append thumbnail jika user pilih baru
    if (values.thumbnail?.[0]) {
      formData.append("thumbnail", values.thumbnail[0]);
    }

    if (editingCourse) {
      updateMutation.mutate({ id: editingCourse.id, formData });
    } else {
      addMutation.mutate(formData);
    }
  };

  const openAddModal = () => {
    reset();
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const openEditModal = (course: any) => {
    reset(course);
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Yakin ingin menghapus kursus ini?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6 text-slate-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h1 className="text-2xl font-bold">Manajemen Pelatihan</h1>
          <button
            onClick={openAddModal}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200"
          >
            <Plus size={18} />
            <span>Tambah Kursus</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-1/3">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Cari kursus..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-700/50 rounded-lg shadow-lg">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-800/70 text-slate-200 uppercase text-xs tracking-wider">
                <th className="px-6 py-3 text-left">Nama Kursus</th>
                <th className="px-6 py-3 text-left">Kode</th>
                <th className="px-6 py-3 text-left">Deskripsi</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-6 text-center text-slate-400 italic"
                  >
                    Memuat data...
                  </td>
                </tr>
              ) : filteredCourses.length > 0 ? (
                filteredCourses.map((course: any) => (
                  <tr
                    key={course.id}
                    className="border-t border-slate-700/50 hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-3 font-medium">{course.name}</td>
                    <td className="px-6 py-3">{course.code}</td>
                    <td className="px-6 py-3">{course.description}</td>
                    <td className="px-6 py-3 text-center space-x-2">
                      <button
                        onClick={() => openEditModal(course)}
                        className="p-2 rounded-lg bg-slate-700/50 hover:bg-cyan-500/20 transition"
                      >
                        <Edit3 size={16} className="text-cyan-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-2 rounded-lg bg-slate-700/50 hover:bg-red-500/20 transition"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-6 text-center text-slate-500 italic"
                  >
                    Tidak ada kursus ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 w-full flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 w-full max-w-lg relative">
              <button
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-200"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-semibold mb-4 text-amber-400">
                {editingCourse ? "Edit Kursus" : "Tambah Kursus"}
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 text-slate-200"
              >
                <div>
                  <label className="block text-sm mb-1">Nama Kursus</label>
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">Kode Kursus</label>
                  <input
                    type="text"
                    {...register("code")}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  {errors.code && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.code.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">Deskripsi</label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  {errors.description && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">File Materi</label>

                  {/* Tampilkan link file lama jika ada */}
                  {editingCourse?.file && (
                    <a
                      href={`http://localhost:3000/${editingCourse.file}`} // pastikan ini path lengkap
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 underline text-sm mb-1 block"
                    >
                      File Lama: {editingCourse.file.split("/").pop()}
                    </a>
                  )}

                  <input
                    type="file"
                    {...register("file")}
                    className="w-full text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Thumbnail</label>

                  {/* Preview thumbnail lama jika ada */}
                  {editingCourse?.thumbnail && (
                    <img
                      src={`http://localhost:3000/${editingCourse.thumbnail}`}
                      alt="Thumbnail lama"
                      className="w-20 h-20 object-cover mb-1 rounded"
                    />
                  )}

                  <input
                    type="file"
                    {...register("thumbnail")}
                    className="w-full text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={addMutation.isPending || updateMutation.isPending}
                  className="w-full bg-amber-500 text-slate-900 font-semibold py-2 rounded-md hover:bg-amber-400 transition-all duration-200"
                >
                  {editingCourse
                    ? updateMutation.isPending
                      ? "Menyimpan..."
                      : "Simpan Perubahan"
                    : addMutation.isPending
                    ? "Menambahkan..."
                    : "Tambah Kursus"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ManagementCourse;
