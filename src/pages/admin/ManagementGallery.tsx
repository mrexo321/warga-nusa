import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Search, Image as ImageIcon } from "lucide-react";
import { galleryService } from "../../services/galleryService";

// 🧩 Zod schema langsung di file
const gallerySchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  image: z.any().refine((file) => file?.length > 0, "Gambar wajib diunggah"),
});

type GalleryForm = z.infer<typeof gallerySchema>;

export default function ManagementGallery() {
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);

  // 🧩 Ambil data galeri
  const {
    data: galleries = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["galleries"],
    queryFn: galleryService.getAll,
  });

  // 🧩 Form handler
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GalleryForm>({
    resolver: zodResolver(gallerySchema),
  });

  // 🧩 Mutation tambah data
  const createMutation = useMutation({
    mutationFn: async (data: GalleryForm) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", data.image[0]);
      return galleryService.create(formData);
    },
    onSuccess: () => {
      toast.success("Gambar berhasil ditambahkan!");
      refetch();
      reset();
      setOpenForm(false);
    },
    onError: () => toast.error("Gagal menambahkan gambar."),
  });

  // 🧩 Mutation hapus data
  const deleteMutation = useMutation({
    mutationFn: (id: number | string) => galleryService.delete(id),
    onSuccess: () => {
      toast.success("Gambar berhasil dihapus!");
      refetch();
    },
    onError: () => toast.error("Gagal menghapus gambar."),
  });

  // 🧩 Submit form
  const onSubmit = (data: GalleryForm) => {
    createMutation.mutate(data);
  };

  // 🧩 Filter pencarian
  const filteredGallery = galleries.filter((g: any) =>
    g.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-6 space-y-6 text-slate-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h1 className="text-2xl font-bold">Manajemen Galeri</h1>

          <button
            onClick={() => setOpenForm(!openForm)}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200"
          >
            <Plus size={18} />
            <span>{openForm ? "Tutup Form" : "Tambah Gambar"}</span>
          </button>
        </div>

        {/* Form Tambah */}
        {openForm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium">Judul</label>
              <input
                {...register("title")}
                placeholder="Masukkan judul gambar"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:ring-2 focus:ring-amber-500"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Gambar</label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="w-full text-slate-300"
              />
              {errors.image && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-4 py-2 rounded-lg transition-all"
            >
              {createMutation.isPending ? "Menyimpan..." : "Simpan"}
            </button>
          </form>
        )}

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Cari gambar..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p className="text-center col-span-full text-slate-400">
              Memuat data...
            </p>
          ) : filteredGallery.length > 0 ? (
            filteredGallery.map((item: any) => (
              <div
                key={item.id}
                className="relative bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition-all"
              >
                <img
                  src={`http://localhost:3000/${item.image}`}
                  alt={item.title}
                  className="w-full h-48 object-cover opacity-90 hover:opacity-100 transition"
                />
                <div className="p-4 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-100">{item.title}</h3>
                  <button
                    onClick={() => deleteMutation.mutate(item.id)}
                    className="p-2 bg-slate-700/60 rounded-lg hover:bg-red-500/20 transition"
                  >
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500 italic col-span-full py-10">
              Tidak ada gambar ditemukan
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
