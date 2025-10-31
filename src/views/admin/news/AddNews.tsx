import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, Upload } from "lucide-react";
import { newsService } from "../../../services/newsService";
import MainLayout from "../../../layouts/MainLayout";
import { userService } from "../../../services/userService";

// Dummy Author
const dummyAuthors = [
  { id: "0199c1f8-6983-7b43-a499-017f50bb3540", name: "Andi Pratama" },
  { id: "0199c1f8-b740-72ad-80cc-3e020bec6440", name: "Siti Rahmawati" },
  { id: "0199c1f8-ec8b-7b32-bb2f-0592246bd790", name: "Budi Santoso" },
];

// Schema validasi
const newsSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  thumbnail: z.any().optional(),
  author_id: z.string().uuid("Penulis tidak valid"),
});

const AddNews = () => {
  const navigate = useNavigate();

  const { data: authors } = useQuery({
    queryKey: ["authors"],
    queryFn: userService.getAll,
  });

  console.log("authors", authors);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      author_id: authors?.id,
    },
  });

  const mutation = useMutation({
    mutationFn: (formData) => newsService.create(formData),
    onSuccess: () => {
      toast.success("Berita berhasil ditambahkan");
      navigate("/news");
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("author_id", values.author_id);
    if (values.thumbnail?.[0]) {
      formData.append("thumbnail", values.thumbnail[0]);
    }
    mutation.mutate(formData);
  };

  return (
    <MainLayout>
      <div className="min-h-screen px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/news")}
            className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition"
          >
            <ArrowLeft size={18} />
            <span>Kembali</span>
          </button>
          <h1 className="text-2xl font-bold text-amber-400">
            Tambah Berita Baru
          </h1>
        </div>

        {/* Card Form */}
        <div className="bg-slate-900/60 border border-slate-700 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Judul Berita
              </label>
              <input
                type="text"
                {...register("title")}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:ring-2 focus:ring-amber-500 outline-none"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Konten */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Konten
              </label>
              <textarea
                {...register("content")}
                rows={6}
                placeholder="Tulis isi berita di sini..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:ring-2 focus:ring-amber-500 outline-none"
              />
              {errors.content && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.content.message}
                </p>
              )}
            </div>

            {/* Penulis */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Penulis
              </label>
              <select
                {...register("author_id")}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:ring-2 focus:ring-amber-500 outline-none"
              >
                {authors?.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Thumbnail (opsional)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer bg-slate-800/50 hover:bg-slate-700/50 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400">
                    <Upload size={24} className="mb-2" />
                    <p className="text-sm">Klik untuk memilih gambar</p>
                  </div>
                  <input
                    type="file"
                    {...register("thumbnail")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Tombol Simpan */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold py-3 rounded-lg shadow-md hover:scale-[1.02] transition-all duration-200"
            >
              {mutation.isPending ? "Menyimpan..." : "Simpan Berita"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddNews;
