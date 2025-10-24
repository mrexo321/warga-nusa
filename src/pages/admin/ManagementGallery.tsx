import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Search, Pencil } from "lucide-react";
import { galleryService } from "../../services/galleryService";

const gallerySchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  image: z.any().optional(),
});

type GalleryForm = z.infer<typeof gallerySchema>;

export default function ManagementGallery() {
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false); // ✅ EDIT FEATURE
  const [selected, setSelected] = useState<any>(null); // ✅ EDIT FEATURE

  const {
    data: galleries = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["galleries"],
    queryFn: galleryService.getAll,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GalleryForm>({
    resolver: zodResolver(gallerySchema),
  });

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

  // ✅ EDIT FEATURE
  const updateMutation = useMutation({
    mutationFn: async (data: GalleryForm) => {
      const formData = new FormData();
      formData.append("title", data.title);

      // ✅ Jika user upload gambar baru, kirim filenya
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      return galleryService.update(selected.id, formData);
    },
    onSuccess: () => {
      toast.success("Gambar berhasil diperbarui!");
      refetch();
      reset();
      setEditMode(false);
      setOpenForm(false);
      setSelected(null);
    },
    onError: () => toast.error("Gagal memperbarui gambar."),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number | string) => galleryService.delete(id),
    onSuccess: () => {
      toast.success("Gambar berhasil dihapus!");
      refetch();
    },
    onError: () => toast.error("Gagal menghapus gambar."),
  });

  const onSubmit = (data: GalleryForm) => {
    editMode ? updateMutation.mutate(data) : createMutation.mutate(data);
  };

  const startEdit = (item: any) => {
    setSelected(item);
    setEditMode(true);
    setOpenForm(true);
    reset({
      title: item.title,
    });
  };

  const filteredGallery = galleries.filter((g: any) =>
    g.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-6 space-y-6 text-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-400">Manajemen Galeri</h1>
          <button
            onClick={() => {
              setEditMode(false);
              reset();
              setSelected(null);
              setOpenForm(!openForm);
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold px-4 py-2 rounded-lg"
          >
            <Plus size={18} />
            <span>{openForm ? "Tutup Form" : "Tambah Gallery"}</span>
          </button>
        </div>

        {openForm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium">Judul</label>
              <input
                {...register("title")}
                placeholder="Masukkan judul"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* ✅ EDIT IMAGE PREVIEW */}
            {editMode && selected && (
              <div className="space-y-2">
                <p className="font-medium">Gambar Lama:</p>
                <img
                  src={`http://localhost:3000/${selected.image}`}
                  className="w-40 h-40 object-cover rounded-lg border border-slate-600"
                />
              </div>
            )}

            <div>
              <label className="block mb-1 font-medium">
                Upload Gambar Baru (opsional)
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="w-full text-slate-300"
              />
            </div>

            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg font-semibold text-slate-900 transition-all"
            >
              {editMode ? "Update" : "Simpan"}
            </button>
          </form>
        )}

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Cari gambar..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p className="text-center col-span-full">Memuat data...</p>
          ) : filteredGallery.length > 0 ? (
            filteredGallery.map((item: any) => (
              <div
                key={item.id}
                className="relative bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden shadow-md"
              >
                <img
                  src={`http://localhost:3000/${item.image}`}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-100">{item.title}</h3>

                  <div className="flex space-x-2">
                    {/* ✅ EDIT BUTTON */}
                    <button
                      onClick={() => startEdit(item)}
                      className="p-2 bg-blue-600/20 rounded-lg hover:bg-blue-500/30"
                    >
                      <Pencil size={16} className="text-blue-400" />
                    </button>

                    <button
                      onClick={() => deleteMutation.mutate(item.id)}
                      className="p-2 bg-red-600/20 rounded-lg hover:bg-red-500/30"
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">
              Tidak ada gambar ditemukan
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
