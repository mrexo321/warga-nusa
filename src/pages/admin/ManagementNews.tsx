import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Plus, Edit3, Trash2, Search, X } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { newsService } from "../../services/newsService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";

// === Dummy Author (UUID) ===
const dummyAuthors = [
  { id: "0199c1f8-6983-7b43-a499-017f50bb3540", name: "Andi Pratama" },
  { id: "0199c1f8-b740-72ad-80cc-3e020bec6440", name: "Siti Rahmawati" },
  { id: "0199c1f8-ec8b-7b32-bb2f-0592246bd790", name: "Budi Santoso" },
];

// === Validation Schema ===
const newsSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  thumbnail: z.any().optional(),
  author_id: z.string().uuid("Penulis tidak valid"),
});

type NewsFormValues = z.infer<typeof newsSchema>;

const ManagementNews = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [newsToDelete, setNewsToDelete] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();
  // === Fetch Data ===
  const {
    data: newsList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["news"],
    queryFn: newsService.getAll,
  });

  const filteredNews = (newsList ?? []).filter((n: any) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  // === Mutations ===
  const addMutation = useMutation({
    mutationFn: (formData: FormData) => newsService.create(formData),
    onSuccess: () => {
      toast.success("Berita berhasil ditambahkan");
      refetch();
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const formData = new FormData();
      formData.append("title", data.title);

      // ✅ Hanya kirim image kalau user upload gambar baru
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      return newsService.update(editingNews.id, formData);
    },
    onSuccess: () => {
      toast.success("Berita berhasil diperbarui!");
      refetch();
      setIsModalOpen(false);
      setEditingNews(null);
    },
    onError: () => toast.error("Gagal memperbarui berita"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => newsService.delete(id),
    onSuccess: () => {
      toast.success("Berita berhasil dihapus");
      refetch();
    },
  });

  // === Form ===
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      author_id: dummyAuthors[0].id,
    },
  });

  const onSubmit = (values: NewsFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("author_id", values.author_id);

    if (values.thumbnail?.[0]) {
      formData.append("thumbnail", values.thumbnail[0]);
    }

    if (editingNews) {
      updateMutation.mutate({ id: editingNews.id, formData });
    } else {
      addMutation.mutate(formData);
    }
  };

  const openAddModal = () => {
    navigate("/news/add");
  };

  const openEditModal = (news: any) => {
    reset({
      title: news.title,
      content: news.content,
      author_id: news.author_id ?? dummyAuthors[0].id,
    });
    setEditingNews(news);
    setIsModalOpen(true);
  };

  const handleDelete = (news: any) => {
    setNewsToDelete(news);
    setIsDeleteModalOpen(true);
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6 text-slate-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h1 className="text-2xl font-bold text-cyan-400">Manajemen Berita</h1>
          <button
            onClick={openAddModal}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200"
          >
            <Plus size={18} />
            <span>Tambah Berita</span>
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
            placeholder="Cari berita..."
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
                <th className="px-6 py-3 text-left">Judul</th>
                <th className="px-6 py-3 text-left">Konten</th>
                <th className="px-6 py-3 text-left">Penulis</th>
                <th className="px-6 py-3 text-left">Thumbnail</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-slate-400 italic"
                  >
                    Memuat data...
                  </td>
                </tr>
              ) : filteredNews.length > 0 ? (
                filteredNews.map((news: any) => {
                  const authorName =
                    dummyAuthors.find((a) => a.id === news.author_id)?.name ??
                    "Tidak diketahui";

                  return (
                    <tr
                      key={news.id}
                      className="border-t border-slate-700/50 hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-6 py-3 font-medium">{news.title}</td>
                      <td className="px-6 py-3 truncate max-w-xs">
                        {news.content.length > 80
                          ? news.content.slice(0, 80) + "..."
                          : news.content}
                      </td>
                      <td className="px-6 py-3">{authorName}</td>
                      <td className="px-6 py-3">
                        {news.thumbnail ? (
                          <img
                            src={`http://localhost:3000/${news.thumbnail}`}
                            alt="Thumbnail"
                            className="w-16 h-16 rounded object-cover border border-slate-700"
                          />
                        ) : (
                          <span className="text-slate-500 italic">-</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-center space-x-2">
                        <button
                          onClick={() => openEditModal(news)}
                          className="p-2 rounded-lg bg-slate-700/50 hover:bg-cyan-500/20 transition"
                        >
                          <Edit3 size={16} className="text-cyan-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(news)}
                          className="p-2 rounded-lg bg-slate-700/50 hover:bg-red-500/20 transition"
                        >
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-slate-500 italic"
                  >
                    Tidak ada berita ditemukan
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
                {editingNews ? "Edit Berita" : "Tambah Berita"}
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 text-slate-200"
              >
                {/* Judul */}
                <div>
                  <label className="block text-sm mb-1">Judul</label>
                  <input
                    type="text"
                    {...register("title")}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  {errors.title && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Konten */}
                <div>
                  <label className="block text-sm mb-1">Konten</label>
                  <textarea
                    {...register("content")}
                    rows={5}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  {errors.content && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.content.message}
                    </p>
                  )}
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm mb-1">Penulis</label>
                  <select
                    {...register("author_id")}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    {dummyAuthors.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                  {errors.author_id && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.author_id.message}
                    </p>
                  )}
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="block text-sm mb-1">Thumbnail</label>
                  {editingNews?.thumbnail && (
                    <img
                      src={`http://localhost:3000/${editingNews.thumbnail}`}
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
                  {editingNews
                    ? updateMutation.isPending
                      ? "Menyimpan..."
                      : "Simpan Perubahan"
                    : addMutation.isPending
                    ? "Menambahkan..."
                    : "Tambah Berita"}
                </button>
              </form>
            </div>
          </div>
        )}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-red-500/50 rounded-lg p-6 w-full max-w-sm relative shadow-xl">
              <h2 className="text-xl font-semibold text-red-400 mb-3">
                Hapus Berita?
              </h2>
              <p className="text-slate-300 mb-5">
                Berita{" "}
                <span className="text-red-300 font-medium">
                  “{newsToDelete?.title}”
                </span>{" "}
                akan dihapus permanen. Kamu yakin?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setNewsToDelete(null);
                  }}
                  className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition text-sm"
                >
                  Batal
                </button>

                <button
                  onClick={() => {
                    deleteMutation.mutate(newsToDelete.id, {
                      onSuccess: () => {
                        toast.success("Berita berhasil dihapus!");
                        setIsDeleteModalOpen(false);
                        setNewsToDelete(null);
                      },
                    });
                  }}
                  disabled={deleteMutation.isPending}
                  className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition text-sm font-semibold"
                >
                  {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ManagementNews;
